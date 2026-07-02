import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import Loader from '@/utils/Loader';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FiGithub } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
const ResourcesTab = ({lessonId}) => {
  const {user} = useAuth()
  const [resourceForm,setResourceForm] = useState({title:'',url:'',type:'pdf',files:[]})
  const [upload,setUploaded] = useState([])
  const [loading,setLoading]=useState(false)
  const handlepdf = (e)=>{
    const file = Array.from(e.target.files)
    const formattedFiles = file.map((file)=>({
      file,title:file.name, size: (file.size / 1024 / 1024).toFixed(2) + " MB"

    }))

    setResourceForm((prev) =>( {...prev, files:[...prev.files,...formattedFiles]}))
  }
const handleRemove = (index)=>{
setResourceForm((prev)=>({...prev , files:prev.files.filter((_,i) => i!== index)}))
}
  const handleUpload = async()=>{

try{
  if(resourceForm.type === 'pdf'|| resourceForm.type==='doc'){
  const form = new FormData()
  resourceForm.files.forEach((resource)=>{
    form.append('title',resource.title)
    form.append('resource',resource.file)
    form.append('type',resourceForm.type)
  })
  setLoading(true)
 await api.put(`/course/lesson/${lessonId}/resource-upload`,form)}else{
  await api.put(`/course/lesson/${lessonId}/resource-upload`,resourceForm)
 }
 
toast.success('resource uploaded successfully')
fetchUploaded()

}catch(err){

console.log(err)}finally{
    setLoading(false)
  }
  }
  const handleDelete = async(resourceId)=>{
    try{
      setLoading(true)
const res = await api.delete(`/course/lesson/${lessonId}/resource/${resourceId}/delete`)
toast.success('resource deleted')
fetchUploaded()
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }
  const fetchUploaded = async()=>{
    try{
      setLoading(true)
const res = await api.get(`/course/lesson/${lessonId}`)
setUploaded(res?.data?.lesson?.resources)
console.log(res)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchUploaded()
  },[])
  return (
  <div className="min-h-screen bg-gray-50 p-4 md:p-6">

  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="mb-8">
      <h2 className="text-3xl font-semibold">
        Lesson Resources
      </h2>

      <p className="text-gray-500 mt-2">
        Upload PDFs, links, GitHub repositories, videos and other learning
        resources for this lesson.
      </p>
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1  gap-6">

      {/* Left */}
      <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">

        <h3 className="text-xl font-semibold mb-5">
          Add Resource
        </h3>

        {/* Resource Type */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Resource Type
          </label>

          <select value={resourceForm.type} onChange={(e)=>setResourceForm((prev)=>({...prev,type:e.target.value}))} className="w-full border rounded-xl p-3 outline-none">
            <option value="pdf">PDF</option>
  <option value="doc">Document</option>
  <option value="github">GitHub</option>
  <option value="website">Website</option>
  <option value="youtube">YouTube</option>
          </select>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label  className="block mb-2 font-medium">
            Title
          </label>

          <input
          value={resourceForm.title}
onChange={(e)=>
setResourceForm(prev=>({
    ...prev,
    title:e.target.value
}))
}
            type="text"
            placeholder="React Cheat Sheet"
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Upload Box */}
{(resourceForm.type === 'pdf' || resourceForm.type === 'doc')&&(
        <div className="border-2 border-dashed rounded-2xl p-8 text-center bg-gray-50">

          <div className="text-5xl mb-4">
            📄
          </div>

          <h4 className="font-semibold text-lg">
            Upload File
          </h4>

          <p className="text-gray-500 text-sm mt-2">
            PDF • DOCX • PPT • ZIP
          </p>

           <label className="mt-5 inline-block bg-black text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-neutral-800">
      Choose File

      <input
        type="file"
        multiple
        className="hidden"
        onChange={handlepdf}
      />
    </label>

        </div>)}


        {/* URL */}
{(resourceForm.type !=='pdf' && resourceForm.type !== 'doc')&&(
        <div className="mb-5">

          <label className="block mb-2 font-medium">
            External URL
          </label>

          <input
          value={resourceForm.url}

onChange={(e)=>
setResourceForm(prev=>({
   ...prev,
   url:e.target.value
}))
}
            type="text"
            placeholder="https://github.com/..."
            className="w-full border rounded-xl p-3"
          />

        </div>
)}
        <button onClick={handleUpload} className="w-full mt-4 mx-auto bg-black hover:bg-black/70 text-white rounded-xl py-3 font-medium">
          Save Resource
        </button>
        <button onClick={handleRemove}>remove</button>

      </div>

      {/* Right */}

      <div className="xl:col-span-3 bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

          <h3 className="text-xl font-semibold">
            Uploaded Resources
          </h3>

          <span className="bg-gray-100 rounded-full px-4 py-2 text-sm">
            6 Resources
          </span>

        </div>

        {/* Search */}

        <input
          type="text"
          placeholder="Search resources..."
          className="w-full border rounded-xl p-3 mb-6"
        />

        {/* Cards */}

        <div className="space-y-4">

         
            <div
              
              className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-sm transition"
            >

              <div className="flex items-start gap-4">

                <div className="text-3xl">
                  📄
                </div>

                <div>

                  <h4 className="font-semibold">
                    React Notes.pdf
                  </h4>

                  <p className="text-gray-500 text-sm">
                    PDF • 2.4 MB
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600">
                  View
                </button>

                <button className="px-4 py-2 rounded-lg bg-red-50 text-red-600">
                  Delete
                </button>

              </div>

            </div>
            <div className="border rounded-2xl p-5 flex justify-between items-center hover:shadow-sm transition">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
          <FiGithub />
        </div>

        <div>

          <h4 className="font-semibold">
            GitHub Repository
          </h4>

          <p className="text-sm text-gray-500">
            External Link
          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <button className="text-blue-600 hover:underline">
          Open
        </button>

        <button className="text-red-500 hover:underline">
          Delete
        </button>

      </div>

    </div>

    {/* Website */}

   
    <div className="border rounded-2xl p-5 flex justify-between items-center hover:shadow-sm transition">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 text-xl">
          <IoIosLink />
        </div>

        <div>

          <h4 className="font-semibold">
            MDN JavaScript Guide
          </h4>

          <p className="text-sm text-gray-500">
            Website
          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <button className="text-blue-600 hover:underline">
          Open
        </button>

        <button className="text-red-500 hover:underline">
          Delete
        </button>

      </div>

    </div>

        </div>

      </div>

    </div>

  </div>
</div>

  );
};

export default ResourcesTab;