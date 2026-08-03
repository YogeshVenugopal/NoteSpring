import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='w-full h-screen flex items-center'>
      <div className='w-0 hidden md:w-1/2 h-full bg-white md:flex md:flex-col md:justify-evenly'>
        <div className='w-full px-10'>
            <h1 className='font-medium'>NoteSpring</h1>
        </div>
        <div className='w-full min-h-[70%] flex flex-col items-start px-10 gap-5 justify-center'>
            <p className='font-bold text-6xl'>Precision Productivity.</p>
            <p className='font-bold text-6xl'>Built for Teams.</p>
            <p className='text-gray-400 text-sm mt-10'>High-density Knowledge management for power users. Streamlined for speed, engineered for clarity.</p>
        </div>
        <div className='w-full px-10 py-5'>
            <p className='text-gray-600'>VERSION - 0.1 (BETA)</p>
        </div>
      </div>
      <div className='w-full md:w-1/2 h-full'>{children}</div>
    </div>
  )
}

export default AuthLayout
