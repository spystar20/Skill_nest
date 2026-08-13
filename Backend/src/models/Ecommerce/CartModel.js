import mongoose from "mongoose";
 const cart = new mongoose.Schema({
   items:[{courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    },
}] ,
totalAmount:{
    type:Number,
},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',required:true
    }
 })
 export default mongoose.model('cart',cart)