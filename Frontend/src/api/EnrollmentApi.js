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
 export const fetchCertificates = async()=>{
    const res = await api.get('/course/enroll/certifcates')
    return res.data
 }
 export const getDownloadedCertificate = async(certificateId)=>{
    const res = await api.get(`/student/certificate/${certificateId}/download`,{responseType:'blob'})
    return res.data
 }