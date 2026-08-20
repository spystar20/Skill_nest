import mongoose  from "mongoose";
 const wishlistModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",unique:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,ref:"course",
    }],
 })
 export default mongoose.model("wishlist-Skillnest",wishlistModel) 