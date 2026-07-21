import { useAuth } from "@/context/AuthContext"
import api from "@/utils/axios"
import { create } from "zustand"


export const paymentStore = create((set)=>({
handlePayment:async(courseId)=>{
    try{
            const {user}=useAuth

        const res = await api.post(`/course/buy-course/${courseId}`)
        const {order,key}=res.data
const options = {
    key,
    amount:order.amount,
currency:order.currency,
order_id:order.id,
name:'Skillnest',
description:'Course Purchase',
handler:async function(response){
const res = await api.post('/course/payment/verify',{
    

orderId: response.razorpay_order_id,
paymentId:response.razorpay_payment_id,
signature:response.razorpay_signature

})
    console.log('payment successfull')
},
prefill:{
    name:user?.name,
    email:user?.email
}
}
const razorpay = new window.Razorpay(options)
razorpay.open()
    }catch(err){
console.log(err)
    }
}
}))
