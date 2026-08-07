import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { usetoggletab } from '../Store/UseToggleTab'
import { FaFolderOpen } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import Quill from 'quill'
import "quill/dist/quill.snow.css"; // Quill's default styling
import { resourceIcons } from '@/utils/ResourceIcon'
import { updateLessonProgress, useEnrolledCourseById, useUpdateLastWatched } from '@/hooks/EnrollmentHooks/useEnrolledCourses'
import Dataset from '@/utils/Dataset'
import { useEnrolledCurriculum } from '@/hooks/CoursesHooks/useCourse'
import { useMarkLessonComplete } from '@/hooks/CoursesHooks/courseMutation'
import CourseHeader from './CoursePlayerComponents.jsx/CourseHeader'
import VideoPlayer from './CoursePlayerComponents.jsx/VideoPlayer'
import CourseSidebar from './CoursePlayerComponents.jsx/CourseSidebar'

const CoursePlayer = () => {

  const { enrollmentId } = useParams()
   const [completedLessons, setCompletedLessons] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null)
  const { isLoading, isError, data: enrolledData } = useEnrolledCourseById(enrollmentId)
  const enrolledCourse = enrolledData?.enrollment
  const courseId = enrolledCourse?.courseId?._id;
  const { data: curriculum } = useEnrolledCurriculum(enrollmentId)
  const totalLesson = curriculum?.reduce((total, section) => total + (section?.lesson?.length || 0), 0)
  const tabs = [{ name: "notes", id: 3 }, { name: "resource", id: 4 },]
  const resources = currentCourse?.resources || [];
  const { tab, toggletab, toggleModule, syllabus ,openModule} = usetoggletab()
  const { mutate: MarkComplete } = useMarkLessonComplete()
  const {mutate:LastWatched}=useUpdateLastWatched()
  const {mutate:useWatchedTime}=updateLessonProgress()
  const timeRef = useRef(0)
 const currentSection = curriculum?.find(section =>
  section?.lesson?.some(
    lesson => lesson._id === currentCourse?._id
  )
);

const currentSectionIndex = curriculum?.findIndex(
  section => section._id === currentSection?._id
);

const currentLessonIndex = currentSection?.lesson?.findIndex(
  lesson => lesson._id === currentCourse?._id
);
const isFirstLesson =currentSectionIndex === 0 && currentLessonIndex === 0;
const isLastLesson = currentSectionIndex === (curriculum?.length -1) && currentLessonIndex === currentSection?.lesson?.length-1
  // acces previous lesson
  const handlePrevious = () => {

    if (currentLessonIndex > 0) {
      const previousLesson = currentSection?.lesson[currentLessonIndex - 1]
      setCurrentCourse(previousLesson)
    }
    if (currentLessonIndex === 0) {
      if (currentSectionIndex > 0) {
        const previousSection = curriculum[currentSectionIndex - 1]
        const previousLesson = previousSection?.lesson?.[previousSection?.lesson?.length - 1]
        setCurrentCourse(previousLesson)
        openModule(`module${currentSectionIndex}`)

      }
    }
        handleLastWatched(currentCourse?._id)

  }
  // access next lesson
  const handleNext = () => {

    if (currentLessonIndex < currentSection.lesson.length - 1) {
      const nextLesson = currentSection.lesson[currentLessonIndex + 1]
      setCurrentCourse(nextLesson)
    }
    if (currentLessonIndex === currentSection.lesson.length - 1) {
      if (currentSectionIndex < curriculum.length - 1) {
        const nextSection = curriculum[currentSectionIndex + 1]
        const nextLesson = nextSection?.lesson?.[0]
        setCurrentCourse(nextLesson)
openModule(`module${currentSectionIndex+2}`)
      }
    }
    handleLastWatched(currentCourse?._id)
  }
  // marks lesson complete
  const handleMarkComplete = (lessonId) => {
    if(!completedLessons.includes(lessonId)){
 const currentSection = curriculum?.find(section =>
      section?.lesson?.some(lesson => lesson._id === lessonId)
    );

    const sectionId = currentSection?._id;
    MarkComplete({ enrollmentId, lessonId, courseId, sectionId }, {
      onSuccess: (data) => {
        setCompletedLessons(data?.enrollmentData?.completedLessons)
        handleNext()
      }
    })
    }
  };
const handleLastWatched = (lessonId)=>{
  LastWatched(
    {enrollmentId,lessonId}
  )
}
const handleWatchTime = (lessonId)=>{
  console.log(lessonId)
  const watchedTime = timeRef.current
  console.log(watchedTime)
  useWatchedTime({lessonId,enrollmentId,watchedTime})
}

//  stores timestamp
useEffect(()=>{
  if(!currentCourse?._id) return;
 const interval = setInterval(() => {
  handleWatchTime(currentCourse?._id)
 }, 10000);
 return ()=>clearInterval(interval)
},[currentCourse?._id])

  useEffect(() => {
    if (enrolledCourse?.completedLessons) {
      setCompletedLessons(enrolledCourse.completedLessons);
    }
  }, [enrolledCourse]);

  // resuming the previously watched lesson if exists or else first lesson of first section will play 
  useEffect(() => {
    if(enrolledCourse?.lastLesson){
const section = curriculum?.find(section =>
  section?.lesson?.some(
    lesson => lesson?._id === enrolledCourse?.lastLesson
  )
);
const lesson = section?.lesson?.find(lesson=>lesson._id===enrolledCourse?.lastLesson)
      setCurrentCourse(lesson)
    }else{
    const firstLesson = curriculum?.[0]?.lesson?.[0]
      setCurrentCourse(firstLesson)    
    }
    toggletab("syllabus");
  }, [curriculum,enrolledCourse]);
  // fetches last watchedTime
useEffect(() => {
  if (!currentCourse?._id || !enrolledCourse?.lessonProgress) return

  const progress = enrolledCourse.lessonProgress.find(
    progress => progress.lessonId?.toString() === currentCourse._id?.toString()
  )

  timeRef.current = progress?.watchedTime || 0

}, [currentCourse?._id, enrolledCourse?.lessonProgress])
  const editorRef = useRef(null)
  const [quill, setquill] = useState(null)
  useEffect(() => {
    if (editorRef.current && !quill) {
      const q = new Quill(editorRef.current, {
        theme: "snow", placeholder: "Enter Your Notes here", modules: {
          toolbar: [
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
    <Dataset loading={isLoading} error={isError}>
      <div className="min-h-screen w-full bg-neutral-50 font-[Outfit]">

        <div className="mx-auto w-full max-w-[1800px] px-3 py-4 sm:px-5 md:px-8 lg:px-10">

          {/* COURSE TITLE */}
<CourseHeader title={enrolledCourse?.courseId?.title} lesson={currentCourse?.lesson}/>

          {/* MAIN COURSE PLAYER LAYOUT */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_430px]">

            {/* ================= LEFT SIDE ================= */}
            <main className="min-w-0">

              {/* VIDEO */}

<VideoPlayer  handleWatch={handleWatchTime} timeRef={timeRef} lesson={currentCourse} completedLessons={completedLessons} disableNext={isLastLesson} disablePrev={isFirstLesson} handleNext={handleNext} handlePrevious={handlePrevious} handleEnded={()=>handleMarkComplete(currentCourse?._id)}/>

              {/* LESSON INFORMATION */}
              <div className="mt-5 overflow-hidden rounded-xl bg-white shadow-sm">

                {/* TABS */}
                <div className="flex w-full overflow-x-auto border-b border-gray-200 px-3 sm:px-5">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggletab(t.name)}
                      className={`relative shrink-0 px-4 py-3 text-sm font-semibold capitalize transition-all duration-200 sm:px-6 sm:py-4 sm:text-base ${tab === t.name
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
<CourseSidebar setCurrentCourse={setCurrentCourse} curriculum={curriculum} enrolledCourse={enrolledCourse} enrolledData={enrolledData} toggleModule={toggleModule} syllabus={syllabus} totalLesson={totalLesson} currentCourse={currentCourse} completedLessons={completedLessons} handleLast={handleLastWatched}/>
          </div>

        </div>

      </div>
    </Dataset>


  )
}

export default CoursePlayer