import express from "express"
export const router = express.Router()
import { updateProfile} from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import { getEnrolledCoursebyId } from "../controller/EnrolledCourse.js"


router.put('/update/profile',middleware,updateProfile)
router.get('/enrolledCourse/:enrollmentId/learn',middleware,getEnrolledCoursebyId)

export default router