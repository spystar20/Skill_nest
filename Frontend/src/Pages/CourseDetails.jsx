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
import { FiTrendingUp } from 'react-icons/fi';
import HeroSection from './CourseDetails/HeroSection';
import RelatedCourses from './CourseDetails/RelatedCourses';

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

            {section?.map((sec, i) => {

              const key = `module${i + 1}`;

              return (

                <div
                  key={sec._id}
                  className="border rounded-2xl bg-white shadow-sm overflow-hidden"
                >

                  <button
                    onClick={() => {
                      toggleModule(key);
                      setsectionId(sec._id);
                    }}
                    className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition"
                  >

                    <div>

                      <p className="text-sm text-gray-400">
                        Module {i + 1}
                      </p>

                      <h3 className="text-lg font-semibold font-heading text-dashboard">
                        {sec.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {lesson?.length || 0} Lessons •{" "}
                        {formatTime(sec.duration)}
                      </p>

                    </div>

                    <TiArrowSortedDown
                      className={`
                        text-xl transition
                        ${syllabus[key] ? "rotate-180" : ""}
                      `}
                    />

                  </button>


                  {syllabus[key] && (

                    <div className="border-t bg-slate-50">

                      {lesson?.map((item) => (

                        <div
                          key={item._id}
                          className="flex justify-between items-center px-5 py-3 border-b last:border-none"
                        >

                          <div className="flex items-center gap-3">

                            <FaPlayCircle className="text-button" />

                            <span>
                              {item.lesson}
                            </span>

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

          <CourseInstructor
            firstName={course?.instructor?.firstName}
            title={teacher?.title}
            bio={course?.instructor?.Bio}
            specialization={teacher?.specialization}
            avatar={course?.instructor?.avatar}
          />

        ) : tab === "review" ? (

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

                  <CourseReviews
                    key={review._id}
                    id={review._id}
                    avatar={review.user.avatar}
                    firstName={review.user.firstName}
                    rating={review.rating}
                    comment={review.comment}
                  />

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

    <div className="p-3">

      <div className="overflow-hidden rounded-xl">

        <img
          src={course?.thumbnail}
          className="
            w-full
            h-52
            object-cover
            rounded-xl
            transition-transform
            duration-300
            hover:scale-105
          "
          alt={course?.title}
        />

      </div>


      <div className="flex justify-between items-center gap-4 pt-3">

        <p className="text-2xl font-semibold font-heading text-button">
          ₹{course?.price}
        </p>

        <button
          onClick={handleEnrollment}
          className="
            px-5
            py-2.5
            rounded-xl
            bg-button
            text-white
            font-heading
            font-medium
            hover:opacity-90
            transition
          "
        >
          Enroll Now
        </button>

      </div>

    </div>
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