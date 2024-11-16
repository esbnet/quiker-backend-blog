import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";
import { list } from "./list";
import { searchPostById } from "./search-by-id";
import { update } from "./update";

export async function postsRoutes(app: FastifyInstance) {
	app.post("/post/new", create);
	app.get("/posts", list);
	app.post("/post", searchPostById);
	app.put("/post", update);
	app.delete("/post", deletePost);
}
