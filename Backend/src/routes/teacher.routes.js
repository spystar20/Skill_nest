import express from "express"
export const router = express.Router()
import { becomeTeacher,updateTeacherProfile } from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import { GetCoursesByTeacherId } from "../controller/controller.course.js"
import { getTeacherAnalytics, teacherDashboardData } from "../controller/controller.dashboard.js"


router.post('/becomeTeacher',middleware,becomeTeacher)
router.put('/update/Teacher-Profile',middleware,updateTeacherProfile)
router.get('/dashboard/my-courses',middleware,GetCoursesByTeacherId)
router.get('/dashboard/data',middleware,teacherDashboardData)
router.get('/analytics',middleware,getTeacherAnalytics)
export default router