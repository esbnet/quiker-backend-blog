import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryPostsRepository } from "@/repositories/in-memory/in-memory-posts-repository";
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error";
import { CreatePostUseCase } from "./create";

let postsRepository: InMemoryPostsRepository;
let sut: CreatePostUseCase;

describe("Post Use Case", () => {
	beforeEach(() => {
		postsRepository = new InMemoryPostsRepository();
		sut = new CreatePostUseCase(postsRepository);
	});

	it("should be able to post", async () => {
		const PostsRepository = new CreatePostUseCase(
			new InMemoryPostsRepository(),
		);

		const { post } = await PostsRepository.execute({
			title: "Meu primeiro post",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		expect(post.id).toEqual(expect.any(String));
	});

	it("should not be able to post post with same email twice", async () => {
		const email = "any_email@gmail.com";

		await sut.execute({
			title: "Meu primeiro post",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
			authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
		});

		await expect(() =>
			sut.execute({
				title: "Meu primeiro post",
				content:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
				authorId: "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0",
			}),
		).rejects.toBeInstanceOf(ItemAlreadyExistsError);
	});
});
