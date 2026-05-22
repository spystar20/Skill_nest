import { useAuth } from '@/context/AuthContext'
import { DropdownMenu } from 'radix-ui'
import React from 'react'
import { BsBook, BsCamera, BsEye } from 'react-icons/bs'
import { FaFolder, FaRegFolder } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import { PiPencil } from 'react-icons/pi'

const Profile = () => {
    const { user } = useAuth()
    return (
        <div className='w-full bg-neutral-200 min-h-screen px-8 py-3 flex flex-col gap-6 '>
            <h2 className='text-3xl font-bold font-heading'>Account</h2>
            <div className='bg-white p-6 rounded-lg'>
                <h2 className='text-xl font-semibold capitalize font-heading'>{user?.name}'s profile</h2>
                <div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4 grid grid-cols-2'>
                <div className='flex flex-col items-center justify-center gap-2'>
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

<ul className='bg-[#0a1931] text-white rounded-2xl p-6 flex flex-col gap-4 shadow-lg'>
  <li className='flex justify-between items-center border-b border-white/10 pb-3'>
    <span className='text-white/70'>Enrolled Courses</span>
    <span className='text-xl font-bold'>12</span>
  </li>

  <li className='flex justify-between items-center border-b border-white/10 pb-3'>
    <span className='text-white/70'>Completed Courses</span>
    <span className='text-xl font-bold'>8</span>
  </li>

  <li className='flex justify-between items-center border-b border-white/10 pb-3'>
    <span className='text-white/70'>Certificates Earned</span>
    <span className='text-xl font-bold'>5</span>
  </li>

  <li className='flex justify-between items-center'>
    <span className='text-white/70'>Hours Learned</span>
    <span className='text-xl font-bold'>42</span>
  </li>
</ul>
                </div>
                <div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4' >
                    <div className='flex justify-between items-center'><h2 className='text-lg font-semibold capitalize font-heading' >Basic Information</h2> <span className='bg-neutral-200 px-4 border border-black/15 py-0.5 rounded-4xl  text-black/70 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '><PiPencil />Edit</span> </div>

                    <form action="get" className='py-6 max-w-10/12 flex flex-col gap-6'>
                        <div className='grid grid-cols-2 gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >First Name</label>
                                <input disabled type="text" placeholder={user?.name} className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>First Name</label>
                                <input disabled type="text" placeholder={user?.name} className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Email</label>
                                <input disabled type='email' placeholder={user?.email} className='border disabled:bg-neutral-100 
  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  '/>
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Username</label>
                                <input disabled type='text' placeholder='sanxshi' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Phone</label>
                                <input disabled type='tel' placeholder='+91 7982461603' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/></div>
                            <div className='flex gap-1 flex-col'>

                                <label className='text-sm font-medium text-neutral-500 mb-1' >Location</label>
                                <input disabled type='email' placeholder='delhi' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  ' />
                            </div>

                        </div>

                        <div className='grid  gap-12'>

                            <div className='flex gap-1 flex-col'>

                                <label className='text-sm font-medium text-neutral-500 mb-1' >Bio</label>

                                <textarea disabled type='text' value='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellendus aperiam optio explicabo numquam adipisci doloribus ipsum iste asperiores distinctio. Perferendis, consequuntur necessitatibus!' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-4 text-start  ' name="" id=""> </textarea>
                            </div>

                        </div>


                    </form>
                    <div className='flex gap-4 justify-end'>  <span className='bg-red-600 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Cancel</span> <span className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Save</span></div>
                </div>
            </div>
<div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4'>
     <div className='flex justify-between items-center'><h2 className='text-lg font-semibold capitalize font-heading' >Basic Information</h2> <span className='bg-neutral-200 px-4 border border-black/15 py-0.5 rounded-4xl  text-black/70 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '><PiPencil />Edit</span> </div>
</div>

        </div>
    )
}

export default Profile