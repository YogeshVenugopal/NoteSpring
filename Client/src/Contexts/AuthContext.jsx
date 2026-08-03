import { createContext } from "react";
import { getUser } from "../Services/authService";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        const login = (userData, accessToken) => {
            localStorage.setItem('accessToken', accessToken);
            setUser(userData);
        };

        const logout = () => {
            localStorage.removeItem('accessToken');
            setUser(null);
        };

        return (
            <AuthContext.Provider value={{ user, loading, login, logout, isLoggedIn: !!user }}>
                {children}
            </AuthContext.Provider>
        )
    }, []);
}

export default AuthContext;