-- CreateEnum
CREATE TYPE "EnumDeviceType" AS ENUM ('FAN', 'LIGHT', 'WATER');

-- CreateEnum
CREATE TYPE "EnumRegion" AS ENUM ('H1', 'H2', 'H3', 'H6');

-- CreateEnum
CREATE TYPE "EnumNotiType" AS ENUM ('REMINDER', 'SYSTEM', 'DEVICE', 'WEATHER');

-- CreateEnum
CREATE TYPE "EnumTask" AS ENUM ('WATERING', 'FANON', 'LIGHTON');

-- CreateEnum
CREATE TYPE "EnumReminderStatus" AS ENUM ('PENDING', 'DONE', 'CANCLED');

-- CreateEnum
CREATE TYPE "EnumEvent" AS ENUM ('MAINTAIN', 'LOGIN_FAILED');

-- CreateEnum
CREATE TYPE "EnumSystemSeverity" AS ENUM ('INFORM', 'WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "EnumDeviceStatus" AS ENUM ('AVAILABLE', 'USED', 'LOSS_CONNECTION', 'OVER_THRESHOLD');

-- CreateEnum
CREATE TYPE "EnumWeatherType" AS ENUM ('RAIN', 'SUNNY', 'CLOUDY', 'WINDING');

-- CreateEnum
CREATE TYPE "EnumWeatherSeverity" AS ENUM ('MILD', 'MODERATE', 'SEVERE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EnumDeviceType" NOT NULL,
    "threshold" INTEGER NOT NULL,
    "working" BOOLEAN NOT NULL,
    "status" "EnumDeviceStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" "EnumRegion" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "EnumNotiType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReminderNotification" (
    "id" TEXT NOT NULL,
    "task" "EnumTask" NOT NULL,
    "scheduleTime" TIMESTAMP(3) NOT NULL,
    "status" "EnumReminderStatus" NOT NULL,

    CONSTRAINT "ReminderNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemNotification" (
    "id" TEXT NOT NULL,
    "event" "EnumEvent" NOT NULL,
    "severity" "EnumSystemSeverity" NOT NULL,
    "expectTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceNotification" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "status" "EnumDeviceStatus" NOT NULL,

    CONSTRAINT "DeviceNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherForecast" (
    "id" TEXT NOT NULL,
    "weatherType" "EnumWeatherType" NOT NULL,
    "severity" "EnumWeatherSeverity" NOT NULL,
    "region" "EnumRegion" NOT NULL,
    "description" TEXT NOT NULL,
    "expectTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReminderNotification" ADD CONSTRAINT "ReminderNotification_id_fkey" FOREIGN KEY ("id") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemNotification" ADD CONSTRAINT "SystemNotification_id_fkey" FOREIGN KEY ("id") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceNotification" ADD CONSTRAINT "DeviceNotification_id_fkey" FOREIGN KEY ("id") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherForecast" ADD CONSTRAINT "WeatherForecast_id_fkey" FOREIGN KEY ("id") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
