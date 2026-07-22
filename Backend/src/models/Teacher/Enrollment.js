import mongoose, { Schema } from 'mongoose'
import { stringify } from 'querystring'
const EnrollmentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,ref:'course',required:true,unique:true
    },
    paymentId:{
type:String , required:true
    },
    completedLessons:[{type:mongoose.Schema.Types.ObjectId,ref:'lesson'}],
    completed:{
        type:Boolean,default:false
    }

},{timestamps:true})


export default mongoose.model('Enrollment',EnrollmentSchema)