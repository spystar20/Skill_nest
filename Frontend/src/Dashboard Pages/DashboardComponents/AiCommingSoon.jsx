import React from 'react'

const AiCommingSoon = () => {
  return (
<div style={{backgroundImage:`url(https://i.pinimg.com/1200x/3b/94/0a/3b940af68cd22a8d7677a22db3ea0d15.jpg)`}}  className="bg-[#0A1931] rounded-xl p-5 text-white relative max-h-[345px]">
   
  <div className="flex items-center gap-2 z-8">
    <h3 className="font-semibold">Meet Your AI Study Buddy
</h3>
  </div>

  <p className="text-sm text-white/60 mt-2">
Stuck on a concept? Ask SkillNest AI for explanations, examples, and coding guidance.  </p>

  <button className="mt-5 w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white hover:bg-white/15 transition">
    Ask AI
  </button>

  <p className="text-xs text-[#7C8FD6] mt-3 text-center">
    Coming soon
  </p>
</div>  )
}

export default AiCommingSoon