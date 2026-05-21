import { useAuth } from '@/context/AuthContext'
import { DropdownMenu } from 'radix-ui'
import React from 'react'
import { BsCamera, BsEye } from 'react-icons/bs'
import { FaFolder, FaRegFolder } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'

const Profile = () => {
    const { user } = useAuth()
    return (
        <div className='w-full bg-neutral-200 min-h-screen px-8 py-3 flex flex-col gap-6 '>
            <h2 className='text-3xl font-bold font-heading'>Account</h2>
            <div className='bg-white p-6 rounded-lg'>
                <h2 className='text-xl font-semibold capitalize font-heading'>profile</h2>
                <div className='p-3  relative group mx-auto w-fit cursor-pointer'>
                    <img src="https://i.pinimg.com/736x/b9/3b/1a/b93b1a8791d97e7296fc3db7a2d2f7cf.jpg" className='w-[130px] h-[130px]  rounded-full' alt="" />
                    <span className='bg-neutral-800 px-4 border border-neutral-700 py-0.5 rounded-4xl absolute text-white/80 flex gap-2 items-center justify-center text-lg bottom-0 cursor-pointer left-1/2 -translate-x-1/2'><BsCamera />Edit</span>
                    <div className='translate-x-1/2 -translate-y-full   text-white/80 bg-neutral-800 rounded-xl p-2 absolute  duration-300 transition-all ease-out scale-0  group-hover:scale-100 min-w-[220px]  opacity-0  group-hover:opacity-100'>
                        <div className='flex  items-center justify-start gap-3 hover:bg-neutral-200/10 rounded-lg cursor-pointer p-2 duration-100 ease-in transition-all group'><BsEye className='  text-xl ' /><span className='text-base font-normal'>View Photo</span></div>
                            <div className='flex group items-center justify-start gap-3 hover:bg-neutral-200/10 rounded-lg cursor-pointer p-2 duration-100 ease-in transition-all group '><FaRegFolder className='  text-xl  transition-all ease-in duration-200' /><span className='text-base font-normal'>Upload Photo</span></div>
                                <div className='flex group items-center justify-start gap-3 hover:bg-neutral-200/10 rounded-lg cursor-pointer p-2 duration-100 ease-in transition-all  '><ImBin className='  text-xl  ' /><span className='text-base font-normal'>Remove Photo</span></div>
                    </div > </div>
                  
                <div  className='p-3 border border-neutral-200 rounded-2xl mt-4' >
                    <h2 className='text-lg font-semibold capitalize font-heading' >Basic Information</h2>
                    <div>
                        <form action="get">
<div className='flex gap-4 max-w-2xl'>
<span className='flex gap-1 flex-col'>
    <label className='text-base text-black/70' >First Name</label>
    <input type="text" placeholder={user?.name} className='border-none placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus-within:border-2 focus:border focus:border-amber-300 focus-within:border-neutral-400 capitalize'/>
</span>
<span>
    <label >First Name</label>
    <input type="text" placeholder={user?.name} className=''/>
</span>
</div>
                        </form></div> </div>
            </div>

            
        </div>
    )
}

export default Profile