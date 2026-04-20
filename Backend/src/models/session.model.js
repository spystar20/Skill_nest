import mongoose, { mongo } from "mongoose";
const SessionSchema = new mongoose.Schema({
UserID:{
    type:mongoose.Schema.Types.ObjectId,ref:"user",required:true
},refreshToken:{
    type:String,required:true,unique:true
},expiresAt:{
    type:Date,required:true
}
},{timestamps:true})

export default mongoose.model("session",SessionSchema)