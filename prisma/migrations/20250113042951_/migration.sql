-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_author_id_fkey";

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
