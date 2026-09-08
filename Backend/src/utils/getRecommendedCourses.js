import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import Course from "../models/Teacher/Course.js";
import Enrollment from "../models/Teacher/Enrollment.js";

export const getRecommendedCourses = asyncHandler(async(userId)=>{
    const enrollments = await Enrollment.find({userId:userId}).populate("courseId", "category difficulty")
    const enrolledCourseIds = enrollments.map(course=>course.courseId._id
    )
    const categories = [
        ...new Set(enrollments.map(enrollments=>enrollments.courseId.category))
    ]
const difficulties = [
    ...new Set(enrollments.map(enrollment=>enrollment.courseId.difficulty))
]
const candidateCourses = await Course.find({status:"published",_id:{$nin:enrolledCourseIds},category:{$in:categories}}).populate("instructor","firstName lastName avatar")
console.log(candidateCourses)
})