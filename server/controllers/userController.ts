import { Request, Response } from "express";
import User from "../models/user";
import { userSchema } from "../schema/userValidation";
import { userLoginSchema } from "../schema/userLogin";
import { z } from "zod";
import { findUser } from "../utils/findUser";
import { checkPassword, generateToken, hashPassword } from "../utils/auth";
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log("Checking if user exists");
    userSchema.parse({ username, email, password });
    //Function to check if the user already exists
    const userExists = await findUser(email);
    if (userExists) {
      return res
        .status(400)
        .send({ message: "User already exists", success: false });
    }
    //Function to hash the password
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .send({ message: "User Registered Successfully", success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return res
        .status(400)
        .send({ message: error.errors[0].message, success: false });
    } else {
      return res
        .status(500)
        .send({ message: "Internal Server Error", success: false });
    }
  }
};
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = userLoginSchema.parse(req.body);
    const user = await findUser(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    //Function to compare the password
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invalid Credentials", success: false });
    }

    //Then authtoken is generated and sent to the user
    if (user._id === undefined) throw new Error("User ID is undefined");
    // So that user._id is not undefined
    const token = generateToken(user?._id as string);
    // Remove the password and send the user
    return res.status(200).send({
      user: { email: user.email, username: user.username ,id:user._id},
      token,
      success: true,
    });
    // Then send the response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ message: error.errors[0].message, success: false });
    } else {
      return res
        .status(500)
        .send({ message: "Internal Server Error", success: false });
    }
  }
};
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (req?.userId !== id) {
      return res.status(401).send({ message: "Unauthorized", success: false });
    }
    const { username, email } = req.body;
    //Checking if its the same user or not
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    return res
      .status(200)
      .send({ message: "User Updated Successfully", success: true, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ message: error.errors[0].message, success: false });
    } else {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Internal Server Error", success: false });
    }
  }
};
export const deleteAccountController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (req?.userId !== id) {
      return res.status(401).send({ message: "Unauthorized", success: false });
    }
    const { password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invalid Credentials", success: false });
    }
    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "User Deleted Successfully", success: true });
  } catch (error) {}
};
