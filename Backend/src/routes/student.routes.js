import express from "express"
export const router = express.Router()
import { updateProfile} from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import { downloadCertificate, getCertificateById, getEnrolledCoursebyId, UpdateEnrolledProgress } from "../controller/EnrolledCourse.js"
import { addReview, deleteReview, updateReview } from "../controller/controller.review.js"
import { studentDashboardData } from "../controller/controller.dashboard.js"


router.put('/update/profile',middleware,updateProfile)
router.get('/enrolledCourse/:enrollmentId/learn',middleware,getEnrolledCoursebyId)
router.put('/enrolledCourse/:enrollmentId/:lessonId/completed',middleware,UpdateEnrolledProgress)
router.get('/certificate/:certificateId/download',middleware,downloadCertificate)
router.get('/enrollment/:enrollmentId/certificate',middleware,getCertificateById)
router.post('/enrolled/:enrollmentId/add/review',middleware,addReview)
router.patch('/enrolled/:enrollmentId/update/review',middleware,updateReview)
router.delete('/enrolled/:enrollmentId/delete/review',middleware,deleteReview)
router.get('/enrolled/dashboard',middleware,studentDashboardData)
export default router