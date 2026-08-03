import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({thumbnail,title,price,handleEnrollment,enrollment,course_name}) => {
  return (

    <div className="p-3">

      <div className="overflow-hidden rounded-xl">

        <img
          src={thumbnail}
          className="
            w-full
            h-52
            object-cover
            rounded-xl
            transition-transform
            duration-300
            hover:scale-105
          "
          alt={title}
        />

      </div>
      {enrollment=== null ?(
      <div className="flex justify-between items-center gap-4 pt-3">

        <p className="text-2xl font-semibold font-heading text-button">
          ₹{price}
        </p>

        <button
          onClick={handleEnrollment}  className=" px-5 py-2.5  rounded-xl  bg-button  text-white  font-heading  font-medium   hover:opacity-90  transition" >
          Enroll Now
        </button>

      </div>
):(<div className="flex  pt-3">

      {enrollment?.status === "not-started" && (
          <>
           <Link to={`/courses/${course_name}/${enrollment?._id}/learn`} className=" px-5 py-2.5 w-full  rounded-xl  bg-button  text-white  font-heading  font-medium   hover:opacity-90  transition"> 
              Start Learning
      
            </Link> 
          </>
        )}

        {/* IN PROGRESS */}

        {enrollment?.status === "in-progress" && (
          <>


                  <Link to={`/courses/${course_name}/${enrollment?._id}/learn`} className=" px-5 py-2.5 w-full  rounded-xl  bg-button  text-white  font-heading  font-medium   hover:opacity-90  transition"> 

              Continue Learning
            
            </Link> 
          </>
        )}

        {/* COMPLETED */}

        {enrollment?.status === "completed" && (
          <Link to={`/courses/${course_name}/${enrollment._id}/learn`}   className=" px-5 py-2.5 w-full  rounded-xl  bg-button  text-white  font-heading  font-medium   hover:opacity-90  transition">

              Review Course
           </Link>
        
        )}

      </div>)}
    </div>  )
}

export default CourseCard