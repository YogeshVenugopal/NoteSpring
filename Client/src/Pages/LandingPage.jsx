import React from 'react'
import Navbar from '../Components/Navbar'
import Button from '../Components/Button'

function LandingPage() {
    return (
        <>
            <div className='w-full min-h-screen dark:bg-stone-950 bg-gray-100 dark:text-white'>
                <Navbar />
                <div className='w-full flex items-center justify-center flex-col gap-4 min-h-[calc(100vh-100px)]'>
                    <p className='font-bold text-[2rem] md:text-[3rem]'>Introducing to NoteSpring</p>
                    <p className='font-semibold text-sm md:text-base'>Your all in one application, Create Tasks, Track the progress and Manage Team</p>
                    <Button>
                        Get Started
                    </Button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
