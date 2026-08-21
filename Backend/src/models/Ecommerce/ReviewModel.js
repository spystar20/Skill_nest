import mongoose from "mongoose"
const reviewModel = new mongoose.Schema({
    enrollmentId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Enrollment",required:true,  unique: true

    },
    rating:{
        type:Number,required:true,min:1,max:5
    },
    review:{
        type:String,
    }
},{timestamps:true})
export default mongoose.model("courseReview",reviewModel)