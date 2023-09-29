import ensureDbConnected from "../../../dbconfig/dbConfig";
// import { User } from "../../lib/db";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

try {
  ensureDbConnected();
} catch (error) {
  // Handle the error here
  console.log("error :", error);
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    console.log("user exists");

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    console.log(user);

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    // create a token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    const response = NextResponse.json({
      message: "Signin Successful",
      success: true
    })
    response.cookies.set("token", token, {
      httpOnly: true,
    })
    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
