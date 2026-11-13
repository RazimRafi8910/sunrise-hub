/*
  Warnings:

  - You are about to drop the column `class_year` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `college_id_no` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collegeId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classYear` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collegeId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_college_id_no_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "class_year",
DROP COLUMN "college_id_no",
ADD COLUMN     "classYear" TEXT NOT NULL,
ADD COLUMN     "collegeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_collegeId_key" ON "users"("collegeId");
