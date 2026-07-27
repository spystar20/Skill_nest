import { fetchEnrolledCourseById, fetchEnrolledCourses } from "@/api/EnrollmentApi";
import {  useQuery } from "@tanstack/react-query";

export const useEnrolledCourses = ()=> useQuery({
    queryKey:['enrolledCourses'],
    queryFn:fetchEnrolledCourses
    
})

export const useEnrolledCourseById = (enrollmentId)=>useQuery({
    queryKey:['enrolledCourse',enrollmentId],
    queryFn:()=>fetchEnrolledCourseById(enrollmentId),
enabled:!!enrollmentId
})