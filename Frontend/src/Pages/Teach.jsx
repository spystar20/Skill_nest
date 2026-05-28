import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Teacher } from '@/data/teacherImg'
import { FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Teach = () => {
  const [emblaRef,emblaApi] = useEmblaCarousel({loop:true},[AutoScroll({speed:2,startDelay:100,playOnInit:true,stopOnMouseEnter: false})])
 useEffect(() => {

  if (!emblaApi) return

  const autoScroll = emblaApi.plugins().autoScroll

  autoScroll.play()

}, [emblaApi])
  return (
    <div className='w-full '>
      {/* hero-section */}
        <div className='flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(22,38,96)] to-[#D0E6FD] w-full min-h-screen gap-5   pt-36 pb-12' >
       
<div className='flex flex-col items-center justify-center gap-4'>
  <h2 className='text-5xl font-semibold  font-heading text-white l-  text-shadow-lg'>Teach What You Know. <span className='italic font-[Merienda]'>Inspire</span> Who You Can.</h2>
  <p className='max-w-2xl text-white text-center font-body'>Whether you're a developer, designer, creator, or mentor — SkillNest gives you the tools to teach, inspire, and build your personal brand. Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
 <Link to='/become-teacher'><button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointe text-white rounded-lg py-2 px-6 text-xl box cursor-pointer font-medium'> Join as a Teacher</button></Link> 
</div>
<div className="embla relative w-full overflow-hidden" >

<div className="embla__viewport overflow-hidden" ref={emblaRef}>
<div className='flex   py-12 embla__container'>
{Teacher.map((Teacher,index)=>(
 
<div key={Teacher.id} className='embla__slide    shrink-0
          flex-[0_0_280px]  rounded-2xl p-4 '>
            <div  className={`
           transition-all duration-300 bg-white/10 border hover:scale-110
hover:translate-y-0  backdrop-blur-lg rounded-2xl p-4  ${ index % 2 == 0 ? ' scale-95 translate-y-6':'scale-100 -translate-y-6 '}`}>
  <img src={Teacher.img} className='object-cover h-[300px]  w-full rounded-lg hover:scale-105 duration-300 transition-all' alt="" />
  </div>
</div>

))}

</div>
</div>
</div>
        </div>
        {/* why teach on SkillNest */}
        <div className='w-full  bg-white flex gap-6 px-12 py-20 items-center '>
<div className='flex flex-col gap-2'>
  <h2 className='font-heading text-neutral-800 text-4xl font-semibold'>Why Instructors Choose SkillNest</h2>
  <p className='text-black/70 font-body text-sm max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nesciunt nam, tempora atque iusto, voluptatibus eum nihil consequatur possimus sapiente omnis, eligendi nobis.</p>
</div>
<div className='grid grid-cols-2 gap-4'>
  <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
    <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 '/></span>
    <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
  </div>
   <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
    <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 '/></span>
    <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
  </div>
   <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
    <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 '/></span>
    <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
  </div>
   <div className='flex flex-col gap-1 border bg-white rounded-lg p-4 shadow-[10px_10px_0px_gray] hover:shadow-none hover:bg-[#D0E6FD] transition-all duration-300 transition-discrete '>
    <span className='w-10 flex-col items-center justify-center h-10 rounded-full bg-[#D0E6FD]'><FaGraduationCap className='text-4xl text-black/80 '/></span>
    <h5 className='text-xl font-heading font-medium'>Share Your Expertise</h5>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veniam earum vitae.</p>
  </div>


</div>
        </div>
    </div>
  )
}

export default Teach