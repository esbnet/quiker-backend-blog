import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";
import { CreatePostUseCase } from "./create";

let postsRepository: InMemoryPostsRepository;
let sut: CreatePostUseCase;

describe("Register Use Case", () => {
	beforeEach(() => {
		postsRepository = new InMemoryPostsRepository();
		sut = new CreatePostUseCase(postsRepository);
	});

	it("should be able to register", async () => {
		const PostsRepository = new CreatePostUseCase(
			new InMemoryPostsRepository(),
		);

		const { post } = await PostsRepository.execute({
			title: "Meu primeiro post",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		expect(post.id).toEqual(expect.any(String));
	});
});
