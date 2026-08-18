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

// adds course to cart
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
    if(cart && cart.items.some(item=>item.courseId.toString()===courseId)){
        return res.status(403).json({message:'item already added'})
    }
    if(!cart){
      
const cartDocument = await CartModel.create({
    userId,items:[{courseId}]
})
return res.status(200).json({message:'cart updated',cartDocument})
    }
    if(cart && !cart.items.some(item=>item.courseId.toString()===courseId)){
        cart.items.push({courseId})
        await cart.save()
    }
    return res.status(200).json({message:'cart Updated',cart})
})
// removes course from cart
export const removeItems = asyncHandler(async(req,res)=>{
    const {courseId}= req.params
    console.log(courseId,"courseId")
    const userId = req.user.UserID
    const userCart = await CartModel.findOne({userId:userId})
    if(!userCart){
        return res.status(404).json({message:'user cart not found'})
    }
   const cartItem= userCart.items.find(item=>item.courseId.toString()===courseId.toString())
  if(!cartItem){
return res.status(404).json({message:'item not found in cart'})
  }
userCart.items = userCart.items.filter(item=>item.courseId.toString()!==courseId.toString())
await userCart.save()
  return res.status(200).json({message:"item removed"})
})
// fetches cart courses
export const fetchCartItems = asyncHandler(async(req,res)=>{
    const userId = req.user.UserID
   
    const cart = await CartModel.findOne({userId:userId})
    if(!cart){
        return res.status(404).json({message:'cart items not found'})
    }
    if(cart.items.length===0){
        return res.status(200).json({cart:[]})
    }
   const addedCourses = await Promise.all( cart.items.map( async (course)=>{
  const   courseData = await Course.findById(course.courseId).populate('instructor').lean()
    return {...courseData}
   }))
    return res.status(200).json({cart,addedCourses})
})

 export const cartOrder = asyncHandler(async(req,res)=>{
    const userId = req.user.UserID
    const userCart = await CartModel.findOne({userId:userId})
    if(!userCart){
        return res.status(404).json({message:'cart not found'})
    }
    if(userCart.items.length===0){
        return res.status(403).json({message:"cart is empty"})
    }
   
 const coursePrice =  await Promise.all( userCart.items.map( async item=>{
        const course = await Course.findById(item.courseId)
        if(!course){
            return res.status(404).json({message:'course not found'})
        }
        return course.price
    }))

const subtotal = coursePrice.reduce((acc,price)=>acc+price,0)
const discount = 0
const total = subtotal-discount
const order = await razorpay.orders.create({amount:total*100,currency:"INR",receipt:`receipt_Skillnest-${Date.now()}`})
const payment = await PaymentModel.create({
    userId:userId,courseId:cou
})
 })