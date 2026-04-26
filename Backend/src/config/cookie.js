export const getaccessCookieOptions = ()=>({
httpOnly:true,sameSite:"none",secure:true,maxAge:15*60*1000
})
export const getrefreshCookieOptions = (maxAge)=>({
httpOnly:true,sameSite:"none",secure:true,maxAge
})