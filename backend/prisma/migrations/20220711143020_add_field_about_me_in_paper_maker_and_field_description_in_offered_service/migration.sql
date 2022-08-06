/*
  Warnings:

  - Added the required column `description` to the `OfferedService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboutMe` to the `PaperMaker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `PaperMaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OfferedService" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaperMaker" ADD COLUMN     "aboutMe" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "picture" SET DEFAULT E'https://res.cloudinary.com/dybygufkr/image/upload/v1593000869/avatar_q2ysxd.jpg';
