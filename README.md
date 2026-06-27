# BYF Impact Hub

Baroda Youth Federation - A youth-led nonprofit in Vadodara working across education, women's health, disaster relief and rural welfare since 2014.

## Project Structure

This is a monorepo with separate frontend and backend applications:

```
byf-impact-hub/
├── frontend/          # React + TanStack Start application (deploy to Cloudflare/Lovable)
│   ├── src/          # Frontend source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/          # Hono + Prisma API server (deploy separately)
│   ├── src/          # Backend source code
│   │   ├── routes/   # API endpoints
│   │   └── lib/      # Utilities (Prisma client, Cloudinary)
│   ├── prisma/       # Database schema and migrations
│   ├── Dockerfile    # Container deployment
│   └── package.json  # Backend dependencies
└── package.json      # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js 20+
- Neon database account (PostgreSQL)
- Cloudinary account (for image storage)
- Razorpay account (for donations, optional in dev)

### Installation

```bash
npm run install:all
```

### Environment Setup

1. **Frontend** — copy and edit:
```bash
cp frontend/.env.example frontend/.env
```

2. **Backend** — copy and edit:
```bash
cp backend/.env.example backend/.env
```

Required backend variables in production: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD`, `ALLOWED_ORIGINS`.

### Database Setup

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### Development

Run both frontend and backend:
```bash
npm run dev
```

Or run individually:
```bash
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:3001
```

### Build

```bash
npm run build
```

## Production Deployment

The frontend and backend deploy as **two separate services**:

| Service | Stack | Suggested hosting |
|---------|-------|-------------------|
| Frontend | TanStack Start + Nitro (Cloudflare) | Lovable / Cloudflare Pages |
| Backend | Hono + Prisma | Railway, Render, Fly.io, or Docker |

### Backend deployment

1. Set all variables from `backend/.env.example` in your hosting provider.
2. Run migrations before or on startup:
   ```bash
   npm run migrate:deploy
   ```
3. Start the server:
   ```bash
   npm run start:backend
   ```

Or use Docker:
```bash
cd backend
docker build -t byf-backend .
docker run -p 3001:3001 --env-file .env byf-backend
```

Health check endpoint: `GET /health` (includes database connectivity).

### Frontend deployment

Set these build-time environment variables:

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://api.yourdomain.com` |
| `VITE_SITE_URL` | `https://yourdomain.com` |

### Production checklist

- [ ] Set strong `JWT_SECRET` and `ADMIN_PASSWORD`
- [ ] Set `ALLOWED_ORIGINS` to your production frontend URL(s)
- [ ] Set `VITE_API_URL` and `VITE_SITE_URL` for frontend build
- [ ] Use live Razorpay keys and configure `RAZORPAY_WEBHOOK_SECRET`
- [ ] Run `npm run migrate:deploy` against production database
- [ ] Verify `GET /health` returns `{ status: "ok", db: "connected" }`

## Tech Stack

### Frontend
- React 19
- TanStack Start (routing)
- TanStack Query (data fetching)
- Tailwind CSS
- shadcn/ui components
- Framer Motion (animations)

### Backend
- Hono (web framework)
- Neon (PostgreSQL database)
- Prisma (ORM)
- Cloudinary (image storage)
- Razorpay (payments)
- TypeScript
- Zod (validation)

## Features

- **Projects Management** - CRUD for projects with categories
- **Gallery** - Image management with tags (Cloudinary)
- **Events** - Event scheduling and management
- **Blog** - Blog post management
- **Volunteer Forms** - Volunteer submission handling
- **Contact Messages** - Contact form submissions
- **Donations** - Razorpay payment integration with 80G receipts
- **Admin Panel** - JWT-protected admin dashboard
- **Site Settings** - Dynamic configuration
- **Image Upload** - Direct Cloudinary integration

## Admin Access

Admin login requires the `ADMIN_PASSWORD` set in `backend/.env`. See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for details.

## Security

See [SECURITY.md](./SECURITY.md) for credential rotation, cookie auth setup, and Redis rate limiting.

## License

© 2025 Baroda Youth Federation. All rights reserved.
