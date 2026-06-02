import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();

  const { notes, id } = data;sa
  console.log(notes)
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
    console.error("Error handling POST request.", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ date: string }> },
) {
  const { date } = await params;

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // with dates in db can only use gte, lt and so on.
  try {
    const daily = await prisma.dailyProgress.findMany({
      where: {
        createdAt: {
          gte: date,
          lt: tomorrow,
        },
      },
    });
    console.log(daily);
    if (daily.length === 0)
      return NextResponse.json(
        { message: "No progress logged for this day." },
        { status: 404 },
      );
    return NextResponse.json(daily, { status: 201 });
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Sever Eroor", { status: 500 });
  }
}
