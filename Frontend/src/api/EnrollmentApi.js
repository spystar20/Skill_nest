import api from "@/utils/axios"

export const fetchEnrolledCourses = async()=>{
    const res = await api.get(`/course/enrolled`)
    return res.data
}

export const fetchEnrolledCourseById= async(enrollmentId)=>{
  
    const res = await api.get(`/student/enrolledCourse/${enrollmentId}/learn`)
    console.log(res)
    return res.data.enrollment

 }