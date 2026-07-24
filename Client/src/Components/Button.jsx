import React from 'react'

function Button({children, className}) {
  return (
    <div className={`px-4 py-2 bg-gray-950 text-white dark:bg-violet-900 rounded-[8px] cursor-pointer ${className}`}>
      {children}
    </div>
  )
}

export default Button
