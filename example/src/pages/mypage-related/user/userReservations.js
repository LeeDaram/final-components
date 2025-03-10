import Sidebar from '../sidebar.js';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../pages/login-related/AuthContext';

function Useritems() {
    // 유저 정보 불러오기
    const { user, token } = useAuth();

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 0,
        currentPage: 0,
    });

    // 예약 데이터
    const [activate, setActivate] = useState([]);

    // 필터 토글 상태값
    const [activeTab, setActiveTab] = useState('future');

    // 예약 데이터 가져오기
    useEffect(() => {
        if (user) {
            fetchUserActivatePeriod(activeTab, 0);
        }
    }, [user, token, activeTab]);

    // 필터 클릭
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    // 예약 정보 불러오기
    const fetchUserActivatePeriod = async (period, page) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/mypage/activate/${user.id}/filter?period=${period}&page=${page}&size=9`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error('예약 조회 실패');
            const activateData = await response.json();

            setActivate(activateData.content);

            setPageInfo({
                totalPages: activateData.page.totalPages,
                currentPage: activateData.page.number,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    // 예약 삭제
    const handleDeleteActivate = async (activateId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mypage/activate/delete/${activateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('예약 삭제 실패');
            setActivate((prev) => prev.filter((item) => item.activateId !== activateId));
        } catch (error) {
            console.error(error.message);
        }
    };

    // 페이지 이동 처리
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pageInfo.totalPages) {
            setCurrentPage(page);
            fetchUserActivatePeriod(activeTab, page - 1);
        }
    };

    const getPageNumbers = () => {
        const pageGroup = Math.floor((currentPage - 1) / 10);
        const startPage = pageGroup * 10 + 1;
        const endPage = Math.min(startPage + 9, pageInfo.totalPages);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div className="bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="w-1/4">
                        <Sidebar />
                    </div>
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">예약 현황</h2>
                        <nav className="tabs tabs-bordered" aria-label="Tabs">
                            {['future', 'past'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab ${activeTab === tab ? 'tab-active font-extrabold' : ''}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab === 'future' ? '예약중' : '지난예약'}
                                </button>
                            ))}
                        </nav>
                        <div className="mt-3">
                            <div className="grid grid-cols-3 gap-4">
                                {activate.map((item) => (
                                    <div
                                        key={item.activateId}
                                        className="border rounded-lg p-6 hover:bg-blue-100 h-52 flex flex-col justify-between"
                                    >
                                        <div>
                                            <p className="font-semibold text-lg mb-2">{item.storeName}</p>
                                            <p className="text-gray-500 mb-4">{item.activateDate}</p>
                                        </div>
                                        {activeTab === 'future' && (
                                            <button
                                                className="bg-blue-600 text-white p-2 rounded-lg w-full"
                                                onClick={() => handleDeleteActivate(item.activateId)}
                                            >
                                                예약취소
                                            </button>
                                        )}
                                    </div>
                                ))}
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
        </div>
    );
}

export default Useritems;
