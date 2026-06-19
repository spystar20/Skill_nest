import express from "express"
export const router = express.Router()
import { becomeTeacher,updateTeacherProfile } from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import { GetCoursesByTeacherId } from "../controller/controller.course.js"


router.post('/becomeTeacher',middleware,becomeTeacher)
router.put('/update/Teacher-Profile',middleware,updateTeacherProfile)
router.get('/dashboard/my-courses',middleware,GetCoursesByTeacherId)

export default router