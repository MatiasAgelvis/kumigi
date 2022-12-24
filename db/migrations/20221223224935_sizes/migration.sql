/*
  Warnings:

  - You are about to drop the column `height` on the `SimpleDesigns` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `SimpleDesigns` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SimpleDesigns" DROP COLUMN "height",
DROP COLUMN "width",
ADD COLUMN     "heights" INTEGER[] DEFAULT ARRAY[400]::INTEGER[],
ADD COLUMN     "widths" INTEGER[] DEFAULT ARRAY[400]::INTEGER[];
