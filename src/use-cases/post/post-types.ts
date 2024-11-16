import type { Post } from "@prisma/client";

export interface PostProps {
	id?: string;
	authorId?: string;
	title?: string;
	description?: string;
	imageUrl?: string;
	views?: number | null;
	likes?: number | null;
	dislikes?: number | null;
}

export interface PostHistoryProps {
	postId: string;
	authorId: string;
	title?: string;
	description?: string;
	imageUrl?: string;
	views?: number | null;
	likes?: number | null;
	dislikes?: number | null;
}

export interface PostCreateResponse {
	post: Post;
}
