import express from "express";
import { addAnwser, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAdminAllCourses, getAllCourse, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getAllCoursesService } from "../services/course.service";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse,
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse,
);

courseRouter.get(
  "/get-course/:id",
  getSingleCourse,
);

courseRouter.get(
  "/get-courses",
  getAllCourse,
);

courseRouter.get(
    "/get-course-content/:id",
    isAuthenticated,
    getCourseByUser
)
courseRouter.put(
    "/add-question",
    isAuthenticated,
    addQuestion
)
courseRouter.put(
    "/add-answer",
    isAuthenticated,
    addAnwser
)
courseRouter.put(
    "/add-review/:id",
    isAuthenticated,
    addReview
)
courseRouter.put(
    "/add-reply",
    isAuthenticated,
    authorizeRoles("admin"),
    addReplyToReview
)
courseRouter.get(
    "/get-admin-courses",
    isAuthenticated,
    authorizeRoles("admin"),
    getAdminAllCourses
)

courseRouter.delete(
    "/delete-course/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    deleteCourse
)

export default courseRouter;
