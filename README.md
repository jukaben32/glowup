# GlowUp ✨

AI-powered appointment booking platform for beauty salons, barbershops, and nail bars.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![Claude AI](https://img.shields.io/badge/Claude-AI%20Agent-D97706?logo=anthropic)

## Features

- 📅 **Smart Calendar** — Visual appointment management with FullCalendar
- 🤖 **AI Booking Agent** — Claude-powered chatbot that books appointments conversationally
- 👥 **Team Management** — Manage professionals, roles, and schedules
- 💅 **Service Categories** — Organize services by type (Haircuts, Nails, Color, etc.)
- 📊 **Dashboard** — Real-time metrics: today's appointments, revenue, team stats
- 🔒 **Multi-tenant** — Each business owner sees only their own data (RLS)
- 🌙 **Dark Mode** — Beautiful dark UI by default
- 🧩 **Embeddable Widget** — Iframe-ready AI chat for external websites

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **AI:** Anthropic Claude SDK (function calling)
- **UI:** Tailwind CSS + Radix UI (Shadcn)
- **Calendar:** FullCalendar

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your keys
4. Run the SQL migrations in your Supabase SQL Editor (in order: `001`, `002`, `003`)
5. Run `npm run dev`

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: restrict Server Actions to your deployment hostnames (comma-separated, no protocol)
SERVER_ACTIONS_ALLOWED_ORIGINS=localhost:3000

# Optional: same random string in BOTH vars protects POST /api/chat from casual abuse (token is visible in the browser bundle — combine with rate limits for production)
WIDGET_EMBED_TOKEN=
NEXT_PUBLIC_WIDGET_EMBED_TOKEN=
```

See `.env.local.example` for the full list.

## License

MIT
