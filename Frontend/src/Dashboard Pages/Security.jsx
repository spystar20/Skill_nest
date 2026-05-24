import { useAuth } from '@/context/AuthContext'
import React from 'react'
import {  BsCamera, BsCheck, BsEye } from 'react-icons/bs'
import {  FaRegFolder } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import { PiPencil } from 'react-icons/pi'
const Security = () => {
    const {user} = useAuth()

  return (
 <div className='w-full bg-neutral-200 min-h-screen px-2 md:px-8 py-3 flex flex-col gap-6 '>
                 <div className='flex justify-between items-center'> <h2 className='text-3xl font-bold font-heading'>Account</h2><Link to='/'><span className='cursor-pointer flex gap-2 items-center hover:scale-105 duration-300 transition-all ease-in'><FaAngleDoubleLeft />Back to Home</span></Link></div>
            <div className='bg-white p-6 rounded-lg'>
                <h2 className='text-xl font-semibold capitalize font-heading'>Account Security</h2>
                <div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4 gap-7 flex flex-col'>
               <div className='flex justify-between items-center w-full '>
    <span>
<h2 className='text-lg font-semibold font-heading mb-1'>Email Verification</h2>
<p className='font-body max-w-lg text-sm'>Your email address has been verified. Verified accounts enjoy enhanced security and account recovery options.</p>
</span>
<button className='cursor-pointer px-2 py-2 text-2xl   bg-green-200/80 rounded-full text-green-800 '><BsCheck/></button>
</div>

<div className='flex justify-between items-center w-full '>
    <span>
<h2 className='text-lg font-semibold font-heading mb-1'>Change Password</h2>
<p className='font-body max-w-lg text-sm'>Update your password regularly to keep your account secure. Choose a strong password that you don't use elsewhere.</p>
</span>
<button className='cursor-pointer px-4 py-2 hover:bg-black  bg-black/80 text-white rounded-sm'>Change Password</button>
</div>
<div className='flex justify-between items-center w-full '>
    <span>
<h2 className='text-xl font-semibold font-heading mb-1 text-red-600'>Delete Account</h2>
<p className='font-body max-w-lg text-sm'>Permanently delete your account and all associated data. This action cannot be undone and your progress, certificates, and enrolled courses may be lost.</p>
</span>
<button className='cursor-pointer px-6 py-2 hover:bg-red-800  bg-red-700/80 text-white rounded-sm'>Delete Account</button>
</div>
                </div>
              

            </div>


        </div>
  )
}

export default Security