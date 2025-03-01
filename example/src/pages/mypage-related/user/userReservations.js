import Sidebar from '../sidebar.js';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

function UserReservations() {
    const [activeTab, setActiveTab] = useState('예약중');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">예약 현황</h2>

                        <nav
                            className="tabs tabs-bordered"
                            aria-label="Tabs"
                            role="tablist"
                            aria-orientation="horizontal"
                        >
                            <button
                                type="button"
                                className={`tab ${activeTab === '예약중' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('예약중')}
                                role="tab"
                                aria-selected={activeTab === '예약중'}
                            >
                                예약중
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === '지난예약' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('지난예약')}
                                role="tab"
                                aria-selected={activeTab === '지난예약'}
                            >
                                지난예약
                            </button>
                        </nav>

                        <div className="mt-3">
                            {activeTab === '예약중' && (
                                <>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[...Array(9)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-6 hover:bg-blue-100 h-52 flex flex-col justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-lg mb-2">업소이름</p>
                                                    <p className="text-gray-500 mb-4">2025년 03월 12일</p>
                                                </div>
                                                <button className="bg-blue-600 text-white p-2 rounded-lg w-full">
                                                    예약취소
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {/* 페이징 처리 */}
                                    <Stack spacing={2} className="mt-8" alignItems="center">
                                        <Pagination count={10} color="primary" />
                                    </Stack>
                                </>
                            )}

                            {activeTab === '지난예약' && (
                                <>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[...Array(9)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-6 hover:bg-blue-100 h-52 flex flex-col justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-lg mb-2">업소이름</p>
                                                    <p className="text-gray-500 mb-4">2025년 03월 12일</p>
                                                </div>
                                                <button className="bg-gray-300 text-white p-2 rounded-lg w-full">
                                                    예약취소
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {/* 페이징 처리 */}
                                    <Stack spacing={2} className="mt-8" alignItems="center">
                                        <Pagination count={10} color="primary" />
                                    </Stack>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReservations;
