import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    // 로그인된 상태면 메인 페이지로 리디렉션
    if (user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PublicRoute;
