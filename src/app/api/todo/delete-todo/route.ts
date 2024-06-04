import httpStatusCode from "@/constants/httpStatusCode";
import VerifyToken from "@/utils/verifyToken";
import { headers } from "next/headers";
import { NextRequest ,NextResponse} from "next/server";
import UserModel from '@/models/userModel';
import TaskModel from '@/models/taskModel';
export async function POST(req:NextRequest){
    try{
        const reqBody= await req.json();
        const token=headers().get('authorization');
        if(!token){
            return NextResponse.json({
                success:false,
                message:"Unauthorized or Invalid token"
            },{status:httpStatusCode.UNAUTHORIZED})
        }
        const tokenUser=await VerifyToken(token);
        if(!tokenUser){ 
            return NextResponse.json({
                success:false,
                message:"Unauthorized or Invalid token"
            },{status:httpStatusCode.UNAUTHORIZED})
        }

        const {taskItemId}=reqBody;
        if(!taskItemId){
            return NextResponse.json({
                success:false,
                message:"taskItemId is invalid"
            },{status:httpStatusCode.BAD_REQUEST});
        }

        const user=await UserModel.findById(tokenUser._id);
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            },{status:httpStatusCode.NOT_FOUND});
        }

        const task=await TaskModel.findById(user.taskList);
        if(!task){
            return NextResponse.json({
                success:false,
                message:"task is not found"
            },{status:httpStatusCode.NOT_FOUND})
        }

        task.tasks=task.tasks.filter((item:any)=>item._id.toString()!==taskItemId);
        await task.save();

        return NextResponse.json({
            success:true,
            message:"taskItem is deleted",
            data:task
        },{status:httpStatusCode.OK})
       
    }catch(error){
        console.log("something went wrong",error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong!!"
        },{status:httpStatusCode.INTERNAL_SERVER_ERROR})
    }
}