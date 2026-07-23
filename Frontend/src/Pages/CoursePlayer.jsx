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
import { FaFilePdf, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { IoDocumentTextSharp } from 'react-icons/io5';   
import Quill from 'quill'
import "quill/dist/quill.snow.css"; // Quill's default styling
import api from '@/utils/axios'
import { useFetchStore } from '@/Store/FetchStore'



const CoursePlayer = () => {
  const {course,fetchCourseById}=useFetchStore()
  const [ sectionArr,setSectionArr]=useState([])
  const [ lesson,setLessons]=useState({})
 const resourceIcons = {
    pdf:<FaFilePdf/>,doc:<IoDocumentTextSharp/>,github:<FiGithub/>,website:<FaExternalLinkAlt/>,youtube:<FaYoutube/>
  }
   useEffect(() => {
  toggletab("syllabus");
  fetchSection()
fetchCourseById(course_id)
}, []);
   const tabs = [ {name:"notes",id:3},{name:"resource",id:4},]
   const [currentCourse,setCurrentCourse]=useState(null)
   const resources = currentCourse?.resources || [];
    const {tab,toggletab,toggleModule,syllabus } = usetoggletab()
  const  {course_id} = useParams()
   
      const fetchSection = async()=>{
           try{
          const res = await api.get(`/course/${course_id}/get-section`)
          console.log(res)
         setSectionArr(res?.data?.section)
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
  
  <div className="min-h-screen w-full bg-neutral-50 font-[Outfit]">

    <div className="mx-auto w-full max-w-[1800px] px-3 py-4 sm:px-5 md:px-8 lg:px-10">

      {/* COURSE TITLE */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">
          {course?.title}
        </h2>

        {currentCourse?.lesson && (
          <p className="mt-1 text-sm text-gray-500 md:text-base">
            Currently watching:{" "}
            <span className="font-medium text-gray-800">
              {currentCourse.lesson}
            </span>
          </p>
        )}
      </div>


      {/* MAIN COURSE PLAYER LAYOUT */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_430px]">

        {/* ================= LEFT SIDE ================= */}
        <main className="min-w-0">

          {/* VIDEO */}
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-md sm:p-4">
            <video
              className="aspect-video w-full rounded-lg bg-black object-contain"
              src={currentCourse?.videoUrl}
              controls
              autoPlay
            />
          </div>


          {/* LESSON INFORMATION */}
          <div className="mt-5 overflow-hidden rounded-xl bg-white shadow-sm">

            {/* TABS */}
            <div className="flex w-full overflow-x-auto border-b border-gray-200 px-3 sm:px-5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggletab(t.name)}
                  className={`relative shrink-0 px-4 py-3 text-sm font-semibold capitalize transition-all duration-200 sm:px-6 sm:py-4 sm:text-base ${
                    tab === t.name
                      ? "text-pink-500"
                      : "text-gray-600 hover:text-pink-400"
                  }`}
                >
                  {t.name}

                  {tab === t.name && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-pink-500" />
                  )}
                </button>
              ))}
            </div>


            {/* TAB CONTENT */}
            <div className="p-4 sm:p-6 md:p-8">

              {/* ================= NOTES ================= */}
              {tab === "notes" && (
                <div className="flex flex-col gap-6">

                  <div>
                    <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition hover:border-pink-200 sm:px-5">
                      <span className="text-sm text-gray-800 sm:text-base">
                        Create new note at{" "}
                        <span className="font-semibold">
                          00.00
                        </span>
                      </span>

                      <CiCirclePlus className="cursor-pointer rounded-full bg-gray-900 text-2xl text-white transition hover:scale-110" />
                    </div>

                    <div
                      ref={editorRef}
                      className="min-h-[200px] overflow-hidden rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      className="w-full rounded-lg border border-gray-900 px-6 py-2 text-sm capitalize transition hover:bg-gray-900 hover:text-white sm:w-auto sm:text-base"
                    >
                      cancel
                    </button>

                    <button
                      className="w-full rounded-lg border border-pink-400 bg-pink-400 px-6 py-2 text-sm capitalize text-white transition hover:bg-pink-500 sm:w-auto sm:text-base"
                    >
                      save
                    </button>
                  </div>

                </div>
              )}


              {/* ================= RESOURCES ================= */}
              {tab === "resource" && (
                <>
                  {resources?.length === 0 ? (
                    <div className="flex min-h-[150px] items-center justify-center text-sm text-gray-500">
                      No resources available for this lesson.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                      {/* CORE RESOURCES */}
                      <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 sm:text-xl">
                          <FaFolderOpen />
                          Core Resources
                        </h2>

                        <div className="space-y-2">
                          {resources?.map((resource, index) => (
                            <React.Fragment key={index}>
                              {(resource.type === "pdf" ||
                                resource.type === "doc") && (
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group flex items-center gap-3 rounded-lg border border-gray-100 p-3 text-sm font-medium text-gray-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500 sm:text-base"
                                >
                                  <span className="text-xl transition group-hover:-translate-y-0.5">
                                    {resourceIcons[resource.type]}
                                  </span>

                                  <span className="break-all">
                                    {resource.title}
                                  </span>
                                </a>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>


                      {/* EXTERNAL RESOURCES */}
                      <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 sm:text-xl">
                          <FiExternalLink />
                          External Learning Support
                        </h2>

                        <div className="space-y-2">
                          {resources?.map((resource, index) => (
                            <React.Fragment key={index}>
                              {resource.type !== "pdf" &&
                                resource.type !== "doc" && (
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-3 rounded-lg border border-gray-100 p-3 text-sm font-medium text-gray-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500 sm:text-base"
                                  >
                                    <span className="text-xl transition group-hover:-translate-y-0.5">
                                      {resourceIcons[resource.type]}
                                    </span>

                                    <span className="break-all">
                                      {resource.title}
                                    </span>

                                    <FiExternalLink className="ml-auto shrink-0 text-sm" />
                                  </a>
                                )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </main>


        {/* ================= RIGHT SIDE / COURSE CONTENT ================= */}
        <aside className="min-w-0 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)]">

          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">

            {/* SIDEBAR HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  Course Content
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {sectionArr?.length || 0} modules
                </p>
              </div>

              <button className="rounded-full p-2 transition hover:bg-gray-200">
                <RxCross2 className="text-lg text-gray-700" />
              </button>
            </div>


            {/* MODULE LIST */}
            <div className="flex-1 space-y-2 overflow-y-auto p-3 sm:p-4">

              {sectionArr.map((t, i) => {
                const moduleKey = `module${i + 1}`;

                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-gray-200"
                  >

                    {/* MODULE HEADER */}
                    <button
                      onClick={() => {
                        toggleModule(moduleKey);
                        fetchLesson(t._id);
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition ${
                        syllabus[moduleKey]
                          ? "bg-pink-400 text-white"
                          : "bg-white text-gray-900 hover:bg-pink-50"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <TiArrowSortedDown
                          className={`shrink-0 text-xl transition-transform duration-300 ${
                            syllabus[moduleKey]
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />

                        <span className="truncate text-sm font-semibold sm:text-base">
                          {t.title}
                        </span>
                      </span>

                      <span className="shrink-0 text-xs sm:text-sm">
                        {t.duration}
                      </span>
                    </button>


                    {/* LESSONS */}
                    {syllabus[moduleKey] && (
                      <div className="bg-pink-50 p-2">

                        <ul className="space-y-1">

                          {lesson[t._id]?.map((lesson, j) => (
                            <li
                              key={j}
                              onClick={() => setCurrentCourse(lesson)}
                              className={`group flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 transition sm:px-4 ${
                                currentCourse?._id === lesson._id
                                  ? "bg-pink-100 text-pink-600"
                                  : "bg-white text-gray-700 hover:bg-gray-100"
                              }`}
                            >

                              <span className="flex min-w-0 items-center gap-3">

                                <FaPlayCircle
                                  className={`shrink-0 text-sm ${
                                    currentCourse?._id === lesson._id
                                      ? "text-pink-500"
                                      : "text-gray-400 group-hover:text-pink-400"
                                  }`}
                                />

                                <span className="truncate text-sm font-medium">
                                  {lesson.lesson}
                                </span>

                              </span>

                              <span className="shrink-0 text-xs text-gray-400">
                                {lesson.duration}
                              </span>

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

        </aside>

      </div>

    </div>

  </div>



  )
}

export default CoursePlayer