import api from "@/utils/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAddReview = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ enrollmentId, course_id, rating, review }) => {
            console.log(enrollmentId)
            console.log(course_id)
            const res = await api.post(`/student/enrolled/${enrollmentId}/add/review`, { rating, review })
            console.log(res)
            return res.data
        },
        onSuccess: async (_, variable) => {
          await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['course', variable.course_id]
                }),
                queryClient.invalidateQueries({
                    queryKey: ['enrolledCourses']
                })
            ])
        }
    })
}
export const useEditReview = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ enrollmentId, course_id, updatedRating, updatedReview }) => {
            const res = await api.patch(`/student/enrolled/${enrollmentId}/update/review`, { updatedRating, updatedReview })
        },
        onSuccess: async (_, variable) => {

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['course', variable.course_id]
                }),
                queryClient.invalidateQueries({
                    queryKey: ['enrolledCourses']
                })
            ])
        }
    })
}
export const useDeleteReview = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({enrollmentId,course_id})=>{
            await api.delete(`/student/enrolled/${enrollmentId}/delete/review`)

        },
        onSuccess:async(_,variable)=>{
                 await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['course', variable.course_id]
                }),
                queryClient.invalidateQueries({
                    queryKey: ['enrolledCourses']
                })
            ])
        }
    })
}