import { auth } from "google-auth-library"
import jwt from "jsonwebtoken"
export const middleware = (req,res,next)=>{
    try{
const authHeader = req.headers.authorization
if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message:"invalid token "})
}
const token = authHeader.split(" ")[1]
const decoded = jwt.verify(token,process.env.ACCESS_TOKEN)
req.user = decoded
next()
    }catch(err){

    return res.status(500).json({message:"invalid or expired token " , err})

    }
}