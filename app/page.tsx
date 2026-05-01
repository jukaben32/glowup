'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Scissors, 
  Sparkles, 
  Bot, 
  Calendar, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Clock,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">GlowUp</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#ai" className="hover:text-white transition-colors">AI Agent</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/5">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="gradient-brand text-white border-0 shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform">
              Start Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-400 text-xs font-medium mb-6"
        >
          <Sparkles className="h-3 w-3" />
          <span>The next generation of salon management</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Your salon, on <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">AI Autopilot</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Stop losing clients to missed calls and texts. Our AI Agent handles your bookings 24/7, so you can focus on your art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link href="/signup">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gradient-brand border-0 shadow-xl shadow-teal-500/20 hover:scale-105 transition-transform group">
              Join for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold bg-white/5 border-white/10 hover:bg-white/10 text-white">
            Watch Demo
          </Button>
        </motion.div>

        {/* Dashboard Preview Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent pointer-events-none" />
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000" 
            alt="Dashboard Preview" 
            className="rounded-xl w-full h-auto opacity-80"
          />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for perfectionists</h2>
          <p className="text-gray-400 text-lg">Everything you need to run a high-end business, without the headache.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Bot className="h-8 w-8 text-teal-400" />,
              title: "AI Booking Agent",
              desc: "A personal assistant that knows your services, availability, and prices. Talks to clients like a pro."
            },
            {
              icon: <Users className="h-8 w-8 text-cyan-400" />,
              title: "Team Management",
              desc: "Manage schedules for 20+ professionals with ease. Individual profiles and performance tracking."
            },
            {
              icon: <Zap className="h-8 w-8 text-teal-400" />,
              title: "Real-time Sync",
              desc: "Calendar updates instantly across all devices. No double bookings, ever."
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
              title: "Brand Ownership",
              desc: "Unlike marketplaces, GlowUp keeps your brand front and center. Your clients stay YOURS."
            },
            {
              icon: <Clock className="h-8 w-8 text-teal-400" />,
              title: "Automated Rescheduling",
              desc: "Last minute changes? The AI handles the move and notifies the client instantly."
            },
            {
              icon: <Star className="h-8 w-8 text-cyan-400" />,
              title: "Premium Aesthetics",
              desc: "A booking experience that matches the quality of your salon. Beautiful, fast, and exclusive."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-all group"
            >
              <div className="mb-6 p-3 rounded-xl bg-white/5 inline-block group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 max-w-5xl mx-auto text-center">
        <div className="p-12 md:p-20 rounded-[3rem] gradient-brand relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Sparkles className="h-40 w-40 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to Glow Up?</h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto relative z-10">
            Join the elite salons using AI to dominate the market. Setup takes less than 5 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/signup">
              <Button size="lg" className="h-16 px-10 text-xl font-bold bg-white text-teal-600 hover:bg-gray-100 shadow-2xl">
                Get Started Now
              </Button>
            </Link>
            <p className="text-sm font-medium text-white/60">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-teal-400" />
            <span className="text-xl font-bold">GlowUp</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 GlowUp AI. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
