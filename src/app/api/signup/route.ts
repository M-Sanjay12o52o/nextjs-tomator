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
  
export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {username, email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({ error: "User already exists" }, {status: 400})
        }
        
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser);        

        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}