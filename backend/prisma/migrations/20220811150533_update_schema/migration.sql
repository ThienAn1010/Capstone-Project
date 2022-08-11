/*
  Warnings:

  - You are about to drop the column `address` on the `PaperMaker` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `PaperMaker` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `PaperMaker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaperMaker" DROP COLUMN "address",
DROP COLUMN "lat",
DROP COLUMN "long";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "long" DOUBLE PRECISION;
