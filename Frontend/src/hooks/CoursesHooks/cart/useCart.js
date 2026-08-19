import api from "@/utils/axios"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchCart } from "./cartApi"
import { useAuth } from "@/context/AuthContext"

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
export const useCartCheckout = ()=>{
    const {user}=useAuth()
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async()=>{
            const res = await api.post('/course/cart/checkout')
            const {order,key}=res.data
            const options = {
                key,
                amount:order.amount,
                currency:order.currency,
                order_id:order.id,
                name:"Skillnest",
                description:"cart checkout..",
                handler:async function (response) {
      const res = await api.post('/course/cart/payment/verify',{
        orderId:response.razorpay_order_id,
        paymentId:response.razorpay_payment_id,
         signature:response.razorpay_signature
      })
       await queryClient.invalidateQueries({
                queryKey:['cartItems']
            })
            return res.data
                },
                prefill:{
                    name:user?.name,
                    email:user?.email
                }

            }
            const razorpay = new window.Razorpay(options)
            razorpay.open()
        },
        
    })
}