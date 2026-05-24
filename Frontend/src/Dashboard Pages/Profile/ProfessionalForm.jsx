import { useAuth } from '@/context/AuthContext'
import React from 'react'
import  { PiPencil } from 'react-icons/pi'
  

const ProfessionalForm = () => {
      const { user } = useAuth()
  return (

<div className='px-6 py-4 border border-neutral-200 rounded-2xl mt-4'>
<div className='flex justify-between items-center'><h2 className='text-lg font-semibold capitalize font-heading' >Professional Information</h2> <span className='bg-neutral-200 px-4 border border-black/15 py-0.5 rounded-4xl  text-black/70 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '><PiPencil />Edit</span> </div>
<form action="get" className='py-6 lg:max-w-10/12 flex flex-col gap-6'>
 <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Professional Title
</label>
                                <input disabled type="text" placeholder='Senior MERN Developer' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Experience
</label>
                                <input disabled type="text" placeholder='3 Years'className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                         <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Specialization

</label>
                                <input disabled type="text" placeholder='web development' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Organization

</label>
                                <input disabled type="text" placeholder='personal'className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
                           <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1' >Website


</label>
                                <input disabled type="url" placeholder='https://portfolio.com ' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <label className='text-sm font-medium text-neutral-500 mb-1'>Linkdin

</label>
                                <input disabled type="url" placeholder='linkedin.com/in/username'className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                            </div>
                        </div>
</form>
  <div className='flex gap-4 justify-end'>  <span className='bg-red-600 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Cancel</span> <span className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Save</span></div>
                
</div>
  )
}

export default ProfessionalForm