import  { asyncHandler } from '../middleware/asyncHandler.middleware.js'
import enrollmentModel from '../models/Teacher/Enrollment.js'
import reviewModel from '../models/Ecommerce/ReviewModel.js'
export const addReview = asyncHandler(async(req,res)=>{
    const {enrollmentId} = req.params
     
    const userId = req.user.UserID
    const {rating,review}=req.body
    const existingEnrollment = await enrollmentModel.findById(enrollmentId)
    if(!existingEnrollment){
        return res.status(404).json({message:"user enrollment not found"})
    }
    if(existingEnrollment.userId.toString()!== userId.toString()){
        return res.status(403).json({message:"user not enrolled"})
    }
    const newReview = await reviewModel.findOne({enrollmentId:existingEnrollment._id})
    if(newReview){
        return res.status(403).json({message:"review already exists"})
    }
   if(!rating){
    return res.status(400).json({message:"rating is required"})
   }
   if(rating<1 || rating >5){
    return res.status(400).json({message:"rating must be between 1 and 5"})
   }
   await reviewModel.create({
    enrollmentId:existingEnrollment._id,rating:rating,review:review
   })
return res.status(200).json({message:"review added "})
})
export const updateReview = asyncHandler(async(req,res)=>{
    const {enrollmentId} = req.params
    const  userId= req.user.UserID
    const {updatedRating,updatedReview}=req.body
    const existingEnrollment = await enrollmentModel.findById(enrollmentId)
 if(!existingEnrollment){
        return res.status(404).json({message:"user enrollment not found"})
    }
    if(existingEnrollment.userId.toString()!== userId.toString()){
        return res.status(403).json({message:"user not enrolled"})
    }
    const existingReview = await reviewModel.findOne({enrollmentId:existingEnrollment._id})
    if(!existingReview){
        return res.status(404).json({message:"review not found"})
    }
    if(!updatedRating){
            return res.status(400).json({message:"rating is required"})

    }
    if(updatedRating>5 || updatedRating<1){
    return res.status(400).json({message:"rating must be between 1 and 5"})
    }
    existingReview.rating = updatedRating
  existingReview.review= updatedReview
    await existingReview.save()

    return res.status(200).json({message:"review updated"})

}) 
export const deleteReview = asyncHandler(async(req,res)=>{
    const userId = req.user.UserID
    const {enrollmentId} = req.params
    const existingEnrollment = await enrollmentModel.findById(enrollmentId)
    if(!existingEnrollment){
        return res.status(404).json({message:"enrollment not found"})
    }
    if(existingEnrollment.userId.toString()!==userId.toString()){
        return res.status(403).json({message:"unauthoarized user"})
    }
const existingReview = await reviewModel.findOneAndDelete({enrollmentId:existingEnrollment._id})
if(!existingReview){
    return res.status(404).json({message:"review not found"})
}
return res.status(200).json({message:"review deleted successfully"})
})
export const fetchReviewById = asyncHandler(async(req,res)=>{
    const {enrollmentId}= req.params
    const userId = req.user.UserID
    const existingEnrollment = await enrollmentModel.findById(enrollmentId)
    if(!existingEnrollment){
        return res.status(404).json({message:"enrollment not found"})
    }
    if(existingEnrollment.userId.toString()!== userId.toString()){
        return res.status(403).json({message:"user unauthorized"})
    }
    const review = await reviewModel.findOne({enrollmentId:enrollmentId})
    if(!review){
        return res.status(404).json({message:"reviews not found"})
    }
    return res.status(200).json({review})
})