import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // 로그인 상태 유지
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        } else {
            fetchOAuthUser(); // OAuth 로그인 체크
        }
    }, []);

    // 로그인
    const login = (token, userData) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // OAuth 로그인 후 사용자 정보 가져오기
    const fetchOAuthUser = async () => {
        if (!token) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/oauth2/me', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                console.error('OAuth 사용자 정보를 가져올 수 없습니다.');
                return;
            }

            const data = await response.json();
            const decoded = jwtDecode(data.token);

            if (data) {
                login(data.token, { id: decoded.sub, name: decoded.name, role: decoded.authorities });
                navigate('/');
            }
        } catch (error) {
            console.error('OAuth 로그인 유지 실패:', error);
        }
    };

    // 로그아웃
    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/users/sign-out', {
                method: 'POST',
                credentials: 'include',
            });

            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
