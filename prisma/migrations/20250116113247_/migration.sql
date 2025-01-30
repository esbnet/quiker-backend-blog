/*
  Warnings:

  - You are about to drop the column `description` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `post_history` table. All the data in the column will be lost.
  - Added the required column `content` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `post_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post_history" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL;
