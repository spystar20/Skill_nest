import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import React, { useEffect, useState } from 'react'
import { PiPencil } from 'react-icons/pi'
import { toast } from 'sonner'

const BasicInfo = () => {
    const { user, setUser } = useAuth()

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || "",
        username: user?.username || "",
        DOB: user?.DOB || "",
        Location: user?.Location || "",
        Gender: user?.Gender || "",
        Phone: user?.Phone || "",
        Bio: user?.Bio || ""
    })
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || "",
                username: user.username || "",
                DOB: user.DOB || "",
                Location: user.Location || "",
                Gender: user.Gender || "",
                Phone: user.Phone || "",
                Bio: user.Bio || ""

            })
        }
    }, [user])
    const [editing, setEditing] = useState(false)
    const handleUpdate = async () => {
        try {
            const res = await api.put('/auth/update/profile', formData, { withCredentials: true })
            setEditing(false),
                setUser(res.data.existingUser)
                toast.success('profile updated')
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            username: user?.username || '',
            Phone: user?.Phone || "",
            Gender: user?.Gender || "",
            DOB: user?.DOB || "",
            Location: user?.Location || "",
            Bio: user?.Bio || ""
        })
        setEditing(false)
    }
    return (
        <div className='md:px-6 px-2 py-4 border border-neutral-200 rounded-2xl mt-4' >
            <div className='flex md:justify-between items-center flex-wrap'><h2 className='text-lg font-semibold capitalize font-heading' >Basic Information</h2> <span onClick={() => setEditing(true)} className={`bg-neutral-200 px-3 md:px-4 border border-black/15 py-0.5 rounded-4xl text-sm gap-1 text-black/70 flex md:gap-2 items-center justify-center md:text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl  ${editing? 'opacity-0  -translate-x-4':'opacity-100  translate-x-4  '} `}><PiPencil />Edit</span> </div>

            <form action="get" className='py-6 lg:max-w-10/12 flex flex-col gap-6'>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                    <div className='flex gap-1 flex-col'>
                        <label className='text-sm font-medium text-neutral-500 mb-1' >First Name</label>
                        <input value={formData.firstName} disabled={!editing} type="text" className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2 capitalize' />
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <label className='text-sm font-medium text-neutral-500 mb-1'>Last Name</label>
                        <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} disabled={!editing} type="text" className='border disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                    <div className='flex gap-1 flex-col'>
                        <label className='text-sm font-medium text-neutral-500 mb-1' >Email</label>
                        <input value={user?.email || ''} disabled type='email' className='border disabled:bg-neutral-100 
  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  '/>
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <label className='text-sm font-medium text-neutral-500 mb-1'>Username</label>
                        <input value={formData.username || ''} onChange={(e) => setFormData({ ...formData, username: e.target.value })} disabled={!editing} type='text' placeholder='sanxshi' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/>
                    </div>

                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                    <div className='flex gap-1 flex-col'>
                        <label className='text-sm font-medium text-neutral-500 mb-1' >Date of birth</label>
                        <input value={formData.DOB || ''} onChange={(e) => setFormData({ ...formData, DOB: e.target.value })} disabled={!editing} type='date' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/></div>
                    <div className='flex gap-1 flex-col'>

                        <label className='text-sm font-medium text-neutral-500 mb-1' >Gender</label>
                        <input value={formData.Gender || ''} onChange={(e) => setFormData({ ...formData, Gender: e.target.value })} disabled={!editing} type='text' placeholder='female' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  ' />
                    </div>

                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12'>
                    <div className='flex gap-1 flex-col'>
                        <label className='text-sm font-medium text-neutral-500 mb-1' >Phone</label>
                        <input value={formData.Phone || ''} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} disabled={!editing} type='tel' placeholder='+91 7982461603' className='border disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 
 rounded-2xl px-3 py-2 capitalize
'/></div>
                    <div className='flex gap-1 flex-col'>

                        <label className='text-sm font-medium text-neutral-500 mb-1' >Location</label>
                        <input value={formData.Location || ''} onChange={(e) => setFormData({ ...formData, Location: e.target.value })} disabled={!editing} type='text' placeholder='delhi' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-2  ' />
                    </div>

                </div>

                <div className='grid  gap-12'>

                    <div className='flex gap-1 flex-col'>

                        <label className='text-sm font-medium text-neutral-500 mb-1' >Bio</label>

                        <textarea value={formData.Bio || ''} onChange={(e) => setFormData({ ...formData, Bio: e.target.value })} disabled={!editing} type='text' className='border capitalize disabled:bg-neutral-100   placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-2xl px-3 py-4 text-start  ' name="" id=""> </textarea>
                    </div>

                </div>


            </form>
            {editing && (

    
            <div className='flex gap-4 justify-end'> 
                 <span onClick={() => handleCancel()} className='bg-red-600 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Cancel</span> 
                 <span onClick={() => handleUpdate()} className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Save</span></div>
       
        )}
         </div>
    )
}

export default BasicInfo