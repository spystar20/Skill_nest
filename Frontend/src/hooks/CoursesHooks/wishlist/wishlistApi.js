import api from "@/utils/axios"

export const fetchWishlistCourses = async()=>{
const res = await api.get('/course/wishlist/get-courses')
console.log(res)
return res.data

}