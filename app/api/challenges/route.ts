import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST( req : Request) {
	const {title, description, goal, startDate, endDate, userId } = await req.json();

	try {
		
		const newChallenge = await prisma.challenge.create({
			data: {
				title,
				description,
				goal,
				startDate,
				endDate,
				user: {
					connect: {id: userId}
				}
			}
		})

		return NextResponse.json(newChallenge, { status: 201 })
	} catch (e) {
		console.error("Error handling post request:", e);
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

export async function GET(req: Request) {
	try {
		const allChallenges = await prisma.user.findUnique({
			where: {
				id: 4544654
			},
			include: {
				challenges: true
			}
		})

		console.log(allChallenges)
	} catch (e) {
		console.error("Error handling post request:", e);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}