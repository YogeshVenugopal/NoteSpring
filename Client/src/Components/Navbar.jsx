import React, { useState } from 'react'
import Button from './Button'
import { ListSortDescending } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const[isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const handleMenuBar = () => {
        setIsOpen(!isOpen);
    }
  return (
    <div className='w-full h-[90px]'>
        <div className='w-[90%] md:w-[85%] mx-auto flex items-center justify-between py-4 relative'>
            <div>
                <p className='font-bold text-[28px] md:text-[32px] dark:text-white'>NoteSpring</p>
            </div>
            
            <div className='items-center gap-5 md:gap-10 hidden md:flex'>
                <p className='font-semibold dark:text-white cursor-pointer' onClick={handleLogin}>Login</p>
                <Button className="font-semibold" onClick={handleRegister}>Sign up</Button>
            </div>
            <button className='md:hidden cursor-pointer' onClick={handleMenuBar}>
                <ListSortDescending size={20}/>
            </button>
            {
                isOpen && (
                    <motion.div 
                    initial={{height:0}}
                    animate={{height:"auto"}}
                    transition={{duration:0.4, ease:"easeInOut"}}
                    className='md:hidden w-[150px] rounded-2xl overflow-hidden shadow-sm absolute top-full right-0 flex flex-col gap-4 items-center p-4'>
                        <p onClick={handleLogin}>login</p>    
                        <Button className="w-full" onClick={handleRegister}>Sign up</Button>                    
                    </motion.div>
                )
            }
        </div>
    </div>
  )
}

export default Navbar
