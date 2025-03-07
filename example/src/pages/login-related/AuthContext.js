import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// 쿠키에서 JWT 가져오기
const getTokenFromCookie = () => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('Authorization='));
    return token ? token.split('=')[1] : null;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // 로그인 상태 유지
    useEffect(() => {
        const savedToken = getTokenFromCookie();
        if (savedToken) {
            const decoded = jwtDecode(savedToken);
            setToken(savedToken);
            setUser({
                id: decoded.sub,
                name: decoded.name,
                role: decoded.authorities,
                loginType: decoded.loginType,
            });
        }
    }, []);

    // 로그인
    const login = async (id, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/users/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: id, password }),
                credentials: 'include',
            });

            if (!response.ok)
                throw new Error('로그인에 실패했습니다. 아이디와 비밀번호를 확인하고 다시 시도해 주세요.');

            navigate('/');
            window.location.reload();
        } catch (error) {
            alert(error.message);
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
