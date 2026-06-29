# Baroda Youth Federation Impact Hub

Baroda Youth Federation Impact Hub is the digital platform for Baroda Youth Federation, a youth-led nonprofit in Vadodara working in education, women’s empowerment, disaster relief, and rural welfare.

The project is a full-stack monorepo with a public-facing website and a protected admin dashboard for managing content, media, donations, and site settings.

## Overview

This repository contains two separate applications:

- Frontend: a React + TanStack Start site for the public experience and admin panel
- Backend: a Hono + Prisma API that powers content management, authentication, uploads, and donation workflows

## Repository Structure

```text
baroda-youth-federation-impact-hub/
├── frontend/                # Public site + admin UI
│   ├── src/                 # React/TanStack Start source
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies and scripts
├── backend/                 # API server and database layer
│   ├── src/                 # Hono routes, middleware, and utilities
│   ├── prisma/              # Prisma schema, migrations, and seed data
│   ├── Dockerfile           # Container build for deployment
│   └── package.json         # Backend dependencies and scripts
└── package.json             # Root workspace scripts
```

## Tech Stack

### Frontend
- React 19
- TanStack Start
- TanStack Query
- Tailwind CSS
- shadcn/ui style components
- Framer Motion
- TypeScript

### Backend
- Hono
- Prisma ORM
- PostgreSQL (Neon-compatible)
- Cloudinary for image uploads
- Razorpay for donation payments
- Zod for validation
- JWT-based admin authentication

## Key Features

- Public pages for projects, gallery, events, blog, volunteer, contact, and donations
- Dynamic site settings for page hero images and site-wide content
- Admin dashboard for managing projects, gallery, activities, testimonials, impact stats, leaders, partners, messages, volunteers, donations, and settings
- Secure image upload workflow via Cloudinary
- Donation flow with Razorpay integration
- Admin authentication and protected routes

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 20 or newer
- npm
- A PostgreSQL database (for example, Neon)
- A Cloudinary account for image uploads
- A Razorpay account if you want to test donations end to end

## Local Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment variables

Create environment files for both apps.

Frontend environment variables:

```bash
# frontend/.env
VITE_API_URL=http://localhost:3001
VITE_SITE_URL=http://localhost:5173
```

Backend environment variables:

```bash
# backend/.env
DATABASE_URL=postgresql://... 
JWT_SECRET=replace-with-a-long-random-string
ADMIN_PASSWORD=replace-with-a-strong-password
ALLOWED_ORIGINS=http://localhost:5173

# Optional but recommended for full functionality
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
REDIS_URL=redis://localhost:6379
COOKIE_SAME_SITE=Lax
```

### 3. Set up the database

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 4. Run the apps

From the repository root:

```bash
npm run dev
```

This starts:
- Frontend at http://localhost:5173
- Backend at http://localhost:3001

You can also run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Build and Verification

Build both apps:

```bash
npm run build
```

Build the frontend only:

```bash
npm run build:frontend
```

Build the backend only:

```bash
npm run build:backend
```

## Production Deployment

The frontend and backend are intended to run as separate services.

### Frontend
Recommended hosting: Cloudflare, Vercel, or another static hosting provider.

Set these build-time values:

- VITE_API_URL
- VITE_SITE_URL

### Backend
Recommended hosting: Render, Railway, Fly.io, or Docker.

Before starting the backend in production:

```bash
cd backend
npx prisma migrate deploy
```

Then start it with:

```bash
npm run start:backend
```

A health check endpoint is available at /health.

## Admin Access

The admin panel is protected with JWT-based authentication. The backend reads the admin password from the ADMIN_PASSWORD environment variable.

After starting the backend, sign in using the admin credentials configured in your environment.

## Notes

- The backend validates required production environment variables before startup.
- CORS is controlled through ALLOWED_ORIGINS and FRONTEND_URL settings.
- Cloudinary uploads and Razorpay payments require their respective credentials to be configured.

## License

© 2026 Baroda Youth Federation. All rights reserved.
