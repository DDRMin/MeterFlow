-- CreateEnum
CREATE TYPE "ReadingType" AS ENUM ('INCREASING', 'NORMAL');

-- AlterTable
ALTER TABLE "Meter" ADD COLUMN     "readingType" "ReadingType" NOT NULL DEFAULT 'INCREASING';
