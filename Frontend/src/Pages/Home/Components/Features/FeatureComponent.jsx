
import React, { useState } from 'react'
import { GiTeacher } from 'react-icons/gi'
import { LiaCertificateSolid } from 'react-icons/lia'
import { MdArrowOutward, MdSupportAgent } from 'react-icons/md'
import { PiVideoFill } from 'react-icons/pi'
import FeatureCard from './FeatureCard'

const FeatureComponent = () => {
  const [show, setShow] = useState(false)

  const toggleFeatures = () => {
    setShow(prev => !prev)
  }

  const featureArray = [
    {
      id: 1,
      title: 'video lessons',
      description: 'Recorded lectures from professional instructors to boost your growth',
      icon: PiVideoFill
    },
    {
      id: 2,
      title: 'Get Certificate',
      description: 'Add value to your profile and increase your hiring chances',
      icon: LiaCertificateSolid
    },
    {
      id: 3,
      title: 'Lifetime Support',
      description: 'Get lifetime access and support anytime you need',
      icon: MdSupportAgent
    },
    {
      id: 4,
      title: 'Amazing Instructor',
      description: 'Learn from experienced mentors with real-world expertise',
      icon: GiTeacher
    },
  ]

  return (
    <div className="w-full flex flex-col gap-10 justify-center items-center min-h-screen px-4 py-10 md:py-20 md:px-10 font-body">

      {/* Feature Header */}
      <div className="feature-box flex justify-center items-center font-heading w-full max-w-3xl shadow-md text-3xl md:text-4xl capitalize font-semibold text-primary gap-3 p-5 md:p-10 rounded-2xl">

        <div className="flex flex-col justify-center items-center gap-6 text-center">

          <h2>
            our <span className="font-span italic lowercase text-white">features</span> specially for you
          </h2>

          <button
            onClick={toggleFeatures}
            aria-expanded={show}
            className="flex justify-center items-center transition-all hover:scale-95 group font-body bg-button hover:bg-button-hover cursor-pointer text-white rounded-lg py-2 px-3 gap-1 text-xl capitalize font-medium"
          >
            {show ? 'Hide features' : 'See all features'}
            <MdArrowOutward className="mt-1 group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>
      </div>

      {/* Feature Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl overflow-hidden transition-all duration-500 ease-in-out ${
          show ? 'max-h-[1000px] opacity-100 mt-10' : 'max-h-0 opacity-0'
        }`}
      >
        {featureArray.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            Icon={feature.icon}
          />
        ))}
      </div>

    </div>
  )
}

export default FeatureComponent
