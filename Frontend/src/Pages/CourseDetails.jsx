import React from 'react'
import { CiHeart } from "react-icons/ci";
import { SiBookstack } from "react-icons/si";
import { IoTime } from "react-icons/io5";
import { FaStar, FaMobileAlt, FaEye ,FaPlayCircle , FaFacebookF  ,FaInstagram} from "react-icons/fa";
import { MdOndemandVideo, MdOutlineSimCardDownload ,MdOutlinePeopleAlt } from "react-icons/md";
import { TbWorldCheck } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { PiFileAudioBold } from "react-icons/pi";
import { LuMessageCircleMore } from "react-icons/lu";
import { TiArrowSortedDown } from "react-icons/ti";
import { usetoggletab } from '../Store/UseToggleTab';
import { LiaCertificateSolid } from "react-icons/lia";
import { BsTwitterX } from "react-icons/bs";
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import course from '../data/course';
import { Link } from 'react-router-dom';

const CourseDetails = () => {
  const tabs = [ {name: "overview",id:1 },{name:"syllabus",id:2},{name:"instructor",id:3},{name:"review",id:4}]
  const {tab,toggletab,toggleModule,syllabus } = usetoggletab()
  const {course_name} = useParams()
 const courseData = course.find((c)=> c.course_name == course_name)
 if(!courseData){
<h1>course not found</h1>
 }
  return (
    <div className=' bg-white w-full h-[100vh] font-[Roboto]'>
      
      <div className='w-[100%] h-[50%] flex justify-between items-center gap-3  text-white  home-bg'>
        {/* course info */}
        <div className='flex flex-col gap-7 items-center justify-center w-[60%]'>
          <h2 className='text-3xl font-semibold font-[Outfit]  capitalize '>{courseData.course_name} </h2>
          <div className='flex justify-center items-center gap-6'>
            <span className='flex gap-2 items-center justify-center text-xl font-medium '>
              <SiBookstack className=' text-pink-300 font-bold text-2xl' />{courseData.chapters} lessons
            </span>
            <span className='flex gap-2 items-center justify-center text-xl font-medium '>
              <IoTime className='text-pink-300 font-bold text-2xl' />{courseData.duration}
            </span>
            <span className='flex gap-2 items-center justify-center text-xl font-medium '>
             
              <FaEye className='text-pink-300 font-bold text-2xl' />{courseData.view}
            </span>
          </div>
          <div className='flex items-center justify-between w-[60%]'>
            <div className='flex justify-start items-center gap-3'>
              <div><img src={courseData.instructor_img} className='w-16 rounded-full ' alt={courseData.instructor_img} /></div>
              <div className='flex flex-col justify-start items-start capitalize font-[outfit]'>
                <span className='text-lg font-medium'>{courseData.instructor_name}</span>
                <span className='font-medium text-sm '>instructor</span>
              </div>
            </div>
            <Rating  name="read-only" value={courseData.rating}  precision={0.5} readOnly/>
          </div>
        </div>
      </div>
      <div className='flex w-full py-5 '>
        <div className='w-[50%] pl-28 font-[Outfit]'>
          {/* headings */}           
          <div className='flex flex-row gap-16   text-black text-xl font-semibold '>
              {tabs.map((t)=>{return(
            <a key={t.id} onClick={()=>toggletab(t.name)} className={`cursor-pointer capitalize flex hover:text-pink-400 p-2 ${tab === t.name ? " underline-offset-8 underline  text-pink-400" :"text-black "}`}>{t.name}</a>
                 )})}         
          </div>      
<div>
          {/* overview */}
      {tab ==="overview" ?(
          <div>  
            <div className='flex flex-col gap-1 py-6'>
              <h1 className='text-lg font-medium'>Course Description</h1>
              <p className='font-normal '>
                {courseData.overview.description}
              </p>
            </div>
            <div className='flex flex-col gap-1 '>
              <h2 className='text-lg font-medium'>What you’ll learn</h2>
              <ul className='flex flex-col list-disc list-outside pl-5'>
                {courseData.overview.learn.map((list)=>{return(
                <li>{list}</li>)})}
              </ul>
            </div>
            <div className='flex flex-col gap-1 py-5'>
              <h2 className='text-lg font-medium'>Who this course is for</h2>
              <ul className='flex flex-col list-disc list-outside pl-5'>
                 {courseData.overview.highlights.map((list)=>{return(
                <li>{list}</li>
                )})}
              </ul>
            </div>
            <div className='flex flex-col gap-1 py-3'>
              <h2 className='text-lg font-medium'>Requirements</h2>
              <ul className='flex flex-col list-disc list-outside pl-5'>
                 {courseData.overview.requirements.map((list)=>{return(
                <li>
                {list}
                </li>
                )})}
               </ul>
            </div>
          </div>
      ): tab === "syllabus" ? (
          
          <div  className='py-10'>

{courseData.syllabus.map((t, i) => {
  const moduleKey = `module${i + 1}`; 
  return (
    <div key={i}>
      {/* Module header */}
      <div
        onClick={() => toggleModule(moduleKey)}
        className="flex my-1 justify-between items-center py-5 bg-pink-400 px-3 rounded-lg text-white cursor-pointer"
      >
        <span className="flex items-center gap-2 text-lg font-medium">
          <TiArrowSortedDown
            className={`transition-transform duration-300 ${
              syllabus[moduleKey] ? "rotate-180" : "rotate-0"
            }`}
          />
          {t.module}
        </span>
        <span>({t.totalTime})</span>
      </div>
      {/* Lessons */}
      {syllabus[moduleKey] && (
        <ul className="flex flex-col gap-2 mt-2">
          {t.lessons.map((lesson, j) => (
            <li
              key={j}
              className="flex justify-between rounded-xl hover:bg-gray-100 transition-all px-6 py-4 w-full"
            >
              <span className="flex items-center gap-2">
                <FaPlayCircle className="text-sm text-pink-500" />
                {lesson.title}
              </span>
              <span className="text-gray-500">{lesson.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
})}

          </div>
      ) : tab === "instructor" ?(
      <div className=' py-5 pl-4'>
        <div className='flex flex-col pb-3'>
          <h2 className='text-xl text-black font-semibold'>
          {courseData.instructor_name}
          </h2>
          <span className='text-lg '> ({courseData.instructor.title})</span>
        </div>
         <div className='flex items-start   gap-7'>
          <div className='w-[50%] border rounded-2xl p-4'><img className=' rounded-2xl' src={courseData.instructor_img} alt={courseData.instructor_img} /></div>
          <div>
         <ul className='flex flex-col text-base font-normal w-full gap-1'>
          <li className='flex gap-2 '>
            <span className='flex gap-2 items-center '><FaStar/>{courseData.instructor.rating} </span>
          </li>
          <li>
            <span  className='flex gap-2 items-center '><LiaCertificateSolid /> {courseData.instructor.reviews} </span>
          </li>
          <li><span  className='flex gap-2 items-center '><MdOutlinePeopleAlt />{courseData.instructor.students}</span></li>
          <li>
            <span  className='flex gap-2 items-center '><FaPlayCircle />{courseData.instructor.courses}</span>
          </li>
          <li className='mt-3'> <div className='flex gap-1 text-lg'>
          <span className='cursor-pointer'><FaFacebookF className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95'/></span>
          <span><BsTwitterX  className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95'/></span>
          <span><FaInstagram className=' bg-pink-400 text-white w-6 h-6 rounded-sm py-1 scale-100 cursor-pointer transition-all ease-out hover:scale-95'/>
</span>
          </div></li>
         </ul>
          
          </div>
         </div>
      <div className='gap-4 flex flex-col py-5'>
     <div className='flex flex-col gap-1 '>
              <h1 className='text-lg font-medium'>About the Instructor:</h1>
              <p className='font-normal '>
            {courseData.instructor.bio}
              </p>
            </div>
            <div className='flex flex-col gap-1 '>
              <h1 className='text-lg font-medium'>Teaching Style :</h1>
              <p className='font-normal '>
       {courseData.instructor.teaching}
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

      </div>
      ) : tab=== "review" ? ( 
      <div className='grid grid-cols-1 gap-5 justify-center items-center  py-10 w-full'>
      
      {courseData.reviews.map((rev)=>{return(
      <div className='flex flex-col gap-4 border py-5 px-3 w-full rounded-2xl shadow-xl'>
 <div className='flex gap-3'>
    <img className=' w-16 rounded-full' src={rev.img} alt={rev.img} />
  <div className='flex flex-col items-start  justify-start '>
    <span className='font-medium' >{rev.name}</span>
    <Rating  name="read-only" value={rev.rating} readOnly/>
  </div>
  <div>
  </div>
 </div>
<p>
 {rev.comment}
</p>
      </div> 
)})}
     
      </div>) : null}
     
</div>
        </div>
       
        {/* sidebar */}
        <div className='w-[50%]   flex flex-col gap-5 justify-center items-center absolute top-[7rem] right-0 '>
          {/* course card */}
          <div className='flex flex-col cursor-pointer  shadow-2xl bg-white w-[53%] gap-3 rounded-2xl  px-4 py-4'>
            <div><img src={courseData.img}className='drop-shadow-xs rounded-2xl object-cover rounded-t-2xl transform hover:scale-105 transition-transform duration-300 ' alt="" /></div>
            <div className='flex justify-start items-center'><p class="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
     {courseData.price}
            </p>
            </div>
            <div className='flex flex-col gap-2'>
             <Link to={`/courses/lecture/${courseData.course_name}`}> <button className='px-5 py-2 capitalize text-lg font-semibold  rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 w-full hover:scale-95 scale-100 text-white ease-out '>enroll now</button></Link>
              <button className='  flex gap-2 items-center justify-center px-5 py-2 capitalize text-lg font-semibold  rounded-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-400 hover:text-white hover:border-0  text-black border-gray-400 border w-full ease-in transition-all ' ><span><CiHeart className='text-2xl ' /></span> add to whishlist</button>
            </div>
          </div>
          <div className='flex flex-col cursor-pointer  shadow-2xl bg-white text-black w-[53%]  gap-3 rounded-2xl px-4 py-4'>
            <h2 className='text-xl p-2  font-medium text-black capitalize font-[Outfit]'>course features</h2>
            <ul className='flex flex-col gap-3 p-2'>
              <li className='text-lg group flex justify-start text-gray-600 items-center gap-2'>
                <MdOndemandVideo className=' text-black text-2xl group-hover:text-pink-500 ' />2.5 hours on-demand video
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <MdOutlineSimCardDownload className=' text-black text-2xl group-hover:text-pink-500 ' />Downloadable resources
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <FaMobileAlt className=' text-black text-2xl group-hover:text-pink-500 ' />Access on mobile and desktop
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <TbWorldCheck className=' text-black text-2xl group-hover:text-pink-500 ' />Lifetime access
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <GrCertificate className=' text-black text-2xl group-hover:text-pink-500 ' />Certificate of completion
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <PiFileAudioBold className=' text-black text-2xl group-hover:text-pink-500' />Audio lectures available
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <LuMessageCircleMore className=' text-black text-2xl group-hover:text-pink-500 ' />Community Q&A and support
              </li>
            </ul>
          </div>
        </div>
      </div>
  
    </div>


  )
}

export default CourseDetails