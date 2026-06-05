import express from "express"
const router = express.Router()
import { signup,Login,logout,me,verifyEmail,forgotPassword,resetPassword, resendVerificationEmail, googleLogin, updateProfile, becomeTeacher,updateTeacherProfile,    } from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import passport from "passport"
import uploads from "../middleware/multer.js"
import { getCoursebyId ,CreateCoursse, GetCourses, CreateSection, getSection,} from "../controller/controller.course.js"

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
router.get('/:courseId/edit',middleware,getCoursebyId)
router.get('/courses',GetCourses)
export default router

