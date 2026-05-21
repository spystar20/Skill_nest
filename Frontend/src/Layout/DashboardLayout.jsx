import Navbar from '@/Components/Navbar'
import Sidebar from '@/Components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen flex '>
        <Sidebar />
    <main className='flex-1 ml-64'>
        <Outlet />
</main>

    </div>
  )
}

export default DashboardLayout