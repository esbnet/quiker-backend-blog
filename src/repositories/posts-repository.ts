import type { Post, Prisma } from "@prisma/client";

import type { PostCreateProps } from "@/use-cases/post/post-types";

export interface PostsRepository {
	findById(id: string): Promise<Post | null>;
	findByAuthorId(id: string): Promise<Post | null>;
	createPost(data: PostCreateProps): Promise<Post>; //Prisma.PostCreateInput
	update(data: Prisma.PostUpdateInput): Promise<Post>;

	delete(id: string): Promise<void>;
}
