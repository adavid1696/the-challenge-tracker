import { authOptions } from "@/lib/auth";
import { dateFormat } from "@/lib/dateFormat";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


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
        completed: true,
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
// api call to compare dates from date selected to the dates in the table
// 2026-05-27T23:56:10.519Z
export async function GET(req: NextRequest) {

  const { searchParams } = req.nextUrl;
  const data = searchParams.get('search')
  console.log(data)
  const date = new Date(data)
  
  try {
    const daily = prisma.dailyProgress.findMany({
      where: {
        createdAt: {
          contains: date
        }
      }
    })

    console.log(daily)
  } catch (e) {
    
  }
}