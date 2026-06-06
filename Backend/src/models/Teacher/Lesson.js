import mongoose from 'mongoose'
const lessonSchema = new mongoose.Schema({
    lesson:{
        type:String,required:true
    },order:{
        type:Number,required:true
    },section:{
        type:mongoose.Schema.Types.ObjectId,ref:'section'
    }
})
export default mongoose.model('lesson',lessonSchema)