import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SetupChecklistProps {
  checks: {
    services: boolean
    staff: boolean
    ai: boolean
    profile: boolean
    widget: boolean
  }
}

export function SetupChecklist({ checks }: SetupChecklistProps) {
  const items = [
    {
      id: 'services',
      title: 'Create your service menu',
      description: 'Add categories and services with durations.',
      completed: checks.services,
      href: '/services'
    },
    {
      id: 'staff',
      title: 'Register your team',
      description: 'Add professionals with their specialties and bios.',
      completed: checks.staff,
      href: '/team'
    },
    {
      id: 'ai',
      title: 'Train your AI Agent',
      description: 'Define the tone and custom instructions for booking.',
      completed: checks.ai,
      href: '/ai-settings'
    },
    {
      id: 'profile',
      title: 'Complete your profile',
      description: 'Add address, phone, and operating hours.',
      completed: checks.profile,
      href: '/settings'
    },
    {
      id: 'widget',
      title: 'Install the Widget',
      description: 'Copy the code to your website to start booking.',
      completed: checks.widget,
      href: '/ai-settings'
    }
  ]

  const completedCount = Object.values(checks).filter(Boolean).length
  const progress = (completedCount / items.length) * 100

  if (progress === 100) return null

  return (
    <Card className="border-teal-500/20 bg-teal-500/5 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Get Ready for Launch 🚀
            </CardTitle>
            <CardDescription>Complete these steps to unlock the full power of GlowUp.</CardDescription>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">{Math.round(progress)}%</span>
            <p className="text-xs text-muted-foreground">Progress</p>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-4" />
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link 
            key={item.id} 
            href={item.href}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] ${
              item.completed 
                ? 'bg-white/50 dark:bg-white/5 border-teal-500/20 opacity-70' 
                : 'bg-white dark:bg-slate-900 border-border shadow-sm hover:border-teal-500/40'
            }`}
          >
            <div className="mt-1">
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
            </div>
            {!item.completed && <ArrowRight className="h-4 w-4 text-teal-500 mt-1" />}
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
