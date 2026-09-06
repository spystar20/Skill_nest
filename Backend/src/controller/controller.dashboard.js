import {asyncHandler} from '../middleware/asyncHandler.middleware.js'
import certficateModel from '../models/student/certficateModel.js'
import Course from '../models/Teacher/Course.js'
import enrollmentModel from '../models/Teacher/Enrollment.js'
export const studentDashboardData = asyncHandler(async(req,res)=>{
    const user = req.user.UserID
    const {range ="week"}= req.query
    const existingEnrollment = await enrollmentModel.find({userId:user}).populate("userId","firstName avatar")
    if(existingEnrollment.length===0){
        return res.status(404).json({message:"enrolled user not found"})
    }

   const enrolledCourses = existingEnrollment
   const completedCourses = existingEnrollment.filter(enrolledCourse=>enrolledCourse.completed)
const today = new Date()
const startDate = new Date(today)
if(range==="week"){
  startDate.setDate(today.getDate()-6)
}else if (range ==="month"){
  startDate.setDate(1)
}else if(range==="year"){
startDate.setMonth(0)
startDate.setDate(1)
}else{
  return res.status(404).json({message:"undefined range"})
}
const learningActivity = enrolledCourses.flatMap(enrolledCourse=>enrolledCourse.learningActivity)
const filteredActivity = learningActivity.filter(learningActivity=> {
 return learningActivity.date>=startDate && today>= learningActivity.date
})
const activityMap = {}
filteredActivity.forEach(activity=>{
const date = new Date(activity.date)
const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
if(!activityMap[key]){
  activityMap[key]=0
}
activityMap[key]+=activity.watchedTime
})
const graphData= []
const days = range === "week"? 7 : new Date(today.getFullYear(),today.getMonth()+1,0).getDate()
for (let i = 0; i < days; i++) {
  const date = new Date(startDate)
   const key  = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
   
}
console.log(activityMap)
   const learningHours = Math.floor( enrolledCourses.map(enrolledCourse=>{
     const result = enrolledCourse.learningActivity.reduce((acc,curr)=>acc+curr.watchedTime,0)
   return result
 }
   ).reduce((acc,curr)=>acc+curr,0)
) 
const certificates = await Promise.all( enrolledCourses.map(async enrolledCourse=>{
const existingCertificate = await certficateModel.findOne({enrollmentId:enrolledCourse._id})
return existingCertificate}))

const certificateCount = certificates.filter(certificate=>certificate!==null).length

    return res.status(200).json({enrolledCourses,completedCourses,learningHours,certificateCount,activityMap})
})                