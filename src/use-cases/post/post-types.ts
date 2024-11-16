import type { Post } from "@prisma/client";

export interface PostCreateProps {
	id?: string;
	title: string;
	description: string;
	authorId: string;
	imageUrl?: string;
	views?: number;
	likes?: number;
	dontLike?: number;
}

export interface PostUpdateProps {
	id?: string;
	title: string;
	description: string;
	imageUrl?: string;
}

export interface PostCreateResponse {
	post: Post;
}
