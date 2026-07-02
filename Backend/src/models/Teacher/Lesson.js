import mongoose from 'mongoose'
const lessonSchema = new mongoose.Schema({
    lesson: {
        type: String, required: true
    },
    description: {
        type: String,
    },
    order: {
        type: Number, required: true
    }, section: {
        type: mongoose.Schema.Types.ObjectId, ref: 'section'
    },
    resources: [
        {
            title: String,url:String,type:{type:String,enum:["pdf",
        "link",
        "github",
        "youtube",
        "doc",
        "ppt",
        "zip",
        "code"]}
        },
  
    ],
  videoUrl: {
        type: String
    }, isPreview: Boolean, duration: Number

},{timestamps:true})
export default mongoose.model('lesson', lessonSchema)