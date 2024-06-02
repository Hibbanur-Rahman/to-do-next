import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordExp:{
        type:Date,
    },
    verifyToken:{
        type:String
    },
    verifyExp:{
        type:Date
    }
})


const User = mongoose.models.users || mongoose.model('user', UserSchema);
export default User;