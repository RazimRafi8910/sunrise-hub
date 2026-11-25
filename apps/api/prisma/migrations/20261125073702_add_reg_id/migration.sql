/*
  Warnings:

  - A unique constraint covering the columns `[regIdNo]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "regIdNo" TEXT;

-- backfill existing rows (use real values, or something unique per row)
UPDATE "users" SET "regIdNo" = 'TEMP-' || "id"::text WHERE "regIdNo" IS NULL;

-- now enforce required
ALTER TABLE "users" ALTER COLUMN "regIdNo" SET NOT NULL;

-- CreateTable
CREATE TABLE "colleges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "college_id" TEXT NOT NULL,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_violations" (
    "reportId" UUID NOT NULL,
    "ruleId" UUID NOT NULL,

    CONSTRAINT "report_violations_pkey" PRIMARY KEY ("reportId","ruleId")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reporter_id" TEXT NOT NULL,
    "subject_user_id" TEXT NOT NULL,
    "subject_hint" TEXT,
    "note" TEXT,
    "observed_at" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "ai_reviewed" BOOLEAN NOT NULL DEFAULT false,
    "ai_review_note" TEXT,
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "resolution_note" TEXT,
    "delete_after" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportImages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "report_id" UUID NOT NULL,
    "storageKey" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "sizeByte" INTEGER NOT NULL,
    "capturedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ReportImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reportId" UUID NOT NULL,
    "reviewer_id" TEXT NOT NULL,
    "from_status" TEXT NOT NULL,
    "to_status" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportNotifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "report_id" UUID NOT NULL,
    "read_at" TIMESTAMP(3),
    "emailed_at" TIMESTAMP(3),
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colleges_college_id_key" ON "colleges"("college_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rules_name_key" ON "Rules"("name");

-- CreateIndex
CREATE INDEX "reports_reporter_id_idx" ON "reports"("reporter_id");

-- CreateIndex
CREATE INDEX "reports_subject_user_id_idx" ON "reports"("subject_user_id");

-- CreateIndex
CREATE INDEX "reports_reviewed_by_idx" ON "reports"("reviewed_by");

-- CreateIndex
CREATE UNIQUE INDEX "users_regIdNo_key" ON "users"("regIdNo");

-- AddForeignKey
ALTER TABLE "report_violations" ADD CONSTRAINT "report_violations_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_violations" ADD CONSTRAINT "report_violations_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_subject_user_id_fkey" FOREIGN KEY ("subject_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportImages" ADD CONSTRAINT "ReportImages_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_events" ADD CONSTRAINT "report_events_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportNotifications" ADD CONSTRAINT "ReportNotifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
