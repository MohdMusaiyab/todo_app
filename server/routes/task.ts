import express from "express";
const taskRoutes = express.Router();
import {
  createTaskController,
  getUserTaskController,
  updateTaskController,
  deleteTaskController,
  updateStatusController,
  getUserSingleTaskController
} from "../controllers/taskController";
import isSignIn from "../middlewares/isSignIn";
taskRoutes.get("/", (req, res) => {
  res.send("Hello User");
});

taskRoutes.post("/create-task", isSignIn, createTaskController);
taskRoutes.get("/get-task/:id", isSignIn, getUserTaskController);
taskRoutes.put("/update-task/:id", isSignIn,updateTaskController);
taskRoutes.delete("/delete-task/:id", isSignIn, deleteTaskController);
taskRoutes.put("/update-status", isSignIn, updateStatusController);
taskRoutes.get("/get-single-task/:id", isSignIn, getUserSingleTaskController);

export default taskRoutes;
