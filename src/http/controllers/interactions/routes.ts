import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { searchPostById } from "./search-by-id";
import { update } from "./update";
import { views } from "./view";

export async function postsRoutes(app: FastifyInstance) {
	app.post("/interaction/new", create);
	app.post("/interaction/:id", searchPostById);
	app.put("/interaction", update);
	app.post("/interaction/view/:id", views);
}
