import { useQuery } from "@tanstack/react-query";
import { getStudentDashboardData } from "./dashboardApi";

export const useStudentDashboard = (range)=>useQuery({
    queryKey:['studentDashboardData',range],
    queryFn:()=>getStudentDashboardData(range)
})