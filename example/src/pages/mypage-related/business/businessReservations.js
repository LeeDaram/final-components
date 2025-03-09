import Sidebar from '../sidebar.js';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../pages/login-related/AuthContext';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';

function Useractivates() {
    // 유저 정보
    const { user, token } = useAuth();

    // 예약정보
    const [approvalResult, setApprovalResult] = useState({});

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 0,
        currentPage: 0,
    });

    // 토글 정보
    const [activate, setActivate] = useState([]);
    const [activeTab, setActiveTab] = useState('future');

    // 결과 상태값
    useEffect(() => {
        if (user && token) {
            fetchStoreActivatePeriod(activeTab, 0);
            fetchUserInfo();
        }
    }, [user, token, activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    // 예약정보 가져오기
    const fetchStoreActivatePeriod = async (period, page) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/mypage/store/activate/${user.id}/filter?period=${period}&page=${page}&size=10`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) throw new Error('예약 조회 실패');

            const storeText = await response.text();
            const activateData = storeText ? JSON.parse(storeText) : null;

            if (activateData) {
                setActivate(activateData.content);
                setPageInfo({
                    totalPages: activateData.page.totalPages,
                    currentPage: activateData.page.number,
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // 페이지 이동 처리
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pageInfo.totalPages) {
            setCurrentPage(page);
            fetchStoreActivatePeriod(activeTab, page - 1);
        }
    };

    const getPageNumbers = () => {
        const pageGroup = Math.floor((currentPage - 1) / 10);
        const startPage = pageGroup * 10 + 1;
        const endPage = Math.min(startPage + 9, pageInfo.totalPages);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/mypage/approval/result/${user.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
            }

            const userText = await response.text();
            const userData = userText ? JSON.parse(userText) : null;

            if (userData) {
                setApprovalResult(userData);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 예약정보 삭제
    const handleDeleteActivate = async (activateId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/mypage/activate/delete/${activateId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('예약 삭제 실패');
            setActivate((prev) => prev.filter((item) => item.activateId !== activateId));
        } catch (error) {
            console.error(error.message);
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
                        <h2 className="text-2xl font-bold mb-6">예약현황</h2>
                        {approvalResult?.finalApprovalStatus != 'APPROVED' ? (
                            <div className="alert alert-soft alert-error flex items-start gap-4">
                                <span className="icon-[tabler--info-circle] size-6"></span>
                                <div className="flex flex-col gap-1">
                                    <h5 className="text-lg font-semibold">
                                        앗, 착한가격업소 등록 신청을 하지 않았어요!
                                    </h5>
                                    <p className="mt-1.5 list-inside list-disc">
                                        현재 귀하의 업소는 착한가격업소에 등록되지 않았습니다. 먼저 등록 절차를 완료해
                                        주세요.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
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

                                <div className="mt-3 ">
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
                                                {activate.map((activate) => (
                                                    <tr key={activate.activateId} className="border-t">
                                                        <td className="text-center p-2">
                                                            {String(activate.activateId).padStart(4, '0')}
                                                        </td>
                                                        <td className="p-2 text-center">{activate?.activateDate}</td>
                                                        <td className="p-2 text-center">{activate?.name}</td>
                                                        <td className="p-2 text-center">{activate?.phoneNumber}</td>
                                                        <td
                                                            className="p-2 text-center"
                                                            style={{ minWidth: '120px', minHeight: '40px' }}
                                                        >
                                                            {/* 'past' 탭에서는 취소 버튼을 보이지 않게, 보이지 않을 때도 동일한 높이와 너비 유지 */}
                                                            {activeTab === 'future' ? (
                                                                <button
                                                                    className="border border-blue-600 text-blue-600 px-3 py-2 rounded hover:bg-blue-100"
                                                                    onClick={() =>
                                                                        handleDeleteActivate(activate.activateId)
                                                                    }
                                                                    style={{ height: '40px', width: '80px' }} // 너비를 80px로 제한
                                                                >
                                                                    취소
                                                                </button>
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    {/* 버튼과 동일한 크기와 스타일을 유지 */}
                                                                    <div className="w-full h-10" />
                                                                </div>
                                                            )}
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Useractivates;
