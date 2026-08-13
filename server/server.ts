import {app} from "./app";
import connectDb from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

connectDb();

// Only call app.listen when running locally / on a persistent host.
// On Vercel, the platform invokes the exported `app` directly as a
// serverless function, so calling listen() there is unnecessary and
// the export below is what actually gets used.
if (process.env.VERCEL !== "1") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

export default app;