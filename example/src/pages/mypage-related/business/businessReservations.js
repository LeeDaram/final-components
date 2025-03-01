import Sidebar from '../sidebar.js';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserReservations() {
    const [activeTab, setActiveTab] = useState('예약중');
    const navigate = useNavigate();

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
                        <h2 className="text-2xl font-bold mb-6">예약현황</h2>

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

                        <div className="mt-3 ">
                            {activeTab === '예약중' && (
                                <div className="overflow-hidden rounded-lg border border-gray-200">
                                    <table className="w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-4 text-center">예약번호</th>
                                                <th className="p-4 text-center">예약일자</th>
                                                <th className="p-4 text-center">이름</th>
                                                <th className="p-4 text-center">전화번호</th>
                                                <th className="p-4 text-center">취소</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(10)].map((_, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="text-center p-2">
                                                        {String(index + 1).padStart(4, '0')}
                                                    </td>
                                                    <td className="p-2 text-center">2025-04-06</td>
                                                    <td className="p-2 text-center">홍길동</td>
                                                    <td className="p-2 text-center">010-1234-5678</td>
                                                    <td className="p-2 text-center">
                                                        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
                                                            취소
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === '지난예약' && (
                                <div className="overflow-hidden rounded-lg border border-gray-200">
                                    <table className="w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-4 text-center">예약번호</th>
                                                <th className="p-4 text-center">예약일자</th>
                                                <th className="p-4 text-center">이름</th>
                                                <th className="p-4 text-center">전화번호</th>
                                                <th className="p-4 text-center">취소</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(10)].map((_, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="text-center p-2">
                                                        {String(index + 1).padStart(4, '0')}
                                                    </td>
                                                    <td className="p-2 text-center">2025-04-06</td>
                                                    <td className="p-2 text-center">홍길동</td>
                                                    <td className="p-2 text-center">010-1234-5678</td>
                                                    <td className="p-2 text-center">
                                                        <button className="border border-gray-300 text-gray-300 px-4 py-2 rounded ">
                                                            취소
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* 페이징 처리 */}
                        <Stack spacing={2} className="mt-8" alignItems="center">
                            <Pagination count={10} color="primary" />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReservations;
