import React, { useEffect, useState } from 'react'
import VideoTab from './VideoTab'
import ResourcesTab from './ResourceTab'
import SettingsTab from './SettingsTab'
import { useParams } from 'react-router-dom'
import api from '@/utils/axios'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const LessonEditor = () => { 
  const {user} = useAuth()
    const [active,setActive] = useState("lesson info")
    const [title,setTitle] = useState(null)
    const [description,setDescription] = useState('')
    const {lessonId} = useParams()
    const fetchLesson = async()=>{
        try{
const res =await api.get(`/auth/course/${lessonId}/lesson`)
console.log(res)
setTitle(res?.data?.lesson?.lesson)
        }catch(err){
            console.log(err)
        }
    }
const handleLesson = async()=>{
    try{
const res =await api.put(`/auth/course/lesson/${lessonId}/edit`,{title,description})
console.log(res)
toast.success('course updated')
setActive('video')
    }catch(err){
console.log(err)
    }
}

    useEffect(()=>{
        fetchLesson()
    },[])
  return (
<div className="min-h-screen bg-neutral-100">

  {/* Top Header */}
  <div className="bg-white border-b px-8 py-4 flex items-center justify-between">

    <div>
      <button className="text-sm text-neutral-500">
        ← Back to Curriculum
      </button>

      <h1 className="text-2xl font-bold mt-2">
        Introduction to React
      </h1>
    </div>

    <button className="bg-black text-white px-5 py-2 rounded-lg">
      Save Changes
    </button>

  </div>

  {/* Content */}
  <div className="grid grid-cols-12 gap-6 p-8">

    {/* Sidebar */}
    <div className="col-span-3">

      <div className="bg-white rounded-xl p-4 shadow-sm">

        <button onClick={()=>setActive("lesson info")} className={`w-full text-left px-3 py-3 rounded-lg ${active==='lesson info'?'bg-neutral-100':'bg-transparent'} `}>
          Lesson Info
        </button>

        <button onClick={()=>setActive("video")} className={`w-full text-left px-3 py-3 rounded-lg ${active==='video'?'bg-neutral-100':'bg-transparent'}`}>
          Video
        </button>

        <button onClick={()=>setActive("resources")} className={`w-full text-left px-3 py-3 rounded-lg ${active==='resources'?'bg-neutral-100':'bg-transparent'}`}>
          Resources
        </button>

        <button onClick={()=>setActive("settings")} className={`w-full text-left px-3 py-3 rounded-lg ${active==='settings'?'bg-neutral-100':'bg-transparent'}`}>
          Settings
        </button>

      </div>

    </div>

    {/* Main Content */}
    <div className="col-span-9">
{ active === 'lesson info' && (
      <div className="bg-white rounded-xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-6">
          Lesson Information
        </h2>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Lesson Title
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3 text-black"
              value={title || ''} 
onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
            value={description} onChange={(e)=>setDescription(e.target.value)}
              rows={8}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Write lesson description..."
            />
          </div>
       </div>
       <button onClick={handleLesson} className="bg-black text-white px-5 py-2 rounded-lg mt-4">
      Send
    </button>
  </div>
)} 
{active === 'video' &&(<VideoTab lessonId={lessonId}/>)}
 {active === 'resources'&&(<ResourcesTab lessonId={lessonId}/>
)}
{active==='settings'&& (<SettingsTab lessonId={lessonId}/>
)}
    </div>

  </div>

</div>  )
}

export default LessonEditor