import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const Toast = ({ toast, onClose }) => {

    return (
        <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, x: 50 }}
        className={`px-4 py-2 rounded-md flex items-center gap-2 border-b-2 shadow-md bg-white ${toast.type === "success" ? "text-green-500 border-green-500" : toast.type === "error" ? "text-red-500 border-red-500" : "text-blue-500 border-blue-500"}`}>
            {toast.message}
            <button className={`ml-4 cursor-pointer ${toast.type === "success" ? "text-green-500" : toast.type === "error" ? "text-red-500" : "text-blue-500"}`} onClick={() => onClose(toast.id)}><X size={16}/></button>
        </motion.div>
    )
}

export default Toast
