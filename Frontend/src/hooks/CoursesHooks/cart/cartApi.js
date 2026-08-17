import api from "@/utils/axios"

export const fetchCart = async()=>{
    const res = await api.get("/course/cart/get-items")
    console.log(res)
    return res.data
}