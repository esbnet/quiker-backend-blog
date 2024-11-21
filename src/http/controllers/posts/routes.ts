import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";
import { getPostById } from "./get-by-id";
import { list } from "./list";
import { update } from "./update";
import { views } from "./view";

export async function postsRoutes(app: FastifyInstance) {
	app.post("/post/new", create);
	app.get("/posts", list);
	app.post("/post", getPostById);
	app.put("/post", update);
	app.delete("/post", deletePost);
	app.post("/post/view/:id", views);

}
