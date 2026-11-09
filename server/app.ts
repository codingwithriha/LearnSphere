require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.route';

// body parser
app.use(express.json({limit: '50mb'}));

//cookie-parser
app.use(cookieParser());

// CORS: allow configured frontend origins, plus localhost during development.
// ORIGIN supports a comma-separated list, e.g. https://learn-sphere-ui.vercel.app,http://localhost:3000
const allowedOrigins = (process.env.ORIGIN || "https://learn-sphere-ui.vercel.app")
    .split(',')
    .map((value) => value.trim().replace(/^\[|\]$/g, '').replace(/^['"]|['"]$/g, '').trim())
    .filter(Boolean);

if (process.env.NODE_ENV !== 'production' && !allowedOrigins.includes('http://localhost:3000')) {
    allowedOrigins.push('http://localhost:3000');
}

app.use(cors({
    origin: (origin, callback) => {
        // Requests without an Origin header (e.g. server-to-server or Postman) are allowed.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true,
}));

//routes
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter);
//testing root
app.get("/test" , (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        message: "Api is running"
    });
});

//unknown routes
app.all("*", (req:Request, res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

//error middleware
app.use(ErrorMiddleware);