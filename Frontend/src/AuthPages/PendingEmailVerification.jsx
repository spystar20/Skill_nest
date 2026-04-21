import api from '@/utils/axios';
import React from 'react'
import toast from 'react-hot-toast'
import { IoIosMailUnread } from "react-icons/io";
import { useLocation, useSearchParams } from 'react-router-dom';

const PendingEmailVerification = () => {
const [searchParams] = useSearchParams()
const email = searchParams.get("email")
  console.log(email)
  
const handleRes = async () => {
  if(!email){
    return toast.error("Please provide email")
  }
    try {
      await api.post(
        "/auth/resend-verification-email",
        { email }
      )
      toast.success("Verification email sent again")
    } catch(err) {
      toast.error("Failed to resend email",err)
    }
  }
  return (
    <div className='bg-black w-full min-h-screen p-6 md:p-12 flex items-center justify-center'>
<div className='max-w-96 border glass shadow-2xl bg-white/80 border-gray-300 rounded-2xl p-6  flex flex-col gap-6 items-center justify-self-center'>
<span><IoIosMailUnread className="w-16 h-16 bg-black rounded-full p-3 text-white animate-pulse" /></span>
<div className='flex flex-col gap-2 justify-center items-center text-center w-10/12'>
    <h2 className='text-2xl font-semibold font-heading'>
        Verify Your Email
    </h2>
<p className='font-body text-center'>We’ve sent a verification link to your <strong className='italic '>{email}</strong>
Please check your inbox and click the link to continue.</p>
</div>
<button onClick={handleRes} className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>Resend Email</button>
</div>
    </div>
  )
}

export default PendingEmailVerification
