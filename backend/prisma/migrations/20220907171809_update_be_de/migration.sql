/*
  Warnings:

  - The values [pendingFinished] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('accept', 'deny', 'pendingConfirm', 'drop', 'success');
ALTER TABLE "Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'pendingConfirm';
COMMIT;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "isDroppedConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFinishedConfirmed" BOOLEAN NOT NULL DEFAULT false;
