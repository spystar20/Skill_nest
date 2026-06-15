import user from "../models/user.model.js"
import TeacherSchema from "../models/Teacher/TeacherSchema.js"
import Course from "../models/Teacher/Course.js"
import cloudinary from "../utils/cloudinary.js"
import fs from 'fs'
import Section from "../models/Teacher/Section.js"
import Lesson from "../models/Teacher/Lesson.js"

export const CreateCoursse = async (req, res) => {
   try {

      const { title, desc, priceType, price, category, duration, difficulty } = req.body
      const instructor = req.user.UserID
      const existingUser = await user.findById(instructor)
      if (!existingUser) {
         return res.status(401).json({ message: "user not found" })
      }
      if (existingUser.role !== "teacher") {
         return res.status(401).json({ message: "only instructors can create course" })
      }
      if (!req.file) {
         return res.status(400).json({
            message: "Thumbnail is required"
         })
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
         folder: 'skillnest-courses', width: 1200,
         height: 675,
         crop: "fill"

      })
      fs.unlinkSync(req.file.path)

      const thumbnail = result.secure_url

      const newCourse = await Course.create({
         title, desc, thumbnail, priceType, price, category, duration, difficulty, instructor
      })

      return res.status(200).json({ message: "course is created", newCourse })
   } catch (err) {
      console.log(err)
   }
}
export const CreateSection = async (req, res) => {
   try {
      const { courseId } = req.params
      const { title } = req.body
      const course = await Course.findById(courseId)
      if (!course) {
         return res.status(404).json({ message: "course not found" })
      }
      const sectionCount = await Section.countDocuments({ course: courseId })
      const sec = await Section.create({
         title, course: courseId, order: sectionCount + 1
      })
      return res.status(200).json({ message: 'section ceated', sec })

   } catch (err) {
      console.log(err)
   }
}
export const getSection = async (req, res) => {
   try {
      const { courseId } = req.params
      const section = await Section.find({ course: courseId })
      return res.status(200).json({ message: 'section sent', section })
   } catch (err) {
      console.log(err)
   }
}
export const createLesson = async (req, res) => {
   try {
      const { lesson } = req.body
      const { sectionId } = req.params
      const existingSection = await Section.findById(sectionId)
      if (!existingSection) {
         return res.status(404).json({ message: "section not found" })
      }
      const lessons = await Lesson.countDocuments({ section: sectionId })
      const newLesson = await Lesson.create({
         lesson, section:existingSection, order: lessons + 1
      })
   return res.status(200).json({message:"lesson created ",newLesson})}
   catch (Err) {
      console.log(Err)
   }
}
export const getLesson = async(req,res)=>{
   try{
      const {sectionId} = req.params
const lessons = await Lesson.find({section:sectionId})
return res.status(200).json({lessons})
   }catch(Err){
      console.log(Err)
   }
}
export const getLessonById = async(req,res)=>{
   try{
const {lessonId} = req.params
const lesson = await Lesson.findById(lessonId)
console.log(lesson)
return res.status(200).json({lesson})
   }catch(Err){
      console.log(Err)
   }
}
export const updateLesson = async(req,res)=>{
   try{
const {lessonId} = req.params
const {description,title} = req.body
const lesson = await Lesson.findById(lessonId)
if(!lesson){
   return res.status(404).json({message:'lesson not found'})
}
    console.log("📤 uploading to cloudinary...")
    if(title !== lesson.title && title !==undefined){
      lesson.title = title
    }
if(description !== undefined){
lesson.description=description


}
if(req.file){
const result = await cloudinary.uploader.upload(req.file.path,{
   resource_type:'video',folder:'skillnest-courses/video'
})
const video =  result.secure_url
lesson.videoUrl=video
 lesson.duration = result.duration;
}   
fs.unlinkSync(req.file.path)

await lesson.save()
return res.status(200).json({message:'lesson updated',})
   }catch(err){
console.log(err)
return res.status(500).json({message:'errorrrr',})

   }
}
export const LessonPdfUpload = async(req,res)=>{
   try{
const {lessonId}= req.params
const lesson = await Lesson.findById(lessonId)
if(!lesson){
   return res.status(404).json({message:'lesson not found'})
}
const titles = Array.isArray(req.body.title) ? req.body.title: [req.body.title]
const resources = []

console.log(typeof req.body.title)
console.log(req.body.title)
for (let i = 0; i < req.files.length; i++) {
   const result = await cloudinary.uploader.upload(req.files[i].path,{
   resource_type:'raw',folder:'skillnest-courses/pdf'
}) 

resources.push({
   title:titles[i],url:result.secure_url
})
   }
   lesson.resources.push(...resources)

await lesson.save()
return res.status(200).json({message:"pdf uploaded",})
   }catch(err){
return res.status(500).json({message:'errorrrr',})

   }
}
export const DeleteResource = async(req,res)=>{
   try{
const {lessonId,resourceId} = req.params

const lesson = await Lesson.findById(lessonId)
if(!lesson){
return res.status(404).json({message:"lesson not found"})
}
lesson.resources = lesson.resources.filter((i)=> i._id.toString() !== resourceId)

await lesson.save()
return res.status(200).json({message:'pdf deleted'})
   }catch(err){
      console.log(err)
      return res.status(500).json({message:'errorrrr',})

   }
}
export const CourseSetting = async(req,res)=>{
   try{

      const {lessonId}= req.params
      const lesson = await Lesson.findById(lessonId)
      if(!lesson){
         return res.status(404).json({message:'lesson not found'})
      }
    
      lesson.isPreview = req.body.isPreview
      await lesson.save()
      return res.status(200).json({message:'settings updated',lesson})
   }catch(err){
      console.log(err)
   }
}
export const getCoursebyId = async (req, res) => {
   try {
      const { courseId } = req.params
      const course = await Course.findById(courseId).populate('instructor', "firstName lastName avatar")
      if (!course) {
         return res.status(401).json({ message: 'course not found' })
      }
      return res.status(200).json({ course })
   } catch (err) {
      console.log(err)
      return res.status(500).json({message:'errorrrr',})

   }
}
export const GetCourses = async (req, res) => {
   try {
      const courses = await Course.find().populate("instructor", "firstName")

      return res.status(200).json({ message: "courses sent", courses })
   } catch (err) {
      console.log(err)
   }
}
export const GetCoursesByTeacherId = async(req,res)=>{
   try{
      const instructor = req.user.UserID
      if(!instructor){
                  return res.status(404).json({message:'teacher not found'})

      }
      const courses = await Course.find({instructor})
      if(!courses){
         return res.status(404).json({message:'courses not found'})
      }
      return res.status(200).json({courses})
       
   }catch(err){
      console.log(err)
   }
}
 export const UpdateCourseStatus = async(req,res)=>{
   try{
const {courseId} = req.params
const {status} = req.body
const course =await Course.findById(courseId)
course.status = status
await course.save()
return res.status(200).json({message:'course status updated'})
   }catch(Err){
      console.log(Err)
   }
 }