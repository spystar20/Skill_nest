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
  return res.status(400).json({message:"undefined range"})
}
const learningActivity = enrolledCourses.flatMap(enrolledCourse=>enrolledCourse.learningActivity)
const streakData = []
for (let i = 0; i < 7; i++) {
const checkDate = new Date(today)
checkDate.setDate(today.getDate()-i)
const checkDateKey =`${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`
  const hasActivity = learningActivity.some(activity=>{
    const activityDate =  `${activity.date.getFullYear()}-${activity.date.getMonth()}-${activity.date.getDate()}`
    return activityDate === checkDateKey && activity.watchedTime>0
  })
streakData.push({
    date: checkDateKey,
    hasActivity
})
}
let currentStreak = 0
for(const day of streakData){
  if(day.hasActivity){
    currentStreak++
  }else{
    break
  }
}
const filteredActivity = learningActivity.filter(learningActivity=> {
 return learningActivity.date>=startDate && today>= learningActivity.date
})
console.log(filteredActivity,"af")
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
const days = range==="year"?12 : range === "week"? 7 : new Date(today.getFullYear(),today.getMonth()+1,0).getDate()
if(range==="year"){
  for (let i = 0; i < days; i++) {
const month = i
let watchedTime=0
filteredActivity.forEach(activity=>{
 const activityDate =new Date(activity.date)
  if(activityDate.getFullYear()===today.getFullYear()&&activityDate.getMonth()===month){
    watchedTime +=activity.watchedTime
  }
}
)   
graphData.push({
  label:new Date(today.getFullYear(),month,1).toLocaleString("en-US",{month:"short"}),watchedTime
}) 
  }
}
else{
for (let i = 0; i < days; i++) {
  const graphDate = new Date(startDate)
  graphDate.setDate(startDate.getDate()+i)
   const key  = `${graphDate.getFullYear()}-${graphDate.getMonth()}-${graphDate.getDate()}`
   graphData.push({label:range==="week"?graphDate.toLocaleString("en-US",{weekday:"short"}):graphDate.getDate(),watchedTime:activityMap[key]||0})
   
}
}
   const totalWatchedTime = Math.floor( enrolledCourses.flatMap(enrolledCourse=>enrolledCourse.learningActivity ).reduce((acc,curr)=>acc+curr.watchedTime,0)
) 
const certificates = await Promise.all( enrolledCourses.map(async enrolledCourse=>{
const existingCertificate = await certficateModel.findOne({enrollmentId:enrolledCourse._id})
return existingCertificate}))

const certificateCount = certificates.filter(certificate=>certificate!==null).length

    return res.status(200).json({enrolledCourses,completedCourses,totalWatchedTime,certificateCount,graphData,streakData,currentStreak})
})                