import mongoose from "mongoose"
import PaymentModel from "../models/Ecommerce/PaymentModel.js"
import ReviewModel from "../models/Ecommerce/ReviewModel.js"
import Course from "../models/Teacher/Course.js"

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
export const getCoursePerformance = async(userId)=>{
  const coursePerformance = await Course.aggregate([
    {
      $match: {
        'instructor': new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: 'enrollments', foreignField: 'courseId', localField: '_id', as: 'enrollment'
      }
    },
    {$lookup:{
      from:'paymentdatas',foreignField:'courseId',localField:'_id',as:'payment'
    }},
    {
      $lookup: {
        from: 'coursereviews', foreignField: 'enrollmentId', localField: 'enrollment._id', as: "reviews"
      }
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' }
      }
    }, {
      $addFields: {
        studentIds: {
          $map: {
            input: { $ifNull: ["$enrollment", []] }, as: 'student', in: '$$student.userId'
          }
        }
      }
    }, {
      $addFields: {
        studentIds: {
          $setUnion: ['$studentIds', []]
        }
      }
    }, {
      $set: {
        studentCount: { $size: '$studentIds' }
      }
    },
    {
      $set:{
        completionRates:{
          $map:{
            input:{$ifNull:['$enrollment',[]]},
            as:'student',in:{
              $cond:[{$gt:['$lessonCount',0]  },
            {
              $multiply:[{
$divide:[{
  $size:{$ifNull:['$$student.completedLessons',0]}
},'$lessonCount']
              },100]
            }
            ,0]
            }
          }
        }
      }
    },
    {
      $set:{completion:{$avg:'$completionRates'}}
    }
    , {
      $project: {
        title: 1,
        studentCount: 1, averageRating: 1,totalRevenue:{$sum:'$payment.amount'},completion:1
      }
    }, {
      $sort: {
        studentCount: -1
      }
    }, {
      $limit: 4
    }
  ])
  return coursePerformance
}