import httpStatusCode from "@/constants/httpStatusCode";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { headers } from "next/headers";
import VerifyToken from "@/utils/verifyToken";
import UserModel from '@/models/userModel';
import TaskModel from '@/models/taskModel'; // Ensure this path is correct


// Connect to the database
connect();
export async function GET(req: NextRequest) {

    try {
        
        const token = headers().get('authorization');

        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Authorization token missing',
            }, { status: httpStatusCode.UNAUTHORIZED });
        }

        const tokenUser = await VerifyToken(token);
        if (!tokenUser) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized or invalid user'
            }, { status: httpStatusCode.UNAUTHORIZED });
        }

        const user = await UserModel.findById(tokenUser._id).populate('taskList');
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: httpStatusCode.NOT_FOUND });
        }

        return NextResponse.json({
            success: true,
            message: "Viewed taskList",
            data: user.taskList
        }, { status: httpStatusCode.OK });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!!",
            error: error.message
        }, { status: httpStatusCode.INTERNAL_SERVER_ERROR });
    }
}
