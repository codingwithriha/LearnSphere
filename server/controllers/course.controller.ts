import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse, getAllCoursesService } from "../services/course.service";
import cloudinary from "cloudinary";
import CourseModel from "../models/course.model";

// upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const mycloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        };
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//edit couse
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      console.log(data);
      const courseId = req.params.id;

      // ✅ Find the course first
      const existingCourse = await CourseModel.findById(courseId);
      if (!existingCourse) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // ✅ Handle Thumbnail Update
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        if (thumbnail.url && thumbnail.url.startsWith("data:")) {
          // 🔹 Delete old thumbnail if it exists
          if (existingCourse.thumbnail?.public_id) {
            await cloudinary.v2.uploader.destroy(
              existingCourse.thumbnail.public_id,
            );
          }

          // 🔹 Upload new thumbnail
          const uploadedImage = await cloudinary.v2.uploader.upload(
            data.thumbnail.url,
            { folder: "courses" },
          );

          // 🔹 Update thumbnail data
          data.thumbnail = {
            public_id: uploadedImage.public_id,
            url: uploadedImage.secure_url,
          };
        } else {
          console.log("Using existing thumbnail data:", data.thumbnail);
        }
      }

      // ✅ Update Course Data
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true },
      );

      // ✅ Return Response
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error: any) {
      console.error("Error updating course:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
