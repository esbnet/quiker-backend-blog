import type { PostCreateProps, PostCreateResponse } from "./post-types";

import type { PostsRepository } from "@/repositories/posts-repository";

export class CreatePostUseCase {
	constructor(private postsRepository: PostsRepository) {}

	async execute({
		title,
		description,
		authorId = "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		views = 0,
		likes = 0,
		dontLike = 0,
	}: PostCreateProps): Promise<PostCreateResponse> {
		const post = await this.postsRepository.createPost({
			title,
			description,
			authorId,
			views,
			likes,
			dontLike,
		});

		return { post };
	}
}
