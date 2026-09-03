import {asyncHandler} from '../middleware/asyncHandler.middleware.js'
import Course from '../models/Teacher/Course.js'
import enrollmentModel from '../models/Teacher/Enrollment.js'
export const studentDashboardData = asyncHandler(async(req,res)=>{
    const user = req.user.UserID
    const existingEnrollment = await enrollmentModel.find({userId:user})
    if(existingEnrollment.length===0){
        return res.status(404).json({message:"enrolled user not found"})
    }
    const data = await Promise.all(existingEnrollment.map(async enrollment=>{
 const enrolledCourse = await Course.findById(enrollment.courseId).populate("instructor, firstName avatar")
 const completedCourses = []
 if(enrollment.completed==="true"){
    completedCourses.push(enrollment)
 }
 if(!enrolledCourse){
    return Promise.reject("course not found")
 }
return {enrolledCourse,completedCourses}
    }))
    return res.status(200).json({data})
})