# Authentication Setup Guide

## Security Improvements Implemented

The authentication system has been completely overhauled to address security vulnerabilities. Here's what was changed:

### 1. JWT-Based Authentication
- **Before**: Simple password comparison with hardcoded fallback password
- **After**: JWT tokens with proper expiration (24 hours)
- **File**: `backend/src/middleware/auth.ts`

### 2. Environment-Based Configuration
- **Before**: Default admin password hardcoded as `byf2024`
- **After**: Admin password required via `ADMIN_PASSWORD` environment variable
- **File**: `backend/src/routes/auth.ts`

### 3. Rate Limiting
- **Before**: No rate limiting on API endpoints
- **After**: Rate limiting middleware (100 requests per 15 minutes per IP)
- **File**: `backend/src/middleware/rateLimit.ts`

### 4. Admin Authentication Middleware
- **Before**: Donations endpoint lacked admin authentication
- **After**: All admin-only endpoints protected with JWT middleware
- **Protected Endpoints**:
  - `/api/donations/*` (GET, DELETE)
  - `/api/messages/*` (GET, PUT, DELETE)
  - `/api/volunteers/*` (GET, PUT, DELETE)
  - `/api/settings` (PUT)
  - `/api/projects/*` (POST, PUT, DELETE)
  - `/api/gallery/*` (POST, DELETE)
  - `/api/upload` (POST)
  - `/api/activities/*` (POST, PUT, DELETE)
  - `/api/testimonials/*` (POST, PUT, DELETE)
  - `/api/impact-stats/*` (POST, PUT, DELETE)
  - `/api/leaders/*` (POST, PUT, DELETE)
  - `/api/partners/*` (POST, PUT, DELETE)
  - `/api/events/*` (POST, PUT, DELETE)
  - `/api/blog/*` (POST, PUT, DELETE)

### 5. CORS Configuration
- **Before**: Hardcoded localhost origins
- **After**: Configurable via `ALLOWED_ORIGINS` environment variable
- **File**: `backend/src/index.ts`

### 6. Frontend Session Management
- **Before**: JWT stored in localStorage (XSS risk)
- **After**: httpOnly cookie set by backend; frontend uses `credentials: 'include'`
- **Session check**: `GET /api/auth/session`
- **Logout**: `POST /api/auth/logout`
- **Files**: `frontend/src/lib/admin-auth.ts`, `frontend/src/lib/api.ts`, `backend/src/routes/auth.ts`

### 7. Admin Login Flow
- **Before**: Redirected to dashboard without authentication check
- **After**: Proper login form with authentication verification
- **File**: `frontend/src/routes/admin.tsx`

## Setup Instructions

### 1. Backend Environment Variables

Add the following to your `backend/.env` file:

```env
# Admin Authentication (REQUIRED)
ADMIN_PASSWORD="your_secure_admin_password_here"
JWT_SECRET="your_jwt_secret_key_minimum_32_characters_long"

# CORS Configuration (for production)
ALLOWED_ORIGINS="http://localhost:5173,http://localhost:8080,https://your-production-domain.com"
```

**Important**: 
- `ADMIN_PASSWORD` is now required. The server will return a 500 error if not set.
- `JWT_SECRET` must be at least 32 characters long for security.
- For production, update `ALLOWED_ORIGINS` to include your actual domain.

### 2. Restart the Backend Server

After updating the environment variables, restart the backend:

```bash
cd backend
npm run dev
```

### 3. Test the Authentication Flow

1. Navigate to `/admin` in your browser
2. You should see the login form (not a redirect to dashboard)
3. Enter the admin password you set in `ADMIN_PASSWORD`
4. On successful login, you'll be redirected to `/admin/dashboard`
5. The JWT token is stored in localStorage as `byf_admin_auth_token`
6. All admin API requests will now include the `Authorization: Bearer <token>` header

### 4. Verify Protected Endpoints

Try accessing protected endpoints without authentication:
- `GET /api/donations` should return 401 Unauthorized
- `GET /api/messages` should return 401 Unauthorized

With authentication (after login), these should work correctly.

## Security Notes

### Token Expiration
- JWT tokens expire after 24 hours
- Users will need to re-login after token expiration
- This provides an additional security layer

### Rate Limiting
- 100 requests per 15 minutes per IP address
- Helps prevent brute force attacks
- Applied globally to all endpoints

### CORS in Production
- Always set `ALLOWED_ORIGINS` to your actual production domain
- Never use `*` in production environments
- Separate multiple origins with commas

### Password Security
- Use a strong, unique password for `ADMIN_PASSWORD`
- Consider using a password manager to generate it
- Never commit the `.env` file to version control

## Troubleshooting

### Server returns 500 error on login
- Check that `ADMIN_PASSWORD` is set in `backend/.env`
- Check that `JWT_SECRET` is set and is at least 32 characters

### API requests return 401 Unauthorized
- Check that you're logged in (token in localStorage)
- Check that the token hasn't expired (24-hour limit)
- Check browser console for any API errors

### CORS errors in browser
- Check that your frontend URL is in `ALLOWED_ORIGINS`
- Restart the backend after changing `ALLOWED_ORIGINS`

### TypeScript errors about Prisma models
- Run `npx prisma generate` in the backend directory
- These are lint errors only - the app will still work at runtime
- The TypeScript server may need to refresh

## Files Modified

### Backend
- `backend/src/middleware/auth.ts` (new) - JWT authentication middleware
- `backend/src/middleware/rateLimit.ts` (new) - Rate limiting middleware
- `backend/src/routes/auth.ts` - Updated to use JWT
- `backend/src/routes/donations.ts` - Added auth middleware
- `backend/src/routes/messages.ts` - Added auth middleware
- `backend/src/routes/volunteers.ts` - Added auth middleware
- `backend/src/routes/settings.ts` - Added auth middleware
- `backend/src/routes/projects.ts` - Added auth middleware
- `backend/src/routes/gallery.ts` - Added auth middleware
- `backend/src/routes/upload.ts` - Added auth middleware
- `backend/src/routes/activities.ts` - Added auth middleware
- `backend/src/routes/testimonials.ts` - Added auth middleware
- `backend/src/routes/impact-stats.ts` - Added auth middleware
- `backend/src/routes/leaders.ts` - Added auth middleware
- `backend/src/routes/partners.ts` - Added auth middleware
- `backend/src/routes/events.ts` - Added auth middleware
- `backend/src/routes/blog.ts` - Added auth middleware
- `backend/src/index.ts` - Added rate limiting and configurable CORS
- `backend/.env.example` - Updated with new environment variables
- `backend/package.json` - Added jsonwebtoken dependencies

### Frontend
- `frontend/src/lib/admin-auth.ts` - Updated to handle JWT tokens
- `frontend/src/lib/api.ts` - Updated to include Authorization header
- `frontend/src/routes/admin.tsx` - Fixed login flow

## Next Steps

1. **Set strong passwords**: Generate secure passwords for `ADMIN_PASSWORD` and `JWT_SECRET`
2. **Update production CORS**: Set `ALLOWED_ORIGINS` to your production domain
3. **Test thoroughly**: Verify all admin functionality works with the new auth
4. **Monitor logs**: Check for any authentication-related errors in production
5. **Consider additional security**: 
   - Add password complexity requirements
   - Implement 2FA for admin accounts
   - Add audit logging for admin actions
