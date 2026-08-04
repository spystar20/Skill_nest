import api from "@/utils/axios"

export const fetchEnrolledCourses = async()=>{
    const res = await api.get(`/course/enrolled`)
    return res.data
}

export const fetchEnrolledCourseById= async(enrollmentId)=>{
  
    const res = await api.get(`/student/enrolledCourse/${enrollmentId}/learn`)
    return res.data

 }
 export const fetchEnrolledCurriculum =async(enrollmentId)=>{
    const res = await api.get(`/course/curriculum/enrolled/${enrollmentId}`)
return res.data
 }