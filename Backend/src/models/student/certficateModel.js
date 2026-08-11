import mongoose from "mongoose";
const certificateSchema = new mongoose.Schema({
 enrollmentId:{
    type:mongoose.Schema.Types.ObjectId,ref:'Enrollment',required:true,unique:true
 },
 issueDate:{
    type:Date,default:Date.now
 },
 pdfUrl:{
    type:String,default:null
 }
 
},{timestamps:true})

export default mongoose.model('certifcates',certificateSchema)