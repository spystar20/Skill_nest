import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { SiBookstack } from "react-icons/si";
import { IoTime } from "react-icons/io5";
import { FaStar, FaMobileAlt, FaEye, FaPlayCircle, FaFacebookF, FaInstagram, FaPlus, FaMinus } from "react-icons/fa";
import { MdOndemandVideo, MdOutlineSimCardDownload, MdOutlinePeopleAlt } from "react-icons/md";
import { TbWorldCheck } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { PiFileAudioBold } from "react-icons/pi";
import { LuMessageCircleMore } from "react-icons/lu";
import { TiArrowSortedDown } from "react-icons/ti";
import { usetoggletab } from '../Store/UseToggleTab';
import { LiaCertificateSolid } from "react-icons/lia";
import { BsTwitterX } from "react-icons/bs";
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime } from '../utils/formatDuration'
import { Link } from 'react-router-dom';
import api from '@/utils/axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useCourseById, useLessons, useSection } from '@/hooks/CoursesHooks/useCourse';
import CourseOverview from './CourseDetails/CourseOverview';
import CourseInstructor from './CourseDetails/CourseInstructor';
import CourseReviews from './CourseDetails/CourseReviews';

const CourseDetails = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { course_id } = useParams()
  const [sectionId, setsectionId] = useState(null)
  const [opensection, Setopensection] = useState(null)
  const { isLoading: courseLoading, isError: courseError, data } = useCourseById(course_id)
  const { isLoading: sectionLoading, isError: sectionError, data: section } = useSection(course_id)
  const { isLoading: lessonLoading, isError: lessonError, data: lesson } = useLessons(sectionId)

  const course = data?.course || []
  const teacher = data?.teacher || []
  const toggleAccordian = (section) => {
    Setopensection(opensection === section ? null : section)
  }

  const handleEnrollment = async () => {
    try {
      const res = await api.post(`/course/enroll/${course_id}`)
      toast.success('enrolled')
      setTimeout(() => {
        navigate('/dashboard/student/my-courses')
      }, 1000);
    }
    catch (Err) {
      console.log(Err)
    }
  }
  const tabs = [{ name: "overview", id: 1 }, { name: "syllabus", id: 2 }, { name: "instructor", id: 3 }, { name: "review", id: 4 }]
  const { tab, toggletab, toggleModule, syllabus } = usetoggletab()

  useEffect(() => {
    toggletab("overview");

  }, []);

  return (
    <div className=' bg-white  w-full min-h-screen font-[Roboto] '>
      {/* hero section */}
    
<section className="bg-gradient-to-br from-[#071120] via-[#0A1931] to-[#163A6B] pt-28 pb-16 text-white">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_380px] gap-10 items-start">

    {/* Left */}
    <div>
      <span className="inline-flex px-4 py-1 rounded-full bg-white/10 backdrop-blur text-sm font-medium">
        {course?.category}
      </span>

      <h1 className="mt-5 text-5xl font-heading font-bold leading-tight">
        {course?.title}
      </h1>

      <p className="mt-4 text-lg text-gray-300 leading-8 max-w-3xl">
        {course?.desc}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <SiBookstack /> {course?.lessonCount} Lessons
        </span>

        <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <IoTime /> {formatTime(course?.duration)}
        </span>

        <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <LuMessageCircleMore /> {course?.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <img
          src={course?.instructor?.avatar}
          className="w-14 h-14 rounded-full object-cover border-2 border-white"
          alt={course?.instructor?.firstName}
        />

        <div>
          <p className="font-semibold text-lg">{course?.instructor?.firstName}</p>
          <p className="text-gray-300">Instructor</p>
        </div>
      </div>
    </div>

    {/* Course Card */}
    <div className="w-full max-w-sm mx-auto bg-white/80 rounded-2xl p-3 shadow-xl border ">
      <div className="overflow-hidden rounded-xl">
        <img
          src={course?.thumbnail}
          className="w-full h-52 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
          alt={course?.title}
        />
      </div>

      <div className="flex justify-between items-center gap-4 pt-3">
        <p className="text-xl font-semibold font-heading text-button">
          ₹{course?.price}
        </p>

        <button
          onClick={handleEnrollment}
          className="px-5 py-2.5 rounded-xl bg-button text-white font-heading font-medium hover:opacity-90 transition"
        >
          Enroll Now
        </button>
      </div>
    </div>

  </div>
</section>

      <div className='grid grid-cols-1 md:grid-cols-2 w-full py-5 gap-8'>
        {/* for desktop  */}
        <div className='w-full hidden md:inline-flex order-2 md:order-1  justify-center'>
          <div className=' font-[Outfit] max-w-3xl  '>
            {/* headings */}
            <div className="sticky top-20 z-30 bg-white py-5 border-b">

              <div className="flex justify-center">

                <div className="bg-gray-100 rounded-2xl p-2 flex gap-2">

                  {tabs.map((t) => (

                    <button
                      key={t.id}
                      onClick={() => toggletab(t.name)}
                      className={`px-8 py-3 rounded-xl transition-all duration-300 font-medium

                    ${tab === t.name
                          ? "bg-[#0A1931] text-white shadow-lg"
                          : "text-gray-600 hover:bg-white"
                        }

                    `}
                    >

                      {t.name}

                    </button>

                  ))}

                </div>

              </div>

            </div>
            <div>
              {/* overview */}
              {tab === "overview" ? (
                
         <CourseOverview description={course?.desc}  />
              ) : tab === "syllabus" ? (
<div className="space-y-5 py-6">
  {section?.map((sec, i) => {
    const key = `module${i + 1}`;

    return (
      <div key={sec._id} className="border rounded-2xl bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => {
            toggleModule(key);
            setsectionId(sec._id);
          }}
          className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition"
        >
          <div>
            <p className="text-sm text-gray-400">Module {i + 1}</p>
            <h3 className="text-lg font-semibold font-heading text-dashboard">
              {sec.title}
            </h3>
            <p className="text-sm text-gray-500">
              {lesson?.length || 0} Lessons • {formatTime(sec.duration)}
            </p>
          </div>

          <TiArrowSortedDown
            className={`text-xl transition ${syllabus[key] ? "rotate-180" : ""}`}
          />
        </button>

        {syllabus[key] && (
          <div className="border-t bg-slate-50">
            {lesson?.map((item) => (
              <div key={item._id} className="flex justify-between items-center px-5 py-3 border-b last:border-none">
                <div className="flex items-center gap-3">
                  <FaPlayCircle className="text-button" />
                  <span>{item.lesson}</span>
                  {item.isPreview && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Preview
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {formatTime(item.duration)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  })}
</div>
              ) : tab === "instructor" ? (
              
                <CourseInstructor firstName={course?.instructor?.firstName} title={teacher?.title} bio={course?.instructor?.Bio} specialization= {teacher.specialization} avatar={course?.instructor?.avatar}/>
              ) :tab === "review" ? (

  <div className="py-6">

    {!course?.reviews?.length ? (
      <div className="border border-dashed rounded-2xl p-8 text-center">
        <div className="text-4xl">
          ⭐
        </div>
        <h2 className="mt-3 text-2xl font-heading font-semibold text-dashboard">
          No reviews yet
        </h2>

        <p className="mt-2 text-gray-500">
          Be the first learner to share your experience.
        </p>
      </div>
    ) : (
<div className="space-y-4">
  {course.reviews.map((review) => (
    <CourseReviews id={review._id} avatar={review.user.avatar} firstName={review.user.firstName} rating={review.rating} comment={review.comment}/>
  ))}
</div>
    )}
  </div>
): null}
            </div>
          </div>
        </div>
        {/* for mobile */}

        <div className=' flex flex-col gap-3 order-2 md:order-1 md:hidden'>
          <div onClick={() => toggleAccordian("overview")} className=' flex-col flex px-6 duration-200 transition-all ease-in'>
            <span className='flex justify-between items-center text-lg font-normal bg-slate-900 text-white rounded-lg px-3 py-2 '> <h2 >Overview </h2>{opensection === "overview" ? (<FaMinus className='text-xs' />) : (<FaPlus className='text-xs' />)}</span>
            {opensection === "overview" && (
              <div className='px-2 py-3 bg-gray-50 rounded-lg '>
                <div className='flex flex-col  gap-1 '>
                  <h1 className='text-lg font-medium'>Course Description</h1>
                  <p className='font-normal '>
                    {course?.overview?.description}
                  </p>
                </div>
                <div className='flex flex-col gap-1 '>
                  <h2 className='text-lg font-medium'>What you’ll learn</h2>
                  <ul className='flex flex-col list-disc list-outside pl-5'>
                    {course?.overview?.learn?.map((list) => {
                      return (
                        <li>{list}</li>)
                    })}
                  </ul>
                </div>
                <div className='flex flex-col gap-1 py-5'>
                  <h2 className='text-lg font-medium'>Who this course is for</h2>
                  <ul className='flex flex-col list-disc list-outside pl-5'>
                    {course?.overview?.highlights?.map((list) => {
                      return (
                        <li>{list}</li>
                      )
                    })}
                  </ul>
                </div>
                <div className='flex flex-col gap-1 py-3'>
                  <h2 className='text-lg font-medium'>Requirements</h2>
                  <ul className='flex flex-col list-disc list-outside pl-5'>
                    {course?.overview?.requirements.map((list) => {
                      return (
                        <li>
                          {list}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>)}
          </div>
          <div onClick={() => toggleAccordian("syllabus")} className=' flex-col flex px-6 '>
            <span className='flex justify-between items-center text-lg font-medium bg-slate-900 text-white rounded-lg px-3 py-2 '> <h2 >Syllabus </h2>{opensection === "syllabus" ? (<FaMinus className='text-xs' />) : (<FaPlus className='text-xs' />)}</span>
            {opensection === "syllabus" && (
              <div className='px-2 py-3 bg-gray-50 rounded-lg '>

                {section?.map((t, i) => {
                  const moduleKey = `module${i + 1}`;
                  return (
                    <div key={i}>
                      {/* Module header */}
                      <div
                        onClick={() => toggleModule(moduleKey)}
                        className="flex my-1 justify-between items-center py-5 bg-pink-400 px-3 rounded-lg text-white cursor-pointer"
                      >
                        <span className="flex items-center gap-2 text-lg font-medium">
                          <TiArrowSortedDown
                            className={`transition-transform duration-300 ${syllabus[moduleKey] ? "rotate-180" : "rotate-0"
                              }`}
                          />
                          {t.module}
                        </span>
                        <span>({t.totalTime})</span>
                      </div>
                      {/* Lessons */}
                      {syllabus[moduleKey] && (
                        <ul className="flex flex-col gap-2 mt-2">
                          {t?.lessons?.map((lesson, j) => (
                            <li
                              key={j}
                              className="flex justify-between rounded-xl hover:bg-gray-100 transition-all px-6 py-4 w-full"
                            >
                              <span className="flex items-center gap-2">
                                <FaPlayCircle className="text-sm text-pink-500" />
                                {lesson.title}
                              </span>
                              <span className="text-gray-500">{lesson.duration}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

              </div>)}
          </div>
          <div onClick={() => toggleAccordian("instructor")} className=' flex-col flex px-6 '>
            <span className='flex justify-between items-center text-lg font-medium bg-slate-900 text-white rounded-lg px-3 py-2 '> <h2 >Instructor </h2>{opensection === "insturctor" ? (<FaMinus className='text-xs' />) : (<FaPlus className='text-xs' />)}</span>
            {opensection === "instructor" && (
              <div className='px-2 py-3 bg-gray-50 rounded-lg ' >
                <div className='flex flex-col  pb-3'>
                  <h2 className='text-xl text-black font-semibold'>
                    {course?.instructor_name}
                  </h2>
                  <span className='text-lg '> ({course?.instructor.title})</span>
                </div>
                <div className='flex items-start   gap-7'>
                  <div className='w-[340px] border rounded-2xl p-4'><img className=' rounded-2xl' src={course?.instructor_img} alt={course?.instructor_img} /></div>
                  <div>
                    <ul className='flex flex-col text-base font-normal w-full gap-1'>
                      <li className='flex gap-2 '>
                        <span className='flex gap-2 items-center '><FaStar />{course?.instructor.rating} </span>
                      </li>
                      <li>
                        <span className='flex gap-2 items-center '><LiaCertificateSolid /> {course?.instructor.reviews} </span>
                      </li>
                      <li><span className='flex gap-2 items-center '><MdOutlinePeopleAlt />{course?.instructor.students}</span></li>
                      <li>
                        <span className='flex gap-2 items-center '><FaPlayCircle />{course?.instructor.courses}</span>
                      </li>
                      <li className='mt-3'> <div className='flex gap-1 text-lg'>
                        <span className='cursor-pointer'><FaFacebookF className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95' /></span>
                        <span><BsTwitterX className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95' /></span>
                        <span><FaInstagram className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95' />
                        </span>
                      </div></li>
                    </ul>

                  </div>
                </div>
                <div className='gap-4 flex flex-col py-5'>
                  <div className='flex flex-col gap-1 '>
                    <h1 className='text-lg font-medium'>About the Instructor:</h1>
                    <p className='font-normal '>
                      {course.instructor.bio}
                    </p>
                  </div>
                  <div className='flex flex-col gap-1 '>
                    <h1 className='text-lg font-medium'>Teaching Style :</h1>
                    <p className='font-normal '>
                      {course?.instructor.teaching}
                    </p>
                  </div>
                  <div className='flex flex-col gap-1 '>
                    <h2 className='text-lg font-medium'>Highlights:</h2>
                    <ul className='flex flex-col list-disc list-outside pl-5'>
                      {/* {courseData.instructor} */}
                      <li>Designed apps & websites for international clients in tech and e-commerce</li>
                      <li>Specialist in wireframing, user flows, and usability testing</li>
                      <li>Featured in multiple design publications and online communities</li>
                      <li>Mentored 5,000+ students worldwide through workshops and online classes</li>

                    </ul>

                  </div>
                </div>

              </div>)}
          </div>

          {/* <div onClick={() => toggleAccordian("review")} className=' flex-col flex px-6 '>
            <span className='flex justify-between items-center text-lg font-medium bg-slate-900 text-white rounded-lg px-3 py-2 '> <h2 >Review </h2>{opensection === "review" ? (<FaMinus className='text-xs' />) :(<FaPlus className='text-xs' />)}</span>
            {opensection === "review" && (
              <div className='grid grid-cols-1 gap-5 justify-center items-center  py-10 w-full'>

                 {courseData.reviews.map((rev) => {
                  return (
                    <div className='flex flex-col gap-4 border py-5 px-3 w-full rounded-2xl shadow-xl'>
                      <div className='flex gap-3'>
                        <img className=' w-16 rounded-full' src={rev.img} alt={rev.img} />
                        <div className='flex flex-col items-start  justify-start '>
                          <span className='font-medium' >{rev.name}</span>
                          <Rating name="read-only" value={rev.rating} readOnly />
                        </div>
                        <div>
                        </div>
                      </div>
                      <p>
                        {rev.comment}
                      </p>
                    </div>
                  )
                })} 

              </div>)}
          </div> */}
        </div>
        <div className='  flex flex-col order-1 md:order-2 gap-5 justify-start items-center '>

          <div className='flex flex-col  cursor-pointer  shadow-2xl bg-white text-black   gap-3 rounded-2xl p-4 '>
            <h2 className='text-xl p-2  font-medium text-black capitalize font-[Outfit]'>course features</h2>
            <div className='flex flex-col'>
              <ul className='flex flex-col gap-6 p-2'>
                <li className='text-lg group flex justify-start text-gray-600 items-center gap-2'>
                  <MdOndemandVideo className=' text-black text-2xl group-hover:text-pink-500 ' />2.5 hours on-demand video
                </li>
                <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                  <MdOutlineSimCardDownload className=' text-black text-2xl group-hover:text-pink-500 ' />Downloadable resources
                </li>
                <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                  <FaMobileAlt className=' text-black text-2xl group-hover:text-pink-500 ' />Access on mobile and desktop
                </li>
              </ul>
              <ul className='flex flex-col gap-6 p-2'>
                <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                  <TbWorldCheck className=' text-black text-2xl group-hover:text-pink-500 ' />Lifetime access
                </li>
                <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                  <GrCertificate className=' text-black text-2xl group-hover:text-pink-500 ' />Certificate of completion
                </li>
                <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                  <PiFileAudioBold className=' text-black text-2xl group-hover:text-pink-500' />Audio lectures available
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>


    </div>


  )
}

export default CourseDetails