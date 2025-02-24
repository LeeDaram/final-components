import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // 로그인 체크
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('user');
        if (token && userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    // 로그인
    const login = (token, userData) => {
        setToken(token);
        setUser(userData);
    };

    // 로그아웃
    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/sign-out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // JWT 포함
                },
            });

            if (!response.ok) {
                throw new Error('로그아웃 실패');
            }

            setUser(null);
            setToken(null);

            navigate('/login');
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
