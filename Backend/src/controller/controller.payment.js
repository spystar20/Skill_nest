import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import Course from "../models/Teacher/Course.js";
import { razorpay } from "../../Config/razorpay.js";
import crypto from 'crypto'
import Enrollment from "../models/Teacher/Enrollment.js";
import PaymentModel from "../models/Ecommerce/PaymentModel.js";
import CartModel from "../models/Ecommerce/CartModel.js";
import userModel from '../models/user.model.js'
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
const generatedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(`${orderId}|${paymentId}`).digest('hex')
if(generatedSignature !== signature){
    return res.status(403).json({message:'payment unsuccessfull'})
}
const payment = await PaymentModel.findOneAndUpdate({razorpayOrderId:orderId},{status:'paid',razorpayPaymentId:paymentId,paidAt:Date.now()},{new:true,runValidators:true})
const existingEnrollment = await Enrollment.findOne({userId:payment.userId,courseId:payment.courseId})
if(!existingEnrollment){
await Enrollment.create({
    userId:payment.userId,courseId:payment.courseId,paymentId:payment.razorpayPaymentId
})

}

return res.status(201).json({message:'course purchased'})
})

export const addItems=asyncHandler(async(req,res)=>{
    const userId =req.user.UserID
    const {courseId}=req.params
    const existingUser = await userModel.findById(userId)
    if(!existingUser){
        return res.status(404).json({message:'user not found'})
    }
    const course = await Course.findById(courseId)
    if(!course){
        return res.status(404).json({message:'course not found'})
    }
    const cart = await CartModel.findOne({userId:existingUser._id})
    if(cart && cart.items.includes(courseId)){
        return res.status(403).json({message:'item already added'})
    }
    if(!cart){
      
const cartDocument = await CartModel.create({
    userId,items:[courseId]
})
return res.status(200).json({message:'cart updated',cartDocument})
    }
    if(cart && !cart.items.includes(courseId)){
        cart.items.push(courseId)
        await cart.save()
    }
    return res.status(200).json({message:'cart Updated',cart})
})