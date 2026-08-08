export const userOwnsCourse = (
  courses: Array<{ courseId?: string; _id?: string }> | undefined,
  courseId: string,
): boolean => {
  if (!courses?.length) return false;

  return courses.some((course) => {
    const ownedId = course.courseId ?? course._id;
    return ownedId?.toString() === courseId.toString();
  });
};
