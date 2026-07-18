import dotenv from "dotenv";
dotenv.config();
import { Response } from "express";
import { redis } from "./redis";
import { ObjectId } from "mongodb";
import { IUser } from "../models/user.model";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}


export const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
export const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

    // Options for cookies
  export  const accessTokenOptions: ITokenOptions = {
      expires: new Date(Date.now() + accessTokenExpire *60* 1000),
      maxAge: accessTokenExpire * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    };

  export  const refreshTokenOptions: ITokenOptions = {
      expires: new Date(Date.now() + refreshTokenExpire *24*60*60 * 1000),
      maxAge: refreshTokenExpire  *24*60*60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    };


export const sendToken = async (user: IUser, res: Response, statusCode: number) => {
  try {
    // Generate tokens
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // Upload session to Redis
    try {
      // Ensure _id is a string before using it as a Redis key
      const userId = (user._id as ObjectId).toString();
      const userData = JSON.stringify(user);
  

      await redis.set(userId, userData);
  
    } catch (error) {
      console.error("Redis set error:", error);
    }

    // Parse environment variables
    
    // Only set secure cookies in production mode
    if (process.env.NODE_ENV === 'production') {
      accessTokenOptions.secure = true;
    }

    // Set cookies
    res.cookie('access_token', accessToken, accessTokenOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenOptions);

    // Send the response with the access token
    res.status(statusCode).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error) {
    console.error("Error in sendToken:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};