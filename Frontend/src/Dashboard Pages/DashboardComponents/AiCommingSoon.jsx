import React from 'react'

const AiComingSoon = () => {
  return (
    <div
      style={{
        backgroundImage: `url(https://i.pinimg.com/1200x/52/07/75/52077535fade26f1753e3de16a97748c.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      className="bg-[#0A1931] rounded-xl p-5 text-white flex flex-col items-center h-[185px]"
    >
      <div className="flex items-center gap-2 z-10">
        <h3 className="font-semibold text-xl">
          Meet Your AI Study Buddy
        </h3>
      </div>

      <p className="text-sm text-center text-white/60 mt-2">
        Get instant help with concepts, examples, and coding questions.
      </p>

      <button className="mt-5 w-full capitalize rounded-lg font-medium bg-popover px-4 py-2.5 text-sm text-button hover:bg-white/85 transition">
        Coming soon
      </button>
    </div>
  )
}

export default AiComingSoon