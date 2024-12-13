import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { deleteUser } from "./delete";
import { list } from "./list";
import { profile } from "./profile";
import { refresh } from "./refresh";
import { register } from "./register";
import { searchUserById } from "./searchUserById";
import { update } from "./update";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/register", register);
	app.get("/users", list);
	app.post("/user", searchUserById);
	app.patch("/user", update);
	app.delete("/user", deleteUser);

	app.post("/sessions", authenticate);

	app.patch("/token/refresh", refresh);

	// authenticate only
	app.get("/me", { onRequest: [verifyJWT] }, profile);
}
