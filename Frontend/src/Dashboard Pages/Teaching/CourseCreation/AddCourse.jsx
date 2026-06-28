import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import api from '@/utils/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { RxCross1 } from 'react-icons/rx'
import Dataset from '@/utils/Dataset'
import Loader from '@/utils/Loader'
const AddCourse = () => {
const [loading,setLoading] = useState(false)
const [error,setError] = useState(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '', desc: '', category: '', priceType: '', price: '', difficulty: ''
  })
  const [thumbnail, setThumbnail] = useState('')
const [ preview,setPreview] = useState('')
  const handleSubmit = async () => {
    try {
            setLoading(true)
      const form = new FormData()
      form.append("title", formData.title)
      form.append("desc", formData.desc)
      form.append("category", formData.category)
      form.append("priceType", formData.priceType)
      form.append("price", formData.price)
      form.append("difficulty", formData.difficulty)
      form.append("thumbnail", thumbnail)
     
      const res = await api.post('/course/createNew', form, { withCredentials: true })
      toast.success("course uploaded succesfully")
      setTimeout(() => {
        navigate(`/dashboard/teacher/courses/${res.data.newCourse._id}/edit`)
      }, 1000);
   
    } catch (err) {
setError(err.response.data?.message || 'something went wrong')    }finally{setLoading(false)}
  }
const handlePreview = (e)=>{
const file = e.target.files[0]
if(!file) return
const allowedTypes = [  "image/jpeg",
  "image/png",
  "image/webp"]
  if(!allowedTypes.includes(file.type)){
    return toast.error("invalid file type")
  }
  if(file.size > 2*1024*1024){
        return toast.error("limit exceeds")

  }
setThumbnail(file)
if(file){
setPreview(URL.createObjectURL(file))
}
}

  const Level = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
  ]
  const Price = [
    { value: 'Free', label: 'Free' },
    { value: 'Paid', label: 'Paid' },

  ]
  const ExpertiseOpt = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' }
  ]
  return (
    
    <div className=' min-h-screen w-full bg-white/90 px-4 py-6 md:py-12 md:px-12 box-border items-center flex justify-center'>
   
      <div className='flex flex-col bg-white/85   md:w-2/3  rounded-lg gap-4'>
{loading && <Loader />}
        <div className='flex flex-col gap-12 p-6'>


          <>
            <div >
              <h2 className='font-heading text-2xl font-semibold'>
                Create Your Course</h2>
              <p className='mt-2 font-body text-neutral-700'>Set up the basic information for your course. This will be visible to students.</p>
            </div>
            <form action="" className='w-full gap-3 flex flex-col'>
              <div className='grid grid-cols-2 gap-6 mb-2'>
                <div className='flex flex-col gap-3 justify-start'>
                  <div className='flex gap-1 flex-col'>
                    <label className='text-lg font-medium text-neutral-900 mb-1' >Course Title
                    </label>
                    <input value={formData.title} placeholder='e.g. Complete React Development Bootcamp' onChange={(e) => setFormData({ ...formData, title: e.target.value })} type='text' className='border placeholder:text-neutral-400  border-black/20 disabled:bg-neutral-100  placeholder:text-sm  focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 ' />
                  </div>
                  <div className='flex gap-1 flex-col'>
                    <label className='text-lg font-medium text-neutral-900 mb-1' >Short Description
                    </label>
                    <textarea value={formData.desc} placeholder='Write a short summary of your course (1–2 lines)' onChange={(e) => setFormData({ ...formData, desc: e.target.value })} type='text' className='border placeholder:text-neutral-400  border-black/20 disabled:bg-neutral-100  placeholder:text-sm  focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 ' />
                  </div>
                  {/* <div className='flex gap-1 flex-col'>
                    <label className='text-lg font-medium text-neutral-900 mb-1'>
                      Estimated Duration
                    </label>
                    <input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      type='text'
                      placeholder='e.g. 10 Hours'
                      className='border border-black/20 rounded-lg px-3 py-2'
                    />
                  </div> */}
                </div>
                 <div className='border-2 border-black/60 border-dashed rounded-lg p-5 flex flex-col items-center justify-center'>
                {!preview ? (
            
              <>
                  <img src="https://i.pinimg.com/1200x/ae/3f/c0/ae3fc0a9ed8e7f4edb630e7492ee22bd.jpg" className='w-34 h-34 opacity-90' alt="" />

                  <h2 className='font-medium text-neutral-700 text-lg'>Drop your image here or <span className='text-blue-500'>Browse</span></h2>
                  <label className='bg-black px-3 py-1 text-white mt-2 rounded-sm cursor-pointer'>Choose Image
                  <input type="file"  className='hidden' onChange={handlePreview} />
                
                  </label>
                 </>
               
                 ):(
          <div className='w-full flex flex-col gap-3 '>

                    <img src={preview} className='w-full h-60 rounded-lg object-cover' alt="" />
                     <div className='border rounded-lg w-full p-3 justify-between flex items-center'>
                      <span className='flex flex-col'>
                    <span className='text-sm truncate capitalize text-wrap '>{thumbnail.name}</span>
                    <span className='text-xs'>{(thumbnail.size/1024/1024).toFixed(2)}MB</span>
</span>
                    <RxCross1  onClick={()=>{setPreview(''),setThumbnail(null)}}/>
                  </div>    
                  </div>              
              )}
               </div>
              </div>
             
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 '>
                <div className='flex gap-1 flex-col '>
                  <label className='text-lg font-medium text-neutral-900 mb-1' > Category
                  </label>
                  <CreatableSelect onChange={(selected) => setFormData({ ...formData, category: selected?.value || '' })} isClearable={true} options={ExpertiseOpt} />
                </div>
                <div className='flex gap-1 flex-col'>
                  <label className='text-lg font-medium text-neutral-900 mb-1' > Difficulty Level
                  </label>
                  <Select onChange={(selected) => setFormData({ ...formData, difficulty: selected?.value || '' })} isClearable={true} options={Level} />
                </div> <div className='flex gap-1 flex-col'>
                  <label className='text-lg font-medium text-neutral-900 mb-1' > Pricing Type
                  </label>
                  <Select onChange={(selected) => setFormData({ ...formData, priceType: selected?.value || '' })} isClearable={true} options={Price} />
                </div>
              </div>



              <div className='flex gap-1 flex-col'>
                <label className='text-lg font-medium text-neutral-900 mb-1'>
                  Course Price
                </label>
                <input
                  value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  type='number'
                  placeholder='e.g. 999'
                  className='border border-black/20 rounded-lg px-3 py-2'
                />
              </div>



            </form>
            <div className='flex justify-end '> <span onClick={handleSubmit} className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Submit</span></div>
          </>
        </div>
      
        <div></div>
      </div>
     
    </div>
  )
}

export default AddCourse