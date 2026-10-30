import React from 'react'
import { FaGraduationCap, FaUsers, FaGlobe, FaChartLine } from 'react-icons/fa'

const TeacherFeature = () => {
      const features = [
    {
      icon: FaGraduationCap,
      title: 'Share Your Expertise',
      description: 'Turn your knowledge and experience into engaging courses for learners.'
    },
    {
      icon: FaUsers,
      title: 'Build Your Community',
      description: 'Connect with motivated learners and grow a community around your expertise.'
    },
    {
      icon: FaGlobe,
      title: 'Reach More Learners',
      description: 'Share your courses with learners from different backgrounds and locations.'
    },
    {
      icon: FaChartLine,
      title: 'Grow Your Career',
      description: 'Build your teaching portfolio, strengthen your personal brand, and create new opportunities.'
    }
  ]
  return (
   <div className='w-full  bg-white flex flex-col gap-12 p-3 md:px-12 pt-20 items-center '>
        <div className='flex flex-col gap-2 items-center'><h2 className='font-heading text-neutral-800 text-2xl md:text-4xl font-semibold text-center'>Why Instructors Choose SkillNest</h2>
          <p className='text-black/70 font-body text-sm text-center max-w-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nesciunt nam, tempora atque iusto, voluptatibus eum nihil consequatur possimus sapiente omnis, eligendi nobis.</p></div>
        <div className='flex'>
          <div className='md:flex flex-col gap-2 basis-1/3 hidden'>

            <img src="https://i.pinimg.com/736x/55/68/44/556844c6f0aae37a5b2576beae020a28.jpg" className='h-[400px] object-left-top object-cover' alt="" />
          </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 md:gap-6 flex-1 w-full">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="flex flex-col gap-3 border border-border bg-card rounded-xl p-5 sm:p-6 shadow-[8px_8px_0px_#163A6B] hover:shadow-[3px_3px_0px_#163A6B] hover:-translate-y-1 hover:bg-[#E8EDF6] transition-all duration-300"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/20">
                  <Icon className="text-2xl text-primary" />
                </span>

                <h3 className="text-lg sm:text-xl font-heading font-semibold text-text">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base font-body text-text-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
        </div>
      </div>  )
}

export default TeacherFeature