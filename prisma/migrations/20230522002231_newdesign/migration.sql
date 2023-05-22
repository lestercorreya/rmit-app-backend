/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("email_id");

-- CreateTable
CREATE TABLE "Certificate" (
    "certificate_id" TEXT NOT NULL,
    "email_id" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("certificate_id")
);

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "User"("email_id") ON DELETE RESTRICT ON UPDATE CASCADE;
