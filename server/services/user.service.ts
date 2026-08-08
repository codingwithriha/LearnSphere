import { Express } from "express";
import userModel from "../models/user.model";
import { Request, Response } from "express";
import { redis } from "../utils/redis";
import mongoose from "mongoose";

export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    return res.status(200).json({
      success: true,
      user,
    });
  }

  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await redis.set(id, JSON.stringify(user), "EX", 604800);

  return res.status(200).json({
    success: true,
    user,
  });
};

// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  res: Response,
  id: mongoose.Types.ObjectId,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};