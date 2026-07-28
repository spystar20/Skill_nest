import api from "@/utils/axios"

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

export const fetchSection = async (course_id) => {
    const res = await api.get(`/course/${course_id}/get-section`)
    return res.data.section
}
// get lessons by sectionId
 export const fetchLesson=async(sectionId)=>{

  const res = await api.get(`/course/lesson/${sectionId}/get-lesson`)

return res.data.lessons
  }
//   get lesson by lessonId
