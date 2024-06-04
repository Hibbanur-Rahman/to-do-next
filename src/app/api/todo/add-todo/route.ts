import httpStatusCode from "@/constants/httpStatusCode";
import VerifyToken from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import connect from "@/dbConfig/dbConfig";
import UserModel from '@/models/userModel';
import TaskModel from '@/models/taskModel';

//connect to database
connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const token = headers().get('authorization');
        
        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Authorization token missing'
            },{status:httpStatusCode.UNAUTHORIZED});
        }

        const tokenUser = await VerifyToken(token);
        if (!tokenUser) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized or invalid user'
            },{status:httpStatusCode.UNAUTHORIZED});
        }

        const { task } = reqBody;
        if (!task) {
            return NextResponse.json({
                success: false,
                message: 'Invalid task'
            },{status:httpStatusCode.BAD_REQUEST});
        }

        const user = await UserModel.findById(tokenUser._id);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            },{status:httpStatusCode.UNAUTHORIZED});
        }

        const newTask={
            title:task,
            isDone:false,
        }

        let taskDocument=await TaskModel.findOne({userId:user._id});
        if(taskDocument){
            taskDocument.tasks.push(newTask);
        }else{
            taskDocument=await TaskModel.create({
                userId:user._id,
                tasks:[newTask]
            })
        }
        await taskDocument.save();

        user.taskList=taskDocument._id;
        await user.save();
        return NextResponse.json({
            success:true,
            message:"Task added",
            data:taskDocument
        },{status:httpStatusCode.CREATED})


    } catch (error) {
        console.log("something went wrong", error);

    }
}