import Sidebar from '../sidebar.js';

function BusinessEdit() {
    return (
        <div className="bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    {/* 좌측 - 사이드바 */}
                    <div className="w-1/4">
                        <Sidebar />
                    </div>

                    {/* 우측 - 내용 */}
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200 ">
                        <h2 className="text-2xl font-bold mb-6">업소 정보</h2>
                        <div className="rounded-lg border-gray-200 border p-10">
                            {/* 업소명(상호명) */}
                            <div className="mb-6">
                                <label className="text-gray-500">업소명(상호명)</label>
                                <p className="block text-lg font-semibold mb-1">기찬장어</p>
                            </div>

                            {/* 등록신청일자 */}
                            <div className="mb-6">
                                <label className="text-gray-500">사업자등록번호</label>
                                <p className="block text-lg font-semibold mb-1">123-45-67890</p>
                            </div>

                            {/* 주소(사업자소재지) */}
                            <div className="mb-6">
                                <label className="text-gray-500">주소(사업자소재지)</label>
                                <p className="block text-lg font-semibold mb-1">대전 용두동 희영빌딩</p>
                            </div>

                            {/* 대표메뉴 */}
                            <div className="mb-6">
                                <label className="text-gray-500">대표메뉴</label>
                                <p className="block text-lg font-semibold mb-1">돈까스</p>
                            </div>

                            {/* 가격 */}
                            <div className="mb-6">
                                <label className="text-gray-500">가격</label>
                                <p className="block text-lg font-semibold mb-1">6000원</p>
                            </div>

                            {/* 예약 가능 여부 */}
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <label className="text-gray-500" id="userReservation">
                                        예약 가능 여부
                                    </label>
                                    <p className="block text-lg font-semibold mb-1">
                                        사람들이 웹페이지를 통해 예약하고 방문할 수 있어요
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 relative">
                                    <label
                                        className="relative inline-flex items-center cursor-pointer"
                                        id="userReservation"
                                    >
                                        <input type="checkbox" className="sr-only peer" htmlFor="userReservation" />
                                        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-transform peer-checked:translate-x-4"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BusinessEdit;
