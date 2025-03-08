'use client';

import Sidebar from '../sidebar.js';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuth } from '../../../pages/login-related/AuthContext';
import { Button, Modal } from 'flowbite-react';
import { useCallback } from 'react';

function AdminApproval() {
    // 유저 정보
    const { user, token } = useAuth();

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 0,
        currentPage: 0,
    });

    // 페이지 이동 처리
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pageInfo.totalPages) {
            setCurrentPage(page);
            fetchApprovalList(activeTab, page - 1);
        }
    };

    const getPageNumbers = () => {
        const pageGroup = Math.floor((currentPage - 1) / 10);
        const startPage = pageGroup * 10 + 1;
        const endPage = Math.min(startPage + 9, pageInfo.totalPages);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    // 토글 정보
    const [activeTab, setActiveTab] = useState('ALL');
    const activeTabInfo = [
        {
            status: 'ALL',
            name: '전체',
        },
        {
            status: 'PENDING',
            name: '대기',
        },
        {
            status: 'APPROVED',
            name: '승인',
        },
        {
            status: 'REJECTED',
            name: '반려',
        },
        {
            status: 'AI_REJECTED',
            name: 'AI반려',
        },
    ];

    // 모달 상태값
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const openStoreModal = (storeId) => {
        fetchModalInfo(storeId).then(() => {
            setOpenModal(true);
        });
    };

    // 리스트 값
    const [approvalList, setApprovalList] = useState([]);

    // 토글 클릭 함수
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // 리스트 불러오기
    useEffect(() => {
        if (user && token) {
            fetchApprovalList(activeTab, 0);
        }
    }, [user, token, activeTab]);

    // 승인 상태값
    const getStatusBadge = useCallback((status) => {
        const statusMap = {
            APPROVED: 'bg-green-100 text-green-600',
            PENDING: 'bg-orange-100 text-orange-600',
            REJECTED: 'bg-red-100 text-red-600',
            AI_REJECTED: 'bg-pink-100 text-pink-600',
        };

        const statusNameMap = {
            APPROVED: '승인',
            PENDING: '대기',
            REJECTED: '반려',
            AI_REJECTED: 'AI반려',
        };

        return (
            <span
                className={`w-20 inline-block text-center px-3 py-2 rounded-lg ${statusMap[status]} text-sm font-bold`}
            >
                {statusNameMap[status]}
            </span>
        );
    }, []);

    // 유저 정보 가져오기
    const fetchApprovalList = async (status, page) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/mypage/approva/management/list?status=${status}&page=${page}&size=10`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('승인관리 리스트를 불러오는 데 실패했습니다.');
            }

            const listData = await response.json();
            setApprovalList(listData.content);
            setPageInfo({
                totalPages: listData.page.totalPages,
                currentPage: listData.page.number,
            });
        } catch (err) {
            console.error(err);
        }
    };

    // 상세모달 정보 가져오기
    const fetchModalInfo = async (storeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/mypage/approvaList/modal/${storeId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('상세모달 정보를 불러오는 데 실패했습니다.');
            }

            const modalData = await response.json();
            setModalData(modalData[0]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateApprovalStatus = async (storeId, finalApprovalStatus) => {
        try {
            console.log(storeId, finalApprovalStatus);
            const response = await fetch('http://localhost:8080/api/mypage/approvaList/modal/update-status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ storeId: storeId, finalApprovalStatus: finalApprovalStatus }),
            });

            if (!response.ok) {
                throw new Error('승인 상태 업데이트에 실패했습니다.');
            }

            fetchApprovalList(activeTab);
            setOpenModal(false);
        } catch (error) {
            console.error('Error:', error);
            alert('업데이트 실패: ' + error.message);
        }
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
                        <h2 className="text-2xl font-bold mb-6">착한가격업소 승인 관리</h2>

                        {/* 버튼 */}
                        <nav className="tabs tabs-bordered" aria-label="Tabs">
                            {activeTabInfo.map((tab) => (
                                <button
                                    key={tab.status}
                                    className={`tab ${activeTab === tab.status ? 'tab-active font-extrabold' : ''}`}
                                    onClick={() => handleTabClick(tab.status)}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>

                        {/* 모달 */}
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
                                                <td className="px-4 py-2">
                                                    {modalData?.businessRegNo
                                                        ? `${modalData.businessRegNo
                                                              .toString()
                                                              .slice(0, 3)}-${modalData.businessRegNo
                                                              .toString()
                                                              .slice(3, 5)}-${modalData.businessRegNo
                                                              .toString()
                                                              .slice(5)}`
                                                        : ''}
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">업소명(상호명)</th>
                                                <td className="px-4 py-2">{modalData?.storeName || ''}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">주소(사업자소재지)</th>
                                                <td className="px-4 py-2">{modalData?.address || ''}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">지역</th>
                                                <td className="px-4 py-2">{modalData?.sidoName || ''}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th className="px-4 py-2 bg-gray-100">대표메뉴</th>
                                                <td className="px-4 py-2">{modalData?.mainMenu || ''}</td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-2 bg-gray-100">가격</th>
                                                <td className="px-4 py-2">
                                                    {modalData?.price ? `${modalData.price}원` : ''}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h3 className="text-lg font-semibold text-blue-600 ">
                                        <span className="border-b-2 border-blue-600 pb-1">심사정보</span>
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            {modalData?.priceApproval === 'T' ? (
                                                <FaCheckCircle className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500 mr-1" />
                                            )}
                                            <p className="font-medium">메뉴 가격</p>
                                        </div>
                                        <div className="flex items-center">
                                            {modalData?.cleanlinessApproval === 'T' ? (
                                                <FaCheckCircle className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500 mr-1" />
                                            )}
                                            <p className="font-medium">매장 청결도</p>
                                        </div>
                                    </div>

                                    <div>
                                        <img
                                            className="border rounded-lg object-cover w-full max-w-xs h-64"
                                            src={modalData?.storeImage || ''}
                                            alt="심사정보 이미지"
                                        />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="flex justify-end space-x-2">
                                {modalData.finalApprovalStatus !== 'APPROVED' &&
                                modalData.finalApprovalStatus !== 'REJECTED' &&
                                modalData.finalApprovalStatus !== 'AI_REJECTED' ? (
                                    <>
                                        <Button
                                            className="bg-red-600 text-white"
                                            onClick={() => {
                                                updateApprovalStatus(modalData.storeId, 'REJECTED');
                                            }}
                                        >
                                            반려
                                        </Button>
                                        <Button
                                            className="bg-blue-600 text-white"
                                            onClick={() => {
                                                updateApprovalStatus(modalData.storeId, 'APPROVED');
                                            }}
                                        >
                                            승인
                                        </Button>
                                    </>
                                ) : null}
                            </Modal.Footer>
                        </Modal>

                        {/* 테이블 내용 */}
                        <div className="mt-3">
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="w-full table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-4 text-center w-1/12">번호</th>
                                            <th className="p-4 text-center w-1/6">업소명</th>
                                            <th className="p-4 text-center w-1/6">지역</th>
                                            <th className="p-4 text-center w-1/6">대표메뉴</th>
                                            <th className="p-4 text-center w-1/12">가격</th>
                                            <th className="p-4 text-center w-1/6">심사상태</th>
                                            <th className="p-4 text-center w-1/12">상세</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {approvalList.map((item, index) => (
                                            <tr key={item.businessRegNo} className="border-t">
                                                <td className="text-center p-2">{index + 1}</td>
                                                <td className="p-2 text-center">{item.storeName}</td>
                                                <td className="p-2 text-center">{item.sidoName}</td>
                                                <td className="p-2 text-center">{item.mainMenu}</td>
                                                <td className="p-2 text-center">{item.price.toLocaleString()}</td>
                                                <td className="p-4 border-b text-center">
                                                    {item.finalApprovalStatus &&
                                                        getStatusBadge(item.finalApprovalStatus)}
                                                </td>
                                                <td className="p-2 text-center">
                                                    <button
                                                        onClick={() => openStoreModal(item.storeId)}
                                                        className="btn btn-circle btn-text btn-sm"
                                                        aria-label="Action button"
                                                    >
                                                        <span className="icon-[tabler--dots-vertical] size-5"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 페이지네이션 */}
                        <div className="flex justify-center mt-10">
                            <nav className="flex items-center gap-x-1">
                                {/* First 버튼 */}
                                <button
                                    type="button"
                                    className="btn btn-soft"
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                >
                                    <FirstPageIcon />
                                </button>

                                {/* Previous 버튼 */}
                                <button
                                    type="button"
                                    className="btn btn-soft"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <NavigateBeforeIcon />
                                </button>

                                {/* 페이지 번호들 */}
                                <div className="flex items-center gap-x-1">
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            className={`btn btn-soft btn-square px-3 py-1 rounded-md text-sm transition-all duration-300 ${
                                                currentPage === page
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'hover:bg-blue-50 text-gray-700'
                                            }`}
                                            aria-current={currentPage === page ? 'page' : undefined}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                {/* Next 버튼 */}
                                <button
                                    type="button"
                                    className="btn btn-soft"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === pageInfo.totalPages}
                                >
                                    <NavigateNextIcon />
                                </button>

                                {/* Last 버튼 */}
                                <button
                                    type="button"
                                    className="btn btn-soft"
                                    onClick={() => handlePageChange(pageInfo.totalPages)}
                                    disabled={currentPage === pageInfo.totalPages}
                                >
                                    <LastPageIcon />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminApproval;
