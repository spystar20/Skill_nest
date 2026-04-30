import React, { useEffect ,useState} from 'react'
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
  const [openSection, setOpenSection] = useState(null);

const toggleSection = (section) => {
  setOpenSection(openSection === section ? null : section);
};
  const tabs = [ {name: "overview",id:1 },{name:"syllabus",id:2},{name:"instructor",id:3},{name:"review",id:4}]
  const {tab,toggletab,toggleModule,syllabus } = usetoggletab()
  const {course_name} = useParams()
 const courseData = course.find((c)=> c.course_name == course_name)
 if(!courseData){
return <h1>course not found</h1>
 }
 useEffect(() => {
  toggletab("overview");
}, []);
  return (
    <div className=' bg-white  w-full min-h-screen font-[Roboto] '>
      
      <div className='w-full min-h-[320px] pt-23 pb-12 relative grid-cols-1  grid md:grid-cols-2 justify-between items-center gap-3  text-white  home-bg'>
        {/* course info */}
        <div className='flex flex-col order-2 md:order-1 gap-7 items-center  md:items-end justify-center   md:py-12'>
          <h2 className='text-xl md:text-3xl font-semibold font-[Outfit]  capitalize '>{courseData.course_name} </h2>
          <div className='flex flex-wrap justify-center items-center gap-3 md:gap-6'>
            <span className='  py-1 px-2.5 text-sm   font-medium shadow-sm font-body rounded-full  bg-slate-100 text-slate-700 flex flex-row gap-1  items-center '>
              <SiBookstack className=' font-bold text-sm md:text-2xl' />{courseData.chapters} lessons
            </span>
            <span className='  py-1 px-2.5 text-sm   font-medium shadow-sm font-body rounded-full  bg-slate-100 text-slate-700 flex flex-row gap-1  items-center '>
              <IoTime className= 'font-bold  text-sm md:text-2xl ' />{courseData.duration}
            </span>
            <span className='  py-1 px-2.5 text-sm   font-medium shadow-sm font-body rounded-full  bg-slate-100 text-slate-700 flex flex-row gap-1  items-center '>
             
              <FaEye className=' font-bold  text-sm md:text-2xl' />{courseData.view}
            </span>
                        <Rating  name="read-only" value={courseData.rating} className='bg-yellow-100 rounded-full px-3' precision={0.5} readOnly/>

          </div>
          <div className='flex items-center justify-center w-[60%]'>
            <div className='flex justify-start items-center gap-3'>
              <div><img src={courseData.instructor_img} className='w-16 rounded-full ' alt={courseData.instructor_img} /></div>
              <div className='flex flex-col justify-start items-start capitalize font-[outfit]'>
                <span className='text-lg font-medium'>{courseData.instructor_name}</span>
                <span className='font-medium text-sm '>instructor</span>
              </div>
            </div>
            {/* <Rating  name="read-only" value={courseData.rating} className='bg-yellow-100 rounded-full px-3' precision={0.5} readOnly/> */}
          </div>
        </div>
<div className='flex flex-col order-1 md:order-2 my-6   items-center justify-center '>
         <div className='flex flex-col cursor-pointer max-w-sm shadow-2xl bg-white  gap-3 rounded-2xl  p-3'>
            <div><img src={courseData.img} className='drop-shadow-xs rounded-2xl object-cover rounded-t-2xl transform hover:scale-105 transition-transform duration-300 w-[320px] ' alt="" /></div>
            <div className='flex justify-between items-center'><p class="text-lg md:text-2xl font-semibold  bg-clip-text text-transparent bg-gradient-to-tr from-[#0f172a] via-[#1e3a8a] to-[#60a5fa]">
     Rs. {courseData.price}
            </p>
               <Link to={`/courses/lecture/${courseData.course_name}`}> <button className='px-5 py-2 capitalize text-lg font-semibold  rounded-lg duration-300 transition-all ease-in bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]  hover:scale-95 scale-100 text-white cursor-pointer '>enroll now</button></Link>
            </div>
        
          </div>
      
          
      </div></div>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full py-5 gap-8'>
         <div className='w-full hidden md:inline-flex order-2 md:order-1  justify-center'> 
        <div className=' font-[Outfit] max-w-3xl  '>
          {/* headings */}           
          <div className='flex flex-wrap items-center justify-center gap-16   text-black text-xl font-semibold '>
              {tabs.map((t)=>{return(
            <a key={t.id} onClick={()=>toggletab(t.name)} className={`cursor-pointer capitalize flex hover:text-pink-400 p-2 ${tab === t.name ? " underline-offset-8 underline  text-pink-400" :"text-black "}`}>{t.name}</a>
                 )})}         
          </div>      
<div>
          {/* overview */}
      {tab ==="overview" ?(
          <div>  
            <div className='flex flex-col  gap-1 py-6'>
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
      <div className=' py-5 pl-4 '>
        <div className='flex flex-col  pb-3'>
          <h2 className='text-xl text-black font-semibold'>
          {courseData.instructor_name}
          </h2>
          <span className='text-lg '> ({courseData.instructor.title})</span>
        </div>
         <div className='flex items-start   gap-7'>
          <div className='w-[340px] border rounded-2xl p-4'><img className=' rounded-2xl' src={courseData.instructor_img} alt={courseData.instructor_img} /></div>
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
        </div> 
             <div className='  flex flex-col order-1 md:order-2 gap-5 justify-start items-center '>
       
          <div className='flex flex-col  cursor-pointer  shadow-2xl bg-white text-black   gap-3 rounded-2xl p-4 '>
            <h2 className='text-xl p-2  font-medium text-black capitalize font-[Outfit]'>course features</h2>
            <div className='flex flex-col'> 
            <ul className='flex flex-col gap-6 p-2'>
              <li className='text-lg group flex justify-start text-gray-600 items-center gap-2'>
                <MdOndemandVideo className=' text-black text-2xl group-hover:text-pink-500 ' />2.5 hours on-demand video
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <MdOutlineSimCardDownload className=' text-black text-2xl group-hover:text-pink-500 ' />Downloadable resources
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <FaMobileAlt className=' text-black text-2xl group-hover:text-pink-500 ' />Access on mobile and desktop
              </li>
              </ul>
              <ul className='flex flex-col gap-6 p-2'>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <TbWorldCheck className=' text-black text-2xl group-hover:text-pink-500 ' />Lifetime access
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <GrCertificate className=' text-black text-2xl group-hover:text-pink-500 ' />Certificate of completion
              </li>
              <li className='text-lg flex justify-start group text-gray-600 items-center gap-2'>
                <PiFileAudioBold className=' text-black text-2xl group-hover:text-pink-500' />Audio lectures available
              </li>
           
            </ul>
         </div>
  </div>
  </div>
  </div>

  <div className='w-full inline-flex md:hidden order-2 md:order-1 justify-center'>
  <div className='font-[Outfit] w-full max-w-3xl flex flex-col gap-4'>

    {/* ================= OVERVIEW ================= */}
    <div className='border rounded-xl overflow-hidden'>
      <div
        onClick={() => toggleSection("overview")}
        className='flex justify-between items-center p-4 bg-gray-100 cursor-pointer'
      >
        <span className='text-lg font-semibold'>Overview</span>
        <span>{openSection === "overview" ? "-" : "+"}</span>
      </div>

      {openSection === "overview" && (
        <div className='p-4'>
          <div className='flex flex-col gap-2 py-4'>
            <h1 className='text-lg font-medium'>Course Description</h1>
            <p>{courseData.overview.description}</p>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-medium'>What you’ll learn</h2>
            <ul className='list-disc pl-5'>
              {courseData.overview.learn.map((list, i) => (
                <li key={i}>{list}</li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-2 py-4'>
            <h2 className='text-lg font-medium'>Who this course is for</h2>
            <ul className='list-disc pl-5'>
              {courseData.overview.highlights.map((list, i) => (
                <li key={i}>{list}</li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-medium'>Requirements</h2>
            <ul className='list-disc pl-5'>
              {courseData.overview.requirements.map((list, i) => (
                <li key={i}>{list}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>

    {/* ================= SYLLABUS ================= */}
    <div className='border rounded-xl overflow-hidden'>
      <div
        onClick={() => toggleSection("syllabus")}
        className='flex justify-between items-center p-4 bg-gray-100 cursor-pointer'
      >
        <span className='text-lg font-semibold'>Syllabus</span>
        <span>{openSection === "syllabus" ? "-" : "+"}</span>
      </div>

      {openSection === "syllabus" && (
        <div className='p-4'>
          {courseData.syllabus.map((t, i) => {
            const moduleKey = `module${i + 1}`;
            return (
              <div key={i}>
                <div
                  onClick={() => toggleModule(moduleKey)}
                  className="flex my-2 justify-between items-center py-4 bg-pink-400 px-3 rounded-lg text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-lg font-medium">
                    <TiArrowSortedDown
                      className={`transition-transform duration-300 ${
                        syllabus[moduleKey] ? "rotate-180" : ""
                      }`}
                    />
                    {t.module}
                  </span>
                  <span>({t.totalTime})</span>
                </div>

                {syllabus[moduleKey] && (
                  <ul className="flex flex-col gap-2 mt-2">
                    {t.lessons.map((lesson, j) => (
                      <li
                        key={j}
                        className="flex justify-between rounded-xl hover:bg-gray-100 px-4 py-3"
                      >
                        <span className="flex items-center gap-2">
                          <FaPlayCircle className="text-pink-500" />
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
      )}
    </div>

    {/* ================= INSTRUCTOR ================= */}
    <div className='border rounded-xl overflow-hidden'>
      <div
        onClick={() => toggleSection("instructor")}
        className='flex justify-between items-center p-4 bg-gray-100 cursor-pointer'
      >
        <span className='text-lg font-semibold'>Instructor</span>
        <span>{openSection === "instructor" ? "-" : "+"}</span>
      </div>

      {openSection === "instructor" && (
        <div className='p-4'>
          <h2 className='text-xl font-semibold'>
            {courseData.instructor_name}
          </h2>
          <p className='text-gray-600'>{courseData.instructor.title}</p>

          <div className='flex flex-col md:flex-row gap-6 mt-4'>
            <img
              className='w-full md:w-64 rounded-xl'
              src={courseData.instructor_img}
              alt=""
            />

            <ul className='flex flex-col gap-2'>
              <li><FaStar /> {courseData.instructor.rating}</li>
              <li>{courseData.instructor.reviews}</li>
              <li>{courseData.instructor.students}</li>
              <li>{courseData.instructor.courses}</li>
            </ul>
          </div>

          <div className='mt-4'>
            <h3 className='font-medium'>About</h3>
            <p>{courseData.instructor.bio}</p>
          </div>
        </div>
      )}
    </div>

    {/* ================= REVIEWS ================= */}
    <div className='border rounded-xl overflow-hidden'>
      <div
        onClick={() => toggleSection("review")}
        className='flex justify-between items-center p-4 bg-gray-100 cursor-pointer'
      >
        <span className='text-lg font-semibold'>Reviews</span>
        <span>{openSection === "review" ? "-" : "+"}</span>
      </div>

      {openSection === "review" && (
        <div className='p-4 flex flex-col gap-4'>
          {courseData.reviews.map((rev, i) => (
            <div key={i} className='border p-4 rounded-xl'>
              <div className='flex gap-3'>
                <img className='w-12 rounded-full' src={rev.img} alt="" />
                <div>
                  <p className='font-medium'>{rev.name}</p>
                  <Rating value={rev.rating} readOnly />
                </div>
              </div>
              <p className='mt-2'>{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>

  </div>
</div>
    </div>


  )
}

export default CourseDetails