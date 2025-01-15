/*
  Warnings:

  - A unique constraint covering the columns `[author_id,post_id]` on the table `like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "like_id_author_id_post_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "like_author_id_post_id_key" ON "like"("author_id", "post_id");
