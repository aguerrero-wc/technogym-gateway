-- CreateTable
CREATE TABLE "sigfox_callbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
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
    "latitude" REAL,
    "longitude" REAL,
    "radius" INTEGER,
    "locationSource" INTEGER,
    "locationStatus" INTEGER
);

-- CreateTable
CREATE TABLE "sigfox_duplicates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bsId" TEXT NOT NULL,
    "rssi" REAL NOT NULL,
    "nbRep" INTEGER NOT NULL,
    "callbackId" TEXT NOT NULL,
    CONSTRAINT "sigfox_duplicates_callbackId_fkey" FOREIGN KEY ("callbackId") REFERENCES "sigfox_callbacks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
