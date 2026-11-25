/*
  Warnings:

  - Added the required column `description` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rules" ADD COLUMN     "description" TEXT NOT NULL;
