
import React from 'react'
import { teachers } from '@/Courses/teachers'
import { BsTwitterX } from 'react-icons/bs'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'

const FeaturedTeacher = () => {
  return (
    <section className="w-full py-10 md:px-8 lg:px-10">
      <div className="flex flex-col items-center text-center gap-3 mb-8">
        <h2 className="text-3xl md:text-5xl text-white drop-shadow-lg font-medium font-heading capitalize">
          featured <span className="md:text-4xl border-b-2 font-span italic">teachers</span>
        </h2>
        <p className="text-white/90 text-base md:text-lg font-body max-w-2xl">
          Meet the experienced mentors who bring practical knowledge and guidance to your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto">
        {teachers.map((teacher, index) => (
          <div
            key={teacher._id || teacher.id || index}
            className="flex flex-col gap-4 w-full h-full p-5 md:p-6 rounded-2xl bg-gradient-to-b from-primary-light/30 to-primary-light shadow-xl shadow-primary-dark/20 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-1 text-white">
              <span className="text-xl md:text-2xl font-semibold font-heading">
                {teacher.name}
              </span>
              <span className="text-base md:text-lg italic text-card font-body">
                {teacher.title}
              </span>
            </div>

            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
              <img
                className="w-full h-full object-cover object-top"
                src={teacher.img}
                alt={teacher.name}
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-center gap-6 rounded-xl bg-primary-dark/70 text-white/80 py-3 text-2xl md:text-3xl mt-auto">
              <a
                href="/"
                aria-label={`${teacher.name} on LinkedIn`}
                className="hover:text-accent hover:scale-110 transition-all"
              >
                <FaLinkedin />
              </a>
              <a
                href="/"
                aria-label={`${teacher.name} on Instagram`}
                className="hover:text-accent hover:scale-110 transition-all"
              >
                <FaInstagram />
              </a>
              <a
                href="/"
                aria-label={`${teacher.name} on X`}
                className="hover:text-accent hover:scale-110 transition-all"
              >
                <BsTwitterX />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedTeacher
