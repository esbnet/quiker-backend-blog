import type { PostProps } from "@/use-cases/post/post-types";
import type { Post, PostHistory } from "@prisma/client";


import { prisma } from "@/lib/prisma";
import type { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {
	
 async createPost(data: PostProps): Promise<Post> {
     const post = await prisma.post.create({
         data
     });

     return post;
 }

	async registerOnHirstory(data: PostHistory): Promise<PostHistory> {
		const postToHistory = {
			id: data.id,
			postId: data.postId,
			authorId: data.authorId,
			title: data.title,
			content: data.content,
			imageUrl: data.imageUrl,
			views: data.views,
			likes: data.likes,
			dislikes: data.dislikes,
		};

		const historyPost = await prisma.postHistory.create({
			data: postToHistory,
		});

		return historyPost;
	}

	findByAuthorId(id: string): Promise<Post | null> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string): Promise<Post | null> {
		const post = await prisma.post.findUnique({
			where: {
				id,
			},
		});

		return post;
	}

	async delete(id: string) {
		await prisma.post.delete({
			where: {
				id,
			},
		});
	}

	async update(data: PostProps) {
		const post = await prisma.post.update({
			where: {
				id: data.id,
			},
			data
		});

		return post;
	}

	async findByUserId(postId: string) {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		return post;
	}
}
