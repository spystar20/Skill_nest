import { asyncHandler } from '../middleware/asyncHandler.middleware.js'
import certficateModel from '../models/student/certficateModel.js'
import enrollmentModel from '../models/Teacher/Enrollment.js'
import { getRecentActivities } from '../services/activity.service.js'
import { getRecommendedCourses } from '../services/recommended.service.js'
import Course from '../models/Teacher/Course.js'
import Enrollment from '../models/Teacher/Enrollment.js'
import mongoose from 'mongoose'
import ReviewModel from '../models/Ecommerce/ReviewModel.js'
import PaymentModel from '../models/Ecommerce/PaymentModel.js'
import activityModel from '../models/activityModel.js'
import { getAverageProgressData, getAverageRating, getCoursePerformance, getProgressLearners, getTotalEnrollments, getTotalRevenue } from '../services/dashboard.service.js'
export const studentDashboardData = asyncHandler(async (req, res) => {
  const user = req.user.UserID
  const { range = "week" } = req.query
  const existingEnrollment = await enrollmentModel.find({ userId: user }).populate({ path: "courseId", populate: { path: "instructor", select: "avatar firstName" } })
  if (existingEnrollment.length === 0) {
    return res.status(404).json({ message: "enrolled user not found" })
  }
  const enrolledCourses = existingEnrollment
  const continueCourses = existingEnrollment.filter(enrolledCourse => enrolledCourse.status === "in-progress")
  const completedCourses = existingEnrollment.filter(enrolledCourse => enrolledCourse.completed)
  const today = new Date()
  const startDate = new Date(today)
  if (range === "week") {
    startDate.setDate(today.getDate() - 6)
  } else if (range === "month") {
    startDate.setDate(1)
  } else if (range === "year") {
    startDate.setMonth(0)
    startDate.setDate(1)
  } else {
    return res.status(400).json({ message: "undefined range" })
  }
  const learningActivity = enrolledCourses.flatMap(enrolledCourse => enrolledCourse.learningActivity)
  const streakData = []
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today)
    checkDate.setDate(today.getDate() - i)
    const checkDateKey = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`
    const hasActivity = learningActivity.some(activity => {
      const activityDate = `${activity.date.getFullYear()}-${activity.date.getMonth()}-${activity.date.getDate()}`
      return activityDate === checkDateKey && activity.watchedTime > 0
    })
    streakData.push({
      day: checkDate.toLocaleString("en-US", { weekday: "short" }),
      hasActivity
    })
  }
  let currentStreak = 0
  for (const day of streakData) {
    if (day.hasActivity) {
      currentStreak++
    } else {
      break
    }
  }
  const filteredActivity = learningActivity.filter(learningActivity => {
    return learningActivity.date >= startDate && today >= learningActivity.date
  })
  const activityMap = {}
  filteredActivity.forEach(activity => {
    const date = new Date(activity.date)
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    if (!activityMap[key]) {
      activityMap[key] = 0
    }
    activityMap[key] += activity.watchedTime
  })
  const graphData = []
  const days = range === "year" ? 12 : range === "week" ? 7 : new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  if (range === "year") {
    for (let i = 0; i < days; i++) {
      const month = i
      let watchedTime = 0
      filteredActivity.forEach(activity => {
        const activityDate = new Date(activity.date)
        if (activityDate.getFullYear() === today.getFullYear() && activityDate.getMonth() === month) {
          watchedTime += activity.watchedTime
        }
      }
      )
      graphData.push({
        label: new Date(today.getFullYear(), month, 1).toLocaleString("en-US", { month: "short" }), watchedTime
      })
    }
  }
  else {
    for (let i = 0; i < days; i++) {
      const graphDate = new Date(startDate)
      graphDate.setDate(startDate.getDate() + i)
      const key = `${graphDate.getFullYear()}-${graphDate.getMonth()}-${graphDate.getDate()}`
      graphData.push({ label: range === "week" ? graphDate.toLocaleString("en-US", { weekday: "short" }) : graphDate.getDate(), watchedTime: activityMap[key] || 0 })

    }
  }
  const totalWatchedTime = Math.floor(enrolledCourses.flatMap(enrolledCourse => enrolledCourse.learningActivity).reduce((acc, curr) => acc + curr.watchedTime, 0)
  )
  const certificates = await Promise.all(enrolledCourses.map(async enrolledCourse => {
    const existingCertificate = await certficateModel.findOne({ enrollmentId: enrolledCourse._id })
    return existingCertificate
  }))

  const certificateCount = certificates.filter(certificate => certificate !== null).length

  return res.status(200).json({ enrolledCourses, continueCourses, completedCourses, totalWatchedTime, certificateCount, graphData, streakData, currentStreak })
})

export const recommendedCourses = asyncHandler(async (req, res) => {
  const userId = req.user.UserID
  const courses = await getRecommendedCourses(userId)
  return res.status(200).json({ courses })
})

export const fetchRecentActivity = asyncHandler(async (req, res) => {
  const userId = req.user.UserID
  const activities = await getRecentActivities(userId)
  return res.status(200).json({ activities })
})
// teacher dashboard data
export const teacherDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.UserID

  const activeCourses = await Course.countDocuments({ instructor: userId, status: 'published' })
  const totalStudents = await Enrollment.aggregate([
    {
      $lookup: {
        from: 'courses',
        foreignField: '_id',
        localField: 'courseId',
        as: "courses"
      }
    }, {
      $match: {
        'courses.instructor': new mongoose.Types.ObjectId(userId)
      }
    }, {
      $group: {
        _id: '$userId', count: { $sum: 1 }
      }
    }, {
      $count: "count"
    }
  ])

  const studentCount = totalStudents[0]?.count || 0
  const [averageReview,totalRevenue,coursePerformance]= await Promise.all([getAverageRating(userId),getTotalRevenue(userId),getCoursePerformance(userId)])
  const activities = await activityModel.aggregate([
    {
      $lookup: {
        from: "courses", foreignField: "_id", localField: 'courseId', as: 'courses'
      }
    },
    {
      $lookup: {
        from: 'users', foreignField: '_id', localField: 'userId', as: "user"
      }
    },
    {
      $match: {
        'courses.instructor': new mongoose.Types.ObjectId(userId)
      }
    }, {
      $sort: { 'createdAt': -1 }
    }, {
      $limit: 5
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        type: 1,
        userName: {
          $concat: ['$user.firstName', ' ', '$user.lastName']
        },
        courseId: {
          id: { $arrayElemAt: ['$courses._id', 0] },
          title: { $arrayElemAt: ['$courses.title', 0] }
        },
        createdAt: 1
      }
    }
  ])
  
  const recentCourses = await Course.find({ instructor: userId }).populate('instructor', 'firstName avatar').sort({ createdAt: -1 }).limit(3)
  const draftCourses = await Course.countDocuments({ instructor: userId, status: 'draft' })

  return res.status(200).json({ activeCourses, studentCount, averageReview, totalRevenue, activities, recentCourses, coursePerformance, draftCourses, })
})


export const getTeacherAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user.UserID
  const { period } = req.query
  const [totalRevenue, averageRating,coursePerformance,inProgressLearners,enrollments,progressData] = await Promise.all([getTotalRevenue(userId), getAverageRating(userId),getCoursePerformance(userId),getProgressLearners(userId)],getTotalEnrollments(userId),getAverageProgressData(userId))
  const learnerCount = inProgressLearners[0]?.learners
  const totalEnrollments = enrollments[0]?.totalEnrollments || 0
    const totalCompletedLessons = progressData[0]?.totalCompletedLessons || 0
  const totalLessons = progressData[0]?.totalLessons || 0
  const courseCompletion = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0
  const recentReviews = await ReviewModel.aggregate([
    {
      $lookup: {
        from: 'enrollments', localField: 'enrollmentId', foreignField: '_id', as: 'enrollments'
      }
    }, {
      $lookup: {
        from: 'courses', localField: 'enrollments.courseId', foreignField: '_id', as: 'course'
      }
    },
    {
      $match: {
        'course.instructor': new mongoose.Types.ObjectId(userId)
      }
    }, {
      $lookup: {
        from: 'users', localField: 'enrollments.userId', foreignField: '_id', as: 'user'
      }
    }, {
      $unwind: '$course'
    }, {
      $unwind: '$user'
    },
    {
      $project: {
        title: '$course.title', userName: { $concat: ['$user.firstName', ' ', '$user.lastName'] }, rating: 1, review: 1, createdAt: 1
      }
    }, {
      $sort: {
        createdAt: -1
      }
    }, {
      $limit: 3
    }
  ])
  const startDate = new Date()
  const endDate = new Date()
  startDate.setDate(startDate.getDate() - period)
  const chartData = await PaymentModel.aggregate([
    {
      $lookup: {
        from: 'courses', foreignField: '_id', localField: 'courseId', as: "course"
      }
    }, {
      $match: {
        'course.instructor': new mongoose.Types.ObjectId(userId)
      }
    }, {
      $match: {
        createdAt: {
          $gte: startDate, $lte: endDate
        }
      }
    }, {
      $group: {
        _id: {
          $dateTrunc: {
            date: '$createdAt', unit: period <= 30 ? 'day' : period <= 90 ? 'week' : 'month'
          }
        }, totalRevenue: { $sum: '$amount' }
      }
    }
  ])
  // enrollment overview
  const overviewEnrollment = await Enrollment.aggregate([
    {
      $lookup: {
        from: 'courses', localField: 'courseId', foreignField: '_id', as: 'course'
      }
    }, {
      $unwind: '$course'
    }, {
      $match: {
        'course.instructor': new mongoose.Types.ObjectId(userId)
      }
    }, {
      $match: {
        createdAt: {
          $gte: startDate, $lte: endDate
        }
      }
    }, {
      $group: {
        _id: {
          $dateTrunc: {
            date: '$createdAt', unit: period <= 30 ? 'day' : period <= 90 ? 'week' : 'month'
          }
        }, enrollment: { $sum: 1 }
      }
    }, {
      $sort: {
        _id: 1
      }
    }
  ])

  // returning students 
  const studentGrowth = await Enrollment.aggregate([
    {
      $lookup: {
        from: 'courses', foreignField: '_id', localField: 'courseId', as: 'course'
      }
    },
    {
      $unwind: '$course'
    },
    {

      $match: {
        'course.instructor': new mongoose.Types.ObjectId(userId),
        'createdAt': {
          $gte: startDate, $lte: endDate
        }
      }
    },
    {
      $lookup: {
        from: 'enrollments', let: {
          studentId: '$userId', currentEnrollmentId: '$_id'
        }, pipeline: [{
 $match:{
  $expr:{
$and:[
  {
    $eq:['$userId','$$studentId'],
  },{
        $ne:['$_id','$$currentEnrollmentId']

  }
]
  }
 }
      }],
       as: 'previousEnrollment'
      }
    }, {
      $lookup: {
        from: 'courses', foreignField: '_id', localField: 'previousEnrollment.courseId', as: 'previousCourses'
      }
    },
    {
      $set: {
        previousTeacherCourses: {
          $filter: {
            input: "$previousCourses", as: 'course', cond: {
              $eq: [
                '$$course.instructor', new mongoose.Types.ObjectId(userId)
              ]
            }
          }
        }
      }
    },
    {
      $set: {
        studentType: {
          $cond: {
            if: { $gt: [{ $size: '$previousTeacherCourses' }, 0] },
            then: 'returning', else: 'new'
          }
        }
      }
    }, {
      $group: {
        _id: "$userId", studentType: { $first: '$studentType' }
      }
    }, {
      $group: {
        _id: '$studentType', count: { $sum: 1 }
      }
    }

  ])
  const newStudent= studentGrowth?.find(item=>item._id==='new')?.count || 0 
  const returningStudent = studentGrowth?.find(item=>item._id==='returning')?.count || 0 
  const studentEngagement= await Enrollment.aggregate([
  {
$lookup:{
  from:'courses',foreignField:'_id',localField:'courseId',as:'course'
}
  },{
    $match:{
      'course.instructor':new mongoose.Types.ObjectId(userId)
    }
  },{
$unwind:'$course'
  },
  {
$addFields:{
  progressLearner:{

  }
}
  },
  {
$addFields:{
 totalCompletedLesson:{ $size:{$ifNull:['$completedLessons',[]]}},totalLessons:'$course.lessonCount'}
  }
  ,{
    $addFields:{
      average:{
        $multiply:[{$divide:['$totalCompletedLesson','$totalLessons']},100]
      }
    }
  },
  {
    $group:{
      _id:null,totalLesson:{$sum:'$totalCompletedLesson'},averageCompletion:{$avg:'$average'}
    }
  }
])
const averageLearningTime = await Enrollment.aggregate([
  {
    $lookup:{
from:'courses',foreignField:'_id',localField:'courseId',as:'course'
    }
  },{
    $match:{
      'course.instructor':new mongoose.Types.ObjectId(userId)
    }
  },{
    $unwind:'$course'
  },
  {
$addFields:{
  totalWatchedTime:{
    $sum:'$learningActivity.watchedTime'
  }
}
  },
  {
  $group:{
    _id:'$userId',learningTime:{$sum:'$totalWatchedTime'}
  }
  },{
    $group:{
      _id:null,averageLearningTime:{$avg:'$learningTime'}
    }
  }
])
  return res.status(200).json({ totalRevenue, averageRating, recentReviews, totalEnrollments, courseCompletion, chartData, overviewEnrollment, newStudent,returningStudent ,coursePerformance,studentEngagement,learnerCount,averageLearningTime})
})
export const getTeacherStudents  = asyncHandler(async(req,res)=>{
  const userId = req.user.UserID
  const [enrollments,inProgressLearners,progressData]= await Promise.all([getTotalEnrollments(userId),getProgressLearners(userId),getAverageProgressData(userId)])
    const learnerCount = inProgressLearners[0]?.learners
  const totalEnrollments = enrollments[0]?.totalEnrollments || 0
    const totalCompletedLessons = progressData[0]?.totalCompletedLessons || 0
  const totalLessons = progressData[0]?.totalLessons || 0
    const courseCompletion = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0

  const completedEnrollments = await Enrollment.aggregate([
    {
    $lookup:{
      from:'courses',foreignField:'_id',localField:'courseId',as:'course'
    }
    },{
      $match:{
       $and:[ {'course.instructor':new mongoose.Types.ObjectId(userId)
       },
       {'completed':true}]
      }
    },{
      $group:{
        _id:null,totalCompleted:{$sum:1}
      }
    }
  ])
  const completedCourseCount = completedEnrollments[0]?.totalCompleted
  return res.status(200).json({learnerCount,totalEnrollments,completedCourseCount,courseCompletion})
})
