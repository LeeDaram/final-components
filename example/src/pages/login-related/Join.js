'use client';

import React from 'react';
import { Carousel } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import banner01 from '../../assets/images/join_banner/join_banner_01.png';
import banner02 from '../../assets/images/join_banner/join_banner_02.png';
import banner03 from '../../assets/images/join_banner/join_banner_03.png';

function Join() {
    const [activeTab, setActiveTab] = useState('user');
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'biz') {
            navigate('/business-form');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
    };

    return (
        <div className="p-4 bg-white sm:p-6 dark:bg-gray-800 ">
            <div className="mx-auto max-w-screen-xl p-12">
                <div className="md:flex md:justify-between">
                    {/* 좌측 - 회원가입 안내 */}
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
                                onClick={() => handleTabClick('user')}
                                aria-selected={activeTab === 'user'}
                            >
                                개인회원
                            </button>

                            <button
                                type="button"
                                className={`text-xl pb-3 tab w-full  ${
                                    activeTab === 'biz' ? 'tab-active font-extrabold' : ''
                                }`}
                                onClick={() => handleTabClick('biz')}
                                aria-selected={activeTab === 'biz'}
                            >
                                사업자회원
                            </button>
                        </nav>

                        <div className="mt-3">
                            {activeTab === 'user' && (
                                <div role="tabpanel">
                                    <div className="divider border-gray-300 text-gray-500">
                                        소셜 계정으로 간편 회원가입
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block h-14 bg-transparent text-gray-700 border-gray-500 hover:bg-transparent hover:text-gray-700 hover:border-gray-500 mb-5"
                                        onClick={handleGoogleLogin}
                                    >
                                        <img
                                            src="https://img.icons8.com/?size=512&id=17949&format=png"
                                            alt="Google"
                                            className="w-5 h-5 mr-2 "
                                        />
                                        구글 로그인
                                    </button>
                                    <Link to="/personal-form">
                                        <button className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700">
                                            이메일로 회원가입
                                        </button>
                                    </Link>

                                    <Link to="/login">
                                        <p className="mt-3 text-gray-500 text-xs">
                                            이미 회원이신가요? {'  '}
                                            <span href="#" className="hover:underline">
                                                로그인
                                            </span>
                                        </p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 우측 - 로그인 */}
                    <div className="w-1/2">
                        <div className="h-[500px] sm:h-[450px] xl:h-[500px] 2xl:h-[600px]">
                            {' '}
                            {/* 세로 길이 조정 */}
                            <Carousel leftControl=" " rightControl=" ">
                                <img src={banner01} alt="Banner 01" className="w-full h-full object-cover" />
                                <img src={banner02} alt="Banner 02" className="w-full h-full object-cover" />
                                <img src={banner03} alt="Banner 03" className="w-full h-full object-cover" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join;
