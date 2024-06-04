import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    tasks: {
        title: string;
        isDone: boolean;
        updatedAt: Date;
    }[];
}

const TaskSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    tasks: [
        {
            title: {
                type: String
            },
            isDone: {
                type: Boolean,
                default: false
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const Task = mongoose.models.tasks || mongoose.model('tasks', TaskSchema);
export default Task;
