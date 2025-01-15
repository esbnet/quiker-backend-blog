import type { FastifyReply, FastifyRequest } from "fastify";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAutenticateUseCase } from "@/use-cases/factories/user/make-authenticate-use-case";
import { z } from "zod";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, "A senha deve ter no mínimo 6 caracteres")
			.max(12, "A senha deve ter no máximo 12 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
				"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
			),	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	console.log(email, password)



	try {
		const authenticateUseCase = makeAutenticateUseCase();



		const { user } = await authenticateUseCase.execute({ email, password });

		const token = await reply.jwtSign(
			{ role: user.role },
			{ sign: { sub: user.id } },
		);

		const refreshToken = await reply.jwtSign(
			{ role: user.role },
			{ sign: { sub: user.id, expiresIn: "7d" } },
		);

		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({ token, user });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ error: error.message });
		}
		throw error; // TODO: fix me
	}
}
