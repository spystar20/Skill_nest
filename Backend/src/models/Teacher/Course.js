import mongoose from 'mongoose'

const course = new mongoose.Schema({
    title:{
        type:String,required:true
    },desc:{
        type:String,required:true
    },thumbnail:{
        type:String,required:true
    },
    duration:{
        type:String,required:true
    },category:{
        type:String,required:true
    },difficulty:{
        type:String,  enum:["Beginner","Intermediate","Advanced"]
,required:true
    },priceType:{
        type:String,enum:["Free","Paid"],required:true
    },price:{
        type:Number,default:0
    },instructor:{
type:mongoose.Schema.Types.ObjectId,ref:"user",required:true    },
status:{
    type:String,
    enum:['draft','published'],
   default:'draft' 
},

},{timestamps:true})

export default mongoose.model('course',course)