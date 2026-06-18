import crypto from "crypto"
import bcrypt from 'bcrypt'
import user from "../models/user.model.js"
import session from '../models/session.model.js'
import { createEmailToken, verifyEmailToken } from "../utils/email.js"
import { sendMail } from "../utils/mail.js"
import { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js"
import { getaccessCookieOptions, getrefreshCookieOptions } from "../config/cookie.js"
import TeacherSchema from "../models/Teacher/TeacherSchema.js"
import Course from "../models/Teacher/Course.js"
import cloudinary from "../utils/cloudinary.js"
import fs from 'fs'
import { asyncHandler } from "../middleware/asyncHandler.middleware.js"

export const signup =asyncHandler( async (req, res) => {
   
      const { firstName, email, password } = req.body
    
      const existingUser = await user.findOne({ email })
      if (existingUser) {
         return res.status(401).json({ message: "user already exists , please login" })
      }
      const hashPassword = await bcrypt.hash(password, 10)
      const User = await user.create({
         firstName, email, password: hashPassword
      })
      const EmailVerifyToken = createEmailToken({ UserID: User._id })
      const emailLink = `${process.env.URL}/verify-email?token=${EmailVerifyToken}`
      await sendMail({
         to: User.email, subject: "Email Verification Link", html: ` <h2>Verify your email</h2>
    <p>Click the link below:</p>
    <a href="${emailLink}">Verify Email</a>`
      })
      return res.status(200).json({
         message: "user created sucessfully", email: User.email
      })
 
})

export const Login = asyncHandler(async (req, res) => {
  
      const { email, password, rememberme } = req.body
      const existingUser = await user.findOne({ email })
      if (!existingUser) {
         return res.status(401).json({ message: "user not found" })
      }
    
      const hashPassword = await bcrypt.compare(password, existingUser.password)
      if (!hashPassword) {
         return res.status(401).json({ message: "incorrect credentials" })
      }
      const refreshExpires = rememberme ? "30d" : "7d"
      const refreshMaxAge = rememberme ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
      const accessToken = createAccessToken({
         UserID: existingUser._id, isEmailVerified: existingUser.isEmailVerified,
      })
      const sessionDoc = new session({
         UserID: existingUser._id, expiresAt: new Date(Date.now() + refreshMaxAge)
      })
      const refreshToken = createRefreshToken({ UserID: existingUser._id, sessionID: sessionDoc._id }, refreshExpires)
      sessionDoc.refreshToken = refreshToken
      await sessionDoc.save()
      res.cookie("refreshToken", refreshToken, getrefreshCookieOptions(refreshMaxAge))
      res.cookie("accessToken",accessToken,getaccessCookieOptions())
      return res.status(200).json({ message: "successfully logged in ", accessToken,existingUser, isEmailVerified: existingUser.isEmailVerified, email: existingUser.email })

})

export const me =asyncHandler( async (req, res) => {
      
   
      const { accessToken, refreshToken } = req.cookies
                 if (accessToken) {
         try {
            const payload = verifyAccessToken(accessToken)

            const existingUser = await user.findById(payload.UserID)
const Teacher = await TeacherSchema.findOne({
  user: existingUser._id
})
            return res.json({ existingUser ,Teacher})

         } catch (err) {
            return res.status(401).json({message:'access token expired'})
         }
      }
     
      let payload
      try {
   payload = verifyRefreshToken(refreshToken)
} catch (err) {
   return res.status(401).json({
      message: "invalid or expired refresh token"
   })
}

      const sessionDoc = await session.findById(payload.sessionID)
   
      if (!sessionDoc|| sessionDoc.refreshToken !== refreshToken) {
         return res.status(403).json({ message: "authentication failed" })
      }

      const existingUser = await user.findById(payload.UserID)
      const newAccessToken = createAccessToken({ UserID: payload.UserID })
      res.cookie("accessToken", newAccessToken, getaccessCookieOptions())

return res.json({accessToken:newAccessToken,existingUser})   

})

export const logout = asyncHandler( async (req, res) => {
   
      const { refreshToken } = req.cookies
      if (refreshToken) {
         const payload = verifyRefreshToken(refreshToken)
         await session.findByIdAndDelete(payload.sessionID)
      }
      res.clearCookie("refreshToken")
      res.clearCookie("accessToken")
      res.json({ message: "logged out succesfully" })

})

export const verifyEmail = asyncHandler( async (req, res) => {
  

      const { token } = req.body
      if (!token) {
         return res.status(401).json({ message: "token not found" })
      }
      const payload = verifyEmailToken(token)
      const existingUser = await user.findById(payload.UserID)
      if (!existingUser) {
         return res.status(401).json({ message: "user not found" })
      }
      if (existingUser.isEmailVerified) {
         return res.status(401).json({ message: "email already verified" })

      }
      existingUser.isEmailVerified = true
      await existingUser.save()
      return res.status(200).json({ message: "Email verified" })

})

export const forgotPassword = asyncHandler( async (req, res) => {
   
      const { email } = req.body
      if (!email) {
         return res.status(401).json({ message: "provide email " })
      }
      const existingUser = await user.findOne({ email })
      if (!existingUser) {
         return res.status(401).json({ message: "user not found " })
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      const hashOtp = crypto.createHash("sha256").update(otp).digest("hex")
      existingUser.resetOTP = hashOtp
      existingUser.resetOTPExpires = Date.now() + 10 * 60 * 1000
      await existingUser.save()
      await sendMail({
         to: existingUser.email, subject: "reset otp", html: `
      <p>Your OTP is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
    `
      })
      return res.status(200).json({ message: `otp mail sent to ${existingUser}` })

})
export const resetPassword = asyncHandler( async (req, res) => {
   
      const { otp, newpassword, email } = req.body
      const existingUser = await user.findOne({ email })
      if (!existingUser || !existingUser.resetOTP || !existingUser.resetOTPExpires) {
         return res.status(401).json({ message: "Invalid user" })
      }
      if (existingUser.resetOTPExpires < Date.now()) {
         return res.status(401).json({ message: "otp expired" })
      }
      const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex")
      if (hashedOtp !== existingUser.resetOTP) {
         return res.status(401).json({ message: "Invalid OTP" })
      }
      const hashedpassword = await bcrypt.hash(newpassword, 10)
      existingUser.resetOTP = undefined
      existingUser.resetOTPExpires = undefined
      existingUser.password = hashedpassword
      await existingUser.save()
      return res.status(200).json({ message: `${user} password changed` })


})

export const resendVerificationEmail = asyncHandler( async (req, res) => {
  
      const {email} = req.body

      const existingUser = await user.findOne({email})
      if (!existingUser) {
         return res.status(401).json({ message: "User not found" })
      }
      if (existingUser.isEmailVerified) {
         return res.status(401).json({ message: "User already verified" })

      }
      const Emailtoken = createEmailToken({ UserID: existingUser._id })
      const emailLink = `${process.env.URL}/verify-email?token=${Emailtoken}`

      await sendMail({
         to: existingUser.email, subject: "Email Verification Link", html: ` <h2>Verify your email</h2>
    <p>Click the link below:</p>
    <a href="${emailLink}">Verify Email</a>`
      })

      return res.status(200).json({ message: "Verification Link has been sent to user" })

})
export const googleLogin = asyncHandler(async(req,res)=>{
  const existingUser = req.user
const accessToken = createAccessToken({
   UserID:existingUser._id
})
const refreshToken = createRefreshToken({
   UserID:existingUser._id,
},"7d")

res.cookie(
   "refreshToken",refreshToken,getrefreshCookieOptions(7*24*60*60*1000)
)
res.cookie("accessToken",accessToken,getaccessCookieOptions())
res.redirect(process.env.URL)

})

export const updateProfile =asyncHandler( async(req,res)=>{
   
const {firstName,lastName,username,DOB,Gender,Phone,Location,Bio} = req.body

const existingUser = await user.findById(req.user.UserID,req.body,{
   new:true,runValidators:true
})
await existingUser.save()

return res.status(200).json({message:"user updated succesfully",existingUser})

}
)
export const becomeTeacher = asyncHandler(async(req,res)=>{
  
const {title,experience,specialization,organization,website,linkdin,bio} = req.body
const User = req.user.UserID
if(!title){
   return res.status(401).json('title is required')
}
const existingUser = await user.findById(User)
if(!existingUser){
   return res.status(401).json({message:'user not found'})
}
if(existingUser.role === 'teacher'){
   return res.status(401).json({message:'user is already a teacher'})
}
existingUser.Bio= bio
await existingUser.save()
existingUser.role = 'teacher'
await existingUser.save()
const newTeacher = await TeacherSchema.create({
  user:existingUser._id, title:title,experience:experience,specialization:specialization,organization:organization,website:website,linkdin:linkdin
})
await newTeacher.save()
return res.status(200).json({message:'teacher created successfully',existingUser,newTeacher})

})
export const updateTeacherProfile = asyncHandler( async(req,res)=>{

      const { title,experience ,specialization, organization ,website ,linkdin} = req.body
    
      const Teacher = await TeacherSchema.findOneAndUpdate({user:req.user.UserID},req.body,{
         new:true, runValidators:true
      })

return res.status(201).json({message:"data updated succesfully",Teacher})
 
})

