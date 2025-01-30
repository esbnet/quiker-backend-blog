import type { PostCreateResponse, PostProps } from "./post-types";

import type { PostsRepository } from "@/repositories/posts-repository";

export class CreatePostUseCase {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		authorId,
		title,
		content,
		imageUrl,
		views = 0,
		likes = 0,
		dislikes = 0,
	}: PostProps): Promise<PostCreateResponse> {
		const post = await this.postsRepository.createPost({
			authorId,
			title,
			content,
			imageUrl,
			views,
			likes,
			dislikes,
		});

		return { post };
	}
}
