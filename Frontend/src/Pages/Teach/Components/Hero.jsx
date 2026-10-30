import { Teacher } from '@/data/teacherImg'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useEffect } from 'react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { Link } from 'react-router-dom'

const Hero = () => {
      const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoScroll({ speed: 2, startDelay: 100, playOnInit: true, stopOnMouseEnter: false })])
  useEffect(() => {

    if (!emblaApi) return

    const autoScroll = emblaApi.plugins().autoScroll

    autoScroll.play()

  }, [emblaApi])
  return (
 <div className='flex flex-col items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light w-full min-h-screen gap-5  px-1 pt-36 pb-12' >

        <div className='flex flex-col items-center justify-center gap-4'>
          <h2 className='text-3xl md:text-5xl  text-center font-semibold  font-heading text-white l-  text-shadow-lg'>Teach What You Know. <span className='italic font-[Merienda]'>Inspire</span> Who You Can.</h2>
          <p className='max-w-2xl text-sm  text-white text-center font-body'>Whether you're a developer, designer, creator, or mentor — SkillNest gives you the tools to teach, inspire, and build your personal brand. Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
      <Link
          to="/become-teacher"
          className="inline-flex items-center justify-center transition-all duration-300 bg-button hover:bg-button-hover border border-white/10 text-white rounded-xl py-3 px-7 text-base sm:text-lg font-heading font-medium shadow-lg shadow-primary-dark/30 hover:-translate-y-1 hover:shadow-xl"
        >
          Join as a Teacher
        </Link>
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
      </div>  )
}

export default Hero