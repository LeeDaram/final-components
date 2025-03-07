import { useState } from 'react';

function FindUserId() {
    // 유저 아이디 반환
    const [userId, setUserId] = useState('');

    // 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 입력값 관리
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
    });

    // 입력값 오류
    const [formErrors, setFormErrors] = useState({});

    // 로딩
    const [isLoading, setIsLoading] = useState(false);

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

        // 이름
        if (!formData.userName) {
            errors.userName = '이름을 입력해주세요';
        }

        // 이메일
        if (!formData.userEmail) {
            errors.userEmail = '이메일을 입력해주세요';
        } else if (!emailRegex.test(formData.userEmail)) {
            errors.userEmail = '올바른 이메일 형식이 아닙니다';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 아이디 찾기 API 출력
    const fetchUserId = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/api/users/findUserId?name=${formData.userName}&email=${formData.userEmail}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('아이디를 불러오는데 실패했습니다.');
            }

            const data = await response.json();

            setUserId(data.userId);

            setFormData({
                userName: '',
                userEmail: '',
            });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            alert('사용자 정보가 존재하지 않습니다.');
            console.error(err.message);
        }
    };

    // 아이디 찾기
    const getUserId = () => {
        if (validateForm()) {
            fetchUserId();
        } else {
            alert('아이디 찾기 오류 : 입력란을 모두 입력해주세요');
        }
    };

    return (
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-24">
            <div className="flex mx-auto max-w-xl flex-col">
                {/* 폼 제목 */}
                <p className="text-2xl font-bold mt-24 mb-8 text-center">아이디 찾기</p>

                <p className="text-base font-semibold mb-5">회원정보에 등록된 정보로 아이디를 찾을 수 있습니다.</p>

                {/* 아이디 반환 */}
                {userId && (
                    <div className="text-center text-lg font-bold text-gray-700  mb-3 border border-blue-500 rounded-lg p-5 bg-blue-100">
                        회원님의 아이디는 <span className="text-blue-500">{userId} </span> 입니다.
                    </div>
                )}

                {/* 아이디 찾는중 */}
                {isLoading && (
                    <div className="text-center text-lg font-bold text-gray-700 mb-3 border border-blue-500 rounded-lg p-5 bg-blue-100">
                        <span class="loading loading-dots loading-xs text-blue-500"> </span> 아이디 찾는중{' '}
                        <span class="loading loading-dots loading-xs text-blue-500"> </span>
                    </div>
                )}

                {/* 이름 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " for="userName">
                        이름
                    </label>
                    <input
                        type="text"
                        placeholder="실명"
                        className="input h-12 border-gray-300  "
                        id="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userName && <span className="text-red-500">{formErrors.userName}</span>}
                    </span>
                </div>

                {/* 이메일 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " for="userEmail">
                        이메일
                    </label>
                    <input
                        type="email"
                        placeholder="email@goodprice.com"
                        className="input h-12 border-gray-300  "
                        id="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userEmail && <span className="text-red-500">{formErrors.userEmail}</span>}
                    </span>
                </div>

                {/* 회원가입 버튼 */}
                <button
                    className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                    onClick={getUserId}
                >
                    인증확인
                </button>
            </div>
        </div>
    );
}
export default FindUserId;
