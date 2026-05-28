import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'

const Teach = () => {
  const [emblaRef,emblaApi] = useEmblaCarousel({loop:true},[AutoScroll({speed:2,startDelay:100,playOnInit:true})])
  const [selectedIndex,setSelectedIndex] = useState(null)
 useEffect(() => {

  if (!emblaApi) return

  const autoScroll = emblaApi.plugins().autoScroll

  autoScroll.play()
const onSelect = ()=>{
  setSelectedIndex(emblaApi.selectedScrollSnap())
}
onSelect()
emblaApi.on('select',onSelect)
}, [emblaApi])
  return (
    <div className='w-full '>
      {/* hero-section */}
        <div className='flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(22,38,96)] to-[#D0E6FD] w-full min-h-screen gap-5   pt-36 pb-12' >
<div className='flex flex-col items-center justify-center gap-4'>
  <h2 className='text-5xl font-semibold  font-heading text-white l-  text-shadow-lg'>Teach What You Know. <span className='italic font-[Merienda]'>Inspire</span> Who You Can.</h2>
  <p className='max-w-2xl text-white text-center font-body'>Whether you're a developer, designer, creator, or mentor — SkillNest gives you the tools to teach, inspire, and build your personal brand. Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
  <button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointe text-white rounded-lg py-2 px-6 text-xl box cursor-pointer font-medium'> Join as a Teacher</button>
</div>
<div className="embla w-full overflow-hidden">
<div className="embla__viewport overflow-hidden" ref={emblaRef}>
<div className='flex gap-4 py-12 embla__container'>
{[1,2,3,4,5,6,7,8].map((_,index)=>(
<div className={`embla__slide    shrink-0
          flex-[0_0_280px] bg-white/10 border transition-all duration-300  backdrop-blur-lg rounded-2xl p-4 ${selectedIndex === index ? '-translate-y-6':'translate-y-0'}`}>
  <img src="https://i.pinimg.com/736x/9c/79/9e/9c799e9db9bbec4ca64ff9258933b276.jpg" className='rounded-lg hover:scale-105 duration-300 transition-all' alt="" />
</div>

))}

</div>
</div>
</div>
        </div>
    </div>
  )
}

export default Teach