import api from "@/utils/axios"

export const fetchCart = async()=>{
    const res = await api.get("/course/cart/get-items")
    return res.data
}