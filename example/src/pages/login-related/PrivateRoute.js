import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // 사용자 인증 정보 가져오기

const PrivateRoute = ({ children, requiredRoles }) => {
    const { user, loading } = useAuth(); // 사용자 정보와 로딩 상태 가져오기
    const location = useLocation(); // 현재 위치 가져오기

    // user가 아직 로딩 중이면 아무것도 렌더링하지 않음
    if (loading) {
        return null; // 로딩 중에는 아무것도 렌더링하지 않음
    }

    // 로그인 여부와 역할 확인
    if (!user || !user.role) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // 여러 권한 중 하나라도 일치하면 접근 허용
    if (Array.isArray(requiredRoles)) {
        // 여러 권한 중 하나라도 일치하면 접근 허용
        if (requiredRoles.length && !requiredRoles.some((role) => user.role.includes(role))) {
            alert('권한이 부족합니다!');
            return <Navigate to="/" />;
        }
    }

    // requiredRoles가 단일 권한일 경우
    else if (requiredRoles && requiredRoles !== user.role) {
        alert('권한이 부족합니다!');
        return <Navigate to="/" />;
    }

    // 권한이 있으면 자식 컴포넌트 렌더링
    return children;
};

export default PrivateRoute;
