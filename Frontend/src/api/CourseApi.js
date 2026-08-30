import api from "@/utils/axios"

// fetch teacher's courses
export const fetchTeacherCourses = async () => {
    const res = await api.get('/teacher/dashboard/my-courses')
    return res?.data?.courses
}
// filtered courses
export const fetchFilteredCourses = async (params) => {
    const res = await api.get('/course/', { params })
    return res.data
}

export const fetchCourseById = async (course_id) => {
    const res = await api.get(`/course/${course_id}`)
    return res.data
}

// all courses category 
export const fetchCategories = async () => {
    const res = await api.get('/course/category')
    return res.data.category

}
// get all section in a course by course id 
export const fetchSection = async (course_id) => {
    const res = await api.get(`/course/${course_id}/get-section`)

    return res.data.section
}
// get lessons by sectionId
export const fetchLesson = async (sectionId) => {

    const res = await api.get(`/course/lesson/${sectionId}/get-lesson`)

    return res.data.lessons
}
//   get lesson by lessonId
export const fetchLessonById = async (lessonId) => {
    const res = await api.get(`/course/lesson/${lessonId}`)
    return res.data.lesson
}

// get uploaded resources in lesson
export const fetchUploadedResource = async (lessonId) => {
    const res = await api.get(`/course/lesson/${lessonId}`)
    return res.data.lesson.resources
}

//get both section and lessons 
export const fetchCurriculum = async (courseId) => {
    const res = await api.get(`/course/curriculum/${courseId}`)
    return res.data
}