import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
	const password = await bcryptjs.hash("Ab123456*", 6);
	const jhon = await prisma.user.upsert({
		where: { email: "alice@prisma.io" },
		update: {},
		create: {
			email: "esbnet@gmail.com",
			name: "Jhon Doe",
			passwordHash: password,
			role: "MEMBER",
			post: {
				create: [
					{
						title: "Check out Prisma with Next.js",
						content:
							"Como utilizar o Prisma com Next.js 14 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
						imageUrl:
							"https://unsplash.com/pt-br/fotografias/uma-pessoa-cortando-um-pedaco-de-plastico-com-uma-tesoura--2nux3-oZuc",
					},
					{
						title: "Zustenda como uma solução para gestão de estado",
						content:
							"Como utilizar o Prisma com Next.js 14 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
						imageUrl:
							"https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
					},
					{
						title: "IA está a revolucionar o mundo",
						content:
							"Como utilizar o Prisma com Next.js 14 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
						imageUrl:
							"https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
					},
				],
			},
		},
	});

	console.log({ jhon });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
