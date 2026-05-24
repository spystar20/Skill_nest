import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import React, { useState } from 'react'
import { PiPencil } from 'react-icons/pi'

const BasicInfo = () => {
        const { user ,} = useAuth()

        const [formData,setFormData]= useState({
            firstName:user?.name || "",lastName:user?.lastName || "",email:user?.email ||"",username:user?.username || '',
            DOB:user?.DOB || '', Location:user?.Location || "",Gender:user?.Gender|| "",Phone:user?.Phone|| "",Bio:user?.Bio||""
        })
        const [editing,setEditing] = useState(false)
        const handleUpdate = async()=>{
            try{
const res = await api.put('/auth/update/profile',formData,{withCredentials:true})
setEditing(false)
console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        const handleCancel = ()=>{
            setFormData({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    location: user?.location || "",
    bio: user?.bio || ""
  })
  setEditing(false)
        }
  return (
     <div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4' >
                    <div className='flex justify-between items-center'><h2 className='text-lg font-semibold capitalize font-heading' >Basic Information</h2> <span onClick={()=>setEditing(true)} className='bg-neutral-200 px-4 border border-black/15 py-0.5 rounded-4xl  text-black/70 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl  '><PiPencil />Edit</span> </div>

                    <form action="get" className='py-6 lg:max-w-10/12 flex flex-col gap-6'>
                        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >First Name</label>
                                <input  value={formData.firstName} onChange={(e)=>setFormData({...formData,firstName:e.target.value})} disabled={!editing} type="text"  className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Last Name</label>
                                <input value={formData.lastName} onChange={(e)=>setFormData({...formData,lastName:e.target.value})}  disabled={!editing}  type="text"  className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Email</label>
                                <input value={formData.email} onChange={(e)=>setFormData({...formData,Email:e.target.value})}  disabled={!editing}  type='email'  className='border disabled:bg-neutral-100 
  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  '/>
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})}  className='text-sm font-medium text-neutral-500 mb-1'>Username</label>
                                <input disabled={!editing}  type='text' placeholder='sanxshi' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>

                        </div>
                          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label  className='text-sm font-medium text-neutral-500 mb-1' >Date of birth</label>
                                <input value={formData.DOB} onChange={(e)=>setFormData({...formData,DOB:e.target.value})}  disabled={!editing}   type='date'  className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/></div> 
                            <div className='flex gap-1 flex-col'>

                                <label className='text-sm font-medium text-neutral-500 mb-1' >Gender</label>
                                <input value={formData.Gender} onChange={(e)=>setFormData({...formData,Gender:e.target.value})}  disabled={!editing}  type='text' placeholder='female' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  ' />
                            </div>

                        </div>
                        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Phone</label>
                                <input value={formData.Phone} onChange={(e)=>setFormData({...formData,Phone:e.target.value})}  disabled={!editing}  type='tel' placeholder='+91 7982461603' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/></div>
                            <div className='flex gap-1 flex-col'>

                                <label className='text-sm font-medium text-neutral-500 mb-1' >Location</label>
                                <input value={formData.Location} onChange={(e)=>setFormData({...formData,Location:e.target.value})}  disabled={!editing}  type='email' placeholder='delhi' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  ' />
                            </div>

                        </div>

                        <div className='grid  gap-12'>

                            <div className='flex gap-1 flex-col'>

                                <label className='text-sm font-medium text-neutral-500 mb-1' >Bio</label>

                                <textarea value={formData.Bio} onChange={(e)=>setFormData({...formData,Bio:e.target.value})}  disabled={!editing}  type='text'  className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-4 text-start  ' name="" id=""> </textarea>
                            </div>

                        </div>


                    </form>
                    <div onClick={()=>handleCancel()} className='flex gap-4 justify-end'>  <span className='bg-red-600 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Cancel</span> <span onClick={()=>handleUpdate()} className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Save</span></div>
                </div>
  )
}

export default BasicInfo