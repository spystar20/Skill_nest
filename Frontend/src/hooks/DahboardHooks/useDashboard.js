import { useQuery } from "@tanstack/react-query";
import { fetchRecommendedCourses, getStudentDashboardData } from "./dashboardApi";

export const useStudentDashboard = (range)=>useQuery({
    queryKey:['studentDashboardData',range],
    queryFn:()=>getStudentDashboardData(range)
})
export const useRecommendedCourses = ()=>useQuery({
    queryKey:["recommended-course"],
    queryFn:()=>fetchRecommendedCourses()
})