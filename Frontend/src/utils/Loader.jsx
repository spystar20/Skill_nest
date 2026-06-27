import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <DotLottieReact
        src="https://lottie.host/046631cc-60a2-4062-9afc-09086332dfca/OrYkh7COcP.lottie"
        loop
        autoplay
        className="w-72 h-72"
      />
    </div>
  )
}

export default Loader