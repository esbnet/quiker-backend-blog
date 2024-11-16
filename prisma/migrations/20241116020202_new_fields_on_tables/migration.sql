/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `unlikes` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `PostHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostHistory" DROP CONSTRAINT "PostHistory_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostHistory" DROP CONSTRAINT "PostHistory_user_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "imageUrl",
DROP COLUMN "unlikes",
ADD COLUMN     "dont_like" DECIMAL(65,30),
ADD COLUMN     "image_url" TEXT;

-- DropTable
DROP TABLE "PostHistory";

-- CreateTable
CREATE TABLE "post_history" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_history" ADD CONSTRAINT "post_history_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_history" ADD CONSTRAINT "post_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
