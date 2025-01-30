-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "post_historys" DROP CONSTRAINT "post_historys_author_id_fkey";

-- DropForeignKey
ALTER TABLE "post_historys" DROP CONSTRAINT "post_historys_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_interactions" DROP CONSTRAINT "post_interactions_author_id_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_historys" ADD CONSTRAINT "post_historys_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_historys" ADD CONSTRAINT "post_historys_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_interactions" ADD CONSTRAINT "post_interactions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
