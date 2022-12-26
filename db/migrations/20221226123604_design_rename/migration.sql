/*
  Warnings:

  - The primary key for the `SimpleDesigns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SimpleDesigns` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id,name]` on the table `SimpleDesigns` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `SimpleDesigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SimpleDesigns" DROP CONSTRAINT "SimpleDesigns_pkey",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SimpleDesigns_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "SimpleDesigns_id_name_key" ON "SimpleDesigns"("id", "name");
