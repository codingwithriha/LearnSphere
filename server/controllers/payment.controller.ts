import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const sendStripePublishableKey = CatchAsyncError(
  async (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  },
);

export const createPaymentIntent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return next(new ErrorHandler("Invalid payment amount", 400));
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
        metadata: {
          company: "LearnSphere",
        },
      });

      res.status(201).json({
        success: true,
        client_secret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
