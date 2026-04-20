import jwt from 'jsonwebtoken'
export const createAccessToken = (payload)=>{
return jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:"1d"})
}
export const createRefreshToken = (payload,expiresIn)=>{
return jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn})
}
export const verifyAccessToken = (payload)=>{
return jwt.verify(payload,process.env.ACCESS_TOKEN)
}

export const verifyRefreshToken = (payload)=>{
return jwt.verify(payload,process.env.REFRESH_TOKEN)
}
