/*
  Warnings:

  - Added the required column `email_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_id" TEXT NOT NULL,
ADD COLUMN     "student_number" INTEGER NOT NULL;
