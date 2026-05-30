import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import api from '@/utils/axios'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const AddCourse = () => {
     const {setUser,user} = useAuth()
      const [step,setStep] = useState(1)
      const navigate = useNavigate()
    const [formData,setFormData] = useState({
    title:'',experience:'',specialization:'',organization:'',website:'',linkdin:'',bio:''
    })
    
        const Level = [
              { value: 'Beginner', label: 'Beginner' },
      { value: 'Intermediate', label: 'Intermediate' },
      { value: 'Difficult', label: 'Difficult' },
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
  <div className=' min-h-screen w-full bg-white/90 px-4 py-6 md:py-32 md:px-12 box-border items-center flex justify-center'>
      <div className='flex flex-col bg-white/85   md:w-2/3  rounded-lg gap-4'>

<div className='flex items-center justify-center px-6 pt-6'>
        {[1,2,3].map((item,index)=>(

          <React.Fragment key={index}>
            
            <div className='flex flex-col justify-center items-center'>
<div className={`w-10 h-10 rounded-full bg-black text-lg font-semibold text-white text-center flex flex-col justify-center items-center ${
  step >= item ? 'bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]  ':'bg-neutral-300'
}`}>
{item}
</div>
<span className='text-black text-sm mt-2'>
{item ===1 &&  "Background"}
{item ===2 &&  "Expertise"}
{item ===3 &&  "Social"}
</span>
</div>
{index < 2 &&(
  <div className={` flex-1 h-1 mx-2 -mt-5 bg-black ${step>item? 'bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]':'bg-neutral-100'}`}>

  </div>
)}

</React.Fragment>
))}
</div>
<div className='flex flex-col gap-12 p-6'>

{step === 1 &&(
  <>
<div >
<h2 className='font-heading text-2xl font-semibold'>
Create Your Course</h2>
<p className='mt-2 font-body text-neutral-700'>Set up the basic information for your course. This will be visible to students.</p>
</div>
<form action="" className='w-full gap-3 flex flex-col'>
    <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Course Title
 </label>
                                <input value={formData.title} placeholder='e.g. Complete React Development Bootcamp' onChange={(e)=>setFormData({...formData,title:e.target.value})} type='text' className='border placeholder:text-neutral-400  border-black/20 disabled:bg-neutral-100  placeholder:text-sm  focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 ' />
                           </div>
                            <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Short Description
 </label>
                                <input value={formData.title} placeholder='Write a short summary of your course (1–2 lines)' onChange={(e)=>setFormData({...formData,title:e.target.value})} type='text' className='border placeholder:text-neutral-400  border-black/20 disabled:bg-neutral-100  placeholder:text-sm  focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 ' />
                           </div>
                           <div className='grid grid-cols-3 gap-3 mt-2'>
                             <div className='flex gap-1 flex-col'>
                            <label className='text-lg font-medium text-neutral-900 mb-1' > Category
 </label>
    <CreatableSelect onChange={(selected)=>setFormData({...formData,specialization:selected?.value||''})} isClearable={true} options={ExpertiseOpt}/>
    </div>
     <div className='flex gap-1 flex-col'>
                            <label className='text-lg font-medium text-neutral-900 mb-1' > Difficulty Level
 </label>
    <Select onChange={(selected)=>setFormData({...formData,experience:selected?.value||''})} isClearable={true} options={Level}/>
    </div> <div className='flex gap-1 flex-col'>
                            <label className='text-lg font-medium text-neutral-900 mb-1' > Pricing Type
 </label>
    <Select onChange={(selected)=>setFormData({...formData,experience:selected?.value||''})} isClearable={true} options={Price}/>
    </div>
                           </div>
                           
     <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Organization
 </label>
                                <input value={formData.organization} onChange={(e)=>setFormData({...formData,organization:e.target.value})} type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
   



</form>
 <div className='flex justify-end'> <span onClick={()=>setStep(step +1)}  className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Next</span></div>
</>
)}

{/* {step === 2 && (
<>
<div >
<h2 className='font-heading text-4xl font-semibold'>
Teaching Expertise</h2>
<p className='mt-2 font-body text-neutral-700'>Share the subjects and skills you're most confident teaching. Students will use this information to discover your courses.</p>
</div>
<form action="" className='w-full gap-3 flex flex-col'>
   
                         <div className='flex gap-1 flex-col'>
                            <label className='text-lg font-medium text-neutral-900 mb-1' > Specialization
 </label>
    <CreatableSelect onChange={(selected)=>setFormData({...formData,specialization:selected?.value||''})} isClearable={true} options={ExpertiseOpt}/>
    </div>

 <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Bio
 </label>
                                <textarea  value={formData.bio} onChange={(e)=>setFormData({...formData,bio:e.target.value})} type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>

</form>
 <div className='flex gap-4 justify-end'>  <span onClick={()=>setStep(step-1)} className='bg-black/40 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Back</span> <span onClick={()=>setStep(step+1)}  className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Next</span></div></>
)}
{step === 3 && (
<>
<div >
<h2 className='font-heading text-4xl font-semibold'>
Portfolio & Social Links</h2>
<p className='mt-2 font-body text-neutral-700'>Add links to your professional profiles and portfolio so students can learn more about your work and achievements.</p>
</div>
<form action="" className='w-full gap-3 flex flex-col'>
   
                         <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Website
 </label>
                                <input value={formData.website} onChange={(e)=>setFormData({...formData,website:e.target.value})}  type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
 <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Linkdin
 </label>
                                <input type='text'  value={formData.linkdin} onChange={(e)=>setFormData({...formData,linkdin:e.target.value})}  className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
 

</form>
 <div className='flex gap-4 justify-end'>  <span onClick={()=>setStep(step-1)}  className='bg-black/40 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Back</span> <span onClick={()=>handleNew()} className=' px-4 border bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Submit</span></div>
</>

)} */}
  
</div>
</div>
    </div>
  )
}

export default AddCourse