import type { Post, PostHistory, Prisma } from "@prisma/client";

import type { PostsRepository } from "../posts-repository";

export class InMemoryPostsRepository implements PostsRepository {
	registerOnHirstory(data: PostHistory): Promise<PostHistory | null> {
		throw new Error("Method not implemented.");
	}
	

	createPost(data: Prisma.PostCreateInput): Promise<Post> {
		throw new Error("Method not implemented."); // TODO
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
