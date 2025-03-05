import Sidebar from '../sidebar.js';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../pages/login-related/AuthContext';

function Useractivates() {
    // 유저 정보
    const { user, token } = useAuth();
    const [userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');

    // 토글 정보
    const [activate, setActivate] = useState([]);
    const [activeTab, setActiveTab] = useState('future');

    useEffect(() => {
        if (user?.id) {
            setUserId(user?.id || '');
        }
        if (token) {
            setUserToken(token || '');
        }
    }, [user, token]);

    // 결과 상태값
    useEffect(() => {
        if (userId && token) {
            fetchStoreActivatePeriod(activeTab);
        }
    }, [userId, token, activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const fetchStoreActivatePeriod = async (period) => {
        const headers = {
            Authorization: `Bearer ${userToken}`,
        };

        try {
            const response = await fetch(
                `http://localhost:8080/api/mypage/store/activate/${userId}/filter?period=${period}`,
                { headers }
            );
            if (!response.ok) throw new Error('예약 조회 실패');
            const activateData = await response.json();
            setActivate(activateData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDeleteActivate = async (activateId) => {
        const headers = {
            Authorization: `Bearer ${userToken}`,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/mypage/activate/delete/${activateId}`, {
                method: 'DELETE',
                headers,
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
                                                            onClick={() => handleDeleteActivate(activate.activateId)}
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

export default Useractivates;
