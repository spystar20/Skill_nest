import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import Course from "../models/Teacher/Course.js";
import Enrollment from "../models/Teacher/Enrollment.js";
import userModel from "../models/user.model.js";
import Lesson from '../models/Teacher/Lesson.js'
import certficateModel from "../models/student/certficateModel.js";
import { getCertificatePdf } from "../utils/certificateGenerator.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'
export const Enroll = asyncHandler(async (req, res) => {
     const userId = req.user.UserID
     const  {courseId}  = req.params
     const course = await Course.findById(courseId)
     if (!course) {
          return res.status(404).json({ message: 'course not found' })
     }
     const existingEnrollment = await Enrollment.findOne({ userId: userId, courseId: courseId })

     if (existingEnrollment) {
          return res.status(404).json({ message: 'user already enrolled' })
     }
     if (course.priceType !== "Free") {
          return res.status(403).json({
               message: "Purchase required"
          });
     }
     await Enrollment.create({
          userId: userId, courseId: courseId
     })

     return res.status(201).json({ message: 'user enrolled scuccessfully' })
})

export const EnrolledCourse = asyncHandler(async (req, res) => {
     const userId = req.user.UserID

     const enrolledCourses = await Enrollment.find({ userId: userId }).populate('courseId')

     if (!enrolledCourses) {
          return res.status(401).json({ message: 'no course purchased' })
     }
     const enrolledCoursesProgress = enrolledCourses.map((enrolledCourse) => {
          const totalLesson = enrolledCourse.courseId.lessonCount 
          const completedLessons = enrolledCourse.completedLessons.length
          const progress = totalLesson > 0 ? Math.round((completedLessons / totalLesson) * 100) : 0
          return { ...enrolledCourse.toObject(), progress }
     })
     return res.status(200).json({ enrolledCoursesProgress })
})

export const getEnrolledCoursebyId = asyncHandler(async (req, res) => {

     const { enrollmentId } = req.params
     const enrollment = await Enrollment.findById(enrollmentId).populate('courseId')
     if (!enrollment) {
          return res.status(401).json({ message: 'enrolled user not found' })
     }
     const course = await Course.findById(enrollment.courseId)
     const totalLesson = course.lessonCount
     const lessonCompleted = enrollment.completedLessons.length
     const progress = totalLesson > 0 ? Math.round((lessonCompleted / totalLesson) * 100) : 0
     return res.status(200).json({ enrollment, progress })

})
export const UpdateEnrolledProgress = asyncHandler(async (req, res) => {
     const { lessonId, enrollmentId } = req.params
     const enrollmentData = await Enrollment.findById(enrollmentId)
     if (!enrollmentData) {
          return res.status(403).json({ message: 'user not enrolled' })
     }
     const course = await Course.findById(enrollmentData.courseId)
     const lesson = await Lesson.findById(lessonId)
     if(!lesson){
          return res.status(404).json({message:'lesson not found'})
     }
     const alreadyCompleted = enrollmentData.completedLessons.some((id) => id.toString() === lessonId)
     if (alreadyCompleted) {
          return res.status(400).json({ message: 'lesson already marked completed' })
     }
     enrollmentData.completedLessons.push(lessonId)
     const lessonCompleted = enrollmentData.completedLessons.length

     const TotalLesson = course.lessonCount

     if (lessonCompleted === TotalLesson) {
          enrollmentData.status = 'completed',
               enrollmentData.completed = true
               if(!enrollmentData.completedAt){
                enrollmentData.completedAt=new Date()
               }
                    await enrollmentData.save()

           await   createCertificate(enrollmentId)
     } else {
          enrollmentData.status = 'in-progress'
               await enrollmentData.save()

     }
     const progress = TotalLesson > 0 ? Math.round((lessonCompleted / TotalLesson) * 100) : 0

     return res.status(200).json({ message: 'lesson marked completed', enrollmentData, progress })
})
//  creates certifcate after course is completed
const createCertificate =  async(enrollmentId)=>{

      const existingEnrollment = await Enrollment.findById(enrollmentId).populate('userId courseId')
      
     if(!existingEnrollment){
throw new Error('enrolled user not found')
     }
     const userCertificate = await certficateModel.findOne({enrollmentId})
     if(userCertificate){
          return userCertificate
     }
 const certificate =   await certficateModel.create({
     enrollmentId:enrollmentId,issueDate:existingEnrollment.completedAt
    })
       const issueDate = new Date(certificate.issueDate).toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'})

    const pdfPath= await getCertificatePdf({studentName: `${existingEnrollment.userId.firstName} ${existingEnrollment.userId.lastName}`.trim(),courseName:existingEnrollment.courseId.title,issueDate:issueDate})
  const uploadedPdf = await cloudinary.uploader.upload(pdfPath,{
     resource_type:'raw',folder:'skillnest/certificates'
  })
  
   certificate.pdfUrl = uploadedPdf.secure_url
   await certificate.save()
   fs.unlinkSync(pdfPath)
return certificate
}
export const getCertificate = asyncHandler(async(req,res)=>{
     const user = req.user.UserID
     const existingEnrollment = await Enrollment.find({userId:user})
     if(existingEnrollment.length===0){
          return res.status(404).json({message:'enrollment not found'})
     }
     const enrollmentIds = existingEnrollment.map(enrollment=>enrollment._id)
   const certificates = await certficateModel.find({enrollmentId:{$in:enrollmentIds}}).populate({path:'enrollmentId',populate:{path:'courseId'}})
     if(certificates.length ===0){
          return res.status(404).json({message:'no certificates issued'})
     }
     console.log(certificates)
     return res.status(200).json({certificates})
})
// update last watched lesson
export const LastLesson = asyncHandler(async(req,res)=>{
     const {lessonId,enrollmentId}= req.params
     const enrollment = await Enrollment.findById(enrollmentId)
     if(!enrollment){
          return res.status(404).json('enrolled user not found')
     }
    const lesson =  await Lesson.findById(lessonId)
    if(!lesson){
               return res.status(404).json('lesson user not found')
    }
    enrollment.lastLesson = lessonId
    await enrollment.save()
    return res.status(200).json('last lesson updated ')
})
export const UpdateWatchedTime = asyncHandler(async(req,res)=>{
     const {enrollmentId,lessonId }= req.params
     const {watchedTime} = req.body
     const enrollment = await Enrollment.findById(enrollmentId)
     if(!enrollment){
          return res.status(404).json({message:'enrollment not found'})
     }
     const existingProgress = enrollment.lessonProgress.find(item=>item.lessonId?.toString()===lessonId)
     if(existingProgress){
          existingProgress.watchedTime = watchedTime
     }else{
  enrollment.lessonProgress.push({lessonId,watchedTime})

     }
  await enrollment.save()
  return res.status(200).json({message:'lesson progress updated'})
})
