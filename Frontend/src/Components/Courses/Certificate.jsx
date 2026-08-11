import React from 'react'
import { GiNestBirds } from 'react-icons/gi'
import { GoArrowDownRight } from 'react-icons/go'
import badge from '../../assets/badge.png'
import certificate from '../../assets/certificate.png'
const Certificate = () => {

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-3 sm:p-6 md:p-10 relative">
      {/* OUTER CERTIFICATE */}
        
      <div
        className="
          w-full max-w-[1000px] relative
          bg-white p-2 sm:p-3
          shadow-lg shadow-black 
        
        "
        style={{background:`url(${'https://i.pinimg.com/1200x/30/20/9d/30209d19e0415c95e5683885d490aaaf.jpg'})`,backgroundPosition:'top',backgroundSize:'cover',backgroundRepeat:'no-repeat'}}
      >
{/* <img
  src={certificate}
  alt="Certificate decoration"
  className="
    absolute
    right-[-35px]
    top-[-10px]
    z-20
    w-24
    sm:right-[-55px]
    sm:top-[-15px]
    sm:w-32
    md:right-[-75px]
    md:top-[-20px]
    md:w-40
    lg:right-[-90px]
    lg:top-0
    lg:w-48
  "
/> */}
  
        <div
          className="
            relative min-h-[530px] w-full
            overflow-hidden  border-black
            p-3 sm:p-4 md:p-6
            bg-[radial-gradient(circle_at_80%_55%,rgba(147,197,253,0.55),transparent_45%),#f5faff]
          "
        >
        <div className="relative z-10 w-full min-h-[500px]">
            {/* LOGO */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <GiNestBirds className="text-2xl text-[#1e3a8a]/90 sm:text-3xl md:text-4xl" />

              <span className="flex text-xl font-semibold text-[#1e3a8a]/70 sm:text-2xl md:text-3xl">
                Skill
                <span className="font-span capitalize">nest</span>
              </span>

              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1e3a8a] sm:mt-3 sm:h-2 sm:w-2" />
            </div>

            {/* TOP DIVIDER */}
            <div className="mt-2 flex h-4 w-full border-b border-t border-[#1e3a8a]/50 sm:h-5">
              <span className="basis-2/6 border-r border-[#1e3a8a]/50" />
              <span className="flex-1" />
            </div>

            {/* CERTIFICATE TITLE */}
            <div className="py-4 sm:py-5 md:py-6">
              <h1
                className="
                  font-certificate font-semibold uppercase
                  tracking-[0.35rem] text-[#172554]
                  text-3xl
                  sm:text-5xl sm:tracking-[0.6rem]
                  md:text-6xl md:tracking-[0.9rem]
                  lg:text-7xl lg:tracking-[1.5rem]
                "
              >
                Certificate
              </h1>
            </div>

            {/* AWARDED TO */}
            <div className="mt-1 flex w-full border-b border-t border-[#1e3a8a]/50">
              <span
                className="
                  flex basis-7/12 items-center gap-1
                  border-r border-[#1e3a8a]/50
                  py-1.5 font-heading font-medium
                  text-xs text-[#172554]
                  sm:gap-2 sm:py-2 sm:text-lg
                  md:text-2xl
                "
              >
                IS AWARDED TO

                <span className="flex text-sm sm:text-base md:text-xl">
                  <GoArrowDownRight />
                  <GoArrowDownRight />
                  <GoArrowDownRight />
                </span>
              </span>

              <span className="flex-1" />
            </div>

            {/* RECIPIENT */}
            <div className="flex border-b border-l border-[#1e3a8a]/50">
              {/* BADGE */}
              <div className="flex w-1/5 items-center justify-center border-r border-[#1e3a8a]/50 p-2 sm:p-3">
                <img
                  src={badge}
                  alt="Certificate badge"
                  className="h-10 w-10 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
                />
              </div>

              {/* NAME */}
              <div className="flex flex-1 flex-col justify-center px-3 py-2 sm:px-5 sm:py-3 md:px-6">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#475569] sm:text-xs sm:tracking-[0.3em]">
                  Recipient
                </span>

                <h2 className="font-certificate text-center text-2xl font-semibold uppercase tracking-wide text-[#172554] sm:text-3xl md:text-4xl">
                  KHUSHI
                </h2>
              </div>
            </div>

            {/* COURSE DESCRIPTION */}
            <div>
              <h2 className="py-2 font-body text-xs font-normal uppercase leading-relaxed text-[#172554] sm:text-sm md:text-lg">
                for successfully completing the MERN Stack Development
              </h2>
            </div>

            {/* BOTTOM DIVIDER */}
            <div className="mt-1 flex h-4 w-full border-b border-t border-[#1e3a8a]/50 sm:mt-2 sm:h-5">
              <span className="basis-2/6 border-r border-[#1e3a8a]/50" />
              <span className="flex-1" />
            </div>

            {/* FOOTER */}
            <div className="mt-4 flex items-end justify-between gap-4 sm:mt-6">
              <div>
                <p className="text-xs font-medium text-[#172554] sm:text-sm">
                  07 August 2026
                </p>

                <div className="mt-1 w-20 border-t border-[#172554] sm:w-32" />

                <p className="mt-1 text-[9px] uppercase tracking-wider text-[#475569] sm:text-xs">
                  Date
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-medium text-[#172554] sm:text-sm">
                  SkillNest
                </p>

                <div className="mt-1 ml-auto w-20 border-t border-[#172554] sm:w-32" />

                <p className="mt-1 text-[9px] uppercase tracking-wider text-[#475569] sm:text-xs">
                  Authorized
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certificate