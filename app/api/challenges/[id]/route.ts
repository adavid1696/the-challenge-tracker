import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  console.log("HI");
  const { id } = await params;

  try {
    const deleteChallenge = await prisma.challenge.delete({
      where: {
        id
      },
    });
    return NextResponse.json(deleteChallenge, { status: 201 });
  } catch (e) {
    console.error("Error handling delete request", e);
    return new NextResponse("Internal Sever Eroor", { status: 500 });
  }
}
