/*
  Warnings:

  - You are about to drop the `Saved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Saved";

-- CreateTable
CREATE TABLE "Recent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Recent_id_key" ON "Recent"("id");
