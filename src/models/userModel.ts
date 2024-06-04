import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isVerify: boolean;
    forgotPasswordToken?: string;
    forgotPasswordExp?: Date;
    verifyToken?: string;
    verifyExp?: Date;
    taskList:mongoose.Schema.Types.ObjectId
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    taskList:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tasks'
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExp: {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyExp: {
        type: Date
    }
},{timestamps:true});

const User = mongoose.models.users || mongoose.model<IUser>('users', UserSchema);
export default User;
