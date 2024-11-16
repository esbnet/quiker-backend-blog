import type { Post, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { PostCreateProps } from "@/use-cases/post/post-types";
import type { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
	findByAuthorId(id: string): Promise<Post | null> {
		throw new Error("Method not implemented.");
	}

	findById(id: string): Promise<Post | null> {
		throw new Error("Method not implemented.");
	}

	async delete(id: string) {
		const post = prisma.post.delete({
			where: {
				id,
			},
		});
	}

	async update(data: Prisma.PostCreateInput): Promise<Post> {
		const post = prisma.post.update({
			where: {
				id: data.id,
			},
			data,
		});

		return post.then((post) => {
			return post;
		});
	}

	async findByUserId(postId: string) {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		return post;
	}

	async createPost(data: PostCreateProps): Promise<Post> {
		await console.log("DADOS DO POST: ", data);
		const post = await prisma.post.create({
			data,
		});

		return post;
	}
}
