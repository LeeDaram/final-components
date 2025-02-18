import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [activeTab, setActiveTab] = useState('user');

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
                                        />
                                        <span className="label ">
                                            <span className="label-text-alt text-red-500 hidden">
                                                아이디를 입력해주세요
                                            </span>
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="password"
                                            placeholder="비밀번호"
                                            className="input h-14 focus:border-blue-500"
                                        />
                                        <span className="label">
                                            <span className="label-text-alt text-red-500 hidden">
                                                비밀번호를 입력해주세요
                                            </span>
                                        </span>
                                    </div>
                                    <button className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700">
                                        로그인
                                    </button>

                                    <p className="mt-3 text-gray-500 text-xs">
                                        <a href="#" className="hover:underline">
                                            아이디 찾기
                                        </a>
                                        {' | '}
                                        <a href="#" className="hover:underline">
                                            비밀번호 찾기
                                        </a>
                                    </p>
                                    <div className="flex items-center my-4">
                                        <div className="flex-1 border-t border-gray-300"></div>
                                        <p className="text-gray-500 px-3 text-sm">소셜 계정으로 간편 회원가입</p>
                                        <div className="flex-1 border-t border-gray-300"></div>
                                    </div>

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
                                        />
                                        <span className="label">
                                            <span className="label-text-alt text-red-500 hidden">
                                                아이디를 입력해주세요
                                            </span>
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <input
                                            type="password"
                                            placeholder="비밀번호"
                                            className="input h-14 focus:border-blue-500"
                                        />
                                        <span className="label">
                                            <span className="label-text-alt text-red-500 hidden">
                                                비밀번호를 입력해주세요
                                            </span>
                                        </span>
                                    </div>
                                    <button className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700">
                                        로그인
                                    </button>

                                    <p className="mt-3 text-gray-500 text-xs">
                                        <a href="#" className="hover:underline">
                                            아이디 찾기
                                        </a>
                                        {' | '}
                                        <a href="#" className="hover:underline">
                                            비밀번호 찾기
                                        </a>
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
