import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import httpStatusCode from "@/constants/httpStatusCode";
import bcryptjs from 'bcryptjs';
import { SendEmail } from "@/utils/emailService";


connect();
export async function POST(req: NextRequest) {
    try {
        const reqBody= await req.json();
        const {username,email,password}=reqBody;

        if(!username || !email || !password){
            return NextResponse.json({
                success:false,
                message:"username or email or password is empty"
            },{status:httpStatusCode.BAD_REQUEST});
        }

        const isExistingUser=await User.findOne({email});
        if(isExistingUser){
            return NextResponse.json({
                success:false,
                message:"user is already exist with this email"
            })
        }

        const hashedPassword= await bcryptjs.hash(password,10);
        const NewUser=await User.create({
            username,
            email,
            password:hashedPassword
        }) 
        console.log(NewUser);

        if(!NewUser){
            return NextResponse.json({
                success:false,
                message:"Something went wrong while creating user",
            },{status:httpStatusCode.INTERNAL_SERVER_ERROR});
        }

        SendEmail({username,email,userId:NewUser._id,type:"VERIFY"})
        return NextResponse.json({
            success:true,
            message:"User is created",
            data:NewUser
        },{status:httpStatusCode.CREATED});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        }, { status: httpStatusCode.INTERNAL_SERVER_ERROR });
    }
}