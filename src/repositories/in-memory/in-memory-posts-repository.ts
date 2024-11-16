import type { Post, Prisma } from "@prisma/client";

import type { PostCreateProps } from "@/use-cases/post/post-types";
import type { PostsRepository } from "../posts-repository";

export class InMemoryPostsRepository implements PostsRepository {
	createPost(data: PostCreateProps): Promise<Post> {
		throw new Error("Method not implemented.");
	}

	update(data: Prisma.PostUpdateInput): Promise<Post> {
		throw new Error("Method not implemented."); // TODO
	}

	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async findById(id: string) {
		const post = this.items.find((item) => item.id === id);
		if (!post) {
			return null;
		}
		return post;
	}

	public items: Post[] = [];

	async findByAuthorId(userId: string) {
		const post = this.items.find((item) => item.authorId === userId);

		if (!post) {
			return null;
		}
		return post;
	}
}
