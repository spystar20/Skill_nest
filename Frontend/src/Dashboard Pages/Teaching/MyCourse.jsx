import { useAuth } from '@/context/AuthContext'
import React ,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleLeft, FaSearch } from 'react-icons/fa'
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FiPlus } from 'react-icons/fi';
import { PiBooks, PiPencil, PiStudentFill } from 'react-icons/pi';
import { ImBin } from 'react-icons/im';
import {  MdOutlineWatchLater } from 'react-icons/md';
import api from '@/utils/axios';
import {formatDistanceToNow} from 'date-fns'
import { toast } from 'sonner';
import Dataset from '@/utils/Dataset';


const MyCourse = () => {
        const { user } = useAuth()
        console.log(user)
const [sort, setSort] = useState("");
const [ Course,setCourse] = useState([])
const [error,setError]=useState(null)
const[loading,setLoading]=useState(true)

const fetchCourses = async()=>{
  try{
    setLoading(true)
const res = await api.get('/teacher/dashboard/my-courses')
setCourse(res?.data?.courses)

  }catch(err){
setError(err.res?.data?.message)
  }finally{
    setLoading(false)
  }
}
const DeleteCourse = async(courseId)=>{
  try{
await api.delete(`/course/${courseId}`)
await fetchCourses()
toast.success('course deleted successfully')
  }
  catch(Err){
    console.log(Err)
  }
}
useEffect(()=>{
      fetchCourses()
},[])
  return (
     
        <div className='w-full bg-neutral-200 min-h-screen px-2 md:px-8 py-3 flex flex-col gap-6 '>
           <div className='flex justify-between items-center'> <h2 className='text-3xl font-bold font-heading'>Teaching</h2><Link to='/'><span className='cursor-pointer flex gap-2 items-center hover:scale-105 duration-300 transition-all ease-in'><FaAngleDoubleLeft />Back to Home</span></Link></div>
           <div className='flex gap-5'>
            <div className='bg-white p-2 md:p-6 rounded-lg flex-1'>
                <h2 className='text-xl font-semibold  font-heading capitalize'>My courses</h2>
                <div>
          <div className='flex justify-between items-center-safe'>
<div className='flex gap-5 py-10'>
  <span className=' flex gap-2 border hover:border-black border-black/20 shadow-lg rounded-xl pl-4'><input type="search" placeholder='search your course' className='outline-none border-none p-1  ' name="" id="" /><span className='w-10 h-10 bg-dashboard flex items-center cursor-pointer justify-center text-white rounded-xl text-xl'><FaSearch /></span></span>
  <>
<FormControl size="small" sx={{ minWidth: 180 }}>
  <InputLabel>Sort By</InputLabel>

  <Select
    value={sort}
    label="Sort By"
    onChange={(e) => setSort(e.target.value)}
  >
    <MenuItem value="newest">Newest</MenuItem>
    <MenuItem value="oldest">Oldest</MenuItem>
    <MenuItem value="popular">Most Popular</MenuItem>
  </Select>
</FormControl></>
  <div>

  </div>
</div>

<Link to='/dashboard/teacher/add-course'><button className=' flex items-center justify-center gap-2 bg-dashboard p-2 rounded-lg text-white hover:bg-dashboard/90 transition-discrete cursor-pointer'><FiPlus className='text-xl'/>New Course</button></Link>
       
          </div> 
          <Dataset loading={loading} error={error} >
          {Course.map((course)=> { 
 return(

   <div key={course._id} className="flex items-center justify-between border p-3 rounded-2xl hover:shadow-md transition  my-4">

  {/* LEFT */}
  <div className="flex gap-4 items-center">

    <img
      src={course.thumbnail}
      className="w-28 h-28 rounded-lg object-fill"
    />

    <div>
      <div className="flex items-center gap-3">
        <h5 className="font-medium text-lg">{course.title}</h5>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          {course.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
{course.desc}      </p>

      {/* META */}
      <div className="flex gap-4 text-sm text-gray-500 mt-2">
        <span className='flex gap-1 items-center'><PiStudentFill/> 120 Students</span>
        <span className='flex gap-1 items-center'><PiBooks/> {course.lessonCount}</span>
        {course.updatedAt ? (<span className='flex gap-1 items-center'><MdOutlineWatchLater/>
        updated{''} {formatDistanceToNow((new Date(course.updatedAt)),{addSuffix:true})}</span>):(<span className='flex gap-1 items-center'><MdOutlineWatchLater/>Just Now</span>)}
      </div>
    </div>
  </div>

  {/* RIGHT ACTIONS */}
  <div className="flex flex-col gap-2 items-end">
<span className='flex gap-1 ' onClick={(e)=>e.stopPropagation()}>
   <Link key={course._id} to={`/dashboard/teacher/courses/${course._id}/edit`} ><span className='bg-neutral-800 hover:scale-110 duration-200 ease-in transition-all p-1 border border-neutral-700  rounded-full  text-white/80 flex gap-2 items-center justify-center text-sm  cursor-pointer '><PiPencil /></span></Link>
   <span onClick={()=>DeleteCourse(course._id)} className='bg-neutral-800  hover:scale-110 duration-200 ease-in transition-all border border-neutral-700 p-1 rounded-full  text-white/80 flex gap-2 items-center justify-center text-sm  cursor-pointer '><ImBin /></span>
</span>
    <button className="text-sm px-3 py-1 rounded-lg bg-gray-100">
      Analytics
    </button>
  </div>

</div>  
)})}
</Dataset>
</div>
            </div>
<div className='basis-1/4'>

</div>
</div>
        </div>

  )
}

export default MyCourse