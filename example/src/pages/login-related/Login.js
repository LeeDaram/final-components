import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const [activeTab, setActiveTab] = useState('user');
    const [form, setForm] = useState({ id: '', password: '' });
    const [errors, setErrors] = useState({ id: '', password: '' });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    // 입력 값 업데이트
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // 로그인 요청
    const handleLogin = async () => {
        const { id, password } = form;
        const newErrors = {
            id: id ? '' : '아이디를 입력해주세요',
            password: password ? '' : '비밀번호를 입력해주세요',
        };

        setErrors(newErrors);
        if (!id || !password) return;

        try {
            const response = await fetch('http://localhost:8080/api/users/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: id, password }),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.');

            const data = await response.json();
            const decoded = jwtDecode(data.token);
            login(data.token, {
                id: decoded.sub,
                name: decoded.name,
                role: decoded.authorities,
                loginType: decoded.loginType,
            });

            navigate('/');
        } catch (error) {
            alert(error.message);
        }
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
                                    setForm({ id: '', password: '' });
                                    setErrors({ id: '', password: '' });
                                }}
                            >
                                {type === 'user' ? '개인회원' : '사업자회원'}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-3">
                        {/* 입력 필드 */}
                        {['id', 'password'].map((field) => (
                            <div key={field} className="w-full mb-3">
                                <input
                                    type={field === 'password' ? 'password' : 'text'}
                                    name={field}
                                    placeholder={field === 'id' ? '아이디' : '비밀번호'}
                                    className="input h-14"
                                    value={form[field]}
                                    onChange={handleChange}
                                />
                                {errors[field] && <span className="label-text-alt text-red-500">{errors[field]}</span>}
                            </div>
                        ))}

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
