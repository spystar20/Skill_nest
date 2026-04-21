import React, { useEffect, useState } from 'react'
import { MdMarkEmailRead } from 'react-icons/md'
import { ImCross } from "react-icons/im";
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import api from '@/utils/axios';
const VerifyEmail = () => {
    const [state,setState] = useState("loading")
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()

useEffect(()=>{
const verifymail = async ()=>{
try{
if(!token){
    setState("error")
    toast.error("token not found ")
    return
}
 await api.post("/auth/verify-email",{token})
 setState("success")
setTimeout(() => {
    navigate('/login')
}, 3000);
}catch{
toast.error("error occured")

    }}
verifymail()}, [token,navigate])
  return (
    <div className='bg-black w-full min-h-screen p-6 md:p-12 flex items-center justify-center'>
{state ==="loading" &&(
        <div className='max-w-96 border glass shadow-2xl bg-white/80 border-gray-300 rounded-2xl p-6  flex flex-col gap-6 items-center justify-self-center'>

<div className='flex flex-col gap-2 justify-center items-center text-center w-10/12'>
    <h2 className='text-2xl font-semibold font-heading'>
              Verifying your email...
    </h2>
<p className='font-body text-center'>Please wait while we confirm your email address.</p>
</div>

        </div>
        )}

        {state==="success" &&(
<div className='max-w-96 border glass shadow-2xl bg-white/80 border-gray-300 rounded-2xl p-6  flex flex-col gap-6 items-center justify-self-center'>
    <span><MdMarkEmailRead className="w-16 h-16 bg-black rounded-full p-3 text-white animate-pulse" /></span>
<div className='flex flex-col gap-2 justify-center items-center text-center w-10/12'>
    <h2 className='text-2xl font-semibold font-heading'>
              Email verified successfully
    </h2>
<p className='font-body text-center'> Your account is now fully active. Redirecting you...
</p>
</div>
<Link to="/"><button className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>              Go to Home
</button></Link>

</div>)}

        {state==="error" &&(

<div className=' max-w-96 border glass shadow-2xl bg-white/80 border-gray-300 rounded-2xl p-6  flex flex-col gap-6 items-center justify-self-center'>
<span><ImCross className="w-16 h-16 bg-red-600 rounded-full p-3 text-white animate-pulse" /></span>
<div className='flex flex-col gap-2 justify-center items-center text-center w-10/12'>
    <h2 className='text-2xl font-semibold font-heading '>
              Verification failed
    </h2>
<p className='font-body text-center'> This link is invalid or has expired.
</p>
</div>
<Link to="/signup"><button className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>              Back to Signup
</button></Link>
</div>
)}
    </div>
   
  )
}

export default VerifyEmail
