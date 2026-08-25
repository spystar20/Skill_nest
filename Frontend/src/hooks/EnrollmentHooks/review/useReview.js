import api from "@/utils/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAddReview = ()=>{
    const queryClient = useQueryClient()
 return   useMutation({
        mutationFn:async({enrollmentId,course_id,rating,review})=>{
            console.log(enrollmentId)
            console.log(course_id)
        const res =  await api.post(`/student/enrolled/${enrollmentId}/add/review`,{rating,review})
        console.log(res)
        return res.data
        },
        onSuccess:async(_,variable)=>{
         await   queryClient.invalidateQueries({
                queryKey:['course',variable.course_id]
            })
        }
    })
}
