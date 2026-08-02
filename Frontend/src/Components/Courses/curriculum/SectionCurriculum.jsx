import React from 'react'
import { formatTime } from '@/utils/formatDuration'
import LessonCurriculum from './LessonCurriculum'
import { TiArrowSortedDown } from 'react-icons/ti'
const SectionCurriculum = ({section,toggleFunction,index,isOpen}) => {
  return (
<div
  key={section._id}
  className="border rounded-2xl bg-white shadow-sm overflow-hidden"
>
  <button
    onClick={toggleFunction}
    className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition"
  >
    <div>
      <p className="text-sm text-gray-400">Module {index + 1}</p>

      <h3 className="text-lg font-semibold font-heading text-dashboard">
        {section.title}
      </h3>

      <p className="text-sm text-gray-500">
        {section?.lessons?.length || 0} Lessons •{" "}
        {formatTime(section.duration)}
      </p>
    </div>

    <TiArrowSortedDown
      className={`text-xl transition ${
        isOpen? "rotate-180" : ""
      }`}
    />
  </button>

  {isOpen && (
    <div className="border-t bg-slate-50">
      {section.lessons?.map((item) => (
    <LessonCurriculum lesson={item}/>
      ))}
    </div>
  )}
</div>  )
}

export default SectionCurriculum