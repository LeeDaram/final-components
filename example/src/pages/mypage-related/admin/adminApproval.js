'use client';

import Sidebar from '../sidebar.js';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

import { Button, Modal } from 'flowbite-react';

function AdminApproval() {
    const [activeTab, setActiveTab] = useState('전체');

    const [openModal, setOpenModal] = useState(false);

    const getStatusBadge = (status) => {
        const statusMap = {
            승인: 'bg-green-100 text-green-600',
            대기: 'bg-orange-100 text-orange-600',
            반려: 'bg-red-100 text-red-600',
            AI반려: 'bg-pink-100 text-pink-600',
        };
        return (
            <span
                className={`w-20 inline-block text-center px-3 py-2 rounded-lg ${statusMap[status]} text-sm font-bold`}
            >
                {status}
            </span>
        );
    };

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
                                className={`tab ${activeTab === '전체' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('전체')}
                                role="tab"
                                aria-selected={activeTab === '전체'}
                            >
                                전체
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === '승인대기' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('승인대기')}
                                role="tab"
                                aria-selected={activeTab === '승인대기'}
                            >
                                승인대기
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === '승인완료' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('승인완료')}
                                role="tab"
                                aria-selected={activeTab === '승인완료'}
                            >
                                승인완료
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === '승인반려' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('승인반려')}
                                role="tab"
                                aria-selected={activeTab === '승인반려'}
                            >
                                승인반려
                            </button>
                            <button
                                type="button"
                                className={`tab ${activeTab === 'AI반려' ? 'tab-active font-extrabold' : ''}`}
                                onClick={() => handleTabClick('AI반려')}
                                role="tab"
                                aria-selected={activeTab === 'AI반려'}
                            >
                                AI반려
                            </button>
                        </nav>

                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <Modal.Header>상세정보</Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-blue-600 ">
                                        <span className="border-b-2 border-blue-600 pb-1">기본정보</span>
                                    </h3>
                                    <table className="table-auto w-full text-sm text-left text-gray-500 border">
                                        <tbody>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">사업자등록번호</th>
                                                <td className="px-4 py-2">123-45-67890</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">업소명(상호명)</th>
                                                <td className="px-4 py-2">착한고기집</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">주소(사업자소재지)</th>
                                                <td className="px-4 py-2">서울 강남구 역삼동 123-45</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">지역</th>
                                                <td className="px-4 py-2">서울특별시</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">대표메뉴</th>
                                                <td className="px-4 py-2">삼겹살</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-2 bg-gray-100">가격</th>
                                                <td className="px-4 py-2">9,900원</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h3 className="text-lg font-semibold text-blue-600 ">
                                        <span className="border-b-2 border-blue-600 pb-1">심사정보</span>
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <FaCheckCircle className="text-green-500 mr-1" />
                                            <p className="font-medium">메뉴 가격</p>
                                        </div>
                                        <div className="flex items-center">
                                            <FaTimesCircle className="text-red-500 mr-1" />
                                            <p className="font-medium">매장 청결도</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            failure="border rounded-lg object-cover w-full max-w-xs h-64"
                                            src="https://mblogthumb-phinf.pstatic.net/MjAyMDA4MDNfMjA2/MDAxNTk2NDQwMzIzMzk5.eXV8YjquLjWvjhrrpjB3LwGmn0AUksaFBlPYB1nEhd4g.W1c4zP35cqW13qVJtXukRvL9XIjz8U5gvURApcX7Otwg.JPEG.seouljubang7618/KakaoTalk_20200626_142110049_09.jpg?type=w800"
                                            alt="심사정보 이미지"
                                        />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="flex justify-end space-x-2">
                                <Button className="bg-red-600 text-white" onClick={() => setOpenModal(false)}>
                                    반려
                                </Button>
                                <Button className="bg-blue-600 text-white" onClick={() => setOpenModal(false)}>
                                    승인
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="mt-3 ">
                            {activeTab === '전체' && (
                                <>
                                    <div className="overflow-hidden rounded-lg border border-gray-200">
                                        <table className="w-full">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="p-4 text-center">번호</th>
                                                    <th className="p-4 text-center">사업자등록번호</th>
                                                    <th className="p-4 text-center">업소명</th>
                                                    <th className="p-4 text-center">지역</th>
                                                    <th className="p-4 text-center">대표메뉴</th>
                                                    <th className="p-4 text-center">가격</th>
                                                    <th className="p-4 text-center">심사상태</th>
                                                    <th className="p-4 text-center">상세</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[...Array(10)].map((_, index) => {
                                                    const statuses = ['승인', '대기', '반려', 'AI반려'];
                                                    const status = statuses[index % statuses.length];
                                                    return (
                                                        <tr key={index} className="border-t">
                                                            <td className="text-center p-2">
                                                                {String(index + 1).padStart(4, '0')}
                                                            </td>
                                                            <td className="p-2 text-center">123-45-67890</td>
                                                            <td className="p-2 text-center">착한고기집</td>
                                                            <td className="p-2 text-center">서울특별시</td>
                                                            <td className="p-2 text-center">삼겹살</td>
                                                            <td className="p-2 text-center">9,900</td>
                                                            <td className="p-4 border-b text-center">
                                                                {getStatusBadge(status)}
                                                            </td>
                                                            <td className="p-2 text-center">
                                                                <button
                                                                    onClick={() => setOpenModal(true)}
                                                                    class="btn btn-circle btn-text btn-sm"
                                                                    aria-label="Action button"
                                                                >
                                                                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* 페이징 처리 */}
                                    <Stack spacing={2} className="mt-8" alignItems="center">
                                        <Pagination count={10} color="primary" />
                                    </Stack>
                                </>
                            )}

                            {activeTab === '승인대기' && <p>승인대기</p>}
                            {activeTab === '승인완료' && <p>승인완료</p>}
                            {activeTab === '승인반려' && <p>승인반려</p>}
                            {activeTab === 'AI반려' && <p>AI반려</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminApproval;
