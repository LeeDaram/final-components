import { useState } from 'react';

function FindUserPassword() {
    // 정규식
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 로딩
    const [isLoading, setIsLoading] = useState(false);

    // 입력값 관리
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        userEmail: '',
    });
    const [sendEmail, setSendEmail] = useState(false);

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

        // 아이디
        if (!formData.userId) {
            errors.userId = '아이디를 입력해주세요';
        } else if (!idRegex.test(formData.userId)) {
            errors.userId = '아이디는 5~20자리 영문, 숫자를 포함해야 합니다';
        }

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

    // 비밀번호 찾기 API 통신
    const fetchUserPw = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/users/reset/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: formData.userId, name: formData.userName, email: formData.userEmail }),
            });

            if (!response.ok) {
                throw new Error('이메일 전송에 실패했습니다.');
            }

            setSendEmail(true);

            setFormData({
                userId: '',
                userName: '',
                userEmail: '',
            });

            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            alert('이메일 전송에 실패했습니다. 입력값을 다시 확인해주세요.');
            setSendEmail(false);
            setIsLoading(false);
        }
    };

    // 비밀번호 찾기
    const getUserPw = () => {
        if (validateForm()) {
            fetchUserPw();
        } else {
            alert('비밀번호 찾기 오류 : 입력란을 모두 입력해주세요');
        }
    };

    return (
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-24">
            <div className="flex mx-auto max-w-xl flex-col">
                {/* 폼 제목 */}
                <p className="text-2xl font-bold mt-24 mb-8 text-center">비밀번호 찾기</p>

                <p className="text-base font-semibold mb-5">회원정보에 등록된 정보로 비밀번호를 찾을 수 있습니다.</p>

                {/* 이메일 확인 안내 */}
                {sendEmail && (
                    <div className="text-center text-lg font-bold text-gray-700 mb-3 border border-blue-500 rounded-lg p-5 bg-blue-100">
                        비밀번호가 이메일로 발송되었습니다!
                        <span className="text-blue-500"> 이메일을 확인해주세요 </span>
                    </div>
                )}

                {/* 이메일 전송중 */}
                {isLoading && (
                    <div className="text-center text-lg font-bold text-gray-700 mb-3 border border-blue-500 rounded-lg p-5 bg-blue-100">
                        <span class="loading loading-dots loading-xs text-blue-500"> </span> 이메일 전송중{' '}
                        <span class="loading loading-dots loading-xs text-blue-500"> </span>
                    </div>
                )}

                {/* 아이디 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " for="userId">
                        아이디
                    </label>
                    <input
                        type="text"
                        placeholder="가입한 아이디를 입력해주세요"
                        className="input h-12 border-gray-300  "
                        id="userId"
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userId && <span className="text-red-500">{formErrors.userId}</span>}
                    </span>
                </div>

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
                    onClick={getUserPw}
                >
                    인증확인
                </button>
            </div>
        </div>
    );
}
export default FindUserPassword;
