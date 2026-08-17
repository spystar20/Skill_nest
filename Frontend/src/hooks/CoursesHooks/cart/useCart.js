import api from "@/utils/axios"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { fetchCart } from "./cartApi"

export const useAddCartItem = ()=>{
    const queryClient = new QueryClient()
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