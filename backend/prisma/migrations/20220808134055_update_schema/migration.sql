-- CreateEnum
CREATE TYPE "Role" AS ENUM ('operator', 'paperMaker', 'user');

-- CreateEnum
CREATE TYPE "PaperMakerStatus" AS ENUM ('available', 'busy');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('accept', 'deny', 'pendingConfirm', 'pendingFinished', 'drop', 'success');

-- CreateTable
CREATE TABLE "AuthProvider" (
    "id" TEXT NOT NULL,
    "providerKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AuthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL DEFAULT E'https://res.cloudinary.com/dybygufkr/image/upload/v1593000869/avatar_q2ysxd.jpg',
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperMaker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "totalCases" INTEGER NOT NULL DEFAULT 0,
    "pastSuccessfulCases" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "PaperMakerStatus" NOT NULL DEFAULT E'available',
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "aboutMe" TEXT,
    "numberOfReviews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PaperMaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferedService" (
    "id" TEXT NOT NULL,
    "paperMakerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,

    CONSTRAINT "OfferedService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "offeredServiceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "payAmount" DOUBLE PRECISION NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT E'pendingConfirm',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthProvider_providerKey_key" ON "AuthProvider"("providerKey");

-- CreateIndex
CREATE UNIQUE INDEX "AuthProvider_userId_key" ON "AuthProvider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_userId_key" ON "Operator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperMaker_userId_key" ON "PaperMaker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- AddForeignKey
ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperMaker" ADD CONSTRAINT "PaperMaker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedService" ADD CONSTRAINT "OfferedService_paperMakerId_fkey" FOREIGN KEY ("paperMakerId") REFERENCES "PaperMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedService" ADD CONSTRAINT "OfferedService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_offeredServiceId_fkey" FOREIGN KEY ("offeredServiceId") REFERENCES "OfferedService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
