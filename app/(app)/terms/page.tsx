import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Términos de Uso</h1>
        <p className="text-muted-foreground text-lg">Última actualización: Mayo 2026</p>
      </div>

      <Card>
        <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold">1. Aceptación de los Términos</h2>
            <p className="text-muted-foreground">
              Al acceder y utilizar GlowUp, aceptas estar sujeto a estos términos de servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">2. Descripción del Servicio</h2>
            <p className="text-muted-foreground">
              GlowUp es una plataforma SaaS que proporciona herramientas de gestión de citas y un asistente de reservas basado en Inteligencia Artificial para establecimientos de belleza y bienestar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">3. Responsabilidades del Establecimiento</h2>
            <p className="text-muted-foreground">
              Como dueño de un establecimiento, eres responsable de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
              <li>Asegurar que la información de servicios y horarios sea veraz.</li>
              <li>Cumplir con las citas agendadas a través de la plataforma.</li>
              <li>Gestionar los datos personales de tus clientes de acuerdo con las leyes locales de protección de datos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">4. Uso de la Inteligencia Artificial</h2>
            <p className="text-muted-foreground">
              Nuestro asistente de IA interactúa con tus clientes basándose en la información que tú proporcionas. GlowUp no se hace responsable de errores derivados de información incorrecta cargada por el establecimiento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">5. Suscripción y Pagos</h2>
            <p className="text-muted-foreground">
              El acceso a GlowUp se basa en un modelo de suscripción mensual o anual. El impago resultará en la suspensión temporal de los servicios del Agente de IA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">6. Propiedad Intelectual</h2>
            <p className="text-muted-foreground">
              GlowUp y sus logotipos son propiedad exclusiva de la empresa. El establecimiento conserva la propiedad de sus datos de clientes y catálogo de servicios.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
