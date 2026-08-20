import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWishlistCourses } from "./wishlistApi";
import api from "@/utils/axios";

export const useFetchWishlist = ()=>useQuery({
    queryKey:['wishlist-courses'],
    queryFn:()=>fetchWishlistCourses()
})
export const useAddWishlist = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({courseId})=>{
            const res = await api.post(`/course/wishlist/add-new/${courseId}`)
            return res.data
        },
        onSuccess:async(_,variable)=>{
await queryClient.invalidateQueries({
    queryKey:['wishlist-courses']
})
        }

    })
}
export const useRemoveWishlist = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async({courseId})=>{
            const res =  await api.delete(`/course/wishlist/remove/${courseId}`)
            return res.data
        },
        onSuccess:async(_,variable)=>{
            await queryClient.invalidateQueries({
    queryKey:['wishlist-courses']
})
        }
    })
}