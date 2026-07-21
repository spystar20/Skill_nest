import api from "@/utils/axios"

export const handlePayment = async(courseId)=>{
    try{
        const res = await api.post(`/course/buy-course/${courseId}`)
console.log(res)
    }catch(err){
        console.log(err)
    }
}