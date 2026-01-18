import type { FastifyInstance } from "fastify";
import { commentsRoutes } from "../controllers/comments/routes";
import { likesRoutes } from "../controllers/likes/routes";
import { postsRoutes } from "../controllers/posts/routes";
import { usersRoutes } from "../controllers/users/routes";

export async function setupRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(postsRoutes);
  app.register(commentsRoutes);
  app.register(likesRoutes);
}
