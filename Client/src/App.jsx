import React from 'react'
import Approute from './Routers/Approute'
import { AuthProvider } from './Contexts/AuthContext'
import { ToastProvider } from './Contexts/ToastContext'

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Approute />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
