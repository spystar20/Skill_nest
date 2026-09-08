import ReviewModel from "../models/Ecommerce/ReviewModel.js";
import Course from "../models/Teacher/Course.js";
import Enrollment from "../models/Teacher/Enrollment.js";

export const getRecommendedCourses = async(userId)=>{
    const enrollments = await Enrollment.find({userId:userId}).populate("courseId", "category difficulty")
    const enrolledCourseIds = enrollments.map(course=>course.courseId._id
    )
    const categories = [
        ...new Set(enrollments.map(enrollments=>enrollments.courseId.category))
    ]
const difficulties = [
    ...new Set(enrollments.map(enrollment=>enrollment.courseId.difficulty))
]
const candidateCourses = await Course.find({status:"published",_id:{$nin:enrolledCourseIds},category:{$in:categories}}).populate("instructor","firstName lastName avatar")
const reviewStat = await ReviewModel.aggregate([
    {$lookup:{
        from:"enrollments",localField:"enrollmentId",foreignField:"_id",as:"enrollment"
    }},
    {
        $unwind:"$enrollment"
    },{
        $group:{
           _id:"$enrollment.courseId" ,averageRating:{$avg:"$rating"},reviewCount:{$sum:1}
        }
    }
])
const difficultyLevel = {
    "Beginner":1,
    "Intermediate":2,
    "Advanced":3
}
const scoredCourse = candidateCourses.map(course=>
{
    let score = 50
 const courseLevel = difficultyLevel[course.difficulty]
 const hasNextLevel = difficulties.some(
    difficulty=>courseLevel === difficultyLevel[difficulty]+1
 )
 if(hasNextLevel){
    score+=20
 }else if (difficulties.includes(course.difficulty)){
score +=10
 }
 const review = reviewStat.find(review=>review._id.toString()===course._id.toString())
 if(review){
if(review.averageRating >= 4.5){
score +=15
}else if (review.averageRating >= 4){
    score +=10
}else if (review.averageRating>=3.5){
    score +=5
}
if (review.reviewCount >= 20) {
    score += 10;
} else if (review.reviewCount >= 10) {
    score += 7;
} else if (review.reviewCount >= 5) {
    score += 4;
} else if (review.reviewCount >= 1) {
    score += 2;
}
}
const date = new Date()
const courseAge = (date-course.createdAt)/(1000*60*60*24)
if(courseAge<= 30){
    score +=5
}else if (courseAge <=90){
    score +=3
}
 return {course,score}
}

) 
scoredCourse.sort((a,b)=>b.score-a.score)
const slicedCourse = scoredCourse.slice(0,3)
const recommendedCourses  = slicedCourse.map(data=>data.course)
return recommendedCourses
}