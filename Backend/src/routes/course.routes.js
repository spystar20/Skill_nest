import express from 'express'
import { middleware } from "../middleware/auth.middleware.js"
import uploads from "../middleware/multer.js"
import { getCoursebyId ,CreateCoursse, GetCourses, CreateSection, getSection, createLesson, getLesson, updateLesson, getLessonById, DeleteResource, CourseSetting, GetCoursesByTeacherId, UpdateCourseStatus, UpdateSection, DeleteSection, deleteLesson, DeleteCourse, ResourceUpload, GetCourseCategories,} from "../controller/controller.course.js"
export const router = express.Router()

// courses
router.post('/createNew',middleware,uploads.single("thumbnail"),CreateCoursse)
router.get('/',GetCourses)
router.get('/:courseId',middleware,getCoursebyId)
router.put('/:courseId/status',middleware,UpdateCourseStatus)
router.delete('/:courseId',middleware,DeleteCourse)
router.get('/category',middleware,GetCourseCategories)
// section
router.post('/:courseId/create-section',middleware,CreateSection)
router.get('/:courseId/get-section',middleware,getSection)
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

export default router