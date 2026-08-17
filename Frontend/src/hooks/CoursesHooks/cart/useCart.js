import api from "@/utils/axios"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchCart } from "./cartApi"

export const useAddCartItem = ()=>{
    const queryClient =  useQueryClient()
    return useMutation({
       mutationFn:async({courseId})=>{
        const res = await api.post(`/course/${courseId}/cart/new`)
        return res.data
       } ,
       onSuccess:async(variable,_)=>{
       await queryClient.invalidateQueries({
            queryKey:['cartItems']
        })
       }
    })
}
export const usefetchCartItems = ()=>useQuery({
    queryKey:['cartItems'],
    queryFn:()=>fetchCart()
})
export const useRemoveCartItem = ()=>{
    const queryClient =  useQueryClient()
    return useMutation({
        mutationFn:async({courseId})=>{
            const res = await api.delete(`/course/${courseId}/cart/removeItem`)
            return res.data
        },
        onSuccess:async(_,variable)=>{
              await queryClient.invalidateQueries({
            queryKey:['cartItems']
        })
        }
    })
}