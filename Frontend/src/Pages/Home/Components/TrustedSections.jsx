
import React from 'react'
import { FaAws, FaGoogle, FaGitAlt, FaApple } from 'react-icons/fa'
import { SiCanva, SiSamsung, SiDuolingo } from 'react-icons/si'
import { TiVendorMicrosoft } from 'react-icons/ti'

const TrustedSections = () => {
  return (
    <div className="text-center w-full h-full px-4 py-10 md:px-10 md:py-8 text-white">
      <h2 className="text-xl font-light font-heading">
        Trusted by over 16,000 companies and millions of learners around the world
      </h2>

      <div className="text-3xl md:text-6xl logo font-light opacity-80 font-heading flex flex-row flex-wrap justify-center gap-12 md:gap-24 items-center mt-11">
        <span><FaAws /></span>
        <span><SiCanva /></span>
        <span><FaGoogle /></span>
        <span><SiSamsung /></span>
        <span><TiVendorMicrosoft /></span>
        <span><FaGitAlt /></span>
        <span><FaApple /></span>
        <span><SiDuolingo /></span>
      </div>
    </div>
  )
}

export default TrustedSections
