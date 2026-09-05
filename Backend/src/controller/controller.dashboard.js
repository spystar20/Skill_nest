import {asyncHandler} from '../middleware/asyncHandler.middleware.js'
import certficateModel from '../models/student/certficateModel.js'
import Course from '../models/Teacher/Course.js'
import enrollmentModel from '../models/Teacher/Enrollment.js'
export const studentDashboardData = asyncHandler(async(req,res)=>{
    const user = req.user.UserID
    const existingEnrollment = await enrollmentModel.find({userId:user})
    if(existingEnrollment.length===0){
        return res.status(404).json({message:"enrolled user not found"})
    }
   const enrolledCourses = existingEnrollment
   const completedCourses = existingEnrollment.filter(enrolledCourse=>enrolledCourse.completed)
   const learningHours = Math.floor( enrolledCourses.map(enrolledCourse=>{
     const result = enrolledCourse.learningActivity.reduce((acc,curr)=>acc+curr.watchedTime,0)
   return result
 }
   ).reduce((acc,curr)=>acc+curr,0)
) 
const certificates = await Promise.all( enrolledCourses.map(async enrolledCourse=>{
const existingCertificate = await certficateModel.find({enrollmentId:enrolledCourse._id})
return existingCertificate
}))
console.log(certificates)
    return res.status(200).json({enrolledCourses,completedCourses,learningHours,certificates})
})