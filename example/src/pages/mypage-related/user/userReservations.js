import Sidebar from '../sidebar.js';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../pages/login-related/AuthContext';

function Useritems() {
    const { user } = useAuth();
    const [userId, setUserId] = useState('');
    const [activate, setActivate] = useState([]);
    const [activeTab, setActiveTab] = useState('future');

    useEffect(() => {
        if (user?.id) {
            setUserId(user.id);
        }
    }, [user]);

    useEffect(() => {
        if (userId) {
            fetchUserActivatePeriod(activeTab);
        }
    }, [userId, activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const fetchUserActivatePeriod = async (period) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        try {
            const response = await fetch(
                `http://localhost:8080/api/mypage/activate/${userId}/filter?period=${period}`,
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
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
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
                            <Stack spacing={2} className="mt-8" alignItems="center">
                                <Pagination count={10} color="primary" />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Useritems;
