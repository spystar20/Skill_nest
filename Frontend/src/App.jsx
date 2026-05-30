import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner';
import AppRoutes from './Routes/AppRoutes'
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  return (
    <div className=' bg-black w-full '>
<Toaster  position="top-center"
        richColors
        closeButton/>
    <BrowserRouter>
    <ScrollToTop/>
<AppRoutes/>
    </BrowserRouter>
    </div>
  )
}

export default App