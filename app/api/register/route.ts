import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("this is the data: ", data);

    // check to see if user already exist
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingUser)
      return NextResponse.json(
        { message: "User or Email already exist" },
        { status: 409 },
      );

    // if user can create account then i need to hash the password
    const hashPassword = bcrypt.hashSync(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error handling post request:", error);
    return new NextResponse("Internal Server Error:", { status: 500 });
  }
}
