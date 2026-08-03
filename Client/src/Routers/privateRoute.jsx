import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const privateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    
    if( isLoggedIn ){
        return children
    }
    return navigate('/login');
}

export default privateRoute
