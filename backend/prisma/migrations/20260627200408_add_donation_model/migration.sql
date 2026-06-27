-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded');

-- CreateTable
CREATE TABLE "donations" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pan" TEXT,
    "amount" INTEGER NOT NULL,
    "fund" TEXT NOT NULL,
    "status" "DonationStatus" NOT NULL DEFAULT 'Pending',
    "razorpay_order_id" TEXT,
    "razorpay_payment_id" TEXT,
    "razorpay_signature" TEXT,
    "receipt_number" TEXT,
    "receipt_generated" BOOLEAN NOT NULL DEFAULT false,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donations_receipt_number_key" ON "donations"("receipt_number");

-- CreateIndex
CREATE INDEX "donations_status_idx" ON "donations"("status");

-- CreateIndex
CREATE INDEX "donations_fund_idx" ON "donations"("fund");
