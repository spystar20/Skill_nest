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
            title: String,url:String
        },
  
    ],
  videoUrl: {
        type: String
    }, isPreview: Boolean, duration: Number

})
export default mongoose.model('lesson', lessonSchema)