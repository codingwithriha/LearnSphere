require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import userModel  from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMailer from "../utils/sendMail";
//register User
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        const user: IRegistrationBody = {
            name,
            email,
            password,
        };

        // Create activation token
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;

        // Prepare data for email
        const data = { user: { name: user.name }, activationCode};

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

        try {
            await sendMailer({
                email: user.email,
                subject: "Activate your account",
                templete: "activation-mail.ejs",  // Ensure the template name is correct /activation-mail.ejs
                data,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account!`,
                activationToken: activationToken.token,
            });

        } catch (err: any) {
            return next(new ErrorHandler(err.message, 400));
        }

    }
    catch (error: any) {
        return next(new ErrorHandler(error.message,400))
    }
});

interface IActivationToken{
    token:string;
    activationCode: string;

}

export const createActivationToken = (user: any) : IActivationToken =>{
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign(
    { user, activationCode },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
    return {token, activationCode};
}