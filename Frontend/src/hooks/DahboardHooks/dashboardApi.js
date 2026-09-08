import api from "@/utils/axios"

export const getStudentDashboardData = async(range)=>{
    const res = await api.get('/student/enrolled/dashboard',{params:{range}})
    return res.data
}
export const fetchRecommendedCourses = async()=>{
    const res = await api.get('/student/recommended-courses')
    return res.data
}