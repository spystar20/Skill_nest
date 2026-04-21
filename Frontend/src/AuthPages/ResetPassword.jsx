import React, { useState } from 'react'
import login from '../assets/login.png'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '@/utils/axios'
const ResetPassword = () => {
  const [newpassword, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [searchParams]= useSearchParams()
    const email = searchParams.get("email")
    const otp = searchParams.get("otp")
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    if(!ConfirmPassword || !newpassword){
      return toast.error("All fields are required")
    }
    if(ConfirmPassword !== newpassword){
      return toast.error("Passwords do not match")
    }
    try {
      const res = await api.post('/auth/reset-password', { email, otp,newpassword }, { withCredentials: true })
      console.log(res)
   toast.success("Password updated successfully")
   setTimeout(()=>{
navigate('/login')
   },2000)
    } catch (err) {
toast.error(err.response?.data?.message || "Reset failed")    }
  }
  return (

    <div className='w-full bg-black py-32 px-12'>
      <div className='bg-white/85  grid grid-cols-2 p-6 rounded-2xl'>
        <div className='flex flex-col items-start justify-end box rounded-2xl p-16'>
          <img className='login w-[516px]' src={login} alt="" />
          <div className='text-white flex flex-col gap-2 '>
            <h6 className='font-body font-semibold text-sm capitalize '>Lorem ipsum dolor sit amet.</h6>
            <h2 className='font-heading font-bold text-5xl'>Lorem ipsum dolor sit amet Lorem, ipsum dolor.</h2>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className=' max-w-xl flex flex-col p-12 font-body'>
            {/* heading */}
            <div className='flex flex-col gap-4 py-4 '>
              <h2 className='font-semibold text-3xl text-slate-900 font-body capitalize'>Set new <span className='italic text-transparent bg-clip-text  bg-gradient-to-br from-[#728ccd] to-[#364c84] font-[Merienda] '>  password </span> </h2>
              <p className='font-body max-w-lg'>Your identity has been confirmed. Enter your new password below.</p>
            </div>
            {/* form */}
            <div className='py-6  w-10/12 '>
              <div className=''>
                <form onSubmit={handleLogin} action="" className='font-body flex flex-col gap-5'>

                
                  <div className='flex flex-col gap-1'>
<label htmlFor="password" className='font-medium text-gray-800'>New Password</label>  
                    <input value={newpassword} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className='border rounded-lg  border-gray-400 p-3 placeholder:capitalize hover:border-[#364c84]  ' placeholder='Enter your new password' />
                  </div>
                    <div className='flex flex-col gap-1'>
<label htmlFor="password" className='font-medium text-gray-800'>Confirm Password</label>  
                    <input value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="Confirm-password" className='border rounded-lg  border-gray-400 p-3 placeholder:capitalize hover:border-[#364c84]  ' placeholder='Re-enter your new password' />
                  </div>
            
                <div className='py-3'>
                  <button className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>Update Password</button>
                </div>

              </form>
             
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </div >
  )
}

export default ResetPassword