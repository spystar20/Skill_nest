import api from "@/utils/axios"
import {   useMutation, useQueryClient } from "@tanstack/react-query"
export const useCreateCourse = ()=>{
    return useMutation({
        mutationFn:async(data)=>{
          const res = await api.post('/course/createNew', data)
    return res.data
}
    })
}
export const usePublishCourse = ()=>{
    return useMutation({
        mutationFn:({courseId,status})=>{
    const res =api.put(`/course/${courseId}/status`,{status})
    return res.data
        }
    })
}
export const useCreateSection = ()=>{
    const queryClient  = useQueryClient()
    return useMutation({
        mutationFn:async({courseId,title})=>{
            const res =await  api.post(`/course/${courseId}/create-section`,{title})
      return res.data      
        },
        onSuccess:async(_,variables)=>{
 await queryClient.invalidateQueries({
    queryKey:['sections',variables.courseId]
 })
        }

    })
    
}