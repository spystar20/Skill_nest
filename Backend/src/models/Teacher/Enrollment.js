import mongoose, { Mongoose, Schema } from 'mongoose'
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
    lastLesson:{
     type:mongoose.Schema.Types.ObjectId,ref:'lesson',
     default:null
    },
    learningActivity:[{
        date:{type:Date,default:Date.now()},
        watchedTime:{
            type:Number,default:0
        }
    }],
    lessonProgress:[{
        lessonId:{
            type:mongoose.Schema.Types.ObjectId,ref:'lesson',default:null
        },
        watchedTime:{
            type:Number,default:0
        }
    }],
    completed:{
        type:Boolean,default:false
    },
    completedAt:{
        type:Date,default:null
    }
,
status:{
    type:String,default:'not-started',enum:['not-started','in-progress','completed']
},
},{timestamps:true})


export default mongoose.model('Enrollment',EnrollmentSchema)