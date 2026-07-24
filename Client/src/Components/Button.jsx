import React from 'react'
import { motion } from 'framer-motion'


function Button({children, className, onClick}) {
  return (
    <motion.button
    whileTap={{ scale: 0.95}} 
    onClick={onClick}
    className={`px-4 py-2 bg-gray-950 text-white dark:bg-violet-900 rounded-[8px] cursor-pointer ${className}`}>
      {children}
    </motion.button>
  )
}

export default Button
