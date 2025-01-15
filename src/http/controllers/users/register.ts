import type { FastifyReply, FastifyRequest } from "fastify";

import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make-register-use-case";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z
			.string()
			.min(3, "O nome deve ter no mínimo 3 caracteres")
			.max(100, "O nome deve ter no máximo 100 caracteres"),
		email: z.string().email("Informe um e-mail válido"),
		password: z
			.string()
			.min(6, "A senha deve ter no mínimo 6 caracteres")
			.max(12, "A senha deve ter no máximo 12 caracteres")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
				"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
			),
	});

	const { name, email, password } = registerBodySchema.parse(request.body);


	try {
		const registerUseCase = makeRegisterUseCase();

		await registerUseCase.execute({ name, email, password });
	} catch (error) {
		if (error instanceof ItemAlreadyExistsError) {
			return reply.status(409).send({status: 409, error: error.message });
		}
		throw error; // TODO: fix me
	}

	return reply.status(201).send({status: 201, message:'Usuário cadastrado com sucesso.'});
}
