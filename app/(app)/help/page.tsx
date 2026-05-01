import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Sparkles, BookOpen, Bot, Team, Calendar, Settings } from 'lucide-react'

export default function HelpPage() {
  const sections = [
    {
      title: "1. Tu Identidad",
      icon: <Sparkles className="h-5 w-5 text-teal-500" />,
      content: "Al entrar por primera vez, completa la información básica de tu establecimiento en la sección de Settings. Nombre, tipo de negocio y contacto son vitales para que tus clientes te encuentren."
    },
    {
      title: "2. Catálogo de Servicios",
      icon: <BookOpen className="h-5 w-5 text-cyan-500" />,
      content: "Un menú organizado vende más. Agrupa tus servicios por categorías y asigna colores. Asegúrate de poner la duración exacta de cada servicio para que la IA cuadre tu agenda sin errores."
    },
    {
      title: "3. El Dream Team",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      content: "Sube fotos y escribe biografías atractivas para tus profesionales. El Agente de IA usará esta información para recomendar al especialista adecuado según lo que el cliente busque."
    },
    {
      title: "4. Tu Agente de IA",
      icon: <Bot className="h-5 w-5 text-emerald-500" />,
      content: "Define el tono (Profesional, Amigable o Casual) y dale instrucciones secretas. Copia el código iframe e instálalo en tu web para empezar a recibir citas automáticas 24/7."
    },
    {
      title: "5. Gestión Diaria",
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      content: "Usa el Dashboard para ver tus estadísticas y el Calendario para gestionar tu semana. Puedes mover citas simplemente arrastrándolas."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Guía de Uso GlowUp</h1>
        <p className="text-muted-foreground text-lg">Todo lo que necesitas saber para dominar el futuro de tu salón.</p>
      </div>

      <Card className="border-teal-500/20 bg-teal-500/5">
        <CardHeader>
          <CardTitle className="text-2xl">Bienvenido a la Era IA 🚀</CardTitle>
          <CardDescription>
            GlowUp no es solo un software de reservas; es tu nuevo asistente personal que nunca duerme.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {sections.map((section, i) => (
          <Card key={i} className="hover-lift">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-muted">
                {section.icon}
              </div>
              <CardTitle className="text-xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 text-white border-none">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">¿Necesitas ayuda extra?</h3>
          <p className="text-slate-400">Nuestro equipo de soporte está listo para ayudarte a brillar.</p>
          <div className="pt-4 text-teal-400 font-bold">soporte@glowup.ai</div>
        </CardContent>
      </Card>
    </div>
  )
}
