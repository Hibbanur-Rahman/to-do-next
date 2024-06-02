import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import httpStatusCode from "@/constants/httpStatusCode";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "email or password is invalid"
            }, { status: httpStatusCode.BAD_REQUEST })
        }

        const user= await User.findOne({email});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"Email is not found"
            },{status:httpStatusCode.BAD_REQUEST})
        }

        const isCorrectPassword=await bcryptjs.compare(password,user.password);
        if(!isCorrectPassword){
            return NextResponse.json({
                success:false,
                message:"Password is not matched"
            },{status:httpStatusCode.BAD_REQUEST});
        }

        const JWT_SECRET=process.env.JWT_SECRET as string;
        const token =jwt.sign({user},JWT_SECRET,{expiresIn:'1d'});

        return NextResponse.json({
            success:true,
            message:"User is found",
            data:{user,token}
        },{status:httpStatusCode.OK})

    } catch (error: any) {
        console.log("Something went wrong!!", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        }, { status: httpStatusCode.BAD_REQUEST })
    }
}