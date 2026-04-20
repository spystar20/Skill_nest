import jwt from 'jsonwebtoken'
export const createEmailToken = (payload)=>{
return jwt.sign(payload,process.env.EMAIL_VERIFY_SECRET,{expiresIn:"15m"})
}
export const verifyEmailToken = (payload)=>{
return jwt.verify(payload,process.env.EMAIL_VERIFY_SECRET,)
}
