import React, { useState } from 'react'
import otpImage from '../assets/graphic.png'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp"
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
const Otp = () => {
  const [otp,setotp] = useState("")
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")
  const navigate = useNavigate()
  const handleVerify = ()=>{
    if(otp.length !== 6){
     return toast.error("Invalid OTP")
    }
    navigate(`/reset-password?email=${email}&otp=${otp}`)
  }
  return (
    <div className='w-full min-h-screen flex  flex-col items-center justify-center bg-black px-4 py-6 md:py-32 md:px-12'>
      <div className='bg-white/85  grid grid-cols-1 md:grid-cols-2 p-3 md:p-6 rounded-2xl'>
      <div className='hidden lg:flex flex-col items-start justify-end box rounded-2xl p-16'>
        <img className='login w-[516px]' src={otpImage} alt="" />
<div className='text-white flex flex-col gap-2 '>
  <h6 className='font-body font-semibold text-sm capitalize '>Lorem ipsum dolor sit amet.</h6>
  <h2 className='font-heading font-bold text-5xl'>Lorem ipsum dolor sit amet Lorem, ipsum dolor.</h2>
</div>
      </div>
      <div className='flex flex-col items-center justify-center '>  
      <div className=' md:max-w-xl flex flex-col gap-6 md:p-12 font-body'>
        {/* heading */}
<div className='flex flex-col gap-4 md:py-4 '>
  <h2 className='font-semibold text-3xl text-slate-900 font-body capitalize'>Enter verification  <span className='italic text-transparent bg-clip-text  bg-gradient-to-br from-[#728ccd] to-[#364c84] font-[Merienda] '> code</span> </h2>
  <p className='font-body max-w-lg text-center'>We’ve sent a 6-digit code to  {email} reset your password</p>
</div>
{/* form */}
<div className='md:py-6  md:w-10/12 '>
  <div className='flex flex-col items-center'>
 
<InputOTP maxLength={6} value={otp} onChange={(value)=>setotp(value)} >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />

        </InputOTPGroup>
      </InputOTP>
  <div className='py-3 mt-3 md:my-4 w-full flex items-center'>
       <button onClick={handleVerify} className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>Verify </button>
  </div>
  </div>
</div> 
      </div>
      </div>
      </div>
      </div>
  )
}

export default Otp