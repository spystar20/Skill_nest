import user from "../models/user.model.js"
import TeacherSchema from "../models/Teacher/TeacherSchema.js"
import Course from "../models/Teacher/Course.js"
import cloudinary from "../utils/cloudinary.js"
import fs from 'fs'
import Section from "../models/Teacher/Section.js"
import Lesson from "../models/Teacher/Lesson.js"
import { asyncHandler } from "../middleware/asyncHandler.middleware.js"
import { diff } from "util"


export const CreateCoursse = asyncHandler( async (req, res) => {
   
      const { title, desc, priceType, price, category, difficulty } = req.body
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
         title, desc, thumbnail, priceType, price, category, difficulty, instructor
      })
   
      return res.status(200).json({ message: "course is created", newCourse })
  
})

export const DeleteCourse =asyncHandler( async(req,res)=>{
   
const {courseId}= req.params
const course = await Course.findByIdAndDelete(courseId)

const section = await Section.find({course:courseId})
const sectionId = section.map(sec=>sec._id)
const lesson = await Lesson.deleteMany({section:{
   $in:sectionId
   
}})
await Section.deleteMany({course:courseId})
return res.status(200).json({message:'course deleted successfully'})

})
export const CreateSection =asyncHandler( async (req, res) => {
   
      const { courseId } = req.params
      const { title } = req.body
      const course = await Course.findByIdAndUpdate(courseId,{ $set:{
         updatedAt:Date.now()
      },$inc:{
         sectionCount:1
      }})
      if (!course) {
         return res.status(404).json({ message: "course not found" })
      }
      const sectionCount = await Section.countDocuments({ course: courseId })
      const sec = await Section.create({
         title, course: courseId, order: sectionCount + 1
      })
     
      await course.save()
      return res.status(200).json({ message: 'section ceated', sec })


})
export const UpdateSection = asyncHandler(async(req,res)=>{
  
     const {sectionId} = req.params
     const {title} = req.body
     const section = await Section.findById(sectionId)
     section.title= title
     await section.save()
     return res.status(200).json({message:'section updated'})
  
})
export const DeleteSection = asyncHandler(async(req,res)=>{
  
   const {sectionId} = req.params

   const section = await Section.findByIdAndDelete(sectionId)
  const lessonCount = await Lesson.countDocuments({section:sectionId})
   const lesson = await Lesson.deleteMany({section:sectionId})
   const course = await Course.findByIdAndUpdate(section.course,{
   $inc:{
      lessonCount:-lessonCount,sectionCount:-1
   }
   })
   return res.status(200).json({message:'section deleted'})

})
export const getSection =asyncHandler( async (req, res) => {
   
      const { courseId } = req.params
      const section = await Section.find({ course: courseId })
      return res.status(200).json({ message: 'section sent', section })

})
export const createLesson =asyncHandler( async (req, res) => {
   
      const { lesson } = req.body
      const { sectionId } = req.params
      const existingSection = await Section.findById(sectionId)
      const course = await Course.findByIdAndUpdate(existingSection.course,{ $set:{
         updatedAt:Date.now()
      },$inc:{
         lessonCount:1
      }})
      if (!existingSection) {
         return res.status(404).json({ message: "section not found" })
      }
      const lessons = await Lesson.countDocuments({ section: sectionId })
      const newLesson = await Lesson.create({
         lesson, section:existingSection, order: lessons + 1
      })
   
   return res.status(200).json({message:"lesson created ",newLesson})

})
export const deleteLesson = asyncHandler(async(req,res)=>{
  
      const {sectionId} = req.params
const lesson = await Lesson.findOneAndDelete({section:sectionId})  
const section =await Section.findById(sectionId)
const course = await Course.findByIdAndUpdate(section.course,{
   $inc:{
      lessonCount:-1
   }
})
if(!lesson){
   return res.status(404).json({message:'lesson not found'})
} 
return res.status(200).json({message:'lesson deleted successfully'})

})
export const getLesson =asyncHandler( async(req,res)=>{
   
      const {sectionId} = req.params
const lessons = await Lesson.find({section:sectionId})
return res.status(200).json({lessons})

})

export const getLessonById = asyncHandler( async(req,res)=>{
   
const {lessonId} = req.params
const lesson = await Lesson.findById(lessonId)

return res.status(200).json({lesson})
 
})
export const updateLesson =asyncHandler( async(req,res)=>{
   
const {lessonId} = req.params
const {description,title} = req.body
const lesson = await Lesson.findById(lessonId)

if(!lesson){
   return res.status(404).json({message:'lesson not found'})
}
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
 lesson.duration = Math.round(result.duration);


 fs.unlinkSync(req.file.path)

}   

await lesson.save()
const allLesson = await Lesson.find({section:lesson.section})
const totalDuration = Math.floor(allLesson.reduce((acc,curr)=>acc+(curr.duration || 0),0))
const section = await Section.findByIdAndUpdate(lesson.section,{duration:totalDuration})
const allSection = await Section.find({course:section.course})
const totalsectionDuration =Math.floor( allSection.reduce((acc,curr)=>acc+(curr.duration || 0),0))
 
const course = await Course.findByIdAndUpdate(section.course,{duration:totalsectionDuration})
return res.status(200).json({message:'lesson updated'})
 
})

// export const LessonPdfUpload =asyncHandler( async(req,res)=>{
   
// const {lessonId}= req.params
// const lesson = await Lesson.findById(lessonId)
// if(!lesson){
//    return res.status(404).json({message:'lesson not found'})
// }
// const titles = Array.isArray(req.body.title) ? req.body.title: [req.body.title]
// const resources = []

// for (let i = 0; i < req.files.length; i++) {
//    const result = await cloudinary.uploader.upload(req.files[i].path,{
//    resource_type:'raw',folder:'skillnest-courses/pdf'
// }) 

// resources.push({
//    title:titles[i],url:result.secure_url
// })
//    }
//    lesson.resources.push(...resources)

// await lesson.save()
// return res.status(200).json({message:"pdf uploaded",})
 
// })
export const ResourceUpload =asyncHandler( async(req,res)=>{
   console.log(req.files[0]);
const {lessonId}= req.params
const lesson = await Lesson.findById(lessonId)
if(!lesson){
   return res.status(404).json({message:'lesson not found'})
}
const titles = Array.isArray(req.body.title) ? req.body.title: [req.body.title]
const resources = []
if(req.body.type === 'pdf' || req.body.type === 'doc'){
for (let i = 0; i < req.files.length; i++) {
   const result = await cloudinary.uploader.upload(req.files[i].path,{
   resource_type:'raw',folder:'skillnest-courses/pdf'
}) 
console.log(result)
resources.push({
   title:titles[i],url:result.secure_url,type:req.body.type
})}
   }
   if(req.body.type !== 'pdf' && req.body.type !== 'doc'){
    
   resources.push({
            title:req.body.title,url:req.body.url,type:req.body.type
        
   })

   }
   lesson.resources.push(...resources)

await lesson.save()
return res.status(200).json({message:"pdf uploaded",})
 
})
export const DeleteResource = asyncHandler(async(req,res)=>{
   
const {lessonId,resourceId} = req.params

const lesson = await Lesson.findById(lessonId)
if(!lesson){
return res.status(404).json({message:"lesson not found"})
}
lesson.resources = lesson.resources.filter((i)=> i._id.toString() !== resourceId)

await lesson.save()
return res.status(200).json({message:'pdf deleted'})

})

export const CourseSetting =asyncHandler( async(req,res)=>{


      const {lessonId}= req.params
      const lesson = await Lesson.findById(lessonId)
      if(!lesson){
         return res.status(404).json({message:'lesson not found'})
      }
    
      lesson.isPreview = req.body.isPreview
      await lesson.save()
      return res.status(200).json({message:'settings updated',lesson})
  
})
export const getCoursebyId =asyncHandler( async (req, res) => {
  
      const { courseId } = req.params
      const course = await Course.findById(courseId).populate('instructor', "firstName lastName avatar Bio")
      if (!course) {
         return res.status(401).json({ message: 'course not found' })
      }
      const teacher = await TeacherSchema.findOne({user:course.instructor})
      if(!teacher){
                  return res.status(401).json({ message: 'teacher not found' })
      }

      return res.status(200).json({ course,teacher })
   
})
export const GetCourses = asyncHandler( async (req, res) => {
       const {search,category,difficulty,priceType,minPrice,maxPrice,sort}= req.query
       const filter = {status:'published'}
       const sortOptions={}
       if(search){
         filter.title = {
            $regex:search,
            $options:'i'
         }
       } 
       if(category){
         filter.category = {
            $regex:`^${category}$`,
            $options:'i'
         }
       }
       if(difficulty){
         filter.difficulty=difficulty
       }
       if(priceType){
         filter.priceType=priceType
       }
       if(minPrice && maxPrice){
         filter.price={
            $gte:Number(minPrice),
            $lte:Number(maxPrice)

         }
       }
       if(sort === 'newest'){
         sortOptions.createdAt=-1
       }
       if(sort==='oldest'){
         sortOptions.createdAt=1
       }
       if(sort==='price-low'){
         sortOptions.price = 1
       }
       if(sort==='price-high'){
         sortOptions.price=-1
       }
      const courses = await Course.find(filter).sort(sortOptions).populate("instructor", "firstName")
      const PriceRange = await Course.aggregate([
        { $match:{
            status:'published'
         }},
        { $group:{
            _id:null,minPrice:{
               $min:'$price'
            },maxPrice:{
               $max:"$price"           }
         }}
      ])
        

      return res.status(200).json({ message: "courses sent", courses,PriceRange })

})
export const GetCourseCategories = asyncHandler(async(req,res)=>{
   const category = await Course.distinct('category')
   console.log(category)
   return res.status(200).json({message:'categories sent',category})
})
export const GetCoursesByTeacherId = asyncHandler(async(req,res)=>{
  
      const instructor = req.user.UserID
      if(!instructor){
                  return res.status(404).json({message:'teacher not found'})

      }
      const courses = await Course.find({instructor})
      if(!courses){
         return res.status(404).json({message:'courses not found'})
      }
      return res.status(200).json({courses})
       

})
 export const UpdateCourseStatus =asyncHandler( async(req,res)=>{
   
const {courseId} = req.params
const {status} = req.body
const course =await Course.findById(courseId)
course.status = status
await course.save()
return res.status(200).json({message:'course status updated'})

 })