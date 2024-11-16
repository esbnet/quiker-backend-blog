/*
  Warnings:

  - Made the column `description` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "description" SET NOT NULL;
