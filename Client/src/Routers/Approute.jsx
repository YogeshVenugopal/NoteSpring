import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

function Approute() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<Register />} />
      </Routes>
    </Router>
  )
}

export default Approute
