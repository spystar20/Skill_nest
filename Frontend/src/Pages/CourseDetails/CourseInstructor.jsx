import React from 'react'

const CourseInstructor = ({specialization,firstName,title,avatar,bio}) => {
  return (
    <div className=' py-5 pl-4 '>
                  <div className='flex flex-col  pb-3'>
                    <h2 className='text-xl text-black font-semibold'>
                      {firstName}
                    </h2>
                    <span className='text-lg '> ({title})</span>
                  </div>
                  <div className='flex items-start   gap-7'>
                    <div className='w-[340px] object-cover border rounded-2xl p-4'><img className=' rounded-2xl' src={avatar} alt={avatar} /></div>
                    <div>
                      {/* <ul className='flex flex-col text-base font-normal w-full gap-1'>
                        <li className='flex gap-2 '>
                          <span className='flex gap-2 items-center '><FaStar />{courseData.instructor.rating} </span>
                        </li>
                        <li>
                          <span className='flex gap-2 items-center '><LiaCertificateSolid /> {courseData.instructor.reviews} </span>
                        </li>
                        <li><span className='flex gap-2 items-center '><MdOutlinePeopleAlt />{courseData.instructor.students}</span></li>
                        <li>
                          <span className='flex gap-2 items-center '><FaPlayCircle />{courseData.instructor.courses}</span>
                        </li>
                        <li className='mt-3'> <div className='flex gap-1 text-lg'>
                          <span className='cursor-pointer'><FaFacebookF className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95' /></span>
                          <span><BsTwitterX className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95' /></span>
                          <span><FaInstagram className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95' />
                          </span>
                        </div></li>
                      </ul> */}

                    </div>
                  </div>
                  <div className='gap-4 flex flex-col py-5'>
                    <div className='flex flex-col gap-1 '>
                      <h1 className='text-lg font-medium'>About the Instructor:</h1>
                      <p className='font-normal '>
                        {bio}
                      </p>
                    </div>
                    <div className='flex flex-col gap-1 '>
                      <h1 className='text-lg font-medium'>Specialization :</h1>
                      <p className='font-normal '>
                       {specialization}
                      </p>
                    </div>
                    <div className='flex flex-col gap-1 '>
                      <h2 className='text-lg font-medium'>Highlights:</h2>
                      <ul className='flex flex-col list-disc list-outside pl-5'>
                        {/* {courseData.instructor} */}
                        <li>Designed apps & websites for international clients in tech and e-commerce</li>
                        <li>Specialist in wireframing, user flows, and usability testing</li>
                        <li>Featured in multiple design publications and online communities</li>
                        <li>Mentored 5,000+ students worldwide through workshops and online classes</li>
                      </ul>
                    </div>
                  </div>
                </div>  )
}

export default CourseInstructor