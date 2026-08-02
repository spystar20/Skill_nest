import { formatTime } from '@/utils/formatDuration'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'

const LessonCurriculum = ({lesson}) => {
  return (
<div
  key={lesson._id}
  className="flex justify-between items-center px-5 py-3 border-b last:border-none"
>
  <div className="flex items-center gap-3">
    <FaPlayCircle className="text-button" />
    <span>{lesson.lesson}</span>

    {lesson.isPreview && (
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
        Preview
      </span>
    )}
  </div>

  <span className="text-sm text-gray-500">
    {formatTime(lesson.duration)}
  </span>
</div>

 )
}

export default LessonCurriculum