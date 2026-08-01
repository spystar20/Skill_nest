import { formatTime } from '@/utils/formatDuration'
import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'
import { IoTime } from 'react-icons/io5'
import { SiBookstack } from 'react-icons/si'

const HeroSection = ({category,title,desc,lessons,duration,level}) => {
  return (
<div className="max-w-4xl">

      <span className="inline-flex px-4 py-1 rounded-full bg-white/10 backdrop-blur text-sm font-medium">
        {category}
      </span>

      <h1 className="mt-5 text-5xl font-heading font-bold leading-tight">
        {title}
      </h1>

      <p className="mt-4 text-lg text-gray-300 leading-8 max-w-3xl">
        {desc}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">

        <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <SiBookstack />
          {lessons} Lessons
        </span>

        <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <IoTime />
          {formatTime(duration)}
        </span>

        <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
          <FiTrendingUp />
          {level}
        </span>

      </div>

    </div>  )
}

export default HeroSection