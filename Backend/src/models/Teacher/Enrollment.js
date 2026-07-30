import mongoose, { Schema } from 'mongoose'
const EnrollmentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,ref:'course',required:true,
    },
    paymentId:{
type:String , 
    },
    completedLessons:[{type:mongoose.Schema.Types.ObjectId,ref:'lesson'}],
    completed:{
        type:Boolean,default:false
    }
,
status:{
    type:String,default:'not-started',enum:['not-started','in-progress','completed']
},
},{timestamps:true})


export default mongoose.model('Enrollment',EnrollmentSchema)