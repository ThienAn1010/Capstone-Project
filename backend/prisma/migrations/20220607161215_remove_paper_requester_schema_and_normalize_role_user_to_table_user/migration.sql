/*
  Warnings:

  - The values [paperRequester] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paperRequesterId` on the `Booking` table. All the data in the column will be lost.
  - The `status` column on the `PaperMaker` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PaperRequester` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaperMakerStatus" AS ENUM ('available', 'busy');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'pending';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('operator', 'paperMaker', 'user');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_paperRequesterId_fkey";

-- DropForeignKey
ALTER TABLE "PaperRequester" DROP CONSTRAINT "PaperRequester_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paperRequesterId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaperMaker" DROP COLUMN "status",
ADD COLUMN     "status" "PaperMakerStatus" NOT NULL DEFAULT E'available';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT E'user';

-- DropTable
DROP TABLE "PaperRequester";

-- DropEnum
DROP TYPE "PaperRequesterStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
