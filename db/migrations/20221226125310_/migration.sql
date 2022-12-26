/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `SimpleDesigns` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SimpleDesigns_id_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "SimpleDesigns_userId_name_key" ON "SimpleDesigns"("userId", "name");
