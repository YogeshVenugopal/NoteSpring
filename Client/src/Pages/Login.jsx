import React, { useState } from 'react'
import AuthLayout from '../Components/Layouts/AuthLayout'
import { Eye, EyeClosed } from 'lucide-react'
import { login } from '../Services/authService';
import { useAuth } from '../Hooks/useAuth';
import { useToast } from '../Hooks/useToast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { login: authLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      showToast("All fields are required","error");
      return;
    }
    try {
      const response = await login({ email, password });
      authLogin(response.user, response.accessToken);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthLayout>
      <div className='w-[80%] md:w-[60%] mx-auto h-full flex justify-center flex-col'>
        <div className=''>
          <p className='text-2xl font-semibold'>Welcome Back,</p>
          <p className='text-sm'>Enter your credentials and access your workspaces.</p>
        </div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-start justify-center gap-8 mt-8'>
          <label htmlFor="email" className='w-[80%] flex flex-col gap-2'>
            <p className='text-lg'>Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='eg.john@gmail.com'
              className='bg-white border border-gray-300 p-2 w-full outline-none rounded-[6px]' />
          </label>
          <label htmlFor="password" className='w-[80%] flex flex-col gap-2'>
            <p className='text-lg'>Password</p>
            <div className='relative'>
              <input
                type={isPassVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Min. 6 Characters'
                className='bg-white border border-gray-300 p-2 w-full outline-none rounded-[6px]' />
              <button className='absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'
                onClick={() => setIsPassVisible(!isPassVisible)}
              >
                {
                  isPassVisible ? <Eye color='#474649' size={18} /> : <EyeClosed color='#474649' size={18} />
                }
              </button>
            </div>
          </label>
          <button className='w-[80%] text-center border py-2 bg-[#09090B] text-white rounded-[6px] font-semibold'>
            Login
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
