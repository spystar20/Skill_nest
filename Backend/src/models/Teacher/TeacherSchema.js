import mongoose from "mongoose";
const TeacherSchema =  new mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    title:{
        type:String,required:true
    },experience:{
        type:String,default:''
    },specialization:{
        type:String,default:''
    },organization:{
                type:String,default:''
    },website:{
        type:String,default:''
    },linkdin:{
        type:String,default:''
    },

})

export default mongoose.model("TeacherSchema",TeacherSchema)