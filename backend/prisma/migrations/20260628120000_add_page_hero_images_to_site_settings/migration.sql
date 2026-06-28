ALTER TABLE "site_settings"
ADD COLUMN "home_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "about_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "projects_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "events_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "gallery_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "blog_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "contact_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "volunteer_hero_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN "donate_hero_image" TEXT NOT NULL DEFAULT '';
