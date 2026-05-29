import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Teacher } from '@/data/teacherImg'
import { FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Teach = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoScroll({ speed: 2, startDelay: 100, playOnInit: true, stopOnMouseEnter: false })])
  useEffect(() => {

    if (!emblaApi) return

    const autoScroll = emblaApi.plugins().autoScroll

    autoScroll.play()

  }, [emblaApi])
  return (
    <div className='w-full '>
      {/* hero-section */}
      <div className='flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(22,38,96)] to-[#D0E6FD] w-full min-h-screen gap-5  px-1 pt-36 pb-12' >

        <div className='flex flex-col items-center justify-center gap-4'>
          <h2 className='text-3xl md:text-5xl text-center font-semibold  font-heading text-white l-  text-shadow-lg'>Teach What You Know. <span className='italic font-[Merienda]'>Inspire</span> Who You Can.</h2>
          <p className='max-w-2xl text-sm  text-white text-center font-body'>Whether you're a developer, designer, creator, or mentor — SkillNest gives you the tools to teach, inspire, and build your personal brand. Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
          <Link to='/become-teacher'><button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointe text-white rounded-lg py-2 px-6 text-xl box cursor-pointer font-medium'> Join as a Teacher</button></Link>
        </div>
        <div className="embla relative w-full overflow-hidden" >

          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className='flex   py-12 embla__container'>
              {Teacher.map((Teacher, index) => (

                <div key={Teacher.id} className='embla__slide    shrink-0
          flex-[0_0_280px]  rounded-2xl p-4 '>
                  <div className={`
           transition-all duration-300 bg-white/10 border hover:scale-110
hover:translate-y-0  backdrop-blur-lg rounded-2xl p-4  ${index % 2 == 0 ? ' scale-95 translate-y-6' : 'scale-100 -translate-y-6 '}`}>
                    <img src={Teacher.img} className='object-cover h-[300px]  w-full rounded-lg hover:scale-105 duration-300 transition-all' alt="" />
                  </div>
                </div>

              ))}

            </div>
          </div>
        </div>
      </div>
      {/* why teach on SkillNest */}
      <div className='w-full  bg-white flex flex-col gap-12 p-3 md:px-12 pt-20 items-center '>
        <div className='flex flex-col gap-2 items-center'><h2 className='font-heading text-neutral-800 text-2xl md:text-4xl font-semibold text-center'>Why Instructors Choose SkillNest</h2>
          <p className='text-black/70 font-body text-sm text-center max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nesciunt nam, tempora atque iusto, voluptatibus eum nihil consequatur possimus sapiente omnis, eligendi nobis.</p></div>
        <div className='flex'>
          <div className='md:flex flex-col gap-2 basis-1/3 hidden'>

            <img src="https://i.pinimg.com/736x/55/68/44/556844c6f0aae37a5b2576beae020a28.jpg" className='h-[400px] object-left-top object-cover' alt="" />
          </div>
          <div className='grid md:grid-cols-2 gap-4 flex-1 pb-6 md:pr-23'>
            <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
              <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 ' /></span>
              <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
            </div>
            <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
              <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 ' /></span>
              <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
            </div>
            <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
              <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 ' /></span>
              <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
            </div>
            <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
              <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 ' /></span>
              <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
            </div>


          </div>
        </div>
      </div>
{/* steps */}
      <div className='bg-gradient-to-tr flex flex-col items-center justify-center to-white via-[#D0E6FD] from-white w-full min-h-screen relative'>
        <>
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-br-full top-0 left-0' alt="" />
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-bl-full top-0 right-0' alt="" />
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-tr-full bottom-0 left-0' alt="" />
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28-cover  rounded-tl-full -bottom-4 right-0' alt="" />
        </>
        <div className='flex flex-col gap-2 items-center pt-12'><h2 className='font-heading text-neutral-800 text-2xl text-center md:text-4xl font-semibold'>Start Teaching in 3 Simple Steps</h2>
          <p className='text-black/70 font-body text-sm text-center max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nesciunt nam, tempora atque iusto, voluptatibus eum nihil .</p></div>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-3 md:px-23 py-15'>
<div  className='group bg-white  border p-3 rounded-2xl hover:shadow-white hover:bg-[#D0E6FD] transition-all duration-300 ease-in hover:shadow-2xl hover:transform-3d hover:-translate-y-2'>
  <div className='flex flex-col gap-2 mt-5 bg-[#D0E6FD]/50 rounded-xl p-4  '>
    <span className='text-4xl font-semibold font-body'>01</span>
    <h2 className='text-xl font-semibold font-heading'>Create Your Instructor Profile</h2>
    <p className='text-base font-body font-medium text-neutral-800/80'>Tell students about your background, expertise, and teaching style.</p>
  </div>
  </div>
<div  className='group bg-white  border p-3 rounded-2xl hover:shadow-white hover:bg-[#D0E6FD] transition-all duration-300 ease-in hover:shadow-2xl hover:transform-3d hover:-translate-y-2'>
  <div className='flex flex-col gap-2 mt-5 bg-[#D0E6FD]/50 rounded-xl p-4  '>
    <span className='text-4xl font-semibold font-body'>02</span>
    <h2 className='text-xl font-semibold font-heading'>Build Your Course</h2>
    <p className='text-base font-body font-medium text-neutral-800/80'>Upload lessons, organize modules, and create hands-on learning experiences.</p>
  </div>
  </div>
  <div  className='group bg-white  border p-3 rounded-2xl hover:shadow-white hover:bg-[#D0E6FD] transition-all duration-300 ease-in hover:shadow-2xl hover:transform-3d hover:-translate-y-2'>
  <div className='flex flex-col gap-2 mt-5 bg-[#D0E6FD]/50 rounded-xl p-4  '>
    <span className='text-4xl font-semibold font-body'>03</span>
    <h2 className='text-xl font-semibold font-heading'>Publish & Inspire</h2>
    <p className='text-base font-body font-medium text-neutral-800/80'>Launch your course and start helping learners achieve their goals.</p>
  </div>
  </div>
</div>
        </div>
      </div >
      <div className='w-full bg-white min-h-screen p-3 py-20 md:px-12 flex flex-col justify-center items-center gap-6'>
<h2 className='font-heading text-neutral-800 text-2xl text-center md:text-4xl font-semibold'>Everything You Need to Teach Better</h2>
<div className='flex flex-col md:py-12'>

  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
     <div className='flex gap-4 flex-wrap'>
    <div className='flex flex-col justify-center p-6 gap-3 bg-[#D8F8E1] hover:rotate-z-0 duration-300 ease-out transition-all rounded-2xl md:rotate-z-3'>
      <img className='w-[350px] object-cover rounded-lg shadow' src="https://i.pinimg.com/webp85/736x/95/43/cb/9543cb39869a88ec91d388d7eb523266.webp" alt="" />
      <h2 className='text-xl font-heading font-medium text-center'>Student Engagement</h2>
      <p className='font-body text-center text-black/70'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque velit nulla voluptas sint. Maxime optio ullam sint et consequuntur? Dolor, explicabo. Nihil.</p>
    </div>
      <div className='flex flex-col justify-center p-6 gap-3 bg-[#FFD6E8] rounded-2xl hover:rotate-z-0 duration-300 ease-out transition-all md:-rotate-z-6'>
      <img className='w-[350px] object-cover rounded-lg shadow' src="https://i.pinimg.com/webp85/736x/95/43/cb/9543cb39869a88ec91d388d7eb523266.webp" alt="" />
      <h2 className='text-xl font-heading font-medium text-center'>Course Management</h2>
      <p className='font-body text-center text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur voluptatum aut. Inventore aut explicabo quidem deserunt quis, nesciunt perferendis iure at quasi?</p>
    </div>
    </div>
     <div className='flex gap-4 flex-wrap'>
    <div className='flex flex-col justify-center p-6 gap-3 bg-[#FFE9A8] rounded-2xl hover:rotate-z-0 duration-300 ease-out transition-all md:rotate-z-3'>
      <img className='w-[350px] object-cover rounded-lg shadow' src="https://i.pinimg.com/webp85/736x/95/43/cb/9543cb39869a88ec91d388d7eb523266.webp" alt="" />
      <h2 className='text-xl font-heading font-medium text-center'>Analytics & Insights</h2>
      <p className='font-body text-center text-black/70'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam atque velit nulla voluptas sint. Maxime optio ullam sint et consequuntur? Dolor, explicabo. Nihil.</p>
    </div>
      <div className='flex flex-col justify-center p-6 gap-3 bg-[#D0E6FD] rounded-2xl hover:rotate-z-0 duration-300 ease-out transition-all md:-rotate-z-6'>
      <img className='w-[350px] object-cover rounded-lg shadow' src="https://i.pinimg.com/webp85/736x/95/43/cb/9543cb39869a88ec91d388d7eb523266.webp" alt="" />
      <h2 className='text-xl font-heading font-medium text-center'>Modern Learning Experience</h2>
      <p className='font-body text-center text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aspernatur voluptatum aut. Inventore aut explicabo quidem deserunt quis, nesciunt perferendis iure at quasi?</p>
    </div>
    </div>
   
  </div>
</div>
      </div>
      <div className='w-full bg-white px-3 py-10 md:px-23 md:py-20 '>
<div className='bg-gradient-to-br from-[#D0E6FD] via-[#EAF4FF] to-[#F5FAFF] px-3 h-[450px] md:h-[400px] rounded-3xl shadow flex flex-col gap-3 items-center justify-center text-center'>
<h2 className='text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-tr from-[rgb(22,38,96)] to-blue-300 font-semibold font-heading'>Ready to Start Your Teaching Journey?</h2>
<p className='text-sm md:text-lg font-body text-black/70 max-w-2xl text-center'>Join SkillNest and empower thousands of learners by sharing your skills and experience with the world. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum facere esse fuga?</p>
 <Link to='/become-teacher'><button className='hover:scale-105 transition-discrete my-3 transition-all bg-gradient-to-tl text-shadow-xs from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointe text-white rounded-lg py-2 px-6 text-xl box cursor-pointer font-medium'> Become a Teacher</button></Link>
</div>
      </div>
    </div>
  )
}

export default Teach