import { Rating } from '@mui/material'
import React from 'react'

const CourseReviews = ({id,avatar,name,review}) => {
  return (

    <div key={id} className="border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
        <div className='flex items-center justify-between w-full'>
          <span className='flex flex-col'>
          <h3 className="font-semibold capitalize">{name}</h3>
          <span className="text-xs text-text-light">
  Reviewed on{" "} {new Date(review?.createdAt).toLocaleDateString("en-In",{day:"numeric",month:"short",year:"numeric"})}
</span>   
</span>
          <Rating value={review?.rating} readOnly size="small" />
     </div>
      </div>
      <p className="mt-3 text-gray-600">{review?.review}</p>
    </div>


  )
}

export default CourseReviews