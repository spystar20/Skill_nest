import mongoose, { mongo, Schema } from "mongoose";
const paymentModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },

    razorpayOrderId: {
        type: String, required: true
    },
    razorpayPaymentId: {
        type: String
    },
    amount: {
        type: Number, required: true
    },
    currency: {
        type: String, required: true

    },
    paymentMethod:{
        type:String
    },
    paidAt:{
        type:Date
    },
    status: {
        type: String, enum: ['paid', 'failed', 'refund', 'cancelled','created'],required:'true'
    }
}, { timestamps: true })

export default mongoose.model('PaymentData', paymentModel)