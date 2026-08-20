import express from 'express'
import { middleware } from "../middleware/auth.middleware.js"
import uploads from "../middleware/multer.js"
import { getCoursebyId ,CreateCoursse, GetCourses, CreateSection, getSection, createLesson, getLesson, updateLesson, getLessonById, DeleteResource, CourseSetting, GetCoursesByTeacherId, UpdateCourseStatus, UpdateSection, DeleteSection, deleteLesson, DeleteCourse, ResourceUpload, GetCourseCategories, getCourseCurriculum, getEnrolledCurriculum,} from "../controller/controller.course.js"
import { Enroll, EnrolledCourse, getCertificate, LastLesson, UpdateWatchedTime } from '../controller/EnrolledCourse.js'
import { addItems, addWishlistItem, cartOrder, createOrder, fetchCartItems, fetchWishlist, removeItems, removeWishlistItem, verifyCart, verifyPayment } from '../controller/controller.payment.js'
import { optionalAuth } from '../middleware/optionalAuth.middleware.js'
export const router = express.Router()

// courses
router.get('/',optionalAuth,GetCourses)
router.get('/enrolled',middleware,EnrolledCourse)
router.get('/category',optionalAuth,GetCourseCategories)
router.post('/createNew',middleware,uploads.single("thumbnail"),CreateCoursse)
router.get('/:courseId',optionalAuth,getCoursebyId)
router.put('/:courseId/status',middleware,UpdateCourseStatus)
router.delete('/:courseId',middleware,DeleteCourse)

// enrolledCourse
router.patch('/enroll/last-watched/:enrollmentId/:lessonId',middleware,LastLesson)
router.patch('/enroll/Lesson-progress/:enrollmentId/:lessonId',middleware,UpdateWatchedTime)
router.post('/enroll/:courseId',middleware,Enroll)
router.get('/enroll/certifcates',middleware,getCertificate)
// section
router.post('/:courseId/create-section',middleware,CreateSection)
router.get('/:courseId/get-section',middleware,getSection)
router.get('/curriculum/:courseId',middleware,getCourseCurriculum)
router.get('/curriculum/enrolled/:enrollmentId/',middleware,getEnrolledCurriculum)
router.put('/section/:sectionId/edit-section',middleware,UpdateSection)
router.delete('/section/:sectionId/delete',middleware,DeleteSection)

// lesson
router.post('/lesson/:sectionId/create-lesson',middleware,createLesson)
router.get('/lesson/:sectionId/get-lesson',middleware,getLesson)
router.get('/lesson/:lessonId',middleware,getLessonById)
router.delete('/lesson/:sectionId/delete',middleware,deleteLesson)
router.put('/lesson/:lessonId/resource-upload',uploads.array("resource"), middleware,ResourceUpload)
router.delete('/lesson/:lessonId/resource/:resourceId/delete',middleware,DeleteResource)
router.put('/lesson/:lessonId/update',uploads.single('video'),middleware,updateLesson)
router.put('/lesson/:lessonId/setting',middleware,CourseSetting)

// ecommerce
router.post('/payment/verify',middleware,verifyPayment)
router.post('/buy-course/:courseId',middleware,createOrder)
router.post('/:courseId/cart/new',middleware,addItems)
router.delete('/:courseId/cart/removeItem',middleware,removeItems)
router.get('/cart/get-items',middleware,fetchCartItems)
router.post('/cart/checkout',middleware,cartOrder)
router.post('/cart/payment/verify',middleware,verifyCart)
router.get('/wishlist/get-courses',middleware,fetchWishlist)
router.post('/wishlist/add-new/:courseId',middleware,addWishlistItem)
router.delete('/wishlist/remove/:courseId',middleware,removeWishlistItem)
export default router