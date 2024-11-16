import type { PostHistoryProps, PostProps } from "@/use-cases/post/post-types";
import type { Post, PostHistory } from "@prisma/client";

export interface PostsRepository {
	findById(id: string): Promise<Post | null>;
	findByAuthorId(id: string): Promise<Post | null>;
	createPost(data: PostProps): Promise<Post>;
	update(data: PostProps): Promise<Post>;
	registerOnHirstory(data: PostHistoryProps): Promise<PostHistory | null>;

	delete(id: string): Promise<void>;
}
