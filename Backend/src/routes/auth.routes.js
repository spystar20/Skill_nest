import express from "express"
const router = express.Router()
import { signup,Login,logout,me,verifyEmail,forgotPassword,resetPassword, resendVerificationEmail, googleLogin } from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"
import passport from "passport"

router.post('/sign',signup)
router.post("/login",Login)
router.post("/logout",middleware,logout)
router.get("/me",middleware,me)
router.post("/verify-email",verifyEmail)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword)
router.post("/resend-verification-email",resendVerificationEmail)
router.get("/google",passport.authenticate("google",{scope:["profile","email"],session:false}))
router.get('/google/callback',passport.authenticate("google",{session:false,failureRedirect:"https://skillnest-opal.vercel.app/"}),googleLogin)

export default router

