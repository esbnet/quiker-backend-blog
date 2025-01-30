import { prisma } from "@/lib/prisma";
import type { CommentProps } from "@/use-cases/comment/comment-types";
import type { Comment } from "@prisma/client";
import type { CommentsRepository } from "../comments-repository";

export class PrismaCommentsRepository implements CommentsRepository {
	async createComment(data: CommentProps): Promise<Comment> {
		const comment = await prisma.comment.create({
			data,
		});

		return comment;
	}

	findByAuthorId(id: string): Promise<Comment | null> {
		throw new Error("Method not implemented.");
	}

	findById(id: string): Promise<Comment | null> {
		throw new Error("Method not implemented.");
	}

	async delete(id: string) {
		await prisma.comment.delete({
			where: {
				id,
			},
		});
	}

	async update(data: CommentProps): Promise<Comment> {
		const comment = await prisma.comment.update({
			where: {
				id: data.id,
				content: data.content,
				removed: data.removed,
			},
			data,
		});

		return comment;
	}

	async findByUserId(commentId: string) {
		const comment = await prisma.comment.findUnique({
			where: {
				id: commentId,
			},
		});

		return comment;
	}
}
