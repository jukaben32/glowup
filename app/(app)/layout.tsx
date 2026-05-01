import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Calendar, CalendarDays, Users, Scissors, Settings2, Wallet, LogOut, Settings, UserCircle } from 'lucide-react'
import { signout } from '@/actions/auth'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-border bg-card sm:flex">
        <div className="flex h-14 items-center border-b border-border px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">GlowUp</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-3 text-sm font-medium gap-1">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/calendar" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <Calendar className="h-4 w-4" />
              Calendar
            </Link>
            <Link href="/appointments" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <CalendarDays className="h-4 w-4" />
              Appointments
            </Link>
            
            <div className="my-2 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Manage</p>
            </div>
            
            <Link href="/team" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <UserCircle className="h-4 w-4" />
              Team
            </Link>
            <Link href="/services" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <Scissors className="h-4 w-4" />
              Services
            </Link>
            <Link href="/clients" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <Users className="h-4 w-4" />
              Clients
            </Link>

            <div className="my-2 px-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Configure</p>
            </div>

            <Link href="/ai-settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <Settings2 className="h-4 w-4" />
              AI Agent
            </Link>
            <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link href="/pricing" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <Wallet className="h-4 w-4" />
              Billing
            </Link>
          </nav>
        </div>
        <div className="border-t border-border p-4">
          <form action={signout}>
            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-muted">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 flex-1">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
