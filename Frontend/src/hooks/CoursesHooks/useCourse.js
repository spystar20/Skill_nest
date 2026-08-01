import {  fetchCategories, fetchCourseById, fetchCurriculum, fetchFilteredCourses, fetchLesson, fetchLessonById, fetchSection, fetchTeacherCourses, fetchUploadedResource } from "@/api/CourseApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFilteredCourse = (filters)=>useQuery({
    queryKey:['filteredCourses',filters],
    queryFn:()=>fetchFilteredCourses(filters),
    enabled:!!filters
})
export const useCategories = ()=> useQuery({
    queryKey:['categories'],
    queryFn:()=>fetchCategories()
})

export const useCourseById = (course_id)=>useQuery({
queryKey:['course',course_id],
queryFn:()=>fetchCourseById(course_id),
enabled:!!course_id
})
export const useSection = (courseId)=>useQuery({
    queryKey:['sections',courseId],
    queryFn:()=>fetchSection(courseId), 
    enabled:!!courseId
})
export const useLessons = (sectionId)=>useQuery({
    queryKey:['lessons',sectionId],
    queryFn:()=>fetchLesson(sectionId),
    enabled:!!sectionId
})
export const useLessonById = (lessonId)=>useQuery({
    queryKey:['lesson',lessonId],
    queryFn:()=>fetchLessonById(lessonId),
    enabled:!!lessonId
})
export const useUploadedResources = (lessonId)=>useQuery({
    queryKey:['resources',lessonId],
    queryFn:()=>fetchUploadedResource(lessonId),
    enabled:!!lessonId
})
export const useTeacherCourses = ()=>useQuery({
    queryKey:['coursesTeacher'],
    queryFn:()=>fetchTeacherCourses()
})

export const useCurriculum = (courseId)=>useQuery({
    queryKey:['curriculum',courseId],
    queryFn:()=>fetchCurriculum(courseId),
    enabled:!!courseId
})