/*
  Warnings:

  - You are about to drop the column `addresslat` on the `PaperMaker` table. All the data in the column will be lost.
  - You are about to drop the column `addresslon` on the `PaperMaker` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `PaperMaker` table. All the data in the column will be lost.
  - The required column `id` was added to the `Deal` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `lat` to the `PaperMaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `PaperMaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Deal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OfferedService" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PaperMaker" DROP COLUMN "addresslat",
DROP COLUMN "addresslon",
DROP COLUMN "avatar",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "long" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "totalCases" SET DEFAULT 0,
ALTER COLUMN "pastSuccessfulCases" SET DEFAULT 0,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT E'available',
ALTER COLUMN "isConfirmed" SET DEFAULT false;
