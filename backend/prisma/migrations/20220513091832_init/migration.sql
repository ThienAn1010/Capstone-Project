-- CreateEnum
CREATE TYPE "Role" AS ENUM ('operator', 'paperRequester', 'paperMaker');

-- CreateEnum
CREATE TYPE "PaperRequesterStatus" AS ENUM ('available', 'busy');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('accept', 'deny');

-- CreateTable
CREATE TABLE "AuthProvider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerKey" TEXT NOT NULL,

    CONSTRAINT "AuthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'paperRequester',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperRequester" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PaperRequester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperMaker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "addresslat" DOUBLE PRECISION NOT NULL,
    "addresslon" DOUBLE PRECISION NOT NULL,
    "totalCases" INTEGER NOT NULL,
    "pastSuccessfulCases" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "status" "PaperRequesterStatus" NOT NULL,
    "avatar" TEXT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL,

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

    CONSTRAINT "OfferedService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "paperRequesterId" TEXT NOT NULL,
    "offeredServiceId" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "bookingId" TEXT NOT NULL,
    "actualPrice" DOUBLE PRECISION NOT NULL,
    "payAmount" DOUBLE PRECISION NOT NULL,
    "keep" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthProvider_userId_key" ON "AuthProvider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthProvider_providerKey_key" ON "AuthProvider"("providerKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_userId_key" ON "Operator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperRequester_userId_key" ON "PaperRequester"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperMaker_userId_key" ON "PaperMaker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_bookingId_key" ON "Deal"("bookingId");

-- AddForeignKey
ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operator" ADD CONSTRAINT "Operator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperRequester" ADD CONSTRAINT "PaperRequester_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperMaker" ADD CONSTRAINT "PaperMaker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedService" ADD CONSTRAINT "OfferedService_paperMakerId_fkey" FOREIGN KEY ("paperMakerId") REFERENCES "PaperMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferedService" ADD CONSTRAINT "OfferedService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_paperRequesterId_fkey" FOREIGN KEY ("paperRequesterId") REFERENCES "PaperRequester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_offeredServiceId_fkey" FOREIGN KEY ("offeredServiceId") REFERENCES "OfferedService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
