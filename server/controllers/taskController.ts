import { Request, Response } from "express";
import Task from "../models/task";
export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user:req.userId,
    });

    return res
      .status(201)
      .send({ message: "Task created successfully", task, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
export const getUserTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ user: id });
    if (tasks.length === 0) {
      return res
        .status(404)
        .send({ message: "No tasks found", success: false });
    }
    return res
      .status(200)
      .send({ message: "Tasks fetched successfully", tasks, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
export const updateTaskController = async (req: Request, res: Response) => {
  try {
    // The id of the task to be updated
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, status, dueDate } = req.body;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found", success: false });
    }
    if (task.user != userId) {
      return res
        .status(401)
        .send({ message: "Not authorized to update task", success: false });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true }
    );
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    // The id of the task to be deleted
    const { id } = req.params;
    // The id of the user
    const userId = req.userId;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found", success: false });
    }
    if (task.user != userId) {
      return res
        .status(401)
        .send({ message: "Not authorized to delete task", success: false });
    }
    await Task.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Task deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};

export const updateStatusController = async (req: Request, res: Response) => {
  try {
    // The id of the task to be updated

    const userId = req.userId;
    const { status, taskId } = req.body;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found", success: false });
    }
    if (task.user != userId) {
      return res
        .status(401)
        .send({ message: "Not authorized to update task", success: false });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: status },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Task status updated successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};

export const getUserSingleTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found", success: false });
    }
    return res
      .status(200)
      .send({ message: "Task fetched successfully", task, success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
