import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import CommonLayout from '../Components/Layouts/CommonLayout'
import Dashboard from '../Pages/Dashboard'

function Approute() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<Login />} />
        <Route path="/register" element = {<Register />} />

        <Route path="/" element = {<CommonLayout />}>
          <Route index element = {<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default Approute
