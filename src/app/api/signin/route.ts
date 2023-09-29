import { connect } from "@/dbConfig/dbConfig";
import { User } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check if password is correct
    if (password !== user.password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Redirect to localhost:3000
    return NextResponse.redirect("http://localhost:3000");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
