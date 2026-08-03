import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URI || 'http://localhost:3000',
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})
api.interceptors.response.use(
    (response) => response,
    async (err) => {
        const original = err.config;

        if (!err.response) {
            return Promise.reject(err);
        }

        // Skip auth routes
        if (
            original.url === "/auth/login" ||
            original.url === "/auth/register" ||
            original.url === "/auth/refresh"
        ) {
            return Promise.reject(err);
        }

        const token = localStorage.getItem("accessToken");

        if (
            err.response.status === 401 &&
            token &&
            !original._retry
        ) {
            original._retry = true;

            try {
                const { data } = await api.post("/auth/refresh");

                localStorage.setItem("accessToken", data.accessToken);

                original.headers.Authorization = `Bearer ${data.accessToken}`;

                return api(original);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");

                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(err);
    }
);
api.interceptors.response.use(
    (response) => response,
    async (err) => {
        const original = err.config;

        if (!err.response) {
            return Promise.reject(err);
        }

        // Skip auth routes
        if (
            original.url === "/auth/login" ||
            original.url === "/auth/register" ||
            original.url === "/auth/refresh"
        ) {
            return Promise.reject(err);
        }

        const token = localStorage.getItem("accessToken");

        if (
            err.response.status === 401 &&
            token &&
            !original._retry
        ) {
            original._retry = true;

            try {
                const { data } = await api.post("/auth/refresh");

                localStorage.setItem("accessToken", data.accessToken);

                original.headers.Authorization = `Bearer ${data.accessToken}`;

                return api(original);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");

                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(err);
    }
);
export default api;