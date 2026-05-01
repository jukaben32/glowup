-- 003_salon_specialization.sql
-- Add salon/barbershop specialized tables and columns

-- ============================================
-- 1. SERVICE CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(20) DEFAULT '#0d9488',
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- 2. STAFF MEMBERS (Professionals)
-- ============================================
CREATE TABLE IF NOT EXISTS public.staff_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) DEFAULT 'stylist',
    email VARCHAR(255),
    phone VARCHAR(50),
    avatar_url TEXT,
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- 3. STAFF SCHEDULES (Working hours per professional)
-- ============================================
CREATE TABLE IF NOT EXISTS public.staff_schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    staff_id UUID NOT NULL REFERENCES public.staff_members(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    start_time TIME NOT NULL DEFAULT '09:00:00',
    end_time TIME NOT NULL DEFAULT '18:00:00',
    is_available BOOLEAN DEFAULT true,
    UNIQUE(staff_id, day_of_week)
);

-- ============================================
-- 4. STAFF ↔ SERVICES (many-to-many)
-- ============================================
CREATE TABLE IF NOT EXISTS public.staff_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    staff_id UUID NOT NULL REFERENCES public.staff_members(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    custom_price DECIMAL(10, 2),
    custom_duration INTEGER,
    UNIQUE(staff_id, service_id)
);

-- ============================================
-- 5. ALTER EXISTING TABLES
-- ============================================

-- Add fields to businesses
ALTER TABLE public.businesses 
    ADD COLUMN IF NOT EXISTS business_type VARCHAR(50) DEFAULT 'salon',
    ADD COLUMN IF NOT EXISTS address TEXT,
    ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
    ADD COLUMN IF NOT EXISTS logo_url TEXT,
    ADD COLUMN IF NOT EXISTS description TEXT;

-- Add category_id and color to services
ALTER TABLE public.services 
    ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT '#0d9488';

-- Add staff_id and notes to appointments
ALTER TABLE public.appointments 
    ADD COLUMN IF NOT EXISTS staff_id UUID REFERENCES public.staff_members(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS notes TEXT;

-- ============================================
-- 6. TRIGGERS for updated_at
-- ============================================
CREATE TRIGGER set_updated_at_staff_members
    BEFORE UPDATE ON public.staff_members
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ============================================
-- 7. RLS Policies for new tables
-- ============================================
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_services ENABLE ROW LEVEL SECURITY;

-- service_categories: owner can manage
CREATE POLICY "Owner can manage categories" ON public.service_categories
    FOR ALL USING (
        business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
    );

-- staff_members: owner can manage
CREATE POLICY "Owner can manage staff" ON public.staff_members
    FOR ALL USING (
        business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid())
    );

-- staff_schedules: owner can manage (via staff → business)
CREATE POLICY "Owner can manage schedules" ON public.staff_schedules
    FOR ALL USING (
        staff_id IN (
            SELECT sm.id FROM public.staff_members sm
            JOIN public.businesses b ON sm.business_id = b.id
            WHERE b.owner_id = auth.uid()
        )
    );

-- staff_services: owner can manage (via staff → business)
CREATE POLICY "Owner can manage staff services" ON public.staff_services
    FOR ALL USING (
        staff_id IN (
            SELECT sm.id FROM public.staff_members sm
            JOIN public.businesses b ON sm.business_id = b.id
            WHERE b.owner_id = auth.uid()
        )
    );

-- Public read for widget access
CREATE POLICY "Public can read categories" ON public.service_categories
    FOR SELECT USING (true);

CREATE POLICY "Public can read active staff" ON public.staff_members
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read schedules" ON public.staff_schedules
    FOR SELECT USING (true);

CREATE POLICY "Public can read staff services" ON public.staff_services
    FOR SELECT USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.staff_members;
