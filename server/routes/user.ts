import express from "express";
import {
  registerUserController,
  loginUserController,
  updateUserController,
  deleteAccountController,
} from "../controllers/userController";
import { isSignIn } from "../middlewares/isSignIn";

const userRoutes = express.Router();
userRoutes.get("/", (req, res) => {
  res.send("Hello User");
});

userRoutes.post("/register", registerUserController);
userRoutes.post("/login", loginUserController);
userRoutes.put("/update/:id", isSignIn, updateUserController);
userRoutes.delete("/delete/:id", isSignIn, deleteAccountController);
export default userRoutes;
