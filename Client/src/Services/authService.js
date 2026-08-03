import api from "../Api/api"

export const login = (credentials) => {
    return api.post('/auth/login', credentials);
}

export const register = (data) => {
    return api.post('/auth/register', data);
}

export const logout = () => {
    return api.post('/auth/logout');
}

export const getUser = () => {
    return api.get('/auth/user');
}