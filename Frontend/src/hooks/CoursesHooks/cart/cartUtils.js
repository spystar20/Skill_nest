export const isItemAdded = (courseId,cartItems)=>{
    
return cartItems?.some(item=>item._id.toString()===courseId.toString())

}