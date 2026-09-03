import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { FaBell, FaBookmark, FaUnlockAlt, FaUserCircle } from 'react-icons/fa'
import { GiNestBirds } from 'react-icons/gi'
import { ImBook } from 'react-icons/im'
import { IoClose, IoLogOutSharp, IoMenu } from 'react-icons/io5'
import { MdDashboard, MdPlayLesson } from 'react-icons/md'
import { PiCertificateFill } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navClass = ({ isActive }) =>
    `flex items-center justify-start gap-2 rounded-l-full px-3 py-2 text-lg font-medium transition-all duration-200 ease-in hover:translate-x-1 hover:bg-neutral-200/95 hover:text-[#0a1931] ${isActive ? 'bg-page text-[#0a1931]' : 'text-white'}`

  const mobileNavClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${isActive ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}`

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 z-[240605] hidden h-screen w-64 flex-col bg-[#0a1931] text-white md:flex">
        <div className="flex items-center gap-2 p-4">
          <GiNestBirds className="text-3xl text-white" />
          <span className="flex text-2xl font-semibold text-white">
            Skill<span className="font-span capitalize">nest</span>
          </span>
          <span className="mt-3 h-2 w-2 rounded-full bg-[#1e3a8a]" />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-3 border-b border-white/10 py-6">
            <h2 className="px-4 font-body text-xs font-semibold uppercase tracking-wider text-white/50">Learning</h2>
            <ul className="flex flex-col gap-1">
              <li><NavLink to="/dashboard/student/" className={navClass}><MdDashboard className="h-4 w-4 shrink-0" /><span>Dashboard</span></NavLink></li>
              <li><NavLink to="/dashboard/student/my-courses" className={navClass}><ImBook className="h-4 w-4 shrink-0" /><span>My Courses</span></NavLink></li>
              <li><NavLink to="/dashboard/student/wishlist" className={navClass}><BsHeartFill className="h-4 w-4 shrink-0" /><span>Wishlist</span></NavLink></li>
              <li><NavLink to="/dashboard/student/continue-learning" className={navClass}><MdPlayLesson className="h-4 w-4 shrink-0" /><span>Continue Learning</span></NavLink></li>
              <li><NavLink to="/dashboard/student/bookmarks" className={navClass}><FaBookmark className="h-4 w-4 shrink-0" /><span>Bookmarks</span></NavLink></li>
              <li><NavLink to="/dashboard/student/certificate" className={navClass}><PiCertificateFill className="h-4 w-4 shrink-0" /><span>Certificates</span></NavLink></li>
            </ul>
          </div>

          {user?.role === 'teacher' && (
            <div className="flex flex-col gap-3 border-b border-white/10 py-6">
              <h2 className="px-4 font-body text-xs font-semibold uppercase tracking-wider text-white/50">Teaching</h2>
              <ul className="flex flex-col gap-1">
                <li><NavLink to="/dashboard/instructor" className={navClass}><FaUserCircle className="h-4 w-4 shrink-0" /><span>Instructor Dashboard</span></NavLink></li>
                <li><NavLink to="/dashboard/teacher/my-courses" className={navClass}><FaUnlockAlt className="h-4 w-4 shrink-0" /><span>My Courses</span></NavLink></li>
                <li><NavLink to="/dashboard/teacher/students" className={navClass}><FaUserCircle className="h-4 w-4 shrink-0" /><span>Students</span></NavLink></li>
                <li><NavLink to="/dashboard/teacher/analytics" className={navClass}><FaBell className="h-4 w-4 shrink-0" /><span>Analytics</span></NavLink></li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-3 py-6">
            <h2 className="px-4 font-body text-xs font-semibold uppercase tracking-wider text-white/50">Account</h2>
            <ul className="flex flex-col gap-1">
              <li><NavLink to="/profile" className={navClass}><FaUserCircle className="h-4 w-4 shrink-0" /><span>Profile</span></NavLink></li>
              <li><NavLink to="/security" className={navClass}><FaUnlockAlt className="h-4 w-4 shrink-0" /><span>Security</span></NavLink></li>
              <li><NavLink to="/notifications" className={navClass}><FaBell className="h-4 w-4 shrink-0" /><span>Notifications</span></NavLink></li>
            </ul>
          </div>
        </div>

        <button type="button" className="mb-4 flex items-center gap-2 rounded-l-full px-4 py-3 text-lg transition-all duration-200 hover:translate-x-1 hover:bg-neutral-200 hover:text-[#0a1931]">
          <IoLogOutSharp className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <header className="fixed left-0 right-0 top-0 z-[240604] flex h-16 items-center justify-between bg-[#0a1931] px-4 text-white shadow-md md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-2xl hover:bg-white/10"
        >
          <IoMenu />
        </button>

        <div className="flex items-center gap-2">
          <GiNestBirds className="text-2xl" />
          <span className="text-xl font-semibold">
            Skill<span className="font-span">nest</span>
          </span>
        </div>

        <NavLink to="/profile" className="text-2xl">
          <FaUserCircle />
        </NavLink>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[240605] bg-black/50 md:hidden"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed left-0 top-0 z-[240606] h-screen w-[280px] bg-[#0a1931] text-white shadow-2xl transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-2">
            <GiNestBirds className="text-3xl" />
            <span className="text-2xl font-semibold">
              Skill<span className="font-span">nest</span>
            </span>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 text-2xl hover:bg-white/10"
          >
            <IoClose />
          </button>
        </div>

        <div className="no-scrollbar h-[calc(100vh-80px)] overflow-y-auto px-3 py-5">
          <div className="mb-5">
            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              Learning
            </h2>

            <ul className="flex flex-col gap-1">
              <li><NavLink onClick={closeMenu} to="/dashboard/student" className={mobileNavClass}><MdDashboard /><span>Dashboard</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/dashboard/student/my-courses" className={mobileNavClass}><ImBook /><span>My Courses</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/dashboard/student/wishlist" className={mobileNavClass}><BsHeartFill /><span>Wishlist</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/dashboard/student/continue-learning" className={mobileNavClass}><MdPlayLesson /><span>Continue Learning</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/dashboard/student/bookmarks" className={mobileNavClass}><FaBookmark /><span>Bookmarks</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/dashboard/student/certificate" className={mobileNavClass}><PiCertificateFill /><span>Certificates</span></NavLink></li>
            </ul>
          </div>

          {user?.role === 'teacher' && (
            <div className="mb-5 border-t border-white/10 pt-5">
              <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Teaching
              </h2>

              <ul className="flex flex-col gap-1">
                <li><NavLink onClick={closeMenu} to="/dashboard/instructor" className={mobileNavClass}><FaUserCircle /><span>Instructor Dashboard</span></NavLink></li>
                <li><NavLink onClick={closeMenu} to="/dashboard/teacher/my-courses" className={mobileNavClass}><FaUnlockAlt /><span>My Courses</span></NavLink></li>
                <li><NavLink onClick={closeMenu} to="/dashboard/teacher/students" className={mobileNavClass}><FaUserCircle /><span>Students</span></NavLink></li>
                <li><NavLink onClick={closeMenu} to="/dashboard/teacher/analytics" className={mobileNavClass}><FaBell /><span>Analytics</span></NavLink></li>
              </ul>
            </div>
          )}

          <div className="border-t border-white/10 pt-5">
            <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/50">
              Account
            </h2>

            <ul className="flex flex-col gap-1">
              <li><NavLink onClick={closeMenu} to="/profile" className={mobileNavClass}><FaUserCircle /><span>Profile</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/security" className={mobileNavClass}><FaUnlockAlt /><span>Security</span></NavLink></li>
              <li><NavLink onClick={closeMenu} to="/notifications" className={mobileNavClass}><FaBell /><span>Notifications</span></NavLink></li>
            </ul>
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-white/10"
          >
            <IoLogOutSharp className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-[240604] flex h-16 items-center justify-around border-t border-gray-200 bg-white px-2 shadow-[0_-4px_15px_rgba(0,0,0,0.08)] md:hidden">
        <NavLink
          to="/dashboard/student"
          className={({ isActive }) => `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-[#0a1931]' : 'text-gray-500'}`}
        >
          <MdDashboard className="text-xl" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/dashboard/student/my-courses"
          className={({ isActive }) => `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-[#0a1931]' : 'text-gray-500'}`}
        >
          <ImBook className="text-xl" />
          <span>Courses</span>
        </NavLink>

        <NavLink
          to="/dashboard/student/wishlist"
          className={({ isActive }) => `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-[#0a1931]' : 'text-gray-500'}`}
        >
          <BsHeartFill className="text-xl" />
          <span>Wishlist</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-[#0a1931]' : 'text-gray-500'}`}
        >
          <FaUserCircle className="text-xl" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  )
}

export default Sidebar