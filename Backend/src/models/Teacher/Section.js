import mongoose from "mongoose";

const Section = new mongoose.Schema({
title:{
    type:String,required:true
},order:{
    type:Number,required:true
},course:{
type:mongoose.Schema.Types.ObjectId,
ref:'course',required:true
},duration:Number
},{timestamps:true})

export default mongoose.model('section',Section)