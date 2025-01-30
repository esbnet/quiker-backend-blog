/*
  Warnings:

  - You are about to drop the column `dislikesCount` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_author_id_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_history" DROP CONSTRAINT "post_history_author_id_fkey";

-- DropForeignKey
ALTER TABLE "post_history" DROP CONSTRAINT "post_history_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "dislikesCount",
DROP COLUMN "likesCount",
ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "like";

-- DropTable
DROP TABLE "post_history";

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_historys" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "views" INTEGER,
    "likes" INTEGER,
    "dislikes" INTEGER,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_historys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_author_id_post_id_key" ON "likes"("author_id", "post_id");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_historys" ADD CONSTRAINT "post_historys_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_historys" ADD CONSTRAINT "post_historys_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
