import React from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
const BecomeTeacher = () => {
    const ExperienceOpt = [
          { value: '0-1 Years', label: '0-1 Years' },
  { value: '1-3 Years', label: '1-3 Years' },
  { value: '3-5 Years', label: '3-5 Years' },
  { value: '5-10 Years', label: '5-10 Years' },
  { value: '10+ Years', label: '10+ Years' }
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
<div className='bg-white/85   w-1/2  p-6 md:p-6 rounded-2xl flex flex-col gap-4'>
<div >
<h2 className='font-heading text-4xl font-semibold'>
Professional Background</h2>
<p className='mt-2 font-body text-neutral-700'>Tell students about your professional experience and current role. This helps build trust and showcase your expertise.</p>
</div>
<form action="" className='w-full gap-3 flex flex-col'>
    <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Professional Title
 </label>
                                <input type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
                           <div className='flex gap-1 flex-col'>
                            <label className='text-lg font-medium text-neutral-900 mb-1' > Experience
 </label>
    <Select isClearable={true} options={ExperienceOpt}/>
    </div>
     <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Organization
 </label>
                                <input type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
   



</form>



<div >
<h2 className='font-heading text-4xl font-semibold'>
Teaching Expertise</h2>
<p className='mt-2 font-body text-neutral-700'>Share the subjects and skills you're most confident teaching. Students will use this information to discover your courses.</p>
</div>
<form action="" className='w-full gap-3 flex flex-col'>
   
                         <div className='flex gap-1 flex-col'>
                            <label className='text-lg font-medium text-neutral-900 mb-1' > Specialization
 </label>
    <CreatableSelect isClearable={true} options={ExpertiseOpt}/>
    </div>

 <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Bio
 </label>
                                <textarea type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>

</form>



<div >
<h2 className='font-heading text-4xl font-semibold'>
Portfolio & Social Links</h2>
<p className='mt-2 font-body text-neutral-700'>Add links to your professional profiles and portfolio so students can learn more about your work and achievements.</p>
</div>
<form action="" className='w-full gap-3 flex flex-col'>
   
                         <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Website
 </label>
                                <input type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
 <div className='flex gap-1 flex-col'>
                               <label className='text-lg font-medium text-neutral-900 mb-1' >Linkdin
 </label>
                                <input type='text' className='border border-black/20 disabled:bg-neutral-100  placeholder:text-lg placeholder:font-medium placeholder:text-gray-900 focus:ring-1 focus:outline-none focus:ring-neutral-800 rounded-lg px-3 py-2 capitalize' />
                           </div>
 

</form>
   <div className='flex gap-4 justify-end'>  <span  className='bg-black/40 px-4 border border-red-400/15 py-0.5 rounded-4xl  text-white flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Back</span> <span  className='bg-neutral-700 px-4 border border-black/70 py-0.5 rounded-4xl  text-white/80 flex gap-2 items-center justify-center text-lg hover:scale-95 transition-all duration-200 ease-out  cursor-pointer shadow-2xl '>Next</span></div>
</div>
    </div>
  )
}

export default BecomeTeacher