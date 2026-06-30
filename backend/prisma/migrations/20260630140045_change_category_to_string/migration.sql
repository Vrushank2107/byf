/*
  Warnings:

  - Changed the type of `category` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- First, add a new temporary column
ALTER TABLE "projects" ADD COLUMN "category_new" TEXT;

-- Copy data from old enum column to new text column
UPDATE "projects" SET "category_new" = "category"::TEXT;

-- Make the new column NOT NULL (this should work since all rows now have values)
ALTER TABLE "projects" ALTER COLUMN "category_new" SET NOT NULL;

-- Drop the old column
ALTER TABLE "projects" DROP COLUMN "category";

-- Rename the new column to the original name
ALTER TABLE "projects" RENAME COLUMN "category_new" TO "category";

-- CreateIndex
CREATE INDEX "projects_category_idx" ON "projects"("category");
