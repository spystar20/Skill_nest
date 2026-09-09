import mongoose from "mongoose"
const activitySchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,ref:"user",required:true
},
courseId:{
    type:mongoose.Schema.Types.ObjectId,ref:"course",default: null

},
type:{
    type:String,required:true
},metadata:{
type:mongoose.Schema.Types.Mixed,required:true,default:{}
}
},{timestamps:true})

export default mongoose.model("Activity",activitySchema)