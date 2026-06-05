import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import ProjectCard from '@/utils/ProjectCard'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseBuilder = () => {
    const { courseId } = useParams()
    const [course,setCourse] = useState(null)
    const [title,setTitle] = useState('')
    const [addsection,setAddsection] = useState(false)
    const [section,setSection] = useState([])
    const {user} = useAuth()
    const fetchCourse = async()=>{
        try{
const res = await api.get(`/auth/${courseId}/edit`)
setCourse(res?.data?.course)
console.log(res)
        }catch(err){
console.log(err)
toast.error('error occured')
        }
    }
    const handleToggleSection = ()=>{
        setAddsection(!addsection)
    }
    const handleSection = async()=>{
        try{
const res = await api.post(`/auth/${courseId}/create-section`,{title})
console.log(res)
toast.success('section created')

        }catch(err){
console.log(err)
        }
    }
    const fetchSection = async()=>{
      try{
const res =await api.get(`/auth/${courseId}/get-section`) 
setSection(res.data.section)
console.log(res)
      }catch(Err){

      }
    }
    useEffect(()=>{
        fetchCourse()
        fetchSection()
    },[])
  return (

<div className="min-h-screen bg-neutral-100 px-10 py-8">

  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <div>
      <button className="text-sm text-neutral-500 hover:text-black">
        ← Back to Courses
      </button>

      <h1 className="text-3xl font-bold mt-2">
        {course?.title}
      </h1>

      <p className="text-neutral-500">
        Build and manage your course curriculum
      </p>
    </div>

    <div className="flex gap-3">
      <button className="border px-4 py-2 rounded-lg">
        Preview
      </button>

      <button className="bg-gradient-to-r from-[#95b1ee] to-[#728ccd] text-white px-4 py-2 rounded-lg">
        Publish
      </button>
    </div>
  </div>

  {/* Main Layout */}
  <div className="grid grid-cols-12 gap-6">

    {/* Left */}
    <div className="col-span-3">
      <div className="sticky top-6 flex flex-col gap-4">

        <ProjectCard
          img={course?.thumbnail}
          price={course?.price}
          category={course?.category}
          course_desc={course?.desc}
          course_name={course?.title}
          chapters={12}
          duration={course?.duration}
          level={course?.difficulty}
          rating={5}
          instructor_img={course?.instructor?.avatar}
          instructor_name={course?.instructor?.firstName}
        />

      </div>
    </div>

    {/* Right */}
    <div className="col-span-9">

      <div className="bg-white rounded-xl p-6 shadow-sm">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Curriculum
          </h2>

          <button onClick={handleToggleSection} className="bg-black text-white px-4 py-2 rounded-lg">
            + Add Section
          </button>
        </div>

        {/* Section Card */}
        { addsection && (
<div className='border rounded-xl p-5 mb-4 flex justify-between items-center my-10 '>
<input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className='border-none outline-none w-full' placeholder='Enter Section Name'  />
<button onClick={handleSection} className="bg-black text-white px-4 py-2 rounded-lg">
Save
</button>
</div>
)}
        <div className="border rounded-xl p-5 mb-4">

  

        {/* Empty State */}
        {section?.length === 0 ? (
        <div className="border-2 border-dashed rounded-xl p-10 text-center">

          <h3 className="font-semibold text-lg">
            Start Building Your Course
          </h3>

          <p className="text-neutral-500 mt-2">
            Create sections and lessons for students.
          </p>

          <button onClick={handleToggleSection} className="mt-4 bg-black text-white px-4 py-2 rounded-lg">
            Add First Section
          </button>

        </div>):(
             <>
           {section?.map((i)=>( 
            <div className="border rounded-xl p-5 mb-4">
        <div className="mt-4 space-y-3">
   <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
             {i.title}
            </h3>

            <button>
              ⋮
            </button>
          </div>
            <div className="border rounded-lg p-3 flex justify-between">
              <span>Introduction</span>
              <span>Preview</span>
            </div>

            <div className="border rounded-lg p-3 flex justify-between">
              <span>JSX Basics</span>
              <span>10 min</span>
            </div>
</div>
          </div>
))} 
          <button className="mt-4">
            + Add Lesson
          </button>

       </>
        )}
        

      </div>
</div>
    </div>

  </div>

</div>
  )
}

export default CourseBuilder