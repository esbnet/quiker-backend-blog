/*
  Warnings:

  - Made the column `views` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "views" SET NOT NULL;
