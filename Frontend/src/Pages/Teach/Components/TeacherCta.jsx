
import React from 'react'
import { Link } from 'react-router-dom'

const TeacherCta = () => {
  return (
    <section className="w-full bg-page px-4 py-10 sm:px-6 md:px-12 lg:px-20 md:py-16">
      <div className="bg-gradient-to-br from-[#D0E6FD] via-[#EAF4FF] to-[#F5FAFF] px-5 py-12 sm:px-8 md:px-12 md:py-16 min-h-[320px] md:min-h-[380px] rounded-3xl shadow flex flex-col gap-5 items-center justify-center text-center">

        <h2 className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-accent font-semibold font-heading leading-tight max-w-4xl">
          Ready to Start Your Teaching Journey?
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-body text-text-light max-w-2xl leading-relaxed">
          Join SkillNest and empower learners by sharing your skills, experience, and passion for teaching. Your knowledge can make a difference in someone's learning journey.
        </p>

        <Link
          to="/become-teacher"
          className="inline-flex items-center justify-center hover:scale-105 transition-all duration-300 my-2 bg-button hover:bg-button-hover text-white rounded-xl py-3 px-7 text-base sm:text-lg font-heading font-medium shadow-md shadow-primary/20"
        >
          Become a Teacher
        </Link>
      </div>
    </section>
  )
}

export default TeacherCta
