# LankaRide 🚌

A modern bus booking platform for Sri Lanka — built with Next.js (frontend) and NestJS (backend).

## Features

- **🔍 Bus Search** — Search intercity, expressway, and normal services by route
- **🪑 Interactive Seat Map** — 40-seat layout with real-time availability (2+2 config)
- **📍 Live Bus Tracking** — Real-time GPS simulation on a dark-themed Leaflet map
- **🎟️ QR E-Tickets** — Booking confirmation with scannable QR codes
- **🔐 Auth** — Supabase-based sign in / sign up
- **💳 PayHere Payments** — Sandbox payment gateway integration
- **📱 SMS Notifications** — Booking confirmations via Notify.lk
- **🌐 Multi-language** — English / Sinhala / Tamil support
- **🎵 Chun Paan Mode** — Easter egg audio player

## Tech Stack

| Layer      | Tech                                                   |
| ---------- | ------------------------------------------------------ |
| Frontend   | Next.js 16, React 19, TypeScript, Tailwind CSS 4       |
| State      | Redux Toolkit, TanStack React Query                    |
| UI         | shadcn/ui, Radix, Framer Motion, Lucide Icons          |
| Maps       | Leaflet, react-leaflet                                 |
| Backend    | NestJS 11                                              |
| Database   | Supabase (PostgreSQL)                                  |
| Payments   | PayHere                                                |
| SMS        | Notify.lk                                              |

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Requires `SUPABASE_URL`, `SUPABASE_KEY`, `PAYHERE_SECRET`, and `NOTIFY_API_KEY` env vars.

## Pages

| Route                  | Description                    |
| ---------------------- | ------------------------------ |
| `/`                    | Home — search & bus list       |
| `/bus/[id]`            | Bus detail + seat selection    |
| `/track/[id]`          | Live bus tracking on map       |
| `/booking/confirm`     | Booking confirmation + QR code |

## Project Structure

```
lankaride/
├── frontend/          # Next.js app
│   └── src/
│       ├── app/       # Pages (Next App Router)
│       ├── components/# UI components
│       ├── hooks/     # Custom hooks (useBusTracking)
│       └── lib/       # Store, slices, mock data
├── backend/           # NestJS API
│   └── src/
│       ├── buses/     # Bus search & booking
│       └── payments/  # PayHere webhook handler
└── supabase-schema.sql
```
