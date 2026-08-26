import React, { useEffect, useState } from 'react'
import {  FaMobileAlt,  } from "react-icons/fa";
import { MdOndemandVideo, MdOutlineSimCardDownload } from "react-icons/md";
import { TbWorldCheck } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { PiFileAudioBold } from "react-icons/pi";
import { usetoggletab } from '../Store/UseToggleTab';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/utils/axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useCourseById, useCurriculum, useLessons } from '@/hooks/CoursesHooks/useCourse';
import CourseOverview from './CourseDetails/CourseOverview';
import CourseInstructor from './CourseDetails/CourseInstructor';
import CourseReviews from './CourseDetails/CourseReviews';
import HeroSection from './CourseDetails/HeroSection';
import RelatedCourses from './CourseDetails/RelatedCourses';
import CourseCurriculum from '@/Components/Courses/curriculum/CourseCurriculum';
import CourseCard from './CourseDetails/CourseCard';

const CourseDetails = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { course_id } = useParams()
  const { isLoading: courseLoading, isError: courseError, data } = useCourseById(course_id)
const {data:curriculum}=useCurriculum(course_id)
const section = curriculum?.SectionWithLesson || []
  const course = data?.course || []
  const reviews = data?.formattedReviews || []
  const teacher = data?.teacher || []
const enrollment = data?.enrollment 
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
  const { tab, toggletab, } = usetoggletab()

  useEffect(() => {
    toggletab("overview");

  }, []);

  return (
<div className="course-page relative grid grid-cols-1 lg:grid-cols-[1fr_400px] px-20  bg-white w-full min-h-screen font-[Roboto]">
         {/* hero section */}
    {/* bg-gradient-to-br from-[#071120] via-[#0A1931] to-[#163A6B] */}
<div className="relative z-10 min-w-0 ">
<section className="relative pt-34 pb-16 min-h-[450px] text-white">
<div className="relative z-10 max-w-[1280px] mx-auto px-6">
  <HeroSection category={course?.category} title={course?.title} desc={course?.desc} duration={course?.duration} lessons={course?.lessonCount} level={course?.difficulty}/>

  </div>

</section>
<div className="w-full py-5 min-h-[500px]">

  {/* DESKTOP */}
  <div className="hidden md:flex justify-center w-full min-w-0">

    <div className="font-[Outfit] w-full max-w-3xl min-w-0">

      {/* TABS */}
      <div className="sticky top-20 z-30 bg-white py-5 border-b">

        <div className="flex justify-center">

          <div className="bg-gray-100 rounded-2xl p-2 flex gap-2">

            {tabs.map((t) => (

              <button
                key={t.id}
                onClick={() => toggletab(t.name)}
                className={`
                  px-8 py-3 rounded-xl
                  transition-all duration-300
                  font-medium
                  ${
                    tab === t.name
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


      {/* TAB CONTENT */}

      <div>

        {tab === "overview" ? (

          <CourseOverview
            description={course?.desc}
          />

        ) : tab === "syllabus" ? (

          <div className="space-y-5 py-6">
       <CourseCurriculum curriculum={section}/>
          </div>

        ) : tab === "instructor" ? (

          <CourseInstructor
            firstName={course?.instructor?.firstName}
            title={teacher?.title}
            bio={course?.instructor?.Bio}
            specialization={teacher?.specialization}
            avatar={course?.instructor?.avatar}
          />

        ) : tab === "review" ? (

          <div className="py-6">

            {!reviews?.length ? (

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

                {reviews?.map((review) => ( <CourseReviews key={review._id} id={review._id} avatar={review.user.avatar} name={review.user.name}  review={review}/>

                ))}

              </div>

            )}

          </div>

        ) : null}

      </div>

    </div>

  </div>


  {/* MOBILE */}
  <div className="flex flex-col gap-3 md:hidden">

    {/* your existing mobile accordion code */}

  </div>
<RelatedCourses  courses={course}
  instructorName={course?.instructor?.firstName}/>
</div>
</div>
<div className="relative z-20">

  <div className=" sticky  top-6  mt-36  w-full  max-w-[340px]  mx-auto  bg-white  rounded-2xl  shadow-2xl border overflow-hidden"> {/* IMAGE + PRICE */}
<CourseCard enrollment={enrollment} course_name={course?.title} handleEnrollment={handleEnrollment} thumbnail={course?.thumbnail} title={course?.title} price={course?.price} />
    {/* FEATURES */}
    <div className="border-t px-4 py-4">

      <h2 className="text-lg font-semibold font-heading text-[#0A1931] mb-3">
        Course Features
      </h2>

      <ul className="flex flex-col gap-3">

        <li className="flex items-center gap-3 text-sm text-gray-600">
          <MdOndemandVideo className="text-xl text-button shrink-0" />
          2.5 hours on-demand video
        </li>

        <li className="flex items-center gap-3 text-sm text-gray-600">
          <MdOutlineSimCardDownload className="text-xl text-button shrink-0" />
          Downloadable resources
        </li>

        <li className="flex items-center gap-3 text-sm text-gray-600">
          <FaMobileAlt className="text-xl text-button shrink-0" />
          Access on mobile and desktop
        </li>

        <li className="flex items-center gap-3 text-sm text-gray-600">
          <TbWorldCheck className="text-xl text-button shrink-0" />
          Lifetime access
        </li>

        <li className="flex items-center gap-3 text-sm text-gray-600">
          <GrCertificate className="text-xl text-button shrink-0" />
          Certificate of completion
        </li>

        <li className="flex items-center gap-3 text-sm text-gray-600">
          <PiFileAudioBold className="text-xl text-button shrink-0" />
          Audio lectures available
        </li>

      </ul>

    </div>
  </div>

</div>

    </div>


  )
}

export default CourseDetails