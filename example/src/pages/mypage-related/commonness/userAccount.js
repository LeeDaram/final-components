import { useEffect, useState } from 'react';
import { useAuth } from '../../../pages/login-related/AuthContext';
import Sidebar from '../sidebar.js';

function UserAccount() {
    // 유저 정보
    const { user, token } = useAuth();

    // 유저 정보 불러오기
    useEffect(() => {
        if (user && token) {
            fetchUserInfo();
            fetchUserTermsInfo();
        }
    }, [user, token]);

    // 정규식
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 입력값 관리
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        birthDate: '',
        userPhone: '',
        userEmail: '',
    });
    const [termsData, setTermsData] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // 입력값 관리
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setFormErrors((prev) => ({ ...prev, [id]: '' }));
    };

    // 사용자 기본 정보 조회
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
            }

            const userData = await response.json();

            setFormData({
                userId: userData.userId,
                name: userData.name,
                birthDate: userData.birthDate,
                userPhone: userData.phoneNumber,
                userEmail: userData.email,
                isAgree: userData.isAgree,
            });
        } catch (err) {
            console.error(err);
        }
    };

    // 사용자 약관 정보 가져오기
    const fetchUserTermsInfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/terms/${user.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
            }

            const text = await response.text();
            const termsData = text ? JSON.parse(text) : {};
            setTermsData(termsData.isAgree);
        } catch (err) {
            console.error(err);
        }
    };

    // 사용자 정보 저장
    const saveUserInfo = async () => {
        try {
            const bodyData = {
                userDto: {},
                termsAgreementDto: {},
            };

            if (formData.userPhone) {
                bodyData.userDto.phoneNumber = formData.userPhone;
            }
            if (formData.userEmail) {
                bodyData.userDto.email = formData.userEmail;
            }
            if (termsData) {
                bodyData.termsAgreementDto.isAgree = termsData;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update/personal/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('사용자 정보를 저장하는데 실패했습니다.');
            }

            alert('회원정보가 수정되었습니다.');
        } catch (err) {
            console.error(err);
        }
    };

    // 유효성 검사
    const validateForm = () => {
        let errors = {};

        if (formData.userPhone && !phoneRegex.test(formData.userPhone)) {
            errors.userPhone = '휴대폰 번호는 9자리 숫자여야 합니다';
        }

        if (!formData.userEmail) {
            errors.userEmail = '이메일을 입력해주세요';
        } else if (!emailRegex.test(formData.userEmail)) {
            errors.userEmail = '올바른 이메일 형식이 아닙니다';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 사용자 정보 수정
    const handleUpdateClick = async () => {
        if (validateForm()) {
            await saveUserInfo();
            await fetchUserInfo();
            await fetchUserTermsInfo();
        } else {
            alert('정보 수정 오류 : 입력란을 모두 입력해주세요');
        }
    };

    return (
        <div className="bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="w-1/4">
                        <Sidebar />
                    </div>
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">내 정보 수정</h2>

                        <div className="rounded-lg border-gray-200 border p-10">
                            <div className="mb-6">
                                <label className="text-gray-500">아이디</label>
                                <p className="block text-lg font-semibold mb-1">{formData?.userId || ''}</p>
                            </div>
                            <div className="mb-6">
                                <label className="text-gray-500">이름</label>
                                <p className="block text-lg font-semibold mb-1">{formData?.name || ''}</p>
                            </div>
                            {!(user?.loginType === 'SOCIAL') && (
                                <>
                                    <div className="mb-6">
                                        <label className="text-gray-500">생년월일</label>
                                        <p className="block text-lg font-semibold mb-1">{formData?.birthDate || ''}</p>
                                    </div>

                                    <div className="mb-6">
                                        <label className="text-gray-500 mb-1" htmlFor="userPhone">
                                            휴대폰
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="-"
                                            className="w-full h-12 border border-gray-300 rounded px-3"
                                            id="userPhone"
                                            value={formData?.userPhone || ''}
                                            onChange={handleChange}
                                        />
                                        <span className="label">
                                            {formErrors.userPhone && (
                                                <span className="text-red-500">{formErrors.userPhone}</span>
                                            )}
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <label className="text-gray-500 mb-1" htmlFor="userEmail">
                                            이메일
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full h-12 border border-gray-300 rounded px-3"
                                            id="userEmail"
                                            placeholder="-"
                                            value={formData?.userEmail || ''}
                                            onChange={handleChange}
                                        />
                                        <span className="label">
                                            {formErrors.userEmail && (
                                                <span className="text-red-500">{formErrors.userEmail}</span>
                                            )}
                                        </span>
                                    </div>
                                </>
                            )}

                            {!(user?.role === 'ROLE_ADMIN') && (
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <label className="text-sm text-gray-500">마케팅 정보 수신 동의</label>
                                        <p className="text-base font-semibold">
                                            이메일을 통해 착한가격업소의 소식을 받을 수 있어요
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 relative">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={termsData === 'T'}
                                                onChange={(e) => setTermsData(e.target.checked ? 'T' : 'F')}
                                            />
                                            <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-transform peer-checked:translate-x-4"></div>
                                        </label>
                                    </div>
                                </div>
                            )}
                            <button
                                className="w-full h-14 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                                onClick={handleUpdateClick}
                            >
                                회원정보 수정
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;
