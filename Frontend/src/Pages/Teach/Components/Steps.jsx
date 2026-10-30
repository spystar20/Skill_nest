import React from 'react'

const Steps = () => {
  return (
    <div className='bg-gradient-to-tr flex flex-col items-center justify-center to-white via-[#D0E6FD] from-white w-full min-h-screen relative'>
        <>
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-br-full top-0 left-0' alt="" />
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-bl-full top-0 right-0' alt="" />
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-tr-full bottom-0 left-0' alt="" />
          <img src="https://i.pinimg.com/webp85/736x/63/80/88/638088b4cc95f04d0d88277dc68929e3.webp" className='absolute w-10 h-10 md:w-32 md:h-28 object-cover  rounded-tl-full -bottom-4 right-0' alt="" />
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
      </div >  )
}

export default Steps