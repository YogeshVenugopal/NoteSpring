import React, { useState } from 'react'
import logo from '/images/logo_bg.png';
import Button from '../Components/Button';
import { Eye, EyeOff } from 'lucide-react';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (email.trim() == "" || password.trim() == "") {
      console.log("Require fields email and password")
    }
    if (!email.endsWith("@gmail.com")) {
      console.log("Invalid email")
    }
    if (password.length < 6) {
      console.log("Invalid password format");
    }
    // api call
    return
  }

  return (
    <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white flex'>
      <div className='w-full md:w-1/2'>
        <div className='h-screen w-[80%] mx-auto flex flex-col items-center justify-center gap-3'>

          <div className='w-[75px] h-[75px] rounded-2xl shadow-sm dark:shadow-white'>
            <img src={logo} alt="Logo image" className='w-full h-[100%] my-auto object-cover' />
          </div>
          <div className=''>
            <h1 className='font-bold'>Welcome back to the Notespring</h1>
            <form
              onSubmit={handleSumbit}
              className='flex flex-col items-center justify-center gap-5 mt-2'>
              <label htmlFor="email" className='flex flex-col justify-center items-start w-full'>
                <p className='font-semibold text-lg'>E-mail</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Eg. john@gmail.com'
                  className='outline-none border-b-2 w-full p-2' />
              </label>

              <label htmlFor="password" className='flex flex-col justify-center items-start w-full'>
                <p className='font-semibold text-lg'>Password</p>
                <div className='w-full relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Min 6 character'
                    className='outline-none border-b-2 w-full p-2' />
                  <div className='absolute right-0 top-1/2 -translate-1/2 cursor-pointer' onClick={() => setShowPassword(!showPassword  )}>
                    {
                      showPassword ? <EyeOff /> : <Eye />
                    }
                  </div>
                </div>
              </label>
              <div className='w-full flex items-center justify-between mt-5' >
                <p>Already have an account?<span className='font-semibold underline text-blue-500 cursor-pointer'>Login</span></p>
                <p className='font-semibold cursor-pointer'>forgot password?</p>
              </div>
              <Button
                type="submit"
                onClick={handleSumbit}
                className="w-full font-semibold">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className='w-0 md:w-1/2 h-screen'></div>
    </div>
  )
}

export default Login
