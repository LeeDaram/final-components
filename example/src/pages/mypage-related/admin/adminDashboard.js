import Sidebar from '../sidebar.js';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../pages/login-related/AuthContext';

// 원 그래프 함수
const Circle = ({ label, count, color }) => {
    const minSize = 100; // 최소 크기 100px
    const maxSize = 300; // 최대 크기 300px
    const scaleFactor = 0.03; // 크기 조정 비율

    const size = Math.min(maxSize, Math.max(minSize, count * scaleFactor));

    return (
        <div
            className={`flex flex-col justify-center items-center rounded-full text-white font-bold`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
            }}
        >
            <div className="text-sm">{label}</div>
            <div className="text-xl">{count.toLocaleString()}명</div>
        </div>
    );
};

function AdminDashboard() {
    // 토큰
    const { token } = useAuth();
    const [userToken, setUserToken] = useState('');

    // 토큰 불러오기
    useEffect(() => {
        if (token) {
            setUserToken(token || '');
        }
    }, [token]);

    // 표 상태값
    const [IndustryStatus, setIndustryStatus] = useState({ labels: [], series: [] });
    const [sidoStatus, setSidoStatus] = useState({ labels: [], series: [] });
    const [yearStatus, setYearStatus] = useState({ labels: [], series: [] });
    const [monthStatus, setMonthStatus] = useState({ labels: [], series: [] });
    const [userStatus, setUserStatus] = useState({ labels: [], series: [] });

    // 표 렌더링
    useEffect(() => {
        if (userToken) {
            fetchIndustryStatus();
            fetchSidoStatus();
            fetchYearStatus();
            fetchMonthStatus();
            fetchUserStatus();
        }
    }, [userToken]);

    // 업종별 착한가격업소 현황 API 호출
    const fetchIndustryStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dashboard/industry-count', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('업종별 착한가격업소 현황을 불러오는 데 실패했습니다.');
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const labels = data.map((item) => item.industryName);
                const series = data.map((item) => item.industryCount);
                setIndustryStatus({ labels, series });
            } else {
                setIndustryStatus({ labels: [], series: [] });
                console.warn('API 응답 데이터가 비어있습니다.');
            }
        } catch (err) {
            console.error(err.message);
            setIndustryStatus({ labels: [], series: [] });
        }
    };

    const industryDoughnutOptions = {
        labels: IndustryStatus?.labels || [],
        chart: {
            type: 'donut',
        },
        colors: [
            '#36A2EB',
            '#FF6384',
            '#FFCE56',
            '#FFA500',
            '#8E44AD',
            '#2ECC71',
            '#F39C12',
            '#16A085',
            '#E74C3C',
            '#3498DB',
            '#C0392B',
        ],
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: 'bottom',
        },
    };

    // 시도별 착한가격업소 현황 API 호출
    const fetchSidoStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dashboard/sido-count', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('시도별 착한가격업소 현황을 불러오는 데 실패했습니다.');
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const labels = data.map((item) => item.sidoName);
                const series = data.map((item) => item.approvalCount);
                setSidoStatus({ labels, series });
            } else {
                setSidoStatus({ labels: [], series: [] });
                console.warn('API 응답 데이터가 비어있습니다.');
            }
        } catch (err) {
            console.error(err.message);
            setSidoStatus({ labels: [], series: [] });
        }
    };

    const sidoBarOptions = {
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: sidoStatus.labels,
        },
        colors: ['#36A2EB'],
        dataLabels: {
            enabled: false,
        },
    };

    const sidoBarSeries = [
        {
            name: '착한가격업소 현황',
            data: sidoStatus.series,
        },
    ];

    // 년도별 착한가격업소 현황 API 호출
    const fetchYearStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dashboard/year-count', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('년도별 착한가격업소 현황을 불러오는 데 실패했습니다.');
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                // 데이터에서 최신 10개만 필터링
                const filteredData = data.slice(-10); // 최신 10개 데이터

                const labels = filteredData.map((item) => item.year);
                const series = filteredData.map((item) => item.count);
                setYearStatus({ labels, series });
            } else {
                setYearStatus({ labels: [], series: [] });
                console.warn('API 응답 데이터가 비어있습니다.');
            }
        } catch (err) {
            console.error(err.message);
            setYearStatus({ labels: [], series: [] });
        }
    };

    const yearBarOptions = {
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: yearStatus.labels,
        },
        colors: ['#36A2EB'],
        dataLabels: {
            enabled: false,
        },
    };

    const yearBarSeries = [
        {
            name: '착한가격업소 현황',
            data: yearStatus.series,
        },
    ];

    // 월별 착한가격업소 API 호출
    const fetchMonthStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dashboard/month-count', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('년도별 착한가격업소 현황을 불러오는 데 실패했습니다.');
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                // 데이터에서 최신 10개만 필터링
                const filteredData = data.slice(-8);

                const labels = filteredData.map((item) => item.yearMonth);
                const series = filteredData.map((item) => item.count);
                setMonthStatus({ labels, series });
            } else {
                setMonthStatus({ labels: [], series: [] });
                console.warn('API 응답 데이터가 비어있습니다.');
            }
        } catch (err) {
            console.error(err.message);
            setMonthStatus({ labels: [], series: [] });
        }
    };

    const monthBarOptions = {
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: monthStatus.labels,
        },
        colors: ['#36A2EB'],
        dataLabels: {
            enabled: false,
        },
    };

    const monthBarSeries = [
        {
            name: '지역별 착한가격업소 등록량',
            data: monthStatus.series,
        },
    ];

    // 권한별 착한가격업소 API 호출
    const fetchUserStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dashboard/user-count', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('업종별 착한가격업소 현황을 불러오는 데 실패했습니다.');
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const roleUser = data.find((item) => item.role === 'ROLE_USER')?.roleCount || 0;
                const roleBiz = data.find((item) => item.role === 'ROLE_BIZ')?.roleCount || 0;

                const labels = ['개인회원', '사업자회원'];
                const series = [roleUser, roleBiz];

                setUserStatus({ labels, series });
            } else {
                setUserStatus({ labels: [], series: [] });
                console.warn('API 응답 데이터가 비어있습니다.');
            }
        } catch (err) {
            console.error(err.message);
            setUserStatus({ labels: [], series: [] });
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
                        <h2 className="text-2xl font-bold mb-6">통계 및 업소 대시보드</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {/* 업종별 착한 가격 업소 */}
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">업종별 착한가격업소 현황</p>
                                <Chart
                                    options={industryDoughnutOptions}
                                    series={IndustryStatus.series}
                                    type="donut"
                                    height={280}
                                />
                            </div>

                            {/* 이용자수 */}
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">이용자 수</p>
                                <div className="flex justify-center items-center space-x-8">
                                    {userStatus.labels.map((label, index) => (
                                        <Circle
                                            key={label}
                                            label={label}
                                            count={userStatus.series[index]}
                                            color={label === '개인회원' ? 'gray' : 'blue'}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* 년도별 착한 가격 업소 */}
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">착한가격업소 현황</p>
                                <Chart options={yearBarOptions} series={yearBarSeries} type="bar" height={280} />
                            </div>

                            {/* 월별 착한 가격 업소 */}
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">착한가격업소 등록량</p>
                                <Chart options={monthBarOptions} series={monthBarSeries} type="bar" height={280} />
                            </div>

                            {/* 시도별 착한 가격 업소 */}
                            <div className="border rounded-lg p-6 shadow-md col-span-2">
                                <p className="font-semibold mb-2">시도별 착한가격업소 현황</p>
                                <Chart options={sidoBarOptions} series={sidoBarSeries} type="bar" height={280} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
