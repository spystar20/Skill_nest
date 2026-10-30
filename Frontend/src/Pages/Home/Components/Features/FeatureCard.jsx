
import React from 'react'

const FeatureCard = ({ title, description, Icon }) => {
  return (
    <div className="group flex items-center cursor-pointer hover:scale-105 transition-all duration-300 border border-accent/30 hover:border-accent hover:bg-gradient-to-tr hover:from-primary-light hover:to-accent text-white rounded-2xl py-6 px-4 gap-3 flex-col text-center bg-primary/10 backdrop-blur-xl shadow-xl shadow-primary-dark/10">

      <Icon className="text-6xl text-accent group-hover:text-white transition-colors duration-300" />

      <h2 className="text-2xl font-heading font-semibold">
        {title}
      </h2>

      <p className="font-body text-white/90">
        {description}
      </p>

    </div>
  )
}

export default FeatureCard
