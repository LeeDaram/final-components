import Sidebar from '../sidebar.js';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

function ApplyStatus() {
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
                        <h2 className="text-2xl font-bold mb-6">등록신청결과조회</h2>
                        {/* 결과요약 */}

                        {/*  */}
                        <div className="flex items-center p-4 border border-green-400 bg-green-100 rounded-lg">
                            <FaCheckCircle className="text-green-600 text-2xl mr-2" />
                            <p className="text-green-800 text-lg">
                                <span className="font-bold">
                                    착한가격업소 신청이 <span className="text-green-600">승인</span>되었습니다.
                                </span>
                            </p>
                        </div>
                        <p className="text-base text-gray-600 mt-1 mb-6">
                            착한가격업소 지정증은 일주일 이내로 귀하의 업소에 배송될 예정입니다.
                        </p>

                        {/* 진행중 메시지 */}
                        <div className="flex items-center p-4 border border-yellow-400 bg-yellow-100 rounded-lg">
                            <FaExclamationTriangle className="text-yellow-600 text-2xl mr-2" />
                            <p className="text-yellow-800 text-lg">
                                <span className="font-bold">
                                    착한가격업소 신청이 <span className="text-yellow-600">진행중</span>입니다.
                                </span>
                            </p>
                        </div>
                        <p className="text-base text-gray-600 mt-1 mb-6">
                            관리자 최종 승인 후, 착한가격업소 등록이 완료됩니다.
                        </p>

                        {/* 반려 메시지 */}
                        <div className="flex items-center p-4 border border-red-400 bg-red-100 rounded-lg">
                            <FaTimesCircle className="text-red-600 text-2xl mr-2" />
                            <p className="text-red-800 text-lg">
                                <span className="font-bold">
                                    착한가격업소 신청이 <span className="text-red-600">반려</span>되었습니다.
                                </span>
                            </p>
                        </div>
                        <p className="text-base text-gray-600 mt-1 mb-6">
                            반려 사유에 대해 시정하신 후 재신청 가능합니다.
                        </p>

                        {/* 입력란 */}
                        <div className="rounded-lg border-gray-200 border p-10">
                            <div className="mb-6">
                                {/* 업소명 */}
                                <label className="text-gray-500">아이디</label>
                                <p className="block text-lg font-semibold mb-1">기찬장어</p>
                            </div>
                            {/* 등록신청일자 */}
                            <div className="mb-6">
                                <label className="text-gray-500">등록신청일자</label>
                                <p className="block text-lg font-semibold mb-1">2025-02-08</p>
                            </div>
                            {/* 심사결과 */}
                            <div className="mb-6">
                                <label className="text-gray-500">등록신청일자</label>
                                <div className="flex items-center mb-2">
                                    <FaCheckCircle className="text-green-500 text-lg mr-1" />
                                    <p className="text-lg font-semibold">메뉴 가격</p>
                                </div>
                                <div className="flex items-center">
                                    <FaTimesCircle className="text-red-500 text-lg mr-1" />
                                    <p className="text-lg font-semibold">매장 청결도</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ApplyStatus;
