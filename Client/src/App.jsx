import React from 'react'
import Approute from './Routers/Approute'
import { AuthProvider } from './Contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Approute />
    </AuthProvider>
  )
}

export default App
