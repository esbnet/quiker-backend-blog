import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePost } from "./delete";
import { getPostById } from "./get-by-id";
import { list } from "./list";
import { report } from "./report";
import { update } from "./update";
import { views } from "./view";

export async function postsRoutes(app: FastifyInstance) {
	app.post("/post/new", create);
	app.post("/post", getPostById);
	app.put("/post", update);
	app.delete("/post/delete", deletePost);
	app.patch("/post/view/:id", views);
	app.get("/posts", list);
	app.get("/report", report);
}
