import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import Course from "../models/Teacher/Course.js";
import Enrollment from "../models/Teacher/Enrollment.js";
import userModel from "../models/user.model.js";

export const Enroll = asyncHandler(async(req , res)=>{
    const userId = req.user.UserID
     const {courseId} = req.params 
     const course = await Course.findById(courseId)

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
     console.log(userId)
     // const user = await Enrollment.findOne({userId})
     // console.log(user)
     const courses = await Enrollment.find({userId:userId}).populate('courseId')
     if(!courses){
          return res.status(401).json({message:'no course purchased'})
     }
   
     return res.status(200).json({courses})
})