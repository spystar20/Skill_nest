import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import Course from "../models/Teacher/Course.js";
import Enrollment from "../models/Teacher/Enrollment.js";
import userModel from "../models/user.model.js";

export const Enroll = asyncHandler(async(req , res)=>{
    const userId = req.user.UserID
     const {courseId} = req.params 
     const course = await Course.findById(courseId)
await course.save()
      if(!course){
                return res.status(404).json({message:'course not found'})
     }
          const existingEnrollment = await Enrollment.findOne({userId:userId,courseId:courseId})

     if(existingEnrollment){
                return res.status(404).json({message:'user already enrolled'})
     }
    if (course.priceType !== "Free") {
    return res.status(403).json({
        message: "Purchase required"
    });
}
     await Enrollment.create({
userId:userId,courseId:courseId
     })

     return res.status(201).json({message:'user enrolled scuccessfully'})
})

export const EnrolledCourse =asyncHandler(async(req,res)=>{
     const userId=req.user.UserID
  
     const enrolledCourses = await Enrollment.find({userId:userId}).populate('courseId')
     
     if(!enrolledCourses){
          return res.status(401).json({message:'no course purchased'})
     }
     
 const enrolledCoursesProgress = enrolledCourses.map((enrolledCourse)=>{
  const totalLesson = enrolledCourse.courseId.lessonCount       
          const completedLessons = enrolledCourse.completedLessons.length
          const progress = totalLesson > 0 ? Math.round((completedLessons/totalLesson)*100):0
    return {...enrolledCourse.toObject(),progress}      
})
     return res.status(200).json({enrolledCoursesProgress})
})

export const getEnrolledCoursebyId =asyncHandler( async (req, res) => {
  
      const { enrollmentId } = req.params
      const enrollment = await Enrollment.findById(enrollmentId).populate('courseId')
      if (!enrollment) {
         return res.status(401).json({ message: 'enrolled user not found' })
      }
 const course = await Course.findById(enrollment.courseId)
 const totalLesson = course.lessonCount
 const lessonCompleted = enrollment.completedLessons.length 
 const progress = totalLesson > 0 ?  Math.round((lessonCompleted/totalLesson)*100):0
      return res.status(200).json({enrollment ,progress})
   
})
export const UpdateEnrolledProgress =asyncHandler(async(req,res)=>{
const {lessonId,enrollmentId}=req.params
const enrollmentData = await Enrollment.findById(enrollmentId)


if(!enrollmentData){
     return res.status(403).json({message:'user not enrolled'})
}
const course = await Course.findById(enrollmentData.courseId)
const alreadyCompleted = enrollmentData.completedLessons.some((id)=>id.toString()===lessonId)
if(alreadyCompleted){
          return res.status(400).json({message:'lesson already marked completed'})
}
enrollmentData.completedLessons.push(lessonId)
const lessonCompleted = enrollmentData.completedLessons.length

const TotalLesson = course.lessonCount

if(lessonCompleted === TotalLesson){
     enrollmentData.status='completed',
     enrollmentData.completed=true
}else{
     enrollmentData.status = 'in-progress'
}
const progress = TotalLesson > 0 ? Math.round((lessonCompleted/TotalLesson)*100):0
await enrollmentData.save()

return res.status(200).json({message:'lesson marked completed',enrollmentData,progress})
})