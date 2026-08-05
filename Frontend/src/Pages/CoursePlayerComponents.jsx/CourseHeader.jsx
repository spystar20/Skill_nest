import React from 'react'

const CourseHeader = ({ title, lesson }) => {
  return (
    <div className="mb-5 sm:mb-6">
      <h2 className="font-heading text-xl font-semibold leading-tight text-primary sm:text-2xl md:text-3xl">
        {title}
      </h2>

      {lesson && (
        <p className="mt-2 font-body text-sm text-text-light sm:text-base">
          Currently watching:{" "}
          <span className="font-medium text-text">
            {lesson}
          </span>
        </p>
      )}
    </div>
  )
}

export default CourseHeader