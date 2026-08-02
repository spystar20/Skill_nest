import React, { useState } from 'react'
import SectionCurriculum from './SectionCurriculum'

const CourseCurriculum = ({curriculum}) => {
const [syllabus,setSyllabus]=useState({})
const toggleSection =(key)=>{
    setSyllabus((prev)=>({
        ...prev,
   [key]:!prev[key]
    }))
}
  return (
  <>
  {curriculum?.map((section,i)=>{
    const key = `module${i+1}`
    return(
    <SectionCurriculum toggleFunction={()=>toggleSection(key)} index={i} key={section._id} section={section} isOpen={!!syllabus[key]}/>)
  })}
  </>
  )
}

export default CourseCurriculum