
import React, { useCallback, useEffect, useState } from 'react'
import { testimonials } from '@/Courses/testimonials'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Fade(), Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    setScrollSnaps(emblaApi.scrollSnapList())
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)

    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  return (
    <section className="w-full bg-primary-dark text-white flex flex-col items-center justify-center gap-8 md:gap-10 px-4 py-12 sm:px-6 md:px-10 md:py-20">
      <div className="flex flex-col gap-3 text-center items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl capitalize font-heading">
          What our students say about us?
        </h2>
        <p className="text-text-light text-sm sm:text-base font-body">
          Real experiences from learners growing with SkillNest.
        </p>
      </div>

      <div className="md:w-[750px] w-full max-w-5xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
            
<div
  key={testimonial._id || testimonial.id || index}
  className="min-w-0 flex-[0_0_100%] flex items-center justify-center px-1 sm:px-3 py-3"
>
  <div className="relative w-full bg-[#E8EDF6] border border-accent/20 rounded-3xl p-5 sm:p-7 md:p-9 shadow-xl shadow-primary-dark/20 overflow-hidden">
    
    {/* Decorative quote */}
    <span className="absolute top-2 right-5 sm:right-8 text-7xl sm:text-8xl font-heading font-bold text-accent/20 leading-none select-none">
      ”
    </span>

    <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-9">
      
      {/* Student profile */}
      <div className="flex flex-col items-center text-center gap-3 md:w-1/3 shrink-0">
        <div className="p-1.5 rounded-full border-2 border-accent/50">
          <img
            src={testimonial.img}
            alt={testimonial.name}
            loading="lazy"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-primary">
            {testimonial.name}
          </h3>
          <p className="font-body text-sm text-text-light mt-1">
            {testimonial.title}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px self-stretch bg-primary/15" />

      {/* Testimonial */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-accent text-3xl font-span">“</span>
        <p className="font-body text-sm sm:text-base md:text-lg leading-relaxed text-primary/90 italic">
          {testimonial.desc}
        </p>
      </div>
    </div>
  </div>
</div>

            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                index === selectedIndex
                  ? 'w-7 bg-accent'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
