import { Request,Response,NextFunction } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv"
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

dotenv.config()

// export const isAuthenticated=CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
//     const access_token=req.cookies.access_token;
//      if(!access_token)
//     { 
//         return next(new ErrorHandler("Please login to access this resourse",400));

//     }

//     const decoded=jwt.verify(access_token,process.env.ACCESS_TOKEN as string) as JwtPayload
//     if(!decoded)
//     {
//         return next(new ErrorHandler("access token is not valid",400));
//     } 

//     const user= await redis.get(decoded.id);
//     if(!user)
//     {
//         return next(new ErrorHandler("Please login to access this resourse",400));
//     }
//     req.user = JSON.parse(user);
//     next();
// })




//validate user role


export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    console.log("Cookies:", req.cookies);

    const access_token = req.cookies.access_token;
    console.log("Access Token:", access_token);

    if (!access_token) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    console.log("Decoded:", decoded);

    const user = await redis.get(decoded.id);

    console.log("Redis User:", user);

    if (!user) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }

    req.user = JSON.parse(user);
    next();
  }
);

export const authorizeRoles=(...role:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!role.includes(req.user?.role || ''))
        {
          
            return next(new ErrorHandler(`Role : ${req.user?.role} is not allowed to access this resourse`,403))
        }
        next();
    }
}