
## What I'll build

### Part A — Immediate static updates (no backend needed)
1. **Social links** in Footer: remove LinkedIn; add/update Instagram, YouTube, Twitter/X, Facebook with the URLs you gave.
2. **WhatsApp**: update Contact page + footer to **+91 97237 84628 (Rukmil Shah)** with click-to-chat link (`wa.me/919723784628`).
3. **Founder Portfolio button** on About page (Leadership section) — placeholder `#` link with a clear "Update in Admin → Settings" hook, so when you give me the link I (or you, via admin) can drop it in.

### Part B — Admin panel (requires Lovable Cloud)
Enable Lovable Cloud → Postgres + Auth + Storage. This gives us real persistence so admin edits actually update the live site.

**Auth model (simple):**
- Single admin login at `/admin/login` — email + password.
- I'll create one admin user (you give me the email; I'll generate a temp password you change on first login).
- No public signup. Route guard via `_authenticated` layout + `has_role('admin')` check.

**Admin dashboard (`/admin`)** with tabs:
| Tab | Capability |
|---|---|
| Projects | Create / edit / delete projects (title, category, description, cover image upload, gallery) |
| Gallery | Upload photos, tag with category (Education, JoyCation, Holi, etc.), delete |
| Events | Create / edit / delete (title, date, location, description, image, upcoming/past auto by date) |
| Blogs | Create / edit / delete (title, excerpt, body, cover image, author, date) |
| Volunteers | View submissions (name, email, phone, skills, resume link, submitted-at), mark reviewed, export |
| Messages | View contact-form messages (name, email, subject, message, received-at), mark read |
| Settings | Edit social URLs, WhatsApp number, Founder portfolio link → live-updates the public site |

**Public site changes to consume the DB:**
- Projects / Gallery / Events / Blog pages switch from `site-data.ts` to loading from Postgres (with TanStack Query).
- Volunteer form + Contact form `POST` into `volunteers` and `messages` tables.
- Footer + Contact + About read social links + WhatsApp + founder link from a `site_settings` row.

**File uploads:** Lovable Cloud Storage bucket `media` (public read, admin write). Existing imported images stay as-is; new uploads go to the bucket.

### Tech details (skip if not interested)
- Tables: `projects`, `gallery_images`, `events`, `blog_posts`, `volunteers`, `messages`, `site_settings`, `user_roles` (+ `app_role` enum, `has_role()` security-definer fn).
- RLS: public SELECT on content tables; INSERT-only public access on `volunteers` + `messages`; admin-only on everything else via `has_role(auth.uid(),'admin')`.
- Admin CRUD via `createServerFn` with `requireSupabaseAuth` + admin role check.
- Resume uploads: Storage bucket `resumes` (admin read only).

### What I need from you before Part B
1. **Admin email** (the one address that will log in).
2. Confirm: OK to enable Lovable Cloud? (free tier, managed inside Lovable, no external accounts).
3. Founder portfolio URL whenever you have it — until then the button is hidden on public site but editable in admin.

### Order of work
1. Ship Part A now (5 min, visible immediately).
2. Confirm answers above → enable Cloud → build admin in one pass → migrate public pages to DB → seed your current projects/gallery/events so nothing visually changes.

Sound good? Reply with your admin email + "go" and I'll start Part B right after pushing Part A.
