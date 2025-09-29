-- CreateTable
CREATE TABLE "public"."sigfox_callbacks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "seqNumber" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "lqi" TEXT NOT NULL,
    "linkQuality" TEXT NOT NULL,
    "operatorName" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "deviceTypeId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "radius" INTEGER,
    "locationSource" INTEGER,
    "locationStatus" INTEGER,

    CONSTRAINT "sigfox_callbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sigfox_duplicates" (
    "id" TEXT NOT NULL,
    "bsId" TEXT NOT NULL,
    "rssi" DOUBLE PRECISION NOT NULL,
    "nbRep" INTEGER NOT NULL,
    "callbackId" TEXT NOT NULL,

    CONSTRAINT "sigfox_duplicates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."sigfox_duplicates" ADD CONSTRAINT "sigfox_duplicates_callbackId_fkey" FOREIGN KEY ("callbackId") REFERENCES "public"."sigfox_callbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
