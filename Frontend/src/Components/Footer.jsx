import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { GiNestBirds } from 'react-icons/gi'
import { LiaLinkedin } from 'react-icons/lia'
const Footer = () => {
  return (
    <div className='font-body'>
      <footer className="box text-gray-300 px-10 py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

    {/* Brand */}
    <div>
      <div className="flex items-center gap-2">
               <GiNestBirds className="text-white text-4xl" />
               <span className="text-3xl font-semibold text-white flex gap-0">
                 Skill <span className='font-span capitalize'>nest</span>
               </span>
               <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
             </div>
      <p className="mt-3 text-sm">
        Learn in-demand skills from industry experts and grow your career.
      </p>
      <div className='flex gap-4 text-2xl mt-3 text-white'><FaFacebook className='hover:scale-125 duration-200 cursor-pointer ease-in'/><FaInstagram className='hover:scale-125 duration-200 cursor-pointer ease-in'/><BsTwitter className='hover:scale-125 duration-200 cursor-pointer ease-in'/></div>
    </div>

    {/* Explore */}
    <div>
      <h3 className="text-white font-semibold mb-3">Explore</h3>
      <ul className="space-y-2 text-sm">
        <li>All Courses</li>
        <li>Popular Courses</li>
        <li>Categories</li>
        <li>Learning Paths</li>
        <li>Certifications</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h3 className="text-white font-semibold mb-3">Company</h3>
      <ul className="space-y-2 text-sm">
        <li>About Us</li>
        <li>Careers</li>
        <li>Blog</li>
        <li>Partners</li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h3 className="text-white font-semibold mb-3">Resources</h3>
      <ul className="space-y-2 text-sm">
        <li>Help Center</li>
        <li>FAQs</li>
        <li>Community</li>
        <li>Guides</li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-white font-semibold mb-3">Support</h3>
      <ul className="space-y-2 text-sm">
        <li>Contact Us</li>
        <li>Report Issue</li>
        <li>Refund Policy</li>
      </ul>
    </div>

  </div>

  {/* Bottom */}
  <div className="border-t border-gray-700 mt-10 pt-5 text-sm flex flex-col md:flex-row justify-between">
    <p>© 2026 SkillNest. Created By <span className='font-heading italic'>Santoshi</span> . All rights reserved.</p>
    <div className="flex gap-4 mt-3 md:mt-0">
      <span>Terms</span>
      <span>Privacy</span>
      <span>Cookies</span>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer