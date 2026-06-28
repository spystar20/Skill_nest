import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import Loader from '@/utils/Loader'
import ProjectCard from '@/utils/ProjectCard'
import React, { useEffect, useState } from 'react'
import { ImBin } from 'react-icons/im'
import { MdPlayArrow } from 'react-icons/md'
import { PiPencil } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
const CourseBuilder = () => {
    const { courseId } = useParams()
    const [course,setCourse] = useState(null)
    const [title,setTitle] = useState('')
    const [editingSection, setEditingSection] = useState(null)
    const [lesson,setLesson]= useState('')
    const [lessonArr,setLessonArr] = useState([])
    const [addsection,setAddsection] = useState(false)
    const [loading,setLoading]= useState(false)
    const [section,setSection] = useState([])
    const [activeSection,setActiveSection] = useState(null)
    const [expandedSection,setExpandedSection]= useState(null)
const navigate = useNavigate()
    const {user} = useAuth()
        const handleStatus = async(status)=>{
      try{
        setLoading(true)
    const res = await api.put(`/course/${courseId}/status`,{status})
    toast.success('course published successfully')
  
      navigate('/dashboard/teacher/my-courses')
   
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
    const fetchCourse = async()=>{
        try{
const res = await api.get(`/course/${courseId}`)
setCourse(res?.data?.course)
        }catch(err){
console.log(err)
        }
    }
    const handleToggleSection = ()=>{
        setAddsection(!addsection)
    }
    const handleSection = async()=>{
        try{
const res = await api.post(`/course/${courseId}/create-section`,{title})
toast.success('section created')
await fetchSection()
setAddsection(false)
setTitle('')
        }catch(err){
console.log(err)
        }
    }
    const editSectioni = async(sectionId)=>{
      try{
  const res = await api.put(`/course/section/${sectionId}/edit-section`,{title})
  await fetchSection()
  toast.success('section title updated')
      }catch(err){
        console.log(err)
      }
    }
    const fetchSection = async()=>{
      try{
const res =await api.get(`/course/${courseId}/get-section`) 
setSection(res.data.section)
console.log(res)
      }catch(Err){

      }
    }
    const handleLesson = async(section)=>{
      try{
        const res = await api.post(`/course/lesson/${section}/create-lesson`,{lesson})
         toast.success('lesson added')
setLesson('')
setAddsection(false)
fetchSection()
fetchLesson(section)
         console.log(res)
      }catch(err){

console.log(err)
      }
    }
    const handleDelete = async(sectionId)=>{
      try{
const res = await api.delete(`/course/section/${sectionId}/delete`)
toast.success('section deleted successfully')
await fetchSection()
      }catch(Err){
        console.log(Err)
      }
    }
    const deleteLesson = async(sectionId)=>{
      try{
await api.delete(`/course/lesson/${sectionId}/delete`)
await fetchLesson(sectionId)
toast.success('lesson deleted successfully')
      }catch(err){
        console.log(err)
      }
    }
    const fetchLesson = async(section)=>{
const res = await api.get(`/course/lesson/${section}/get-lesson`)

setLessonArr(prev =>({...prev,[section]:res.data.lessons}))
    }
   const handleExpandedSection = (sectionId) =>{
    if(expandedSection === sectionId){
      setExpandedSection(null)
    }else{
      setExpandedSection(sectionId)
      fetchLesson(sectionId)
    }
   }
    useEffect(()=>{
        fetchCourse()
        fetchSection()
    },[])
  return (

<div className="min-h-screen bg-neutral-100 px-10 py-8">
{loading && <Loader/>}
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

      <button onClick={()=>handleStatus('published')} className="bg-gradient-to-r from-[#95b1ee] to-[#728ccd] text-white px-4 py-2 rounded-lg">
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
  <div className="bg-white rounded-2xl p-6 shadow-sm">

    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Curriculum
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Organize your course into sections and lessons
        </p>
      </div>

      <button
        onClick={handleToggleSection}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition"
      >
        + Add Section
      </button>
    </div>

    {/* Add Section Form */}
    {addsection && (
      <div className="bg-neutral-50 border rounded-xl p-4 mb-6 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter section title..."
          className="flex-1 bg-white border rounded-lg px-3 py-2 outline-none"
        />

        <button
          onClick={handleSection}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    )}

    {/* Empty State */}
    {section?.length === 0 ? (
      <div className="border-2 border-dashed rounded-xl p-12 text-center">

        <h3 className="text-xl font-semibold">
          Start Building Your Course
        </h3>

        <p className="text-neutral-500 mt-2">
          Create your first section and begin adding lessons.
        </p>

        <button
          onClick={handleToggleSection}
          className="mt-5 bg-black text-white px-4 py-2 rounded-lg"
        >
          Add First Section
        </button>

      </div>
    ) : (
      <div className="space-y-3">

        {section?.map((section) => (
          <div
            key={section._id}
            className="border border-neutral-200 rounded-xl overflow-hidden bg-white"
          >

            {/* Section Header */}
            <div
              onClick={() => handleExpandedSection(section._id)}
              className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-neutral-50 transition"
            >
              <div className="flex items-center gap-2">

                <MdPlayArrow
                  className={`text-xl transition-transform duration-300 ${
                    expandedSection === section._id
                      ? "rotate-90"
                      : ""
                  }`}
                />

              {editingSection === section._id ? (
  <div
    className="flex items-center gap-2"
    onClick={(e) => e.stopPropagation()}
  >
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border rounded-lg px-3 py-1 text-sm outline-none"
      autoFocus
    />

    <button
      onClick={() => {
        editSectioni(section._id)
        setEditingSection(null)
      }}
      className="bg-black text-white px-3 py-1 rounded-lg text-sm"
    >
      Save
    </button>

    <button
      onClick={() => {
        setEditingSection(null)
        setTitle("")
      }}
      className="border px-3 py-1 rounded-lg text-sm"
    >
      Cancel
    </button>
  </div>
) : (
  <h3 className="font-semibold text-lg capitalize">
    {section.title}
  </h3>
)}

              </div>
<span className='flex gap-1' onClick={(e)=> e.stopPropagation()}>
   <span   onClick={() => {
    setEditingSection(section._id)
    setTitle(section.title)
  }} className='bg-neutral-800 hover:scale-110 duration-200 ease-in transition-all p-1 border border-neutral-700  rounded-full  text-white/80 flex gap-2 items-center justify-center text-sm  cursor-pointer '><PiPencil /></span>
   <span onClick={()=>handleDelete(section._id)} className='bg-neutral-800  hover:scale-110 duration-200 ease-in transition-all border border-neutral-700 p-1 rounded-full  text-white/80 flex gap-2 items-center justify-center text-sm  cursor-pointer '><ImBin /></span>
</span>

            </div>

            {/* Expanded Content */}
            {expandedSection === section._id && (
              <div className="px-4 pb-4">

                {/* Lessons */}
                <div className="space-y-2">

                  {lessonArr[section._id]?.map((lesson) => (
                    <div
                      key={lesson._id}
                      className="ml-8 flex items-center justify-between bg-neutral-50 px-4 py-3 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-2  " >
                      <MdPlayArrow className="text-neutral-400" />

                      <span   onClick={() =>
    navigate(`/courseBuilder/${courseId}/lesson/${lesson._id}`)
  } className="text-sm font-medium">
                        {lesson.lesson}
                      </span>
                      </div>
                      <span className='flex gap-1 ' onClick={(e)=> e.stopPropagation()}>
 
   <span onClick={()=>deleteLesson(section._id)} className='bg-neutral-800  hover:scale-110 duration-200 ease-in transition-all border border-neutral-700 p-1 rounded-full  text-white/80 flex gap-2 items-center justify-center text-xs  cursor-pointer '><ImBin /></span>
</span>
                    </div>
                  ))}

                </div>

                {/* Add Lesson Form */}
                {activeSection === section._id && (
                  <div className="ml-8 mt-4 bg-neutral-50 rounded-xl p-4">

                    <input
                      value={lesson}
                      onChange={(e) => setLesson(e.target.value)}
                      placeholder="Lesson title"
                      className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                      onClick={() => handleLesson(section._id)}
                      className="mt-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800"
                    >
                      Save Lesson
                    </button>

                  </div>
                )}

                {/* Add Lesson Button */}
                <button
                  onClick={() =>
                    setActiveSection(
                      activeSection === section._id
                        ? null
                        : section._id
                    )
                  }
                  className="ml-8 mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Lesson
                </button>

              </div>
            )}

          </div>
        ))}

      </div>
    )}
  </div>
</div>

  </div>

</div>
  )
}

export default CourseBuilder