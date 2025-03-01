import Sidebar from '../sidebar.js';
import Chart from 'react-apexcharts';

function AdminDashboard() {
    const doughnutOptions = {
        labels: ['식당', '미용실', '숙소', '기타'],
        chart: {
            type: 'donut',
        },
        colors: ['#36A2EB', '#FF6384', '#FFCE56', '#FFA500'],
        dataLabels: {
            enabled: false, // 글자 없애기
        },
    };
    const doughnutSeries = [300, 200, 100, 150];

    const barOptions = {
        chart: {
            type: 'bar',
        },
        xaxis: {
            categories: ['서울', '부산', '대구', '인천', '광주', '대전'],
        },
        colors: ['#36A2EB'],
        dataLabels: {
            enabled: false, // 글자 없애기
        },
    };
    const barSeries = [
        {
            name: '착한가격업소 현황',
            data: [900, 700, 400, 600, 500, 300],
        },
    ];

    const lineOptions = {
        chart: {
            type: 'line',
        },
        xaxis: {
            categories: ['2009', '2010', '2011', '2012', '2013', '2014'],
        },
        stroke: {
            curve: 'smooth',
        },
        colors: ['#FF6384'],
        dataLabels: {
            enabled: false, // 글자 없애기
        },
    };
    const lineSeries = [
        {
            name: '물가 소비자동향지수',
            data: [120, 130, 140, 145, 150, 160],
        },
    ];

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
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">업종별 착한가격업소 현황</p>
                                <Chart options={doughnutOptions} series={doughnutSeries} type="donut" height={250} />
                            </div>
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">시도별 착한가격업소 현황</p>
                                <Chart options={barOptions} series={barSeries} type="bar" height={250} />
                            </div>
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">착한가격업소 현황</p>
                                <Chart options={barOptions} series={barSeries} type="bar" height={250} />
                            </div>
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">착한가격업소 등록량</p>
                                <Chart options={barOptions} series={barSeries} type="bar" height={250} />
                            </div>
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">이용자 수</p>
                                <Chart options={doughnutOptions} series={doughnutSeries} type="donut" height={250} />
                            </div>
                            <div className="border rounded-lg p-6 shadow-md">
                                <p className="font-semibold mb-2">물가 소비자동향지수(CSI)</p>
                                <Chart options={lineOptions} series={lineSeries} type="line" height={250} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
