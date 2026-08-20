import { useFetchWishlist } from "@/hooks/CoursesHooks/wishlist/useWishlist";
import {  createContext, useContext } from "react";

const WishlistContext = createContext()
export const WishlistProvider = ({children})=>{
const {data:wishlistData} = useFetchWishlist()
const isWishlisted = (courseId)=>{
    return wishlistData?.courses?.some(course=>course?._id.toString() === courseId.toString())
}
    return (
     <WishlistContext.Provider value={isWishlisted}>
        {children}
     </WishlistContext.Provider>   
    )
}
export const useWishlistContext = ()=>{
    return useContext(WishlistContext)
}