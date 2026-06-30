/*
  Warnings:

  - You are about to drop the column `about_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `blog_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `contact_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `donate_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `events_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `gallery_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `hero_carousel_images` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `home_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `projects_hero_image` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `volunteer_hero_image` on the `site_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "site_settings" DROP COLUMN "about_hero_image",
DROP COLUMN "blog_hero_image",
DROP COLUMN "contact_hero_image",
DROP COLUMN "donate_hero_image",
DROP COLUMN "events_hero_image",
DROP COLUMN "gallery_hero_image",
DROP COLUMN "hero_carousel_images",
DROP COLUMN "home_hero_image",
DROP COLUMN "projects_hero_image",
DROP COLUMN "volunteer_hero_image";

-- CreateIndex
CREATE INDEX "projects_order_idx" ON "projects"("order");
