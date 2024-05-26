import { Schema, model, Document } from "mongoose";
import { IUser } from "./user"; 

enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  user: IUser["_id"];
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: TaskStatus,
      default: TaskStatus.Pending,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
export { ITask, TaskStatus };
