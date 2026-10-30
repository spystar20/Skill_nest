import React from 'react'
import Hero from './Components/Hero'
import TeacherFeature from './Components/TeacherFeature'
import Steps from './Components/Steps'
import Features from './Components/Features'
import TeacherCta from './Components/TeacherCta'

const Teach = () => {
  return (
    <div className='w-full '>
      {/* hero-section */}
      <Hero />
      {/* why teach on SkillNest */}
      <TeacherFeature />
      {/* steps */}
      <Steps />
      {/* features */}
      <Features />
      {/* cta */}
      <TeacherCta />
    </div>
  )
}

export default Teach