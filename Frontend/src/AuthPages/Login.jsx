import React, { useState } from 'react'
import login from '../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberme, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password, rememberme }, { withCredentials: true })
      console.log(res)
      if (res.data.isEmailVerified !== true) {
        navigate('/pending-email-verification'),{state:{email:res.data.email}}

      }else{
        navigate('/')
      toast.success("Login Successfull")

      }
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
              <h2 className='font-semibold text-3xl text-slate-900 font-body capitalize'>Log in to <span className='italic text-transparent bg-clip-text  bg-gradient-to-br from-[#728ccd] to-[#364c84] font-[Merienda] '> your account</span> </h2>
              <p className='font-body max-w-lg'>Join thousands of learners building skills in tech, design, and business. Learn at your own pace with expert-led courses.</p>
            </div>
            {/* form */}
            <div className='py-6  w-10/12 '>
              <div className=''>
                <form onSubmit={handleLogin} action="" className='font-body flex flex-col gap-5'>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-medium text-gray-800'>Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' className='border rounded-lg  border-gray-400 p-3 placeholder:capitalize hover:border-[#364c84]  ' placeholder='Enter your email address' />
                  </div>
                  <div className='flex flex-col gap-1'>
                                      <div className='flex justify-between items-center'>
<label htmlFor="password" className='font-medium text-gray-800'>Password</label>   <Link to="/forgot-password"> <span className='hover:underline text-sm italic cursor-pointer text-blue-900'>Forgot Password ?</span></Link> 
                </div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className='border rounded-lg  border-gray-400 p-3 placeholder:capitalize hover:border-[#364c84]  ' placeholder='Enter your full Password' />
                  </div>
                  <label className="flex items-center" >
  <input
    type="checkbox"
                  className="mr-2 size-3"
                  checked={rememberme}
                  onChange={(e) => setRememberMe(e.target.checked)}
  />
                  Remember Me
                </label>
            
                <div className='py-3'>
                  <button className='w-full transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-body  cursor-pointer text-white rounded-xl py-2.5 px-5 text-lg box capitalize font-medium hover:scale-95'>Log In</button>
                </div>

              </form>
              {/* social login  */}
              <div className='flex flex-col'>
                <div className='flex items-center justify-center gap-3 my-4 px-12'><span className='flex-1 h-px bg-gray-500'></span><span className='text-sm text-gray-700 capitalize'>or continue with</span><span className='flex-1 h-px bg-gray-500'></span></div>
                {/* social login */}
                <div className='flex gap-3 items-center justify-center '>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRd6qY47iHxIp0wyHdmkwiVUzUXV4rBzTtNQ&s" className='rounded-full w-7 h-7 cursor-pointer hover:scale-110 hover:brightness-110 transition-all ease-in duration-100' alt="google" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" className='rounded-full w-7 h-7 cursor-pointer hover:scale-110 hover:brightness-110 transition-all ease-in duration-100' alt="google" />
                  <img src="https://img.freepik.com/premium-vector/instagram-vector-logo-icon-social-media-logotype_901408-392.jpg?semt=ais_hybrid&w=740&q=80" className='rounded-full w-7 h-7 cursor-pointer hover:scale-110 hover:brightness-110 transition-all ease-in duration-100' alt="google" />
                </div>
              </div>
              {/* login */}
              <div className=' flex justify-center items-center mt-6'>
                <h6 className='font-heading text-base text-gray-600'>Don't have an account ? <span className='underline hover:italic cursor-pointer text-blue-900'><Link to="/signup">SignUp</Link></span></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div >
  )
}

export default Login