import Sidebar from '../sidebar.js';
import { useAuth } from '../../../pages/login-related/AuthContext';
import { useState, useEffect } from 'react';

function BusinessEdit() {
    // 업소 정보
    const [storeInfo, setStoreInfo] = useState({});
    const [reservation, setReservation] = useState(storeInfo?.isActivate);

    // 유저 정보
    const { user, token } = useAuth();

    // 결과 상태값
    useEffect(() => {
        if (user && token) {
            fetchUserInfo();
        }
    }, [user, token]);

    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/mypage/storeInfo/${user.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
            }

            const storeData = await response.json();
            setStoreInfo(storeData);
            setReservation(storeData.isActivate);
        } catch (err) {
            console.error(err);
        }
    };

    // 예약 가능 여부 수정
    const fetchUpdateStoreInfo = async (newIsActivate) => {
        try {
            const response = await fetch('http://localhost:8080/api/mypage/update/store/activation', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    isActivate: newIsActivate,
                }),
            });

            if (!response.ok) {
                throw new Error('업소정보 변경 중 오류가 발생했습니다.');
            }
        } catch (error) {
            throw error;
        }
    };

    const handleToggleActivate = async () => {
        const newIsActivate = reservation === 'T' ? 'F' : 'T';
        setReservation(newIsActivate);
        setStoreInfo({ ...storeInfo, isActivate: newIsActivate });

        try {
            await fetchUpdateStoreInfo(newIsActivate);
        } catch (error) {
            console.error('예약 가능 여부 변경 중 오류 발생', error);
            alert('예약 가능 여부 변경 중 오류가 발생했습니다.');
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
                        <h2 className="text-2xl font-bold mb-6">업소 정보</h2>
                        {!storeInfo || Object.keys(storeInfo).length === 0 ? (
                            <div class="alert alert-soft alert-error flex items-start gap-4">
                                <span class="icon-[tabler--info-circle] size-6"></span>
                                <div class="flex flex-col gap-1">
                                    <h5 class="text-lg font-semibold">앗, 착한가격업소 등록 신청을 하지 않았어요!</h5>
                                    <p class="mt-1.5 list-inside list-disc">
                                        현재 귀하의 업소는 착한가격업소에 등록되지 않았습니다. 먼저 등록 절차를 완료해
                                        주세요.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="rounded-lg border-gray-200 border p-10">
                                    {/* 업소명(상호명) */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">업소명(상호명)</label>
                                        <p className="block text-lg font-semibold mb-1">{storeInfo?.storeName || ''}</p>
                                    </div>

                                    {/* 사업자등록번호 */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">사업자등록번호</label>
                                        <p className="block text-lg font-semibold mb-1">
                                            {storeInfo?.businessRegNo
                                                ? String(storeInfo.businessRegNo).replace(
                                                      /(\d{3})(\d{2})(\d{5})/,
                                                      '$1-$2-$3'
                                                  )
                                                : ''}
                                        </p>
                                    </div>

                                    {/* 주소(사업자소재지) */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">주소(사업자소재지)</label>
                                        <p className="block text-lg font-semibold mb-1">{storeInfo?.address || ''}</p>
                                    </div>

                                    {/* 대표메뉴 */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">대표메뉴</label>
                                        <p className="block text-lg font-semibold mb-1">{storeInfo?.mainMenu || ''}</p>
                                    </div>

                                    {/* 가격 */}
                                    <div className="mb-6">
                                        <label className="text-gray-500">가격</label>
                                        <p className="block text-lg font-semibold mb-1">{storeInfo?.price || ''}원</p>
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
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    htmlFor="userReservation"
                                                    checked={storeInfo.isActivate === 'T'}
                                                    onChange={handleToggleActivate}
                                                />
                                                <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                                                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-transform peer-checked:translate-x-4"></div>
                                            </label>
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
export default BusinessEdit;
