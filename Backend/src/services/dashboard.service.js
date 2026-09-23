import mongoose from "mongoose"
import PaymentModel from "../models/Ecommerce/PaymentModel.js"
import ReviewModel from "../models/Ecommerce/ReviewModel.js"

export const getTotalRevenue = async(userId)=>{
    const revenue = await PaymentModel.aggregate([
  {
    $lookup:{
      from:'courses',foreignField:'_id',localField:'courseId',as:"courses"
    }
  },{
    $match:{
      'courses.instructor':new mongoose.Types.ObjectId(userId)
    }
  },{
    $group:{
      _id:null,totalRevenue:{$sum:'$amount'}
    }
  }
])
const totalRevenue = revenue[0]?.totalRevenue || 0
return totalRevenue
}
export const getAverageRating = async(userId)=>{
     const review = await ReviewModel.aggregate([
{
  $lookup:{
    from:'enrollments',
    localField:'enrollmentId',
    foreignField:'_id',
    as:'enrollments'
  }
},{
  $lookup:{
    from:'courses',
    localField:'enrollments.courseId',
    foreignField:'_id',
    as:'courses'
  }
},{
  $match:{
    'courses.instructor':new mongoose.Types.ObjectId(userId)
  }
},{
  $group:{
    _id:null,averageRating:{$avg:'$rating'}
  }
}
 ])
const averageReview = review[0]?.averageRating || 0
return averageReview
}