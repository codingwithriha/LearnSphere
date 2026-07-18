import { Express } from "express";
import userModel from "../models/user.model";
import { Request,Response } from "express";
import { redis } from "../utils/redis";


export const getUserById=async(id:string,res:Response)=>{
    const user = await userModel.findById(id);
    res.status(201).json({
        success: true,
        user,
    })
    }