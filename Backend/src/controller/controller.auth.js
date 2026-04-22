import crypto from "crypto"
import bcrypt from 'bcrypt'
import user from "../models/user.model.js"
import session from '../models/session.model.js'
import { createEmailToken, verifyEmailToken } from "../utils/email.js"
import { sendMail } from "../utils/mail.js"
import { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js"
import { getaccessCookieOptions, getrefreshCookieOptions } from "../config/cookie.js"

export const signup = async (req, res) => {
   try {
      const { name, email, password } = req.body
      const existingUser = await user.findOne({ email })
      if (existingUser) {
         return res.status(401).json({ message: "user already exists , please login" })
      }
      const hashPassword = await bcrypt.hash(password, 10)
      const User = await user.create({
         name, email, password: hashPassword
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
   } catch (err) {
      console.log("internal server error", err)
   }
}

export const Login = async (req, res) => {
   try {
      const { email, password, rememberme } = req.body
      const existingUser = await user.findOne({ email })
      if (!existingUser) {
         return res.status(401).json({ message: "user not found" })
      }
      // if(!existingUser.isEmailVerified){
      //    return res.status(401).json({message:"please verify your email before logging in "})
      // }
      const hashPassword = await bcrypt.compare(password, existingUser.password)
      if (!hashPassword) {
         return res.status(401).json({ message: "incorrect credentials" })
      }
      const refreshExpires = rememberme ? "30d" : "7d"
      const refreshMaxAge = rememberme ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
      const accessToken = createAccessToken({
         UserID: existingUser._id, isEmailVerified: existingUser.isEmailVerified
      })
      const sessionDoc = new session({
         UserID: existingUser._id, expiresAt: new Date(Date.now() + refreshMaxAge)
      })
      const refreshToken = createRefreshToken({ UserID: existingUser._id, sessionID: sessionDoc._id }, refreshExpires)
      sessionDoc.refreshToken = refreshToken
      await sessionDoc.save()
      res.cookie("refreshToken", refreshToken, getrefreshCookieOptions(refreshMaxAge))
      return res.status(200).json({ message: "successfully logged in ", accessToken, isEmailVerified: existingUser.isEmailVerified, email: existingUser.email })
   } catch (err) {
      console.log("internal server error", err)

   }
}

export const me = async (req, res) => {
   try {
      const { accessToken, refreshToken } = req.cookies

      if (accessToken) { const payload = verifyAccessToken(accessToken) 
         return res.json({ user: payload }) } 
      if (!refreshToken) { return res.status(401).json({ message: "authentication failed" }) } 
      const payload = verifyRefreshToken(refreshToken)
      const sessionDoc = await session.findById(payload.sessionID)
      if (!sessionDoc || sessionDoc.refreshToken !== refreshToken) {
         return res.status(401).json({ message: "authentication failed" })
      }
      const newAccessToken = createAccessToken({ UserID: payload.UserID })
      res.cookie("accessToken", newAccessToken, getaccessCookieOptions())

return res.json({accesToken:newAcessToken})   }
   catch (err) {
      console.log("internal server error", err)

   }
}

export const logout = async (req, res) => {
   try {
      const { refreshToken } = req.cookies
      if (refreshToken) {
         const payload = verifyRefreshToken(refreshToken)
         await session.findByIdAndDelete(payload.sessionID)
      }
      res.clearCookie("refreshToken")
      res.clearCookie("accessToken")
      res.json({ message: "logged out succesfully" })
   } catch (err) {
      console.log("internal server error", err)
   }
}

export const verifyEmail = async (req, res) => {
   try {
      console.log("VERIFY ROUTE HIT")
   console.log(req.body)
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
   } catch (err) {
      return res.status(500).json({ message: "internal server error" })
   }
}

export const forgotPassword = async (req, res) => {
   try {
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
   } catch (err){
      console.log(err)
      return res.status(500).json({ message: "internal server error" })

   }
}
export const resetPassword = async (req, res) => {
   try {
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

   } catch(err) {
      return res.status(500).json({ message: "internal server error" })
console.log(err)
   }
}

export const resendVerificationEmail = async (req, res) => {
   try {
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
   } catch (Err) {
      console.log(Err)
   }
}
export const googleLogin = async(req,res)=>{
   try{
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
   }catch(Err){
      console.log(Err)
   }
}