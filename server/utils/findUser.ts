import User from "../models/user";
import { z } from "zod";
import { Request, Response } from "express";
export const findUser = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};
