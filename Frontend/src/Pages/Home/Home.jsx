
import React from 'react'
import hero from '../../assets/girl.png'
import { TbBooks } from "react-icons/tb"
import { GrCertificate } from "react-icons/gr"
import { PiStudentFill } from "react-icons/pi"
import { FaChalkboardTeacher } from "react-icons/fa"
import { featureCourses } from '../../Courses/featuredCourse'
import ProjectCard from '@/Pages/Course/ProjectCard'
import { Link } from 'react-router-dom'
import Testimonials from './Components/Testimonials'
import FeaturedTeacher from './Components/FeaturedTeacher'
import TrustedSections from './Components/TrustedSections'
import PopluarCourses from './Components/PopluarCourses'
import FeatureComponent from './Components/Features/FeatureComponent'
import PromotionCard from './Components/PromotionCard'

const Home = () => {
  const promotionData = [
    { id: 1, stat: '24K+', title: 'online courses', icon: TbBooks },
    { id: 2, stat: '60+', title: 'expert tutors', icon: FaChalkboardTeacher },
    { id: 3, stat: '20K+', title: 'online students', icon: PiStudentFill },
    { id: 4, stat: '5K+', title: 'Skill Tracks', icon: GrCertificate },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full pt-20 py-10 font-body home-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-0 px-4 py-10 lg:px-20 lg:py-10 justify-between items-center">

          <div className="flex flex-col max-w-lg justify-center items-start gap-4">
            <h1 className="text-5xl/15 font-heading font-bold text-white">
              Learn. Create. Thrive.
            </h1>

            <p className="text-white mt-4 font-body">
              Learn in-demand skills from experienced mentors across technology, design, business, and more — all in one place.
            </p>

            <Link to="/courses">
              <button className="transition-colors bg-button hover:bg-button-hover font-body cursor-pointer text-white rounded-lg py-2 px-6 text-xl capitalize font-medium">
                Explore courses
              </button>
            </Link>
          </div>

          <div className="hidden lg:flex">
            <div className="flex">
              <img
                className="relative rounded-4xl left-[4rem] top-16 w-lg z-30"
                src={hero}
                alt="Student learning online"
              />
            </div>

            {/* Connected Students */}
            <div className="home-bg border border-white/30 max-w-1/3 shadow-sm shadow-black absolute top-[7rem] right-[10rem] flex gap-3 flex-col px-4 py-5 rounded-2xl">
              <h2 className="text-xl font-heading font-bold capitalize text-white">
                2K+ connected students
              </h2>

              <div className="flex flex-col justify-start gap-4 items-start">
                <div className="flex justify-center items-center gap-2">
                  <img
                    className="w-14 rounded-2xl"
                    src="https://i.pinimg.com/736x/49/69/ee/4969eedf929fec0fdd484ef1260bcb51.jpg"
                    alt="Connected student"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg capitalize font-semibold text-white">
                      kefier
                    </span>
                    <span className="text-sm flex items-center gap-1 justify-center text-accent">
                      <span className="w-2 h-2 mt-1 rounded-full bg-accent"></span>
                      connected
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <img
                    className="w-14 rounded-2xl"
                    src="https://i.pinimg.com/736x/41/9d/79/419d79f7ed0bade5a1d43b2f43f91eff.jpg"
                    alt="Connected student"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg capitalize font-semibold text-white">
                      jay jay
                    </span>
                    <span className="text-sm flex items-center gap-1 justify-center text-accent">
                      <span className="w-2 h-2 mt-1 rounded-full bg-accent"></span>
                      connected
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Successful Growth */}
            <div className="flex shadow-lg shadow-black w-[14vw] absolute z-10 top-[14rem] right-[30rem] px-2 py-1 gap-1 justify-start rounded-2xl bg-card text-text opacity-90 backdrop-blur-md items-center">
              <h2 className="text-sm font-heading font-semibold capitalize">
                successful growth
              </h2>

              <div>
                <img
                  className="w-14 rounded-2xl"
                  src="https://i.pinimg.com/736x/d7/f2/c9/d7f2c9b7a05f1e67e863b26f4bd3a8aa.jpg"
                  alt="Learning achievement"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Cards */}
        <div className="data p-1 my-10 grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-6 justify-center items-center">
          {promotionData.map((card) => (
            <PromotionCard
              key={card.id}
              title={card.title}
              stat={card.stat}
              Icon={card.icon}
            />
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <FeatureComponent />

      {/* Popular Courses */}
      <PopluarCourses />

      {/* Trusted By */}
      <TrustedSections />

      {/* Featured Courses and Teachers */}
      <div className="box grid grid-cols-1 gap-10 w-full h-full px-4 py-10 md:px-10 md:py-20">

        {/* Featured Courses */}
        <div>
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start gap-3 mt-10 text-center">
            <h4 className="text-xl bg-linear-120 to-blue-200 from-white text-transparent bg-clip-text capitalize font-span text-shadow-2xs">
              “Editor’s Picks”
            </h4>

            <h2 className="text-3xl md:text-5xl text-white drop-shadow-lg font-medium font-heading capitalize">
              featured <span className="md:text-4xl border-b-2 font-span italic">courses</span>
            </h2>

            <p className="text-white text-lg font-body">
              Explore handpicked courses selected to help you build practical skills and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-5 py-10">
            {featureCourses.map((course, index) => (
              <ProjectCard
                img={course.img}
                price={course.price}
                key={index}
                category={course.category}
                course_desc={course.course_desc}
                course_name={course.course_name}
                chapters={course.chapters}
                duration={course.duration}
                level={course.level}
                rating={course.rating}
                instructor_img={course.instructor_img}
                instructor_name={course.instructor_name}
              />
            ))}
          </div>
        </div>

        {/* Featured Teachers */}
        <FeaturedTeacher />
      </div>

      {/* Testimonials */}
      <Testimonials />
    </div>
  )
}

export default Home
