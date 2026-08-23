import user from "../models/user.model.js"
import TeacherSchema from "../models/Teacher/TeacherSchema.js"
import Course from "../models/Teacher/Course.js"
import cloudinary from "../utils/cloudinary.js"
import fs from 'fs'
import Section from "../models/Teacher/Section.js"
import Lesson from "../models/Teacher/Lesson.js"
import { asyncHandler } from "../middleware/asyncHandler.middleware.js"
import { diff } from "util"
import Enrollment from "../models/Teacher/Enrollment.js"
import userModel from "../models/user.model.js"
import ReviewModel from "../models/Ecommerce/ReviewModel.js"


export const CreateCoursse = asyncHandler( async (req, res) => {
   
      const { title, desc, priceType, price, category, difficulty } = req.body
      const finalPrice = priceType === 'Free'? 0 : price
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
         title, desc, thumbnail, priceType, price:finalPrice, category, difficulty, instructor
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
// for not enrolled students
export const getCourseCurriculum=asyncHandler(async(req,res)=>{
   const {courseId}=req.params
   const section = await Section.find({course:courseId}).sort({order:1}).lean()
   if(!section.length ){
      return res.status(404).json({message:'section not found'})
   }
const SectionWithLesson =await Promise.all(section.map(async(section)=>{
const lessons = await Lesson.find({section:section._id}).sort({order:1})
return {
   ...section,lessons
}
}))
   console.log(section)
   console.log(SectionWithLesson)
   return res.status(200).json({SectionWithLesson})
})
// for enrolled students only
export const getEnrolledCurriculum = asyncHandler(async(req,res)=>{
   const userId = req.user.UserID
   const {enrollmentId}=req.params
const enrollment = await Enrollment.findOne({userId:userId,_id:enrollmentId})

if(!enrollment){
   return res.status(403).json({message:'please enroll in the course'})
} 
const courseId = enrollment.courseId
const course = await Course.findById(courseId)
const section = await Section.find({course:courseId}).sort({order:1}).lean()
if(!section.length){
   return res.status(404).json({message:'section not found'})
}
const curriculum = await Promise.all(section.map(async (section)=>{
   const lesson = await Lesson.find({section:section._id})
   return {...section,lesson}
}))
return res.status(200).json({curriculum})
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
const lessons = await Lesson.find({section:sectionId}).select('_id lesson order duration isPreview').sort({order:1})
return res.status(200).json({lessons})

})

export const getLessonById = asyncHandler( async(req,res)=>{
   const user = req.user.UserID
const {lessonId} = req.params
const lesson = await Lesson.findById(lessonId)
    if (!lesson) {
        return res.status(404).json({
            message: 'lesson not found'
        })
    }

  const section = await Section.findById(lesson.section)
      if (!section) {
        return res.status(404).json({
            message: 'section not found'
        })
    }
  const course = await Course.findById(section.course)
      if (!course) {
        return res.status(404).json({
            message: 'course not found'
        })
    }

    if(user.role === "teacher" && user.toString() === course.instructor.toString()){
   return res.status(200).json({lesson})

  }
     if (lesson.isPreview === true) {
        const previewLesson = {
            ...lesson.toObject(),
            resources: []
        }

        return res.status(200).json({
            lesson: previewLesson
        })
    }
  const enrollment = await Enrollment.findOne({userId:user,courseId:course._id})
  if(!enrollment){
   return res.status(403).json({message:'please enroll in this course'})
  }
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
      const userId = req.user?.UserID
      console.log(courseId)
      const course = await Course.findById(courseId).populate('instructor', "firstName lastName avatar Bio")
      console.log(course)
      if (!course) {
         return res.status(401).json({ message: 'course not found' })
      }
      const teacher = await TeacherSchema.findOne({user:course.instructor})
      if(!teacher){
                  return res.status(401).json({ message: 'teacher not found' })
      }
      const user = await userModel.findById(userId)
      if(!user){
          return res.status(200).json({course,teacher,enrollment:null})

      }
      const enrollments = await Enrollment.find({courseId:courseId}).select('_id userId')
      const enrollment = userId? enrollments.find(enrollment=>enrollment.userId.toString()===userId.toString()):null
      const enrollmentIds = enrollments.map(enrollment=>enrollment._id)
      const reviews = await ReviewModel.find({enrollmentId:{$in:enrollmentIds}}).populate({path:"enrollmentId",select:"userId"})
   const reviewStat = await ReviewModel.aggregate([
      {
        $lookup:{
         from:"enrollments",
         localField:"enrollmentId",
         foreignField:"_id",
         as:"enrollment"
        } 
      },
      {
         $unwind:"$enrollment"
      },{
         $group:{
            _id:"$enrollment.courseId",
            reviewCount:{$sum:1},
            averageRating:{$avg:"$rating"}
         }
      }
   ])
      return res.status(200).json({ course,teacher,reviews,enrollment ,reviewStat})
   
})
export const GetCourses = asyncHandler( async (req, res) => {
       const {search,category,difficulty,priceType,minPrice,maxPrice,sort}= req.query
       const filter = {status:'published'}
       const userId =req.user?.UserID
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
      const reviewStat = await ReviewModel.aggregate([
         {
            $lookup:{
               from:"enrollments",
               localField:"enrollmentId",
               foreignField:"_id",
               as:"enrollment"
            }
         },
         {
            $unwind:"$enrollment"
         },
         {
            $group:{
               _id:"$enrollment.courseId",
               reviewCount:{$sum:1},
               averageRating:{$avg:"$rating"}
            }
         }
      ])
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
      const enrollments = userId ? await Enrollment.find({userId:userId}) : []
     const courseWithStatus =  courses.map((course)=>{
      const enrollment = enrollments.find(enrollment=>enrollment.courseId.toString()===course._id.toString())
      const stats = reviewStat.find(stat=>stat._id.toString()===course._id.toString())
      return {
         ...course.toObject(),
         enrollment:enrollment?enrollment:null,
         reviewCount:stats?.reviewCount || 0,
         averageRating:stats?.averageRating || 0

      }
     })
      return res.status(200).json({ message: "courses sent", courses:courseWithStatus,PriceRange})

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