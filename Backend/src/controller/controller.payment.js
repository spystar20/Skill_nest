import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import PaymentModel from "../models/PaymentModel.js";
import Course from "../models/Teacher/Course.js";
import { razorpay } from "../../Config/razorpay.js";

export const createOrder = asyncHandler(async(req,res)=>{
const {courseId}=req.params
const userId= req.user.UserID
const course = await Course.findById(courseId)
if(!course){
    return res.status(401).json({message:'course not found'})
}
const existingCourse = await PaymentModel.findOne({courseId:courseId,userId:userId,status:'paid'})
if(existingCourse){
        return res.status(403).json({message:'course already bought'})
}
const order = await razorpay.orders.create({amount:course.price*100,receipt:`receipt_Skillnest-${Date.now()}`,currency:'INR'})

const payment = await PaymentModel.create({
    userId:userId,courseId:courseId,status:'created',amount:course.price,razorpayOrderId:order.id,currency:order.currency
})
return res.status(200).json({order,key:process.env.RAZORPAY_KEY_ID})
})

export const verifyPayment =asyncHandler( async(req,res)=>{
const {orderId,paymentId,signature} = req.body
const generatedSignature = crypto.create('sha256',process.env.process.env.RAZORPAY_SECRET_KEY).update(`${orderId}|${paymentId}`).digest('hex')
if(generatedSignature !== signature){
    return res.status(403).json({message:'payment unsuccessfull'})
}

})