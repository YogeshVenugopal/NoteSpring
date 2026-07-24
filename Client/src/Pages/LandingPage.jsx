import React from 'react'
import Navbar from '../Components/Navbar'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import logo from '/images/logo_bg.png'

function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className='w-full min-h-screen dark:bg-stone-950 bg-gray-100 dark:text-white'>
                <Navbar />
                <div className='w-full flex items-center justify-center flex-col gap-4 min-h-[calc(100vh-100px)]'>
                    <div className='w-[100px] h-[100px] shadow-sm dark:shadow-white rounded-2xl overflow-hidden flex items-center justify-center'>
                        <img src={logo} alt="Notespring Logo" className='w-full h-full object-cover'/>
                    </div>
                    <p className='font-bold text-[2rem] md:text-[3rem]'>Introducing to NoteSpring</p>
                    <p className='font-semibold text-sm md:text-base'>Your all in one application, Create Tasks, Track the progress and Manage Team</p>
                    <Button onClick={() => navigate('/login')}>
                        Get Started
                    </Button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
