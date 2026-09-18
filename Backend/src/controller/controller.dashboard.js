import { asyncHandler } from '../middleware/asyncHandler.middleware.js'
import certficateModel from '../models/student/certficateModel.js'
import enrollmentModel from '../models/Teacher/Enrollment.js'
import { getRecentActivities } from '../services/activity.service.js'
import { getRecommendedCourses } from '../services/recommended.service.js'
import TeacherSchema from '../models/Teacher/TeacherSchema.js'
import Course from '../models/Teacher/Course.js'
import Enrollment from '../models/Teacher/Enrollment.js'
import mongoose from 'mongoose'
import ReviewModel from '../models/Ecommerce/ReviewModel.js'
import PaymentModel from '../models/Ecommerce/PaymentModel.js'
import activityModel from '../models/activityModel.js'
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
    },{
      $group:{
        _id:'$userId',count:{$sum:1}
      }
    },{
      $count:"count"
    }
  ])

  const studentCount = totalStudents[0]?.count || 0
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
const activities =await activityModel.aggregate([
  {
    $lookup:{
      from:"courses",foreignField:"_id",localField:'courseId',as:'courses'
    }
  },
  {
    $lookup:{
      from:'users',foreignField:'_id',localField:'userId',as:"user"
    }
  },
  {
    $match:{
      'courses.instructor':new mongoose.Types.ObjectId(userId)
    }
  },{
    $sort:{'createdAt':-1}
  },{
    $limit:5
  },
  {
$unwind:'$user'
  },
  {
    $project:{
      type:1,
      userName:{
        $concat:['$user.firstName',' ','$user.lastName']
      }
    }
  }
])
const performance = await Course.aggregate([
  {
    $lookup:{
      from:'enrollments',foreignField:'courseId',localField:'_id',as:'enrollment'
    }
  },{
    $lookup:{
      from:'coursereviews',foreignField:'enrollmentId',localField:'enrollment._id',as:"reviews"
    }
  }
])
const recentCourses = await Course.find({instructor:userId}).populate('instructor','firstName avatar').sort({createdAt:-1}).limit(3)
  return res.status(200).json({ activeCourses,studentCount ,averageReview,totalRevenue,activities,recentCourses,performance})
})