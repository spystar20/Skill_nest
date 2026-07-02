import React, { useEffect, useRef, useState } from 'react'
import featureCourses from '../data/course'
import { useParams } from 'react-router-dom'
import vid from '../assets/Vid.mp4'
import { FaPlayCircle,FaStar } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'
import { usetoggletab } from '../Store/UseToggleTab'
import { LiaCertificateSolid } from 'react-icons/lia'
import { MdOutlinePeopleAlt,MdOutlineWorkspacePremium  } from 'react-icons/md'
import { FaFacebookF  ,FaInstagram,FaRegFilePdf ,FaRegFileCode ,FaFolderOpen } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { IoDocumentsOutline } from "react-icons/io5";
import {  BsTwitterX } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { CiCirclePlus } from "react-icons/ci";
import Rating from '@mui/material/Rating';
import {IoDocumentAttachOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { GoRepoTemplate } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";

import Quill from 'quill'
import "quill/dist/quill.snow.css"; // Quill's default styling
import api from '@/utils/axios'



const CoursePlayer = () => {
  const [ courseData,setCourseData]= useState([])
  const [teacherData,setTeacherData]=useState([])
  const [ sectionArr,setSectionArr]=useState([])
  const [ lesson,setLessons]=useState({})
   useEffect(() => {
  toggletab("syllabus");
  fetchSection()
  fetchcourses()
}, []);
   const tabs = [ {name:"notes",id:3},{name:"resource",id:4},]
   const [currentCourse,setCurrentCourse]=useState(null)
   console.log(`cuurent ${currentCourse}`)
    const {tab,toggletab,toggleModule,syllabus } = usetoggletab()
  const  {course_id} = useParams()
    const fetchcourses = async()=>{
      try{
const res = await api.get(`/course/${course_id}`)
setCourseData(res?.data?.course)
setTeacherData(res?.data?.teacher)
      }catch(err){
console.log(err)
      }
    }
      const fetchSection = async()=>{
           try{
          const res = await api.get(`/course/${course_id}/get-section`)
          console.log(res)
         setSectionArr(res?.data?.section)
        // sectionArr.forEach(section => {
        //   fetchLesson(section._id)
        //  });
          fetchLesson(res?.data?.section[0]._id)

        }catch(err){
          console.log(err)
        }
      } 
       const fetchLesson = async(sectionId)=>{
      try{

      const res = await api.get(`/course/lesson/${sectionId}/get-lesson`)
     setLessons(prev=>({
      ...prev , [sectionId]:res.data.lessons
     }))
  if(currentCourse === null){
     setCurrentCourse(res?.data?.lessons[0])
  }
    }catch(err){
      console.log(err)
    }
  
  }
    const editorRef = useRef(null)
    const [quill,setquill] = useState(null)
    useEffect(()=>{
      if(editorRef.current && !quill){
       const q = new Quill(editorRef.current,{
        theme:"snow",placeholder:"Enter Your Notes here",modules:{
          toolbar:[
           [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ]
        }
       })
       setquill(q)
      }
    })
  return (
    <div className='bg-white min-h-screen capitalize font-[Outfit]  py-5 pl-5'>
<div>
    <div>
   
     <div className='flex  gap-2'>
      <div className='flex flex-col gap-1' >
        <span className='flex flex-col gap-0'>
      
        <h2 className='text-2xl font-semibold'>{courseData.title}</h2>
        </span>
        <div className='flex flex-col justify-between gap-6'>
   <div className='p-4 flex-1 rounded-lg bg-white shadow-lg'><video className='w-full h-auto'  src={currentCourse?.videoUrl} controls autoPlay> </video></div>
  <div className=' pl-2   font-[Outfit] w-full'>
          {/* headings */}           
          <div className='flex flex-row gap-8  w-full text-black text-xl font-semibold '>
              {tabs.map((t)=>{return(
            <a key={t.id} onClick={()=>toggletab(t.name)} className={`cursor-pointer capitalize flex hover:text-pink-400 p-2 ${tab === t.name ? " underline-offset-8 underline  text-pink-400" :"text-black "}`}>{t.name}</a>
                 )})}         
          </div>      
<div>
          {/* overview */}
     {tab==="notes"?(
        
   <div className='flex flex-col gap-6 '><div className='pt-7  px-3'> 
   <div className='pb-6'>
    <p className='flex justify-between items-center border py-2 px-5 rounded-lg hover:bg-gray-100'><span className='text-lg text-gray-900 normal-case'>Create new note at <span>00.00</span></span> <span><CiCirclePlus className='text-xl text-bold cursor-pointer bg-gray-800 text-white rounded-full'/>
</span></p>
   </div>
    <div><div ref={editorRef} style={{ minHeight: "200px" }}></div></div></div>
   <span className='flex gap-7 pr-6 pb-7 justify-end items-center'><button className='text-lg py-1 px-6 rounded-sm capitalize border border-black hover:text-white hover:bg-black transition-all box-content cursor-pointer'>cancel</button><button className='text-lg py-1 px-6 rounded-sm capitalize   border text-white border-pink-400 bg-pink-400 hover:scale-95 scale-100 transition-all '>save</button></span>
   </div>
      ): tab==="resource" ?(
        <div className='py-7 px-4 flex  flex-wrap justify-between items-center gap-9'>
            <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-medium flex items-center gap-2'><span>
            <FaFolderOpen  className='text-xl'/></span>Core Resources</h2>
            <ul className='flex flex-col gap-2 text-gray-800 '>
              <li><a className='flex group gap-2 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><FaRegFilePdf  className='text-xl group-hover:-translate-y-0.5 '/></span>PDF Notes </a></li>
                <li><a className='flex group gap-2 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><FaRegFileCode  className='text-xl group-hover:-translate-y-0.5 '/></span>Code Files</a></li>
                  <li><a className='flex group gap-2 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><IoDocumentAttachOutline className='text-xl group-hover:-translate-y-0.5 '/></span>Assignments & Worksheets</a></li>
        
            </ul>
            </div>
          <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-medium flex items-center gap-1'><span>
            <FiExternalLink className='text-xl'/></span>External Learning Support</h2>
            <ul className='flex flex-col gap-2  text-gray-800'>
              <li><a className='flex group gap-1 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><FiGithub    className='text-xl group-hover:-translate-y-0.5 '/></span>Github Repo Link </a></li>
                <li><a className='flex group gap-1 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><IoIosLink
 className='text-xl group-hover:-translate-y-0.5 '/></span>Reference Links</a></li>
                  <li><a className='flex group gap-1 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><IoDocumentsOutline   className='text-xl group-hover:-translate-y-0.5 '/></span>Cheat Sheets</a></li>      
            </ul>
            </div>
             <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-medium flex items-center gap-1'><span>
            <MdOutlineWorkspacePremium  className='text-xl'/></span>Skill Boosters </h2>
            <ul className='flex flex-col gap-2  text-gray-800'>
              <li><a className='flex group gap-1 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><GoRepoTemplate    className='text-xl group-hover:-translate-y-0.5 '/></span>Templates & Assets</a></li>
                <li><a className='flex group gap-1 hover:text-pink-300 cursor-pointer items-center font-medium hover:underline text-normal transition-all duration-75 ease-in'><span><IoDocumentTextOutline className='text-xl group-hover:-translate-y-0.5 '/></span>Case Studies</a></li>
              
        
            </ul>
            </div>
        </div>

      ):null}
     <div>

     </div>
</div>
        </div>
  </div>
  </div>

    <div className='flex flex-col items-start basis-11/12  sticky top-0 self-start '>
  <div className=' shadow-lg rounded-lg rounded-r-none border-gray-200 font-medium p-3.5 border border-r-0 bg-gray-50 pl-5 w-full flex justify-between items-center'><h2 className='text-2xl inline text-gray-800 '>course content</h2> <span><RxCross2  className='text-lg mr-3.5 cursor-pointer hover:bg-gray-300 hover:rounded-full w-5 h-5'/>
</span></div>
      <div  className='p-3 pt-1 w-full  flex flex-col gap-1  overflow-y-scroll'>
{sectionArr.map((t, i) => {
  const moduleKey = `module${i + 1}`; 
  return (
    <div key={i}>
      {/* Module header */}
      <div
        onClick={() => {toggleModule(moduleKey),fetchLesson(t._id)}}
        className="flex  justify-between items-center py-5 bg-pink-400 px-3 rounded-lg rounded-b-none text-white cursor-pointer"
      >
        <span className="flex items-center gap-2 text-lg font-medium">
          <TiArrowSortedDown
            className={`transition-transform duration-300 ${
              syllabus[moduleKey] ? "rotate-180" : "rotate-0"
            }`}
          />
          {t.title}
        </span>
        <span>({t.duration})</span>
      </div>
      {/* Lessons */}
      {syllabus[moduleKey] && (
        <div className='bg-pink-400 p-2 rounded-lg rounded-t-none'>
        <ul className="flex flex-col gap-2 bg-white rounded-lg">
          {lesson[t._id]?.map((lesson, j) => (
            <li
              key={j}
              className="flex justify-between rounded-xl hover:bg-gray-100 transition-all px-6 py-4 w-full"
            >
              <span className="flex items-center gap-2" onClick={()=>setCurrentCourse(lesson)}>
                <FaPlayCircle className="text-sm text-pink-500" />
                {lesson.lesson}
              </span>
              <span className="text-gray-500">{lesson.duration}</span>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
})}

          
  </div> 
  </div>
     </div>
    
       </div>
  
</div>
    </div>
  )
}

export default CoursePlayer