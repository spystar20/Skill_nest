import { fetchCategories, fetchCourseById, fetchFilteredCourses, fetchLesson, fetchSection } from "@/api/CourseApi";
import { useQuery } from "@tanstack/react-query";

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
export const useSection = (course_id)=>useQuery({
    queryKey:['sections',course_id],
    queryFn:()=>fetchSection(course_id),
    enabled:!!course_id
})
export const useLessons = (sectionId)=>useQuery({
    queryKey:['lessons',sectionId],
    queryFn:()=>fetchLesson(sectionId),
    enabled:!!sectionId
})