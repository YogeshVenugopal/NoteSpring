import React from 'react'
import Button from './Button'

function Navbar() {
  return (
    <div className='w-full h-[90px]'>
        <div className='w-[95%] md:w-[85%] mx-auto flex items-center justify-between py-4'>
            <div>
                <p className='font-bold text-[28px] md:text-[32px] dark:text-white'>NoteSpring</p>
            </div>
            <div className='flex items-center gap-5 md:gap-10'>
                <p className='font-semibold dark:text-white cursor-pointer'>Login</p>
                <Button className="font-semibold">Sign up</Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
