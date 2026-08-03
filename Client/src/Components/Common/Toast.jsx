import React from 'react'

const Toast = ({ toast, onClose }) => {

    return (
        <div className={`px-4 py-2 rounded-md shadow-md text-white ${toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-blue-500"}`}>
            {toast.message}
            <button className="ml-4 text-white" onClick={() => onClose(toast.id)}>X</button>
        </div>
    )
}

export default Toast
