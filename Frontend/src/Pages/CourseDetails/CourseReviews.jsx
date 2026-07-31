import { Rating } from '@mui/material'
import React from 'react'

const CourseReviews = ({id,avatar,firstName,rating,comment}) => {
  return (

    <div key={id} className="border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
        <div>
          <h3 className="font-semibold">{firstName}</h3>
          <Rating value={rating} readOnly size="small" />
        </div>
      </div>
      <p className="mt-3 text-gray-600">{review.comment}</p>
    </div>

  )
}

export default CourseReviews