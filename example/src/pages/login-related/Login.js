import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    // 탭 버튼 상태관리
    const [activeTab, setActiveTab] = useState('user');

    // 개인회원, 관리자 로그인폼 상태관리
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorUserIdMessage, setErrorUserIdMessage] = useState('');
    const [errorUserPwMessage, setErrorUserPwMessage] = useState('');

    // 사업자 로그인폼 상태관리리
    const [bizId, setBizId] = useState('');
    const [bizPassword, setBizPassword] = useState('');
    const [errorBizIdMessage, setErrorBizIdMessage] = useState('');
    const [errorBizPwMessage, setErrorBizPwMessage] = useState('');

    // 페이지 이동
    const navigate = useNavigate();

    // 아이디 찾기, 비밀번호 찾기 페이지로 이동
    const handleLinkClick = (action) => {
        if (action === 'find-id') {
            navigate('/find-id');
        } else if (action === 'find-password') {
            navigate('/find-password');
        }
    };

    // 개인회원, 관리자 로그인폼 예외처리
    const handleUserLogin = () => {
        setErrorUserIdMessage('');
        setErrorUserPwMessage('');

        if (!userId) {
            setErrorUserIdMessage('아이디를 입력해주세요');
        }
        if (!userPassword) {
            setErrorUserPwMessage('비밀번호를 입력해주세요');
        }

        if (userId && userPassword) {
            userLogin(userId, userPassword);
        }
    };

    // 사업자 로그인폼 예외처리
    const handleBizLogin = () => {
        setErrorBizIdMessage('');
        setErrorBizPwMessage('');

        if (!bizId) {
            setErrorBizIdMessage('아이디를 입력해주세요');
        }
        if (!bizPassword) {
            setErrorBizPwMessage('비밀번호를 입력해주세요');
        }

        if (bizId && bizPassword) {
            userLogin(bizId, bizPassword);
        }
    };

    // 서버통신
    const userLogin = async (id, pw) => {
        try {
            const response = await fetch('http://localhost:8080/api/users/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: id, password: pw }),
                credentials: 'include', // 쿠키에 JWT 저장하려면 필요
            });

            if (!response.ok) {
                throw new Error('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // JWT 저장 (쿠키도 가능)
            navigate('/'); // 로그인 성공 시 이동할 페이지
        } catch (error) {
            alert('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="p-4 bg-white sm:p-6 dark:bg-gray-800 ">
            <div className="mx-auto max-w-screen-xl rounded-2xl border p-12">
                <div className="md:flex md:justify-between">
                    {/* 좌측 - 회원가입 안내 */}
                    <div className="w-1/2 border-r">
                        {activeTab === 'user' && (
                            <div className="p-16">
                                <p className="text-2xl font-semibold text-gray-700">
                                    로그인 한 번으로 <br />
                                    착한가격업소를 <br />
                                    편리하게 이용해보세요!
                                </p>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4990/4990576.png"
                                    alt="개인회원"
                                    className="w-48 mx-auto my-16"
                                />
                                <Link to="/personal-form">
                                    <button className="btn btn-primary btn-block h-14 bg-white text-blue-500 border-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500">
                                        개인회원 가입
                                    </button>
                                </Link>
                            </div>
                        )}
                        {activeTab === 'biz' && (
                            <div className="p-16">
                                <p className="text-2xl font-semibold text-gray-700">
                                    로그인 한 번으로 <br />
                                    내 가게를 착한 업소로 등록하고 <br />
                                    홍보해보세요!
                                </p>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/6470/6470977.png"
                                    alt="개인회원"
                                    className="w-48 mx-auto my-16"
                                />
                                <Link to="/business-form">
                                    <button className="btn btn-primary btn-block h-14 bg-white text-blue-500 border-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500">
                                        사업자회원 가입
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* 우측 - 로그인 */}
                    <div className="w-1/2 p-16 ">
                        <nav
                            className="tabs tabs-bordered pb-2"
                            aria-label="Tabs"
                            role="tablist"
                            aria-orientation="horizontal"
                        >
                            <button
                                type="button"
                                className={`text-xl pb-3 tab w-full ${
                                    activeTab === 'user' ? 'tab-active font-extrabold' : ''
                                }`}
                                onClick={() => setActiveTab('user')}
                                aria-selected={activeTab === 'user'}
                            >
                                개인회원
                            </button>
                            <button
                                type="button"
                                className={`text-xl pb-3 tab w-full  ${
                                    activeTab === 'biz' ? 'tab-active font-extrabold' : ''
                                }`}
                                onClick={() => setActiveTab('biz')}
                                aria-selected={activeTab === 'biz'}
                            >
                                사업자회원
                            </button>
                        </nav>

                        <div className="mt-3">
                            {activeTab === 'user' && (
                                <div role="tabpanel">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            placeholder="아이디"
                                            className="input h-14 focus:border-blue-500"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                        <span className="label">
                                            {errorUserIdMessage && (
                                                <span className="label-text-alt text-red-500">
                                                    {errorUserIdMessage}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="password"
                                            placeholder="비밀번호"
                                            className="input h-14 focus:border-blue-500"
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                        />
                                        <span className="label">
                                            {errorUserPwMessage && (
                                                <span className="label-text-alt text-red-500">
                                                    {errorUserPwMessage}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                                        onClick={handleUserLogin}
                                    >
                                        로그인
                                    </button>

                                    <p className="mt-3 text-gray-500 text-xs">
                                        <span
                                            href="#"
                                            className="hover:underline"
                                            onClick={() => handleLinkClick('find-id')}
                                        >
                                            아이디 찾기
                                        </span>
                                        {' | '}
                                        <span
                                            href="#"
                                            className="hover:underline"
                                            onClick={() => handleLinkClick('find-password')}
                                        >
                                            비밀번호 찾기
                                        </span>
                                    </p>
                                    <div class="divider border-gray-300 text-gray-500">소셜 계정으로 간편 회원가입</div>

                                    <button className="btn btn-primary btn-block h-14 bg-transparent text-gray-700 border-gray-500 hover:bg-transparent hover:text-gray-700 hover:border-gray-500">
                                        <img
                                            src="https://img.icons8.com/?size=512&id=17949&format=png"
                                            alt="Google"
                                            className="w-5 h-5 mr-2 "
                                        />
                                        구글 로그인
                                    </button>
                                </div>
                            )}
                            {activeTab === 'biz' && (
                                <div role="tabpanel">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            placeholder="아이디"
                                            className="input h-14 focus:border-blue-500"
                                            value={bizId}
                                            onChange={(e) => setBizId(e.target.value)}
                                        />
                                        <span className="label">
                                            {errorBizIdMessage && (
                                                <span className="label-text-alt text-red-500">{errorBizIdMessage}</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="password"
                                            placeholder="비밀번호"
                                            className="input h-14 focus:border-blue-500"
                                            value={bizPassword}
                                            onChange={(e) => setBizPassword(e.target.value)}
                                        />
                                        <span className="label">
                                            {errorBizPwMessage && (
                                                <span className="label-text-alt text-red-500">{errorBizPwMessage}</span>
                                            )}
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                                        onClick={handleBizLogin}
                                    >
                                        로그인
                                    </button>

                                    <p className="mt-3 text-gray-500 text-xs">
                                        <span
                                            href="#"
                                            className="hover:underline"
                                            onClick={() => handleLinkClick('find-id')}
                                        >
                                            아이디 찾기
                                        </span>
                                        {' | '}
                                        <span
                                            href="#"
                                            className="hover:underline"
                                            onClick={() => handleLinkClick('find-password')}
                                        >
                                            비밀번호 찾기
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
