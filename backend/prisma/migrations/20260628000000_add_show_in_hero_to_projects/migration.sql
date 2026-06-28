ALTER TABLE "projects" ADD COLUMN "show_in_hero" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "projects_show_in_hero_idx" ON "projects"("show_in_hero");
