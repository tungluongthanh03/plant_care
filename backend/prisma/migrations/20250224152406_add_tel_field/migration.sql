/*
  Warnings:

  - Added the required column `expiresAt` to the `BlacklistedToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlacklistedToken" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tel" TEXT NOT NULL;
