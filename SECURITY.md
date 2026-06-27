# Security Guide

## Credential Exposure Check

Git history was checked for committed `.env` files:

```bash
git log --all --full-history -- "**/.env" "frontend/.env" "backend/.env" ".env"
```

**Result:** No `.env` files appear in git history. Your local secrets have not been committed to this repository.

If you ever force-added a `.env file before `.gitignore` was in place, or pushed secrets elsewhere, rotate all credentials below regardless.

## Credential Rotation Checklist

Rotate these if there is any chance they were exposed:

| Service | Where to rotate | Env variable |
|---------|-----------------|--------------|
| Neon PostgreSQL | [Neon Console](https://console.neon.tech) → Reset password | `DATABASE_URL` |
| JWT signing secret | Generate new random string (invalidates all sessions) | `JWT_SECRET` |
| Admin password | Set new value in backend env | `ADMIN_PASSWORD` |
| Cloudinary | [Cloudinary Console](https://cloudinary.com/console) → API Keys | `CLOUDINARY_*` |
| Razorpay | [Razorpay Dashboard](https://dashboard.razorpay.com) → API Keys + Webhooks | `RAZORPAY_*` |
| Redis | Your Redis provider dashboard | `REDIS_URL` |

After rotating `JWT_SECRET`, all admin sessions are invalidated — users must log in again.

## Authentication Model

Admin auth uses **httpOnly cookies** (not localStorage):

- Login sets `byf_admin_token` cookie on the API domain
- Frontend sends `credentials: 'include'` on all API requests
- Session validated via `GET /api/auth/session`
- Logout clears cookie via `POST /api/auth/logout`

### Cross-origin cookie setup

When frontend and API are on **different domains** (e.g. `byf.org` + `api.railway.app`):

```
COOKIE_SAME_SITE=None
ALLOWED_ORIGINS=https://byf.org
```

Both frontend fetch and backend CORS must use `credentials: true` / `credentials: 'include'`.

When on **same site** (e.g. `app.example.com` + `api.example.com`, or localhost dev):

```
COOKIE_SAME_SITE=Lax
```

## Rate Limiting

- **Without Redis:** In-memory rate limiting (single instance only)
- **With Redis:** Set `REDIS_URL` for distributed rate limiting across instances

Limits:
- Global: 100 requests / 15 min per IP
- Login: 5 attempts / 15 min per IP

## Reporting Issues

If you discover a security vulnerability, do not open a public issue. Contact the project maintainers directly.
