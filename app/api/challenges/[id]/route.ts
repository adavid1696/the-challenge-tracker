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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  
  const body = await req.json();

  try {
    const updateChallenge = await prisma.challenge.update({
      where: { id },
      data: body
    });
    
    return NextResponse.json(updateChallenge, { status: 201 });
  } catch (e) {
    console.error("Error handling update request", e);
    return new NextResponse("Internal Sever Eroor", { status: 500 });
  }
}
