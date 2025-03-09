import { useEffect, useState } from 'react';
import Sidebar from '../sidebar.js';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { useAuth } from '../../../pages/login-related/AuthContext';

function ApplyStatus() {
    // 유저 정보
    const { user, token } = useAuth();

    // 결과 상태값
    const [approvalResult, setApprovalResult] = useState({});
    useEffect(() => {
        if (user && token) {
            fetchUserInfo();
        }
    }, [user, token]);

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

            const userData = await response.json();

            setApprovalResult(userData);
        } catch (err) {
            console.error(err);
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
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200 ">
                        <h2 className="text-2xl font-bold mb-6">등록신청 결과 조회</h2>
                        {/* 결과요약 */}

                        {!approvalResult || Object.keys(approvalResult).length === 0 ? (
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
                                {approvalResult?.finalApprovalStatus == 'APPROVED' ? (
                                    <>
                                        <div className="flex items-center p-4 border border-green-400 bg-green-100 rounded-lg">
                                            <FaCheckCircle className="text-green-600 text-2xl mr-2" />
                                            <p className="text-green-800 text-lg">
                                                <span className="font-bold">
                                                    착한가격업소 신청이 <span className="text-green-600">승인</span>
                                                    되었습니다.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-base text-gray-600 mt-1 mb-6">
                                            착한가격업소 지정증은 일주일 이내로 귀하의 업소에 배송될 예정입니다.
                                        </p>
                                    </>
                                ) : approvalResult?.finalApprovalStatus == 'PENDING' ? (
                                    <>
                                        <div className="flex items-center p-4 border border-yellow-400 bg-yellow-100 rounded-lg">
                                            <FaExclamationTriangle className="text-yellow-600 text-2xl mr-2" />
                                            <p className="text-yellow-800 text-lg">
                                                <span className="font-bold">
                                                    착한가격업소 신청이 <span className="text-yellow-600">진행중</span>
                                                    입니다.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-base text-gray-600 mt-1 mb-6">
                                            관리자 최종 승인 후, 착한가격업소 등록이 완료됩니다.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center p-4 border border-red-400 bg-red-100 rounded-lg">
                                            <FaTimesCircle className="text-red-600 text-2xl mr-2" />
                                            <p className="text-red-800 text-lg">
                                                <span className="font-bold">
                                                    착한가격업소 신청이 <span className="text-red-600">반려</span>
                                                    되었습니다.
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-base text-gray-600 mt-1 mb-6">
                                            반려 사유에 대해 시정하신 후 재신청 가능합니다.
                                        </p>
                                    </>
                                )}

                                {/* 입력란 */}
                                <div className="rounded-lg border-gray-200 border p-10">
                                    <div className="mb-6">
                                        {/* 업소명 */}
                                        <label className="text-gray-500">업소명</label>
                                        <p className="block text-lg font-semibold mb-1">
                                            {approvalResult?.storeName || ''}
                                        </p>
                                    </div>
                                    {/* 등록신청일자 */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">등록 신청 일자</label>
                                        <p className="block text-lg font-semibold mb-1">
                                            {approvalResult?.updatedAt || ''}
                                        </p>
                                    </div>
                                    {/* 심사결과 */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">AI 심사 결과</label>
                                        <div className="flex items-center mb-2">
                                            {approvalResult?.priceApproval ? (
                                                <FaCheckCircle className="text-green-500 text-lg mr-1" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500 text-lg mr-1" />
                                            )}
                                            <p className="text-lg font-semibold">메뉴 가격</p>
                                        </div>
                                        <div className="flex items-center">
                                            {approvalResult?.cleanlinessApproval ? (
                                                <FaCheckCircle className="text-green-500 text-lg mr-1" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500 text-lg mr-1" />
                                            )}
                                            <p className="text-lg font-semibold">매장 청결도</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ApplyStatus;
