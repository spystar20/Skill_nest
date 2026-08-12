import { fetchCertificateById, fetchCertificates, fetchEnrolledCourseById, fetchEnrolledCourses, getDownloadedCertificate } from "@/api/EnrollmentApi";
import api from "@/utils/axios";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Variable } from "lucide-react";

export const useEnrolledCourses = ()=> useQuery({
    queryKey:['enrolledCourses'],
    queryFn:fetchEnrolledCourses
    
})
export const useEnrolledCertificate = ()=>useQuery({
    queryKey:['certificates'],
    queryFn:()=>fetchCertificates(),
    select:(data)=>data.certificates
})
export const useEnrolledCourseById = (enrollmentId)=>useQuery({
    queryKey:['enrolledCourse',enrollmentId],
    queryFn:()=>fetchEnrolledCourseById(enrollmentId),
enabled:!!enrollmentId,
})
export const useUpdateLastWatched = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({enrollmentId,lessonId})=>{
            console.log(lessonId)
            const res = await api.patch(`/course/enroll/last-watched/${enrollmentId}/${lessonId}`)
        },
 onSuccess:async(_,variables)=>{
    await queryClient.invalidateQueries({
        queryKey:['enrolledCourse',variables.enrollmentId]
    })
 }
    })
}
export const updateLessonProgress = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({enrollmentId,lessonId,watchedTime})=>{
            
            console.log(watchedTime)
            const res = await api.patch(`/course/enroll/Lesson-progress/${enrollmentId}/${lessonId}`,{watchedTime})
        },
        onSuccess:async(_,variables)=>{
              await queryClient.invalidateQueries({
        queryKey:['enrolledCourse',variables.enrollmentId]
    })
        }
    })
}
export const useDownloadCertificate = ()=> {
return useMutation({
    mutationFn:async({certificateId})=>{
        const res = await api.get(`/student/certificate/${certificateId}/download`,{responseType:'blob'})
         return res.data
    }
})
}
export const useCertificateByEnrollment = (enrollmentId,isCompleted)=>useQuery({
    queryKey:['certificate',enrollmentId],
    queryFn:()=>fetchCertificateById(enrollmentId),
    enabled:!!enrollmentId && isCompleted,
    select:(data)=>data.certificate
})