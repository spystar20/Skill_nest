import React from 'react'

const AiComingSoon = () => {
  return (
    <div
      style={{
        backgroundImage: `url(https://i.pinimg.com/1200x/52/07/75/52077535fade26f1753e3de16a97748c.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
      className='bg-primary rounded-xl p-4 sm:p-5 text-white flex flex-col items-center justify-center h-[202px] w-full'
    >

      <div className='flex items-center gap-2 z-10 text-center'>
        <h3 className='font-semibold text-lg sm:text-xl font-heading'>
          Meet Your AI Study Buddy
        </h3>
      </div>

      <p className='text-xs sm:text-sm text-center text-white/60 mt-2 max-w-md'>
        Get instant help with concepts, examples, and coding questions.
      </p>

      <button
        type='button'
        className='mt-4 sm:mt-5 w-full rounded-lg font-medium bg-popover px-4 py-2.5 text-xs sm:text-sm text-button hover:bg-white/85 transition'
      >
        Coming soon
      </button>

    </div>
  )
}

export default AiComingSoon