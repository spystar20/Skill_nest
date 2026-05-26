import { useAuth } from '@/context/AuthContext'
import { DropdownMenu } from 'radix-ui'
import React, { useState } from 'react'
import { BsBook, BsCamera, BsEye } from 'react-icons/bs'
import { FaAngleDoubleLeft, FaFolder, FaRegFolder } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { PiPencil } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import StudentStat from './StudentStat'
import BasicInfo from './BasicInfo'
import ProfessionalForm from './ProfessionalForm'

const Profile = () => {
    const { user } = useAuth()

    return (
        
        <div className='w-full bg-neutral-200 min-h-screen px-2 md:px-8 py-3 flex flex-col gap-6 '>
           <div className='flex justify-between items-center'> <h2 className='text-3xl font-bold font-heading'>Account</h2><Link to='/'><span className='cursor-pointer flex gap-2 items-center hover:scale-105 duration-300 transition-all ease-in'><FaAngleDoubleLeft />Back to Home</span></Link></div>
            <div className='bg-white p-2 md:p-6 rounded-lg'>
                <h2 className='text-xl font-semibold capitalize font-heading'>{user?.name}'s profile</h2>
                <div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4 gap-7 grid grid-cols-1 lg:grid-cols-2'>
                <div className='flex  flex-col items-center justify-center gap-2'>
                    <div className=' relative group w-fit cursor-pointer'>
                        <img src="https://i.pinimg.com/736x/b9/3b/1a/b93b1a8791d97e7296fc3db7a2d2f7cf.jpg" className='w-[130px] h-[130px]  rounded-full' alt="" />
                        <span className='bg-neutral-800 px-4 border border-neutral-700 py-0.5 rounded-4xl absolute text-white/80 flex gap-2 items-center justify-center text-lg bottom-0 cursor-pointer left-1/2 -translate-x-1/2'><BsCamera />Edit</span>
                        <div className='translate-x-1/2 -translate-y-full   text-white/80 bg-neutral-800 rounded-xl p-2 absolute  duration-300 transition-all ease-out scale-0  group-hover:scale-100 min-w-[220px]  opacity-0  group-hover:opacity-100'>
                            <div className='flex  items-center justify-start gap-3 hover:bg-neutral-200/10 rounded-lg cursor-pointer p-2 duration-100 ease-in transition-all group'><BsEye className='  text-xl ' /><span className='text-base font-normal'>View Photo</span></div>
                            <div className='flex group items-center justify-start gap-3 hover:bg-neutral-200/10 rounded-lg cursor-pointer p-2 duration-100 ease-in transition-all group '><FaRegFolder className='  text-xl  transition-all ease-in duration-200' /><span className='text-base font-normal'>Upload Photo</span></div>
                            <div className='flex group items-center justify-start gap-3 hover:bg-neutral-200/10 rounded-lg cursor-pointer p-2 duration-100 ease-in transition-all  '><ImBin className='  text-xl  ' /><span className='text-base font-normal'>Remove Photo</span></div>
                        </div >
                    </div>
                    <div className='text-center flex flex-col gap-1' >
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-neutral-500">{user?.email}</p>
                        <span className="text-sm block mx-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            Student
                        </span>
                    </div>
                </div>
<StudentStat/>
                </div>

          

<BasicInfo/>
<ProfessionalForm />
            </div>


        </div>




    )
}

export default Profile