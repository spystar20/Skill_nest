import jwt from 'jsonwebtoken'
export const optionalAuth = async(req,res,next)=>{
try{
const token = req.cookies?.accessToken
if(!token){
    req.user = null
    return next()
}
const decoded = jwt.verify(token,process.env.ACCESS_TOKEN)
 req.user = decoded
 next()
}catch(err){
    console.log(err)
return res.status(401).json({message:'invalid or expired token'})
}}