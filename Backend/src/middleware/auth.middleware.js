import { auth } from "google-auth-library"
import jwt from "jsonwebtoken"
export const middleware = (req,res,next)=>{
    try{

  const token = req.cookies.accessToken; // ✅ use cookie

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

const decoded = jwt.verify(token,process.env.ACCESS_TOKEN)
req.user = decoded
next()
    }catch(err){
console.log(err)
    // return res.status(500).json({message:"invalid or expired token " , err})

    }
}