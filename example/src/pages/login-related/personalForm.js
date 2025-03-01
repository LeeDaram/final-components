import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalForm() {
    // 화면이동
    const navigate = useNavigate();

    // 정규식
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 이메일 인증
    const [isLoading, setIsLoading] = useState(false); // 로딩상태
    const [isVerified, setIsVerified] = useState(false); // 인증여부
    const [timer, setTimer] = useState(180); // 인증 제한 시간
    const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 동작 여부
    const timerRef = useRef(null);

    // 중복확인
    const [isDuplicate, setIsDuplicate] = useState(false);

    // 입력값 관리
    const [formData, setFormData] = useState({
        userId: '',
        userPassword: '',
        confirmPassword: '',
        userName: '',
        userBirth: '',
        userPhone: '',
        userEmail: '',
        verificationCode: '',
    });

    // 입력값 오류
    const [formErrors, setFormErrors] = useState({});

    // 약관상태 관리
    const [terms, setTerms] = useState([]); // 약관 목록
    const [checkedItems, setCheckedItems] = useState({}); // 체크 상태
    const [openItem, setOpenItem] = useState({}); // 펼치기 상태
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 동의 상태

    // 값 입력 업데이트
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // 오류 메시지 제거
        setFormErrors((prev) => ({ ...prev, [id]: '' }));
    };

    // 약관 가져오기
    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/terms');
                if (!response.ok) throw new Error('서버 응답 오류');

                const data = await response.json();
                const termsData = data.map((term) => ({
                    termsId: term.termsId,
                    title: term.title,
                    content: term.content,
                    isRequired: term.isRequired,
                }));

                setTerms(termsData);

                const initialCheckedState = {};
                const initialOpenState = {};
                termsData.forEach((term) => {
                    initialCheckedState[term.termsId] = false;
                    initialOpenState[term.termsId] = false;
                });

                setCheckedItems(initialCheckedState);
                setOpenItem(initialOpenState);
            } catch (error) {
                console.error('약관을 불러오는 중 오류 발생:', error);
            }
        };

        fetchTerms();
    }, []);

    // 개별 체크박스 상태 변경
    const handleCheckboxChange = (termsId) => {
        setCheckedItems((prev) => {
            const updatedCheckedItems = { ...prev, [termsId]: !prev[termsId] };
            const allChecked = Object.values(updatedCheckedItems).every(Boolean);
            setIsAllChecked(allChecked);
            setFormErrors((prev) => ({ ...prev, terms: '' }));
            return updatedCheckedItems;
        });
    };

    // 전체 동의 체크박스 변경
    const handleAllChange = (e) => {
        const isChecked = e.target.checked;
        const newCheckedState = {};

        terms.forEach((term) => {
            newCheckedState[term.termsId] = isChecked;
        });

        setCheckedItems(newCheckedState);
        setIsAllChecked(isChecked);

        setFormErrors((prev) => ({ ...prev, terms: '' }));
    };

    // 약관 펼치기/접기 상태 변경
    const toggleItem = (termsId) => {
        setOpenItem((prev) => ({
            ...prev,
            [termsId]: !prev[termsId],
        }));
    };

    // 타이머 형식
    const timeFormatter = useCallback((param) => {
        const min = String(Math.floor(param / 60)).padStart(2, '0');
        const sec = String(param % 60).padStart(2, '0');
        return `${min}:${sec}`;
    }, []);

    // 타이머 시작 함수
    const startTimer = () => {
        setTimer(180);
        setIsTimerRunning(true);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsTimerRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 타이머 정리
    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    // 인증코드 전송
    const handleSendCode = async () => {
        if (!formData.userEmail) {
            setFormErrors({ userEmail: '이메일을 입력하세요.' });
            return;
        }

        setIsLoading(true); // 로딩 시작

        try {
            const response = await fetch('http://localhost:8080/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.userEmail }),
            });

            const data = await response.json();
            alert(data.message);

            setTimeout(() => {
                setIsLoading(false);
                startTimer();
            }, 1000);
        } catch (error) {
            console.error('Error sending verification code', error);
            setIsLoading(false);
        }
    };

    // 이메일 인증번호 확인 요청
    const handleVerifyCode = async () => {
        if (!formData.verificationCode) {
            setFormErrors({ verificationCode: '인증번호를 입력하세요.' });
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/email/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.userEmail, verificationCode: formData.verificationCode }),
            });

            const isValid = await response.json();
            if (isValid) {
                alert('이메일 인증 성공!');
                setIsVerified(true);
                clearInterval(timerRef.current); // 타이머 정지
            } else {
                alert('인증번호가 올바르지 않거나 만료되었습니다.');
            }
        } catch (error) {
            console.error('Error verifying code', error);
        }
    };

    // 인증번호 재전송
    const handleResendCode = () => {
        handleSendCode();
    };

    // 아이디 중복확인
    const checkDuplicate = async () => {
        if (!formData.userId || !idRegex.test(formData.userId)) {
            alert('아이디는 5~20자리 영문, 숫자를 포함해야 합니다');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/users/${formData.userId}`);

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!data || Object.keys(data).length === 0) {
                setIsDuplicate(true); // 아이디 사용 가능
                alert('사용 가능한 아이디입니다');
            } else {
                setIsDuplicate(false); // 아이디가 이미 존재
                alert('사용할 수 없는 아이디입니다');
            }
        } catch (error) {
            console.error('중복확인 중 오류 발생: ', error);
            setIsDuplicate(null);
        }
    };

    // 유효성 검사
    const validateForm = () => {
        let errors = {};

        // 아이디
        if (!isDuplicate) {
            errors.userId = '아이디 중복검사를 진행해주세요';
        } else if (!formData.userId || !idRegex.test(formData.userId)) {
            errors.userId = '아이디는 5~20자리 영문, 숫자를 포함해야 합니다';
        }

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

        // 이름
        if (!formData.userName) {
            errors.userName = '이름을 입력해주세요';
        }

        // 생일
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(formData.userBirth).setHours(0, 0, 0, 0);
        if (!formData.userBirth) {
            errors.userBirth = '생년월일을 입력해주세요요';
        } else if (formData.userBirth && !birthRegex.test(formData.userBirth)) {
            errors.userBirth = '생년월일은 YYYY-MM-DD 형식이어야 합니다';
        } else if (selectedDate > today) {
            errors.userBirth = '생년월일은 오늘 날짜 이전이어야 합니다.';
        }

        // 휴대폰번호
        if (formData.userPhone && !phoneRegex.test(formData.userPhone)) {
            errors.userPhone = '휴대폰 번호는 9자리 숫자여야 합니다';
        }

        // 이메일
        if (!formData.userEmail) {
            errors.userEmail = '이메일을 입력해주세요';
        } else if (!emailRegex.test(formData.userEmail)) {
            errors.userEmail = '올바른 이메일 형식이 아닙니다';
        }

        // 이메일 인증
        if (!formData.verificationCode) {
            errors.verificationCode = '이메일 인증을 완료해주세요';
        }

        // 약관
        const requiredTerms = terms.filter((t) => t.isRequired === 'T');
        const allRequiredChecked = requiredTerms.every((term) => checkedItems[term.termsId]);
        if (!allRequiredChecked) {
            errors.terms = '필수 약관에 동의해야 합니다';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 회원가입 함수
    const handleSubmit = async () => {
        try {
            const optionalTerms =
                terms.filter((term) => term.isRequired === 'F').map((term) => checkedItems[term.termsId] === true)[0] ||
                false;

            const bodyData = {
                userId: formData.userId,
                password: formData.userPassword,
                name: formData.userName,
                email: formData.userEmail,
                birthDate: formData.userBirth,
                isAgree: optionalTerms,
            };

            if (formData.userPhone) {
                bodyData.phoneNumber = formData.userPhone;
            }

            const response = await fetch('http://localhost:8080/api/users/sign-up/personal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) throw new Error('회원가입 실패');

            alert('회원가입 완료 : 로그인해주세요');
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패', error);
        }
    };

    // 회원가입
    const joinUser = () => {
        if (validateForm()) {
            handleSubmit();
        } else {
            alert('회원가입 오류 : 입력란을 모두 입력해주세요');
        }
    };

    return (
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-24">
            <div className="flex mx-auto max-w-xl flex-col">
                {/* 폼 제목 */}
                <p className="text-2xl font-bold mt-24 mb-8 text-center">착한업소 솔루션 개인 회원가입</p>

                {/* 아이디 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userId">
                        아이디<span className="text-red-500">*</span>
                    </label>
                    <div className="join w-full">
                        <input
                            type="text"
                            className="input h-12 border-gray-300 join-item "
                            id="userId"
                            placeholder="5~20자리 / 영문, 숫자 포함"
                            value={formData.userId}
                            onChange={(e) => {
                                handleChange(e);
                                setIsDuplicate(false);
                            }}
                        />
                        <button
                            className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500"
                            onClick={checkDuplicate}
                        >
                            중복확인
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.userId && <span className="text-red-500">{formErrors.userId}</span>}
                    </span>
                </div>

                {/* 비밀번호 */}
                <div className="relative">
                    <label className="label label-text text-base font-semibold" htmlFor="userPassword">
                        비밀번호<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="8~16자리 / 영문, 숫자, 특수기호 포함 "
                        className="input h-12 border-gray-300 "
                        id="userPassword"
                        value={formData.userPassword}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userPassword && <span className="text-red-500">{formErrors.userPassword}</span>}
                    </span>
                </div>

                {/* 비밀번호 확인 */}
                <div className="relative mb-3">
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="비밀번호를 한 번 더 입력해 주세요"
                        className="input h-12 border-gray-300 "
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.confirmPassword && (
                            <span className="text-red-500">{formErrors.confirmPassword}</span>
                        )}
                    </span>
                </div>

                {/* 이름 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " htmlFor="userName">
                        이름<span className="text-red-500">*</span>
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

                {/* 생년월일 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userBirth">
                        생년월일<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        placeholder="숫자 8자리 / 예 : 20021001"
                        className="input h-12 border-gray-300 "
                        id="userBirth"
                        value={formData.userBirth}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userBirth && <span className="text-red-500">{formErrors.userBirth}</span>}
                    </span>
                </div>

                {/* 휴대폰 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userPhone">
                        휴대폰
                    </label>
                    <input
                        type="tel"
                        placeholder="01012345678"
                        className="input h-12 border-gray-300 "
                        id="userPhone"
                        value={formData.userPhone}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userPhone && <span className="text-red-500">{formErrors.userPhone}</span>}
                    </span>
                </div>

                {/* 이메일 입력 */}
                <div className="relative">
                    <label className="label label-text text-base font-semibold" htmlFor="userEmail">
                        이메일<span className="text-red-500">*</span>
                    </label>
                    <div className="join w-full">
                        <input
                            type="email"
                            className="h-12 input join-item border-gray-300"
                            id="userEmail"
                            placeholder="email@goodprice.com"
                            value={formData.userEmail}
                            onChange={handleChange}
                            disabled={isVerified} // 인증 완료 시 입력 비활성화
                        />
                        <button
                            className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500"
                            onClick={handleSendCode}
                            disabled={isLoading || isTimerRunning}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : isTimerRunning ? (
                                `${timeFormatter(timer)}`
                            ) : (
                                '인증번호 전송'
                            )}
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.userEmail && <span className="text-red-500">{formErrors.userEmail}</span>}
                    </span>
                </div>

                {/* 인증번호 입력 */}
                <div className="relative mb-3">
                    <div className="flex w-full items-center space-x-3">
                        <div className="join flex-1">
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                className="h-12 input join-item w-full border-gray-300"
                                id="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                disabled={isVerified}
                            />
                            <button
                                className="h-12 btn join-item w-3/12 border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-gray-500 hover:border-gray-500"
                                onClick={handleVerifyCode}
                                disabled={isVerified}
                            >
                                확인
                            </button>
                        </div>
                        <button
                            className="h-12 btn border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-gray-500 hover:border-gray-500 shadow-none"
                            onClick={handleResendCode}
                            disabled={isTimerRunning}
                        >
                            인증번호 재전송
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.verificationCode && (
                            <span className="text-red-500">{formErrors.verificationCode}</span>
                        )}
                    </span>
                </div>

                {/* 약관 */}
                <label className="label label-text text-base font-semibold" htmlFor="userName">
                    약관<span className="text-red-500">*</span>
                </label>
                <span className="label">
                    {formErrors.terms && <span className="text-red-500">{formErrors.terms}</span>}
                </span>
                <div className="accordion divide-neutral/20 divide-y rounded border p-5 mb-10">
                    {/* 전체약관 동의 */}
                    <div className="space-y-2 mb-5">
                        <label className="flex items-center">
                            <input
                                checked={isAllChecked}
                                onChange={handleAllChange}
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 "
                            />
                            <span className="ml-2 font-semibold text-lg">전체동의</span>
                        </label>
                        <p className="text-sm text-gray-500 ml-7">
                            실명 인증된 아이디로 가입, 위치기반서비스 이용약관(필수), 이벤트・혜택 정보 수신(선택)
                            동의를 포함합니다.
                        </p>
                    </div>

                    {terms.map((term) => (
                        <div
                            key={term.termsId}
                            className={`accordion-item ${openItem[term.termsId] ? 'active' : ''}`}
                            id={term.termsId}
                        >
                            <label className="flex items-center justify-between w-full cursor-pointer py-2">
                                <div className="flex items-center">
                                    <input
                                        checked={checkedItems[term.termsId] || false}
                                        onChange={() => handleCheckboxChange(term.termsId)}
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600"
                                    />
                                    <span
                                        className={`ml-2 text-lg ${
                                            term.isRequired === 'T' ? 'font-semibold' : 'font-medium'
                                        }`}
                                    >
                                        {term.title}
                                    </span>
                                </div>

                                <button
                                    className="accordion-toggle w-0"
                                    onClick={() => toggleItem(term.termsId)}
                                    aria-controls={`${term.termsId}-collapse`}
                                    aria-expanded={openItem[term.termsId]}
                                >
                                    <span
                                        className={`icon-[tabler--chevron-right] size-5 shrink-0 transition-transform duration-300 ${
                                            openItem[term.termsId] ? 'rotate-90' : 'rotate-0'
                                        }`}
                                    ></span>
                                </button>
                            </label>
                            {openItem[term.termsId] && (
                                <div
                                    id={`${term.termsId}-collapse`}
                                    className="accordion-content w-full overflow-hidden transition-[height] duration-300"
                                >
                                    <div className="px-5 pb-4">
                                        <p className="text-base-content/80 font-normal">{term.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 회원가입 버튼 */}
                <button
                    className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                    onClick={joinUser}
                >
                    회원가입 하기
                </button>
            </div>
        </div>
    );
}
export default PersonalForm;
