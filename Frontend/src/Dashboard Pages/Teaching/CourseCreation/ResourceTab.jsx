import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
const ResourcesTab = ({lessonId}) => {
  const {user} = useAuth()
  const [resource,setResource] = useState([])
  const [upload,setUploaded] = useState([])
  const handlepdf = (e)=>{
    const file = Array.from(e.target.files)
    const formattedFiles = file.map((file)=>({
      file,title:file.name,  size: (file.size / 1024 / 1024).toFixed(2) + " MB"

    }))

    setResource((prev) => [...prev, ...formattedFiles])
  }
const handleRemove = (index)=>{
setResource((prev)=>prev.filter((_,i) => i!== index))
}
  const handleUpload = async()=>{

try{
  const form = new FormData()
  resource.forEach((resource)=>{
    form.append('title',resource.title)
    form.append('resource',resource.file)
  })
 await api.put(`/auth/course/lesson/${lessonId}/resource-upload`,form)
toast.success('file uploaded successfully')
fetchUploaded()
setResource([])
}catch(err){

toast.error('error occured')}
  }
  const handleDelete = async(resourceId)=>{
    try{
const res = await api.delete(`/auth/course/${lessonId}/resource/${resourceId}/delete`)
console.log(res)
toast.success('file deleted')
fetchUploaded()
    }catch(err){
      console.log(err)
    }
  }
  const fetchUploaded = async()=>{
    try{
const res = await api.get(`/auth/course/${lessonId}/lesson`)
setUploaded(res?.data?.lesson?.resources)
console.log(res)
    }catch(err){
      console.log(err)
toast.error('error occured')
    }
  }
  useEffect(()=>{
    fetchUploaded()
  },[])
  return (
   <div className="bg-white rounded-2xl p-6 shadow-sm">

  {/* Header */}
  <div className="mb-6">
    <h2 className="text-2xl font-semibold">
      Lesson Resources
    </h2>

    <p className="text-neutral-500 mt-1">
      Upload PDFs, worksheets, notes and downloadable files.
    </p>
  </div>

  {/* Upload Section */}
  <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6">

    <div className="space-y-5">

  
      {/* Upload Area */}
      <div className="bg-neutral-50 rounded-xl p-8 text-center">

        <div className="text-4xl mb-3">
          📄
        </div>

        <h3 className="font-semibold text-lg">
          Upload PDF Resource
        </h3>

        <p className="text-neutral-500 mt-2">
          PDF, DOCX, ZIP, PPTX
        </p>

        <label className="mt-5 inline-block bg-black text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-neutral-800">

          Choose File

          <input
          onChange={handlepdf}
          multiple
            type="file"
            className="hidden"
          />

        </label>

      </div>

      {/* Selected File */}
      {resource.map((i,index)=>(
      <div key={index} className="border rounded-xl p-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="text-2xl">
            📕
          </div>

          <div>
        
<input type="text"  value={i.title}  className="font-medium border px-2 py-1 rounded w-full"
 onChange={(e)=>{
 const updated = [...resource]
 updated[index].title = e.target.value
 setResource(updated)
 }}/>
            <p className="text-sm text-neutral-500">
              {i.size}
</p>
          </div>

        </div>

        <button onClick={()=>{handleRemove(index)}
        } className="text-red-500 hover:text-red-600">
          Remove
        </button>

      </div>
))}
      {/* Upload Button */}
     

    </div>

  </div>

  {/* Existing Resources */}
  <div className="mt-8">

    <div className="flex justify-between items-center mb-4">

      <h3 className="font-semibold text-lg">
        Uploaded Resources
      </h3>

      <span className="text-sm text-neutral-500">
{upload.length}      </span>

    </div>
    <div className="space-y-3">

{upload.map((uploaded,index )=>(

      <div key={index}  className="border rounded-xl p-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="text-2xl">
            📄
          </div>

          <div>
            <p className="font-medium">
{uploaded.title}            </p>

            <p className="text-sm text-neutral-500">
              PDF Resource
            </p>
          </div>

        </div>

        <div className="flex gap-4">

          <button className="text-blue-600">
            <a target='_blank' href={uploaded.url}>
            View
            </a>
          </button>

          <button onClick={()=>handleDelete(uploaded._id)} className="text-red-500">
            Delete
          </button>

        </div>

      </div>

  
))}
 </div>  
 <button onClick={handleUpload} className="bg-black mt-3 text-white px-5 py-3 rounded-xl hover:bg-neutral-800">
        Save Resource
      </button>
  </div>

</div>
  );
};

export default ResourcesTab;