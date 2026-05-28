import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

	const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

	const data = await req.json();
	const { notes, id } = data;
// verify if the challenge belongs to the user
	const challenge = await prisma.challenge.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!challenge) return new NextResponse("Not Found", { status: 404 });

	try {
		const progressUpdate = await prisma.dailyProgress.create({
      data: {
        dayNumber: 1,
        notes,
        completed: false,
        challenge: {
          connect: { id },
        },
      },
    });
		return NextResponse.json(progressUpdate, { status: 201 });

	} catch (error) {
		console.error("Error handling POST request.", error)
		return new NextResponse("Internal Server Error", {status: 500})
	}
	
}
//  model DailyProgress {
//   id          String    @id @default(cuid())
//   dayNumber   Int
//   notes       String
//   completed   Boolean
//   createdAt   DateTime  @default(now())
//   challengeId String
//   challenge   Challenge @relation(fields: [challengeId], references: [id])
// }
