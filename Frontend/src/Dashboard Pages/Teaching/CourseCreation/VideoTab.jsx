import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import Loader from '@/utils/Loader'
import React, { useState } from 'react'
import { toast } from 'sonner'

const VideoTab = ({lessonId}) => {
    const {user} =useAuth()
    const [video,setVideo]= useState(null)
    const [preview,setPreview]= useState('')
    const [loading,setLoading]= useState(false)
    const handleUpload = (e)=>{
        const file = e.target.files[0]

        setVideo(file)
        setPreview(URL.createObjectURL(file))
    }
    const handleVideo = async()=>{

        try{

          const form = new FormData()
form.append('video',video)
setLoading(true)
 await api.put(`/course/lesson/${lessonId}/update`,form)
 toast.success('video uploaded')
 setPreview('')
 setVideo(null)
        }catch(err){
            console.log(err)
        }finally{setLoading(false)}
    }
  return (
<div className="bg-white rounded-xl p-6 shadow-sm">
    {loading && <Loader/>}

      <h2 className="text-xl font-semibold mb-6">
        Lesson Video
      </h2>

      <div className="border-2 border-dashed rounded-xl p-12 text-center">
{preview ? (          <video className='aspect-video' controls src={preview}></video>
):(
    <>
        <h3 className="font-semibold text-lg">
          Upload Lesson Video
        </h3>

        <p className="text-neutral-500 mt-2">
          MP4, MOV or WEBM
        </p>

        <label className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
          Upload Video
          <input onChange={handleUpload} type="file" className="hidden" />
        </label>
        </>
)}
      </div>
{video && (
  <button
    onClick={handleVideo}
    className="bg-black text-white px-5 py-2 rounded-lg mt-4"
  >
    Upload
  </button>
)}
    </div>  )
}

export default VideoTab