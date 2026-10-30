
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import featureCourses from '@/data/course'
import ProjectCard from '@/Pages/Course/ProjectCard'

const PopluarCourses = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [
      AutoScroll({
        speed: 0.3,
        startDelay: 1000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]
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
    <section className="w-full box px-3 py-8 sm:px-5 md:px-8 md:py-10 lg:px-10 font-heading">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-lg font-medium capitalize text-center mb-4 md:mb-2">
        popular{' '}
        <span className="md:text-4xl border-b-2 font-span italic">
          courses
        </span>
      </h2>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4 px-1 py-8 sm:px-2 md:py-10">
          {featureCourses.map((course, index) => (
            <div
              className="embla__slide min-w-0 shrink-0 grow-0 basis-full sm:basis-[calc(50%-8px)] lg:basis-[calc(25%-12px)]"
              key={course?._id || index}
            >
              <ProjectCard course={course} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-accent w-8 shadow-md shadow-accent/40'
                : 'bg-border w-6 hover:bg-accent/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default PopluarCourses
