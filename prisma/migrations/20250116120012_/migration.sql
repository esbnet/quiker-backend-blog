/*
  Warnings:

  - Made the column `views` on table `post_historys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `likes` on table `post_historys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dislikes` on table `post_historys` required. This step will fail if there are existing NULL values in that column.
  - Made the column `likes` on table `post_interactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dislikes` on table `post_interactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "post_historys" ALTER COLUMN "views" SET NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0,
ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET NOT NULL,
ALTER COLUMN "dislikes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "post_interactions" ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET NOT NULL,
ALTER COLUMN "dislikes" SET DEFAULT 0;
