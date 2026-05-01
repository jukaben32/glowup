-- 002_rls_policies.sql
-- Row Level Security (RLS) policies for generalized business appointment SaaS

-- Enable RLS on all tables
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_settings ENABLE ROW LEVEL SECURITY;

-- 1. Businesses Policies
-- Owner can do everything with their own business
CREATE POLICY "Users can insert their own business"
ON public.businesses FOR INSERT TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view their own business"
ON public.businesses FOR SELECT TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Users can update their own business"
ON public.businesses FOR UPDATE TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own business"
ON public.businesses FOR DELETE TO authenticated
USING (auth.uid() = owner_id);

-- We need to allow public read access to businesses for the AI widget to load details
CREATE POLICY "Public can view business details for widget"
ON public.businesses FOR SELECT TO anon
USING (true);


-- 2. Services Policies
CREATE POLICY "Users can manage services for their business"
ON public.services FOR ALL TO authenticated
USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()))
WITH CHECK (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Public can view active services"
ON public.services FOR SELECT TO anon
USING (is_active = true);


-- 3. Clients Policies
CREATE POLICY "Users can manage clients for their business"
ON public.clients FOR ALL TO authenticated
USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()))
WITH CHECK (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

-- Allow anon (AI agent via server/API) to insert clients. 
-- Since we are doing this server-side via Next.js API routes with service_role, RLS bypasses it anyway.
-- But if using anon key, we'd need:
CREATE POLICY "Public can insert clients"
ON public.clients FOR INSERT TO anon
WITH CHECK (true);


-- 4. Appointments Policies
CREATE POLICY "Users can manage appointments for their business"
ON public.appointments FOR ALL TO authenticated
USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()))
WITH CHECK (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

-- Allow anon (AI agent) to insert appointments and view them to check conflicts
CREATE POLICY "Public can view appointments to check availability"
ON public.appointments FOR SELECT TO anon
USING (true);

CREATE POLICY "Public can insert appointments"
ON public.appointments FOR INSERT TO anon
WITH CHECK (true);


-- 5. AI Settings Policies
CREATE POLICY "Users can manage ai_settings for their business"
ON public.ai_settings FOR ALL TO authenticated
USING (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()))
WITH CHECK (business_id IN (SELECT id FROM public.businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Public can view ai_settings for widget"
ON public.ai_settings FOR SELECT TO anon
USING (true);
