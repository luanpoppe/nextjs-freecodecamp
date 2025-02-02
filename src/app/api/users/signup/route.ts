import { prisma } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody: ", reqBody);
    const { username, email, password } = reqBody;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userCreated = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("userCreated: ", userCreated);

    return NextResponse.json({
      message: "User created succefully",
      success: true,
      userCreated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
