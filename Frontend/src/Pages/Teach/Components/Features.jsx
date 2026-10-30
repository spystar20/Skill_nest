import React from 'react'

const Features = () => {
  return (
<div className='w-full bg-white min-h-screen p-3 py-20 md:px-12 flex flex-col justify-center items-center gap-6'>
<h2 className='font-heading text-neutral-800 text-2xl text-center md:text-4xl font-semibold'>Everything You Need to Teach Better</h2>
<div className='flex flex-col md:py-12'>

  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
     <div className='flex gap-4 flex-col md:flex-row '>
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
     <div className='flex gap-4 flex-col md:flex-row '>
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
      </div>  )
}

export default Features