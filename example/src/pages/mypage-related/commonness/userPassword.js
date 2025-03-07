import { useEffect, useState } from 'react';
import Sidebar from '../sidebar.js';
import { useAuth } from '../../../pages/login-related/AuthContext';

function UserPassword() {
    // 유저 정보
    const { user, token } = useAuth();

    // 정규식
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    // 입력값 관리
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
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

        // 현재 비밀번호
        if (!formData.currentPassword) {
            errors.currentPassword = '현재 비밀번호를 입력해주세요';
        } else if (!passwordRegex.test(formData.currentPassword)) {
            errors.currentPassword = '비밀번호는 8~16자리, 영문/숫자/특수기호를 포함해야 합니다';
        }

        // 새 비밀번호
        if (!formData.newPassword) {
            errors.newPassword = '새 비밀번호를 입력해주세요';
        } else if (!passwordRegex.test(formData.newPassword)) {
            errors.newPassword = '비밀번호는 8~16자리, 영문/숫자/특수기호를 포함해야 합니다';
        }

        // 새 비밀번호 확인
        if (!formData.confirmPassword) {
            errors.confirmPassword = '비밀번호확인을 입력해주세요';
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }

        // 현재비밀번호랑 새 비밀번호랑 달라야함
        if (formData.currentPassword == formData.newPassword) {
            errors.newPassword = '현재비밀번호와 동일합니다. 새 비밀번호를 입력해주세요';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 서버 : 비밀번호 변경
    const fetchPwSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/update/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            if (!response.ok) {
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            }

            alert('비밀번호가 변경되었습니다. ');
        } catch (error) {
            console.error('비밀번호 변경 중 오류가 발생했습니다.', error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    // 비밀번호 변경 함수
    const changePassword = () => {
        if (validateForm()) {
            fetchPwSave();
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            alert('비밀번호 변경 오류 : 입력란을 모두 입력해주세요');
        }
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
                        <h2 className="text-2xl font-bold mb-6">비밀번호 변경</h2>

                        {/* 현재 비밀번호 */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold mb-1" htmlFor="currentPassword">
                                현재 비밀번호
                            </label>
                            <input
                                type="password"
                                className="w-full h-12 border border-gray-300 rounded px-3"
                                id="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                            <span className="label">
                                {formErrors.currentPassword && (
                                    <span className="text-red-500">{formErrors.currentPassword}</span>
                                )}
                            </span>
                        </div>

                        {/* 새 비밀번호 */}
                        <div>
                            <label className="block text-lg font-semibold mb-1" htmlFor="newPassword">
                                새 비밀번호
                            </label>
                            <input
                                type="password"
                                className="w-full h-12 border border-gray-300 rounded px-3"
                                id="newPassword"
                                placeholder="새 비밀번호 (8~16자리 / 영문, 숫자, 특수기호 포함)"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <span className="label">
                                {formErrors.newPassword && (
                                    <span className="text-red-500">{formErrors.newPassword}</span>
                                )}
                            </span>
                        </div>

                        {/* 새 비밀번호 확인*/}
                        <div className="mb-6">
                            <input
                                type="password"
                                className="w-full h-12 border border-gray-300 rounded px-3"
                                id="confirmPassword"
                                placeholder="새 비밀번호 확인"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <span className="label">
                                {formErrors.confirmPassword && (
                                    <span className="text-red-500">{formErrors.confirmPassword}</span>
                                )}
                            </span>
                        </div>

                        {/* 회원정보 수정 버튼 */}
                        <button
                            className="w-full h-14 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                            onClick={changePassword}
                        >
                            비밀번호 번경
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPassword;
