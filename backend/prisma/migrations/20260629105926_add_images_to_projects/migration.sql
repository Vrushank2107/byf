-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "images" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "donationFunds" JSONB NOT NULL DEFAULT '[]';
