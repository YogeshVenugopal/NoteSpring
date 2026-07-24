import React from 'react'
import logo from '/images/logo_bg.png';
import Button from '../Components/Button';

function Login() {


  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white flex'>
      <div className='w-full md:w-1/2 h-screen flex flex-col items-center justify-center gap-3'>
        <div className='w-[75px] h-[75px] rounded-2xl shadow-sm dark:shadow-white'>
          <img src={logo} alt="Logo image" className='w-full h-[100%] my-auto object-cover' />
        </div>
        <div className=''>
          <h1 className='font-bold'>Welcome back to the Notespring</h1>
          <form className='flex flex-col items-center justify-center gap-5 mt-2'>
            <label htmlFor="email" className='flex flex-col justify-center items-start'>
              <p className='font-semibold text-lg'>E-mail</p>
              <input 
              type="email" 
              placeholder='Eg. john@gmail.com'
              className='outline-none border-b-2 w-[30rem] p-2'/>
            </label>

            <label htmlFor="password" className='flex flex-col justify-center items-start'>
              <p className='font-semibold text-lg'>Password</p>
              <input 
              type="email" 
              placeholder='Min 6 character'
              className='outline-none border-b-2 w-[30rem] p-2'/>
            </label>
            <div className='w-full flex items-center justify-between mt-5' >
              <p>Already have an account?<span className='font-semibold underline text-blue-500 cursor-pointer'>Login</span></p>
              <p className='font-semibold cursor-pointer'>forgot password?</p>
            </div>
            <Button className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className='w-0 md:w-1/2 h-screen'></div>
    </div>
  )
}

export default Login
