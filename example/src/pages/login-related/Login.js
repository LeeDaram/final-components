import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
    // 엔터키
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'userId') {
                document.getElementById('userPassword').focus();
            } else if (e.target.id === 'userPassword') {
                handleLogin();
            }
        }
    };

    // 로그인 함수
    const { login } = useAuth();

    // 탭 상태값
    const [activeTab, setActiveTab] = useState('user');

    // 입력값 관리
    const [formData, setFormData] = useState({ userId: '', userPassword: '' });
    const [formErrors, setFormErrors] = useState({});

    // 정규식
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    // 화면이동
    const navigate = useNavigate();

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

        // 비밀번호
        if (!formData.userPassword) {
            errors.userPassword = '비밀번호를 입력해주세요';
        } else if (!passwordRegex.test(formData.userPassword)) {
            errors.userPassword = '비밀번호는 8~16자리, 영문/숫자/특수기호를 포함해야 합니다';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 일반 로그인
    const handleLogin = () => {
        if (validateForm()) {
            login(formData.userId, formData.userPassword);
        } else {
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하고 다시 시도해 주세요.');
        }
    };

    // 소셜로그인
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="p-4 bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl rounded-2xl border p-12 flex">
                {/* 좌측 - 회원가입 안내 */}
                <div className="w-1/2 border-r p-16">
                    <p className="text-2xl font-semibold text-gray-700">
                        로그인 한 번으로 <br />
                        <span>
                            {activeTab === 'user' ? (
                                <>
                                    착한가격업소를 편리하게 <br /> 이용해보세요!
                                </>
                            ) : (
                                <>
                                    내 가게를 착한 업소로 등록하고 <br /> 홍보해보세요!
                                </>
                            )}
                        </span>
                    </p>
                    <img
                        src={
                            activeTab === 'user'
                                ? 'https://cdn-icons-png.flaticon.com/512/4990/4990576.png'
                                : 'https://cdn-icons-png.flaticon.com/512/6470/6470977.png'
                        }
                        alt="회원가입"
                        className="w-48 mx-auto my-16"
                    />
                    <Link to={activeTab === 'user' ? '/personal-form' : '/business-form'}>
                        <button className="btn btn-primary btn-block h-14 bg-white text-blue-500 border-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500">
                            {activeTab === 'user' ? '개인회원 가입' : '사업자회원 가입'}
                        </button>
                    </Link>
                </div>

                {/* 우측 - 로그인 */}
                <div className="w-1/2 p-16">
                    <nav className="tabs tabs-bordered pb-2 flex">
                        {['user', 'biz'].map((type) => (
                            <button
                                key={type}
                                className={`text-xl pb-3 tab flex-1 ${
                                    activeTab === type ? 'tab-active font-extrabold' : ''
                                }`}
                                onClick={() => {
                                    setActiveTab(type);
                                    setFormData({ userId: '', userPassword: '' });
                                    setFormErrors({});
                                }}
                            >
                                {type === 'user' ? '개인회원' : '사업자회원'}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-3">
                        {/* 아이디 */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="아이디"
                                className="input h-12 border-gray-300 "
                                id="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            <span className="label">
                                {formErrors.userId && <span className="text-red-500">{formErrors.userId}</span>}
                            </span>
                        </div>

                        {/* 비밀번호 */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="비밀번호"
                                className="input h-12 border-gray-300 "
                                id="userPassword"
                                value={formData.userPassword}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            <span className="label">
                                {formErrors.userPassword && (
                                    <span className="text-red-500">{formErrors.userPassword}</span>
                                )}
                            </span>
                        </div>

                        <button
                            className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                            onClick={handleLogin}
                        >
                            로그인
                        </button>

                        <p className="mt-3 text-gray-500 text-xs">
                            <span className="hover:underline cursor-pointer" onClick={() => navigate('/find-id')}>
                                아이디 찾기
                            </span>
                            {' | '}
                            <span className="hover:underline cursor-pointer" onClick={() => navigate('/find-password')}>
                                비밀번호 찾기
                            </span>
                        </p>

                        {activeTab === 'user' && (
                            <>
                                <div className="divider border-gray-300 text-gray-500">소셜 계정으로 간편 회원가입</div>
                                <button
                                    className="btn btn-primary btn-block h-14 bg-transparent text-gray-700 border-gray-500 hover:bg-transparent hover:text-gray-700 hover:border-gray-500"
                                    onClick={handleGoogleLogin}
                                >
                                    <img
                                        src="https://img.icons8.com/?size=512&id=17949&format=png"
                                        alt="Google"
                                        className="w-5 h-5 mr-2"
                                    />
                                    구글 로그인
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
