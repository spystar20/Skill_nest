import { asyncHandler } from "../middleware/asyncHandler.middleware";
import Course from "../models/Teacher/Course";
import Enrollment from "../models/Teacher/Enrollment";
import userModel from "../models/user.model";

export const Enroll = asyncHandler(async(req , res)=>{
    const userId = req.user.
     const {courseId} = req.params 
     const existingUser = await userModel.findById(userId)
         if(!existingUser){
        return res.status(401).json({message:'user not found'})
     }
     const course = await Course.findById(courseId)

      if(!course){
                return res.status(404).json({message:'course not found'})
     }
 
          const existingEnrollment = await Enrollment.findOne({userId:userId,courseId:courseId})

     if(existingEnrollment){
                return res.status(404).json({message:'user already enrolled'})

     }
    
     await Enrollment.create({
userId:userId,courseId:courseId
     })

     return res.status(201).json({message:'user enrolled scuccessfully'})
})