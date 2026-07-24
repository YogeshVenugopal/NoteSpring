import LandingPage from "./Pages/LandingPage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </Router>
  )
}

export default App
