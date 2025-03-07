import { useState, useEffect } from 'react';
import Sidebar from '../sidebar.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../pages/login-related/AuthContext';

function UserDelete() {
    // 로그인, 로그아웃
    const { user, token, logout } = useAuth();

    // 페이지 이동
    const navigate = useNavigate();

    // 정규식
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    // 입력값 관리
    const [formData, setFormData] = useState({
        userPassword: '',
        confirmPassword: '',
    });

    // 입력값 오류
    const [formErrors, setFormErrors] = useState({});

    // 값 입력 업데이트
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // 오류 메시지 제거
        setFormErrors((prev) => ({ ...prev, [id]: '' }));
    };

    // 유효성 검사
    const validateForm = () => {
        let errors = {};

        // 비밀번호
        if (!formData.userPassword) {
            errors.userPassword = '비밀번호를 입력해주세요';
        } else if (!passwordRegex.test(formData.userPassword)) {
            errors.userPassword = '비밀번호는 8~16자리, 영문/숫자/특수기호를 포함해야 합니다';
        }

        // 비밀번호 확인
        if (!formData.confirmPassword) {
            errors.confirmPassword = '비밀번호확인을 입력해주세요';
        } else if (formData.userPassword !== formData.confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 서버 : 회원탈퇴 (일반)
    const fetchUserrDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/delete/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: formData.userPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            alert('회원탈퇴 되었습니다.');
            setFormData({ userPassword: '', confirmPassword: '' });
            logout();
            navigate('/');
        } catch (error) {
            console.error('회원탈퇴 중 오류가 발생했습니다.', error);
            alert('회원탈퇴 중 오류가 발생했습니다.', error);
        }
    };

    // 서버 : 회원탈퇴 (소셜)
    const fetchUserrDeleteSocial = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/social/delete/${user.id}`, {
                method: 'DELETE',
                Authorization: `Bearer ${token}`,
            });

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            alert('회원탈퇴 되었습니다.');
            logout();
            navigate('/');
        } catch (error) {
            console.error('회원탈퇴 중 오류가 발생했습니다.', error);
            alert('회원탈퇴 중 오류가 발생했습니다.', error);
        }
    };

    // 비밀번호 변경 함수
    const changePassword = () => {
        if (validateForm()) {
            fetchUserrDelete();
        } else {
            alert('회원탈퇴 오류 : 입력란을 모두 입력해주세요');
        }
    };

    // 변경함수 (소셜)
    const changePasswordSocial = () => {
        fetchUserrDeleteSocial();
    };

    return (
        <div className="bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    {/* 좌측 - 사이드바 */}
                    <div className="w-1/4">
                        <Sidebar />
                    </div>

                    {/* 우측 - 내용 */}
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200 ">
                        <h2 className="text-2xl font-bold mb-6">회원탈퇴</h2>
                        <p className="font-normal mb-6">
                            정말 탈퇴하시겠습니까? <br />
                            탈퇴 시 예약정보, 리뷰 등 회원님의 모든 정보가 삭제되며 복구가 불가능합니다.
                        </p>

                        {!(user?.loginType === 'SOCIAL') && (
                            <>
                                {/* 비밀번호 */}
                                <div className="mt-6">
                                    <label className="block text-lg font-semibold mb-1" htmlFor="userPassword">
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full h-12 border border-gray-300 rounded px-3"
                                        id="userPassword"
                                        placeholder="현재 비밀번호"
                                        value={formData.userPassword}
                                        onChange={handleChange}
                                    />
                                    <span className="label">
                                        {formErrors.userPassword && (
                                            <span className="text-red-500">{formErrors.userPassword}</span>
                                        )}
                                    </span>
                                </div>

                                {/* 비밀번호 확인*/}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="w-full h-12 border border-gray-300 rounded px-3"
                                        id="confirmPassword"
                                        placeholder="비밀번호 확인"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <span className="label">
                                        {formErrors.confirmPassword && (
                                            <span className="text-red-500">{formErrors.confirmPassword}</span>
                                        )}
                                    </span>
                                </div>
                            </>
                        )}
                        {/* 회원정보 수정 버튼 */}
                        <div className="flex justify-between">
                            <button
                                className="w-1/2 mr-1 h-14 bg-gray-300 text-white text-lg font-semibold rounded-lg hover:bg-gray-400 transition"
                                onClick={() => navigate('/')}
                            >
                                더 써볼래요
                            </button>
                            {user?.loginType === 'SOCIAL' ? (
                                <button
                                    className="w-1/2 ml-1 h-14 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                                    onClick={changePasswordSocial}
                                >
                                    회원 탈퇴하기
                                </button>
                            ) : (
                                <button
                                    className="w-1/2 ml-1 h-14 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                                    onClick={changePassword}
                                >
                                    회원 탈퇴하기
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserDelete;
