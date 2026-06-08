import { useAuth } from '@/context/AuthContext'
import api from '@/utils/axios'
import React, { useState } from 'react'
import { toast } from 'sonner'
const ResourcesTab = ({lessonId}) => {
  const {user} = useAuth()
  const [pdfUrl,setpdfUrl] = useState(null)
  const [preview,setPreview] =useState('')
  const handlepdf= (e)=>{
    const file = e.target.files[0]
    if(!file)return;
    setpdfUrl(file)
    setPreview(URL.createObjectURL(file))
  } 
  const handleUpload = async()=>{
    try{
      const form = new FormData()
      form.append("resource",pdfUrl)
await api.put(`/auth/course/lesson/${lessonId}/resource-upload`,form)
toast.success("resources updated")
setPreview('')
setpdfUrl('')
    }catch(err){
console.log(err)
toast.error("debug error")
    }
  }
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Resources
      </h2>

      <div className="border-2 border-dashed rounded-xl p-10 text-center">
{preview ?(<>
<a href={preview} target='_blank' className='text-5xl'>view pdf</a>
</>):(
  <>
        <h3 className="font-semibold">
          Upload PDFs & Resources
        </h3>

        <label className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
          Upload Resource
          <input onChange={handlepdf} type="file" className="hidden" />
        </label>
</>
)}
{pdfUrl && (
  <button
    onClick={handleUpload}
    className="bg-black text-white px-5 py-2 rounded-lg mt-4"
  >
    Upload
  </button>
)}
      </div>

      <div className="mt-6 space-y-3">

        <div className="border rounded-lg p-3 flex justify-between">
          <span>React Notes.pdf</span>

          <button className="text-red-500">
            Delete
          </button>
        </div>

      </div>

    </div>
  );
};

export default ResourcesTab;