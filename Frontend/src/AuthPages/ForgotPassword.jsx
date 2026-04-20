import React, { useState } from 'react'
import login from '../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
 const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        if(!email){
            toast.error("insert email")
        }
      const res = await axios.post('http://localhost:3000/auth/forgot-password', { email })
         toast.success("OTP has been sent on your email")
        navigate(`/login/otp?email=${email}`)
    } catch (err) {
toast.error(err.response?.data?.message || "Login failed")    }
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
              <h2 className='font-semibold text-3xl text-slate-900 font-body capitalize'>Reset access <span className='italic text-transparent bg-clip-text  bg-gradient-to-br from-[#728ccd] to-[#364c84] font-[Merienda] '> in minutes</span> </h2>
              <p className='font-body max-w-lg'>Enter your registered email address and we’ll send a one-time verification code to help you reset your password securely.</p>
            </div>
            {/* form */}
            <div className='py-6  w-10/12 '>
              <div className=''>
                <form onSubmit={handleLogin} action="" className='font-body flex flex-col gap-5'>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-medium text-gray-800'>Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' className='border rounded-lg  border-gray-400 p-3 placeholder:capitalize hover:border-[#364c84]  ' placeholder='Enter your email address' />
                  </div>
                <div className='py-3'>
                  <button className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>Send OTP</button>
                </div>

              </form>
              <div className=' flex justify-center items-center mt-6'>
                <h6 className='font-heading text-base text-gray-600'>Remember your password? <span className='underline hover:italic cursor-pointer text-blue-900'><Link to="/login">Back to Login</Link></span></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div >
  )
}

export default ForgotPassword