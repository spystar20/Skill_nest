import express from "express"
const router = express.Router()
import { signup,Login,logout,me,verifyEmail,forgotPassword,resetPassword, resendVerificationEmail, googleLogin, updateProfile, becomeTeacher,updateTeacherProfile,    } from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import passport from "passport"
import uploads from "../middleware/multer.js"
import { getCoursebyId ,CreateCoursse, GetCourses, CreateSection, getSection, createLesson, getLesson, updateLesson, getLessonById, LessonPdfUpload, DeleteResource, CourseSetting, GetCoursesByTeacherId,} from "../controller/controller.course.js"

router.post('/sign',signup)
router.post("/login",Login)
router.post("/logout",logout)
router.get("/me",me)
router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword)
router.post("/resend-verification-email",resendVerificationEmail)
router.get("/google",passport.authenticate("google",{scope:["profile","email"],session:false}))
router.get('/google/callback',passport.authenticate("google",{session:false,failureRedirect:process.env.URL}),googleLogin)
router.post('/becomeTeacher',middleware,becomeTeacher)
router.put('/update/profile',middleware,updateProfile)
router.put('/update/Teacher-Profile',middleware,updateTeacherProfile)
router.post('/create-course',middleware,uploads.single("thumbnail"),CreateCoursse)
router.post('/:courseId/create-section',middleware,CreateSection)
router.get('/:courseId/get-section',middleware,getSection)
router.post('/course/:sectionId/create-lesson',middleware,createLesson)
router.get('/course/:sectionId/get-lesson',middleware,getLesson)
router.get('/course/:lessonId/lesson',middleware,getLessonById)
router.put('/course/lesson/:lessonId/resource-upload',uploads.array("resource"), middleware,LessonPdfUpload)
router.delete('/course/:lessonId/resource/:resourceId/delete',middleware,DeleteResource)
router.put('/course/lesson/:lessonId/edit',uploads.single('video'),middleware,updateLesson)
router.put('/course/lesson/:lessonId/setting',middleware,CourseSetting)
router.get('/:courseId/edit',middleware,getCoursebyId)
router.get('/dashboard/my-courses',middleware,GetCoursesByTeacherId)
router.get('/courses',GetCourses)
export default router

