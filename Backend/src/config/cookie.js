export const getaccessCookieOptions = ()=>({
httpOnly:true,sameSite:"lax",secure:false,maxAge:15*60*1000
})
export const getrefreshCookieOptions = (maxAge)=>({
httpOnly:true,sameSite:"lax",secure:false,maxAge
})