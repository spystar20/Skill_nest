import { fetchEnrolledCourseById, fetchEnrolledCourses } from "@/api/EnrollmentApi";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEnrolledCourses = ()=> useQuery({
    queryKey:['enrolledCourses'],
    queryFn:fetchEnrolledCourses
    
})

export const useEnrolledCourseById = (enrollmentId)=>useQuery({
    queryKey:['enrolledCourse',enrollmentId],
    queryFn:()=>fetchEnrolledCourseById(enrollmentId),
enabled:!!enrollmentId
})
export const useUpdateLastWatched = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({enrollmentId,lessonId})=>{
            const res = await api.patch(`/enroll/last-watched/${enrollmentId}/${lessonId}`)
            console.log(res)
        },
 onSuccess:async(_,variables)=>{
    await queryClient.invalidateQueries({
        queryKey:['enrolledCourse',variables.enrollmentId]
    })
 }
    })
}