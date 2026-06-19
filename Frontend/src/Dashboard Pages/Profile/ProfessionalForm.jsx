import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import React, { use, useEffect, useState } from 'react'
import  { PiPencil } from 'react-icons/pi'
  

const ProfessionalForm = () => {
      const { user,setUser } = useAuth()
      const [formData,setFormData]= useState({
        title:user?.title,experience:user?.experience ||'',specialization:user?.specialization || '',organization:user?.organization||'',website:user?.website||'',linkdin:user?.linkdin||''
      })
      const [editing,setEditing] = useState(false)
      useEffect(()=>{
        if(user){
            setFormData({
                 title:user?.title,experience:user?.experience ||'',specialization:user?.specialization || '',organization:user?.organization||'',website:user?.website||'',linkdin:user?.linkdin||''
            })
        }
      },[user])
      const handleCancel = async()=>{
        setFormData({
               title:user?.title,experience:user?.experience ||'',specialization:user?.specialization || '',organization:user?.organization||'',website:user?.website||'',linkdin:user?.linkdin||''
        })
        setEditing(false)
      }
      const handleUpdate = async()=>
        {
        try{
const res = await api.put('/teacher/update/Teacher-Profile',formData,{ withCredentials:true})
setUser(prev => ({
  ...prev,
  ...res.data.Teacher
}))
 setEditing(false)
        }catch(err){
            console.log(err)
        }
      }
  return (

<div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4 '>
<div className='flex justify-between items-center'><h2 className='text-lg font-semibold capitalize font-heading' >Professional Information</h2> <span onClick={()=>setEditing(true)} className='bg-neutral-200 px-4 border border-black/15 py-0.5 rounded-4xl  text-black/70 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '><PiPencil />Edit</span> </div>
<form action="get" className='py-6 lg:max-w-10/12 flex flex-col gap-6'>
 <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Professional Title
</label>
                                <input disabled={!editing} type="text" value={formData.title || ''} onChange={(e)=>setFormData({...formData,title:e.target.value})} className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Experience
</label>
                                <input value={formData.experience || ''} onChange={(e)=>setFormData({...formData,experience:e.target.value})} disabled={!editing} type="text" className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                         <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Specialization

</label>
                                <input value={formData.specialization || ''} onChange={(e)=>setFormData({...formData,specialization:e.target.value})} disabled={!editing} type="text" className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Organization

</label>
                                <input disabled={!editing} value={formData.organization || ''} onChange={(e)=>setFormData({...formData,organization:e.target.value})} type="text" className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                           <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Website


</label>
                                <input disabled={!editing} type="url" value={formData.website || ''} onChange={(e)=>setFormData({...formData,website:e.target.value})}   className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Linkdin

</label>
                                <input value={formData.linkdin || ''} onChange={(e)=>setFormData({...formData,linkdin:e.target.value})} disabled={!editing} type="url" placeholder='linkedin.com/in/username'className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
</form>
  <div className='flex gap-4 justify-end'>  <span onClick={()=>handleCancel()} className='bg-red-600 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Cancel</span> <span onClick={()=>handleUpdate()} className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Save</span></div>
                
</div>
  )
}

export default ProfessionalForm

