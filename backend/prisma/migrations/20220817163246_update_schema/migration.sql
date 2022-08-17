/*
  Warnings:

  - Added the required column `documents` to the `OfferedService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimate` to the `OfferedService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "droppedAt" TIMESTAMP(3),
ADD COLUMN     "finishedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "OfferedService" ADD COLUMN     "documents" TEXT NOT NULL,
ADD COLUMN     "estimate" TEXT NOT NULL;
