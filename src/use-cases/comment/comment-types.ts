import type { Comment } from "@prisma/client";

export interface CommentProps {
	id?: string;
	authorId?: string;
	postId?: string;
	description: string;
	removed?: boolean;
}

export interface CommentCreateResponse {
	comment: Comment;
}
