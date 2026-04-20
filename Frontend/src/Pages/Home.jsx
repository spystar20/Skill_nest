import React, { useState } from 'react'
import hero from '../assets/girl.png'
import { TbBooks } from "react-icons/tb";
import { FaCartArrowDown, FaChalkboardTeacher, FaClock, FaHeart } from "react-icons/fa";
import {  GrCertificate, GrInstagram } from "react-icons/gr";
import { FiTrendingUp } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { PiBookDuotone, PiVideoFill } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { FaAws } from "react-icons/fa";
import { SiCanva } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { SiDuolingo } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { popularCourses  } from '../Courses/popularCourse';
import { featureCourses } from '../Courses/featuredCourse';
import { teachers } from '../Courses/teachers';
import { testimonials } from '../Courses/testimonials';
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ speed: 0.3, startDelay: 1000 })],
  );
  const [show, hide] = React.useState(false)
  const ShowFeature = () => {
    hide(!show)
  }
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

//     const [emblaRef1, emblaApi1] = useEmblaCarousel({ loop: true,    slidesToScroll: 1
//  },[AutoScroll({speed:0.3,startDelay:1000}),Fade()])
 const [emblaRef1, emblaApi1] = useEmblaCarousel(
  { loop: true },
  [Fade(), Autoplay({ delay: 4000 })]
);
      const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [scrollSnaps1, setScrollSnaps1] = useState([]);

  const scrollTo1 = useCallback((index) => emblaApi1 && emblaApi1.scrollTo(index), [emblaApi1]);

  useEffect(() => {
    if (!emblaApi1) return;

    setScrollSnaps1(emblaApi1.scrollSnapList());
    emblaApi1.on('select', () => setSelectedIndex1(emblaApi1.selectedScrollSnap()));
  }, [emblaApi1]);


  return (
    <div >
      <div className='w-full  py-10 font-["Roboto"] home-bg h-screen'>
        <div className=' grid grid-cols-2 relative z-0 px-20 py-10 justify-between items-center'>
          <div className='flex flex-col max-w-lg justify-center items-start gap-4'>
            <h1 className='text-5xl font-[Merienda] font-bold text-white'>Learn. Create. Thrive.</h1>
            <p className='text-white mt-4'>Learn in-demand skills from top mentors across tech, design, business, and more — all in one place. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, magnam.</p>
             
            <button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointe text-white rounded-lg py-2 px-6 text-xl box capitalize font-medium'>Explore courses</button>
          </div>
          <div>
            <div className='flex '>
              <img className='relative rounded-4xl left-[4rem] top-16 w-lg z-30' src={hero} alt="" />
            </div>
            {/* connected students */}
            <div className="home-bg border-white border max-w-1/3 shadow-2xs shadow-black  absolute top-[7rem] right-[10rem] flex gap-3 flex-col px-4 py-5 rounded-2xl">
              <h2 className='text-xl font-bold  capitalize text-gray-100'>2K+ connected students</h2>
              <div className='flex flex-col justify-start gap-4 items-start '>
                <div className='flex justify-center items-center gap-2'>
                  <img className='w-14 rounded-2xl' src="https://i.pinimg.com/736x/49/69/ee/4969eedf929fec0fdd484ef1260bcb51.jpg" alt="" />
                  <div className='flex flex-col'>
                    <span className='text-lg capitalize font-semibold text-white'>
                      kefier
                    </span>
                    <span className='text-sm flex items-center gap-1 justify-center  text-pink-300'>
                      <span className='w-2 h-2 mt-1 rounded-full font-medium bg-pink-300'></span>connected
                    </span>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-2'>
                  <img className='w-14 rounded-2xl' src="https://i.pinimg.com/736x/41/9d/79/419d79f7ed0bade5a1d43b2f43f91eff.jpg" alt="" />
                  <div className='flex flex-col'>
                    <span className='text-lg capitalize font-semibold text-white'>
                      jay jay
                    </span>
                    <span className='text-sm flex items-center gap-1 justify-center  text-pink-300'>
                      <span className='w-2 h-2 mt-1 rounded-full font-medium bg-pink-300'></span>connected
                    </span>
                  </div>
                </div>
              </div>
            </div> 
            {/* successful growth */}
            <div className='flex shadow-lg shadow-black  w-[14vw] absolute z-10 top-[14rem] right-[30rem] px-2 py-1  gap-1 justify-start  rounded-2xl bg-[#fffdf5] opacity-85 backdrop-blur-md items-center '>
              <h2 className='text-sm font-semibold  capitalize '>successful growth</h2>
              <div>
                <img className='w-14 rounded-2xl' src="https://i.pinimg.com/736x/d7/f2/c9/d7f2c9b7a05f1e67e863b26f4bd3a8aa.jpg" alt="" />
              </div>

            </div>
          </div>
        </div>
        {/* data */}
        <div className='data  my-10 flex flex-row gap-6 justify-center items-center'>
          <div className='flex border-2 opacity-95 hover:opacity-100  border-rose-200 inset-shadow-rose-300 inset-shadow-2xs  cursor-pointer shadow-md shadow-black hover:-translate-y-4 -translate-y-0 transition-all justify-start p-5 rounded-xl  items-center gap-2 bg-white capitalize duration-300 ease-in hover:scale-105'>
            <span>
              <TbBooks className='text-6xl  font-light icon' />
            </span>
            <span className='flex justify-start flex-col ' >
              <span className='text-3xl font-semibold'>24K+</span>
              <span className='text-lg font-light'> online courses</span>
            </span>
          </div>
          <div className='flex border-2 opacity-95 hover:opacity-100  border-rose-200 inset-shadow-rose-300 inset-shadow-2xs  cursor-pointer shadow-md shadow-black hover:-translate-y-4 -translate-y-0 transition-all justify-start p-5 rounded-xl  items-center gap-2 bg-white capitalize duration-300 ease-in hover:scale-105 '>
            <span>
              <FaChalkboardTeacher className='text-6xl  font-light icon' />
            </span>
            <span className='flex justify-start flex-col ' >
              <span className='text-3xl font-semibold'>60+</span>
              <span className='text-lg font-light'> expert tutors</span>
            </span>
          </div>
          <div className='flex border-2 opacity-95 hover:opacity-100  border-rose-200 inset-shadow-rose-300 inset-shadow-2xs  cursor-pointer shadow-md shadow-black hover:-translate-y-4 -translate-y-0 transition-all justify-start p-5 rounded-xl  items-center gap-2 bg-white capitalize duration-300 ease-in hover:scale-105 '>
            <span>
              <PiStudentFill className='text-6xl  font-light icon' />
            </span>
            <span className='flex justify-start flex-col ' >
              <span className='text-3xl font-semibold'>20K+</span>
              <span className='text-lg font-light'>online sudents </span>
            </span>
          </div>
          <div className='flex border-2 opacity-95 hover:opacity-100  border-rose-200 inset-shadow-rose-300 inset-shadow-2xs  cursor-pointer shadow-md shadow-black hover:-translate-y-4 -translate-y-0 transition-all justify-start p-5 rounded-xl  items-center gap-2 bg-white capitalize duration-300 ease-in hover:scale-105'>
            <span>
              <GrCertificate className='text-6xl  font-light icon' />
            </span>
            <span className='flex justify-start flex-col ' >
              <span className='text-3xl font-semibold'>5K+</span>
              <span className='text-lg font-light'> certified courses</span>
            </span>
          </div>
        </div>
      </div>
  <div className='w-full flex flex-col gap-10 justify-center items-center min-h-screen py-20 px-10 font-["Roboto"]'>

  {/* feature header */}
  <div
    onClick={ShowFeature}
    className='feature-box flex justify-center items-center font-[Outfit] w-full max-w-3xl shadow-md text-4xl capitalize font-semibold text-[#2a3f74] gap-3 p-10 rounded-2xl cursor-pointer transition-all hover:scale-[1.02]'
  >
    <div className='flex flex-col justify-center items-center gap-6 text-center'>
      
      <h2>
        our <span className='font-[Merienda] italic lowercase text-white'>features</span> specially for you
      </h2>

      <div className='flex items-center cursor-pointer'>
        <div className='flex items-center transition-all hover:scale-95 group text-white rounded-lg py-2 px-3 gap-1 text-xl capitalize font-medium'>
         <div className='flex justify-center items-center transition-all hover:scale-95 scale-100 group border-blue-300 font-[Comic_Relief] cursor-pointer box text-white rounded-lg py-2 px-3 gap-1 text-xl capitalize font-medium'><button >see all features</button><span className='mt-1 group-hover:-translate-y-1 transition-all -translate-y-0'> <MdArrowOutward /></span></div>
       
        </div>
      </div>

    </div>
  </div>

  {/* feature cards (SMOOTH ANIMATION FIX) */}
  <div
    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl transition-all duration-500 ease-in-out overflow-hidden ${
      show ? 'max-h-[1000px] opacity-100 mt-10' : 'max-h-0 opacity-0'
    }`}
  >

    {/* card 1 */}
    <div className='group flex items-center shadow-xl cursor-pointer hover:scale-105 transition-all border-2 border-[#95b1ee] hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] hover:text-white rounded-2xl py-6 px-4 gap-3 flex-col text-center'>
      <PiVideoFill className='text-6xl text-blue-300 group-hover:text-white' />
      <h2 className='text-2xl font-semibold'>Video lesson</h2>
      <p>Recorded lectures from professional instructors to boost your growth</p>
    </div>

    {/* card 2 */}
    <div className='group flex items-center shadow-xl cursor-pointer hover:scale-105 transition-all border-2 border-[#95b1ee] hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] hover:text-white rounded-2xl py-6 px-4 gap-3 flex-col text-center'>
      <LiaCertificateSolid className='text-6xl text-blue-300 group-hover:text-white' />
      <h2 className='text-2xl font-semibold'>Get Certificate</h2>
      <p>Add value to your profile and increase your hiring chances</p>
    </div>

    {/* card 3 */}
    <div className='group flex items-center shadow-xl cursor-pointer hover:scale-105 transition-all border-2 border-[#95b1ee] hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] hover:text-white rounded-2xl py-6 px-4 gap-3 flex-col text-center'>
      <MdSupportAgent className='text-6xl text-blue-300 group-hover:text-white' />
      <h2 className='text-2xl font-semibold'>Lifetime Support</h2>
      <p>Get lifetime access and support anytime you need</p>
    </div>

    {/* card 4 */}
    <div className='group flex items-center shadow-xl cursor-pointer hover:scale-105 transition-all border-2 border-[#95b1ee] hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] hover:text-white rounded-2xl py-6 px-4 gap-3 flex-col text-center'>
      <GiTeacher className='text-6xl text-blue-300 group-hover:text-white' />
      <h2 className='text-2xl font-semibold'>Amazing Instructor</h2>
      <p>Learn from experienced mentors with real-world expertise</p>
    </div>

  </div>
</div>{/* popular courses */}
      <div className='box p-10 font-[outfit] w-full h-full'>
        <div>
          <h2 className='text-5xl text-white drop-shadow-lg py-10 font-medium font-[outfit] capitalize text-center '>popular <span className='text-4xl border-b-2 font-[Merienda]  italic'>courses</span></h2>
        </div>
        {/* courses cards */}
        <div className='embla' ref={emblaRef}>
          <div className='embla__container  flex  gap-4 px-5 py-10'>
           {popularCourses.map((course,index)=>{return(
<div key={index} className='embla_slide cards rounded-4xl p-5 basis-full md:basis-1/2 lg:basis-1/4 shrink-0'>
             
              <div className='relative group cursor-pointer '>
                <img src={course.img} className='aspect-[1] rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200' alt="" />
              <span className="py-2 px-4 text-sm shadow-lg bg-black/70 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
      {course.category}
    </span>

                <div className=' gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-black p-5 hidden group-hover:flex '><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'>
                  <FaHeart/></span><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'><FaCartArrowDown/></span></div>
              </div>
              
                <div className='p-3 flex flex-col gap-4'>
                    <div className='flex flex-col text-left flex-wrap '>
                <h2 className='text-xl font-semibold font-heading text-gray-950'>{course.course_name}</h2>
                <p className='text-sm mt-1 text-wrap font-body text-gray-800 line-clamp-2'>{course.course_desc}
                </p>
              </div>
             
<div className='flex items-center justify-start flex-wrap gap-3'>
    <span className='py-2 px-4 text-sm shadow-sm  font-body rounded-full capitalize   bg-slate-100 text-slate-700 flex flex-row gap-2 items-center'><span><PiBookDuotone className='text-xl'/></span>{course.chapters} Chapters</span>
      <span className='py-2 px-4 text-sm shadow-sm font-body rounded-full  bg-slate-100 text-slate-700 flex flex-row gap-2 items-center'><span><CiClock1 className='text-xl'/></span>{course.duration}</span>
      <span className="py-2 px-4 text-sm shadow-sm rounded-full bg-indigo-300 text-white flex gap-2 items-center">
        <FiTrendingUp className="text-lg" />
        Beginner
      </span>
</div>
 <div className='flex justify-start items-center gap-3'>
                <div><img src={course.instructor_img} className='w-12 rounded-full aspect-[1]' alt="" /></div>
                <div className='flex flex-col justify-start items-start capitalize font-[outfit]'>
                  <span className='text-lg font-medium'>{course.instructor_name} </span>
                  <span className='font-medium text-sm '>instructor</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
              <div className="flex items-center gap-3">
      <span className="text-sm line-through text-gray-400">₹2000</span>
      <span className="text-3xl font-semibold text-indigo-900">₹959</span>
    </div>
    <div>
        <button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointer text-white rounded-full py-1.5 px-5 text-lg box capitalize font-medium hover:scale-95'>buy now</button></div></div>
                </div>
            </div>
           )})}
         
  
          </div>
          <div className="relative  flex justify-center items-center gap-3 mt-3">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1 w-6 rounded-full cursor-pointer transition-all duration-500 ${index === selectedIndex
                    ? 'bg-gradient-to-r from-rose-400 to-pink-300 w-8 shadow-md shadow-blue-300/40'
                    : 'bg-blue-200'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* trusted by */}
      <div className='text-center w-full h-full px-10 py-5  '>
        <h2 className='text-xl font-light font-[Outfit]'>Trusted by over 16,000 companies and millions of learners around the world  </h2>
        <div className='text-6xl logo font-light opacity-80 font-[Outfit] flex flex-row  justify-center gap-24 items-center mt-11'>
          <span><FaAws /></span>
          <span><SiCanva /></span>
          <span><FaGoogle /></span>
          <span><SiSamsung /></span>
          <span><TiVendorMicrosoft /></span>
          <span><FaGitAlt /></span>
          <span><FaApple /></span>
          <span><SiDuolingo /></span>
        </div>
      </div>
      {/* featured courses and teachers */}
      <div className= 'box  grid grid-cols-1 gap-10  w-full h-full px-10 py-20 mt-12 '>
        {/* featured courses */}
        <div>
          <div className=' flex flex-col  justify-start  items-start gap-3 mt-10'>
            <h4 className=' text-xl bg-linear-120 to-blue-200 from-white text-transparent  bg-clip-text text-left capitalize font-[Merienda] text-shadow-2xs'> “Editor’s Picks” </h4>
            <h2 className='text-5xl text-white drop-shadow-lg  font-medium font-[outfit] capitalize text-center '>featured <span className='text-4xl border-b-2 font-[Merienda]  italic'>courses</span></h2>
            <p className='text-white text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, nostrum!</p>
          </div>
          <div className='grid grid-cols-4 gap-4 px-5 py-10'>
           
            {featureCourses.map((course,index)=>{return(
              <div key={index} className='cards  rounded-4xl p-5'>
             
              <div className='relative group cursor-pointer '>
                <img src={course.img} className='aspect-square rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200' alt="" />
              <span className="py-2 px-4 text-sm shadow-lg bg-black/70 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
      {course.category}
    </span>

                <div className=' gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-black p-5 hidden group-hover:flex '><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'>
                  <FaHeart/></span><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'><FaCartArrowDown/></span></div>
              </div>
              
                <div className='p-3 flex flex-col gap-4'>
                    <div className='flex flex-col text-left flex-wrap '>
                <h2 className='text-xl font-semibold font-heading text-gray-950'>{course.course_name}</h2>
                <p className='text-sm mt-1 text-wrap font-body text-gray-800 line-clamp-2'>{course.course_desc}
                </p>
              </div>
             
<div className='flex items-center justify-start flex-wrap gap-3'>
    <span className='py-2 px-4 text-sm shadow-sm  font-body rounded-full capitalize   bg-slate-100 text-slate-700 flex flex-row gap-2 items-center'><span><PiBookDuotone className='text-xl'/></span>{course.chapters}</span>
      <span className='py-2 px-4 text-sm shadow-sm font-body rounded-full  bg-slate-100 text-slate-700 flex flex-row gap-2 items-center'><span><CiClock1 className='text-xl'/></span>{course.duration}</span>
      <span className="py-2 px-4 text-sm shadow-sm rounded-full bg-indigo-300 text-white flex gap-2 items-center">
        <FiTrendingUp className="text-lg" />
{course.level}      </span>
</div>
 <div className='flex justify-start items-center gap-3'>
                <div><img src={course.instructor_img} className='w-12 rounded-full aspect-[1]' alt="" /></div>
                <div className='flex flex-col justify-start items-start capitalize font-[outfit]'>
                  <span className='text-lg font-medium'>{course.instructor_name}</span>
                  <span className='font-medium text-sm '>instructor</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
              <div className="flex items-center gap-3">
      <span className="text-sm line-through text-gray-400">₹2000</span>
      <span className="text-3xl font-semibold text-indigo-900">₹{course.price}</span>
    </div>
    <div>
        <button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointer text-white rounded-full py-1.5 px-5 text-lg box capitalize font-medium hover:scale-95'>buy now</button></div></div>
                </div>
            </div>
            )})}
          </div>
        </div>
        {/* featured teachers */}
        <div>
          <div className=' flex flex-col  justify-start  items-start gap-3 mt-10'>
            <h2 className='text-5xl text-white drop-shadow-lg  font-medium font-[outfit] capitalize text-center '>featured <span className='text-4xl border-b-2 font-[Merienda]  italic'>teachers</span></h2>
            <p className='text-white text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, nostrum!</p>
          </div>
          <div className='grid grid-cols-4 gap-4 px-5 py-10'>
            {teachers.map((teacher, index) => (
              <div className='flex bg-gradient-to-b from-blue-200 to-[#364c84] ease-in-out  flex-col cursor-pointer shadow-2xl bg-white  w-full gap-3 rounded-2xl   h-full px-6 py-6'>
                <div className='text-2xl flex   flex-col font-[Roboto] capitalize text-slate-950 '>
                  <span className='font-semibold font-heading'>{teacher.name}</span>
                  <span className='text-lg italic text-slate-800 font-body'>{teacher.title}</span>
                </div>
                <div className=' ease-in-out '><img className='rounded-2xl  ' src={teacher.img} alt="" />
                </div>
                <div className='text-4xl flex justify-center  rounded-4xl bg-[#364c84] basis-1/4 shrink-0 grow-0 shadow-2xl  items-center gap-5 text-gray-300 '>
                  <span className='hover:text-black scale-100 hover:scale-110 transition-all'>
                    <a href="/home"><FaLinkedin /></a>
                  </span>
                  <span className='hover:text-black scale-100 hover:scale-110 transition-all'>
                    <a href="/home"><FaInstagram /></a>
                  </span>
                  <span className='hover:text-black scale-100 hover:scale-110 transition-all'>
                    <a href="/home"><FaSquareXTwitter /></a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* testimonials */}
      <div className='bg-black text-white  flex flex-col items-center justify-center gap-10  w-full h-full px-10 py-20'>
      <div className='flex flex-col gap-2 text-center items-center justify-center'>
        <h2 className='text-4xl capitalize  text-center  font-[outfit]'>what our students say about us ?</h2>
        <p>Lorem ipsum dolor sit amet, . Labore, libero!</p>
      </div>
      < div className=' flex flex-col items-center justify-center'>
<div className='embla1  overflow-hidden max-w-5xl mx-auto ' ref={emblaRef1}><div className='embla__container   '>      {testimonials.map((testimonials, index) => (
<div
  key={index}
  className="embla__slide transition-opacity duration-700 ease-in-out w-[70%] test   inset-0  flex items-center justify-center"
>     <div className='flex p-7 bg-white rounded-4xl w-full max-w-4xl justify-center item-center'>
        <div className=' grid  shadow-2xl testimonials grid-cols-2  rounded-4xl justify-center p-5 items-center gap-3 '>
          <div className='flex flex-col  text-center justify-center items-center gap-3'>
            <div className=' border-2 p-3 rounded-br-3xl rounded-tl-3xl'><img className='w-[10rem] rounded-tl-3xl rounded-br-3xl' src={testimonials.img} alt="" /></div>
           <span className='text-lg text-black capitalize font-medium flex flex-col'> <span>{testimonials.name}</span><span> {testimonials.title}</span></span>
            </div>
            <div className='text-xl  font-[Merienda] italic text-white  drop-shadow-lg  font-medium  capitalize '>
              {testimonials.desc}
            </div>
        </div>
      </div>
      </div>
      ))}
      </div>
      </div>
      <div className="flex justify-center items-center gap-3 mt-6">
  {scrollSnaps1.map((_, index) => (
    <button
      key={index}
      onClick={() => scrollTo1(index)}
      className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
  index === selectedIndex1
    ? "w-6 bg-white"
    : "w-2 bg-gray-400"
}`}
    />
  ))}
</div>
      </div>
</div>

    </div>
  )
}

export default Home