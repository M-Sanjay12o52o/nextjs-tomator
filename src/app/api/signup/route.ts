// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from "../../lib/db";
import jwt from "jsonwebtoken";
import connect from '../../../dbconfig/dbConfig';
import { NextResponse } from 'next/server';
const SECRET = "SECRET";

type Data = {
  username: string;
  email: string;
  password: string;
}

export async function POST(
  request: Request,
  response: Response,
) {
    console.log("handler called");
    await connect()
    const data: Data = await request.json(); 
    console.log("data: ", data);

    const { username, email, password } = data;
    const admin = await User.findOne({ username });
    if (admin) {
      // return new Response('Ok');
      return NextResponse.json({ email: " already exits" });
    } else {
        const obj = { username: username, email: email, password: password };
        const newAdmin = new User(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        return NextResponse.json({ 
          "message": 'Admin created successfully', "token: ": token
         })
    }    
}
