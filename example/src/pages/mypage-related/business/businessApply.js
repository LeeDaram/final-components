import Sidebar from '../sidebar.js';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

function BusinessApply() {
    // 파입업로드 툴팁 상태
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // 파일 업로드
    const [file, setFile] = useState(null); // 선택된 파일 상태
    const [preview, setPreview] = useState(null); // 파일 미리보기 상태
    const [isUploaded, setIsUploaded] = useState(false); // 파일 업로드 상태

    // 툴팁 상태
    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };

    const closeTooltip = () => {
        setTooltipVisible(false);
    };

    // 파일이 선택되었을 때
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // 이미지 미리보기
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);

            // 파일 자동 업로드
            handleUpload(selectedFile);
        }
    };

    // 자동 업로드
    const handleUpload = (selectedFile) => {
        console.log('자동 업로드 중...', selectedFile);
        // 실제 업로드 API 호출
        // 업로드 완료 후 상태 변경
        setIsUploaded(true);
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
                        <h2 className="text-2xl font-bold mb-6">착한가격업소 등록 신청</h2>

                        {/* 이미지 업로드 */}
                        <div className="mb-3">
                            <div className="mb-3 flex justify-between items-center">
                                {/* 레이블 */}
                                <label className="label label-text text-base font-semibold" htmlFor="storeName">
                                    매장사진
                                </label>

                                {/* 툴팁 버튼 */}
                                <div className="relative">
                                    <button
                                        className="p-2 flex justify-between"
                                        aria-label="Tooltip Button"
                                        onClick={toggleTooltip}
                                    >
                                        <FiAlertCircle />

                                        <span className="text-xs underline">어떤 매장사진을 첨부해야 하나요?</span>
                                    </button>

                                    {/* 툴팁 내용 */}
                                    {tooltipVisible && (
                                        <div
                                            className="absolute right-52 top-56 transform -translate-y-1/2 translate-x-full w-80 bg-white border border-gray-300 rounded-lg p-4 text-left shadow-lg"
                                            role="tooltip"
                                        >
                                            <span className="text-gray-800 text-lg font-semibold">
                                                📸 이런 매장 사진을 첨부하세요
                                            </span>
                                            <p className="text-gray-600 text-sm font-semibold pt-3">내부 사진</p>
                                            <p className="text-gray-600 text-sm ">
                                                매장의 전체적인 내부 모습이 잘 보이도록 촬영해주세요. 좌석 배치,
                                                인테리어, 청결 상태 등을 확인할 수 있도록 밝고 선명한 사진을 권장합니다.
                                            </p>
                                            <p className="text-gray-600 text-sm font-semibold pt-3">외부 사진</p>
                                            <p className="text-gray-600 text-sm ">
                                                업소의 간판과 입구가 명확하게 보이도록 촬영해주세요. 주변 환경과 위치를
                                                쉽게 파악할 수 있도록 정면에서 촬영하는 것이 좋습니다.
                                            </p>
                                            <p className="text-gray-600 text-sm font-semibold pt-3">파일 형식</p>
                                            <p className="text-gray-600 text-sm ">JPG, PNG 지원 (최대 5MB)</p>
                                            <div className="flex justify-end gap-2 pt-4">
                                                <button
                                                    className="btn bg-accent text-white shadow-none"
                                                    onClick={closeTooltip}
                                                >
                                                    확인
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 파일 업로드 입력란이 업로드 후 사라짐 */}
                            {!isUploaded && (
                                <div className="border-base-content/20 bg-base-100 rounded-box flex cursor-pointer justify-center border border-dashed p-12">
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".csv,image/*"
                                    />
                                    <label htmlFor="fileUpload" className="w-full cursor-pointer">
                                        <div className="text-center">
                                            <span className="bg-base-200/80 text-base-content inline-flex size-16 items-center justify-center rounded-full bg-accent-content">
                                                <span className="icon-[tabler--upload] size-6 shrink-0"></span>
                                            </span>
                                            <div className="mt-4 flex flex-wrap justify-center">
                                                <span className="link link-animated link-primary font-semibold text-accent">
                                                    매장사진
                                                </span>
                                                <span className="text-base-content pe-1 text-base font-medium">
                                                    을 첨부해주세요
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            )}

                            {/* 업로드 완료 후 새로운 안내 문구 표시 */}
                            {isUploaded && (
                                <div
                                    className="alert alert-success flex items-center gap-4 bg-accent-content text-accent"
                                    role="alert"
                                >
                                    <span className="icon-[tabler--circle-check] size-6"></span>
                                    <p>
                                        <span className="text-lg font-semibold">파일 업로드 성공 : </span> AI가 이미지를
                                        인식할거예요.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 시도 */}
                        <div className="relative mb-3">
                            <label className="label label-text text-base font-semibold " htmlFor="userName">
                                시도
                            </label>
                            <input
                                type="text"
                                placeholder="실명"
                                className="input h-12 border-gray-300  "
                                id="userName"
                            />
                            <span className="label">
                                <span className="text-red-500 hidden">오류메시지입니다.</span>
                            </span>
                        </div>

                        {/* 시군구 */}
                        <div className="relative mb-3">
                            <label className="label label-text text-base font-semibold " htmlFor="userName">
                                시군구
                            </label>
                            <input
                                type="text"
                                placeholder="실명"
                                className="input h-12 border-gray-300  "
                                id="userName"
                            />
                            <span className="label">
                                <span className="text-red-500 hidden">오류메시지입니다.</span>
                            </span>
                        </div>

                        {/* 업종 & 대표메뉴 */}
                        <div className="flex gap-5 mb-5">
                            {/* 업종 */}
                            <div className="flex flex-col">
                                <label className="label label-text text-base font-semibold " htmlFor="userName">
                                    업종
                                </label>
                                <select className="border input border-gray-300 rounded-md h-12 w-40 px-3">
                                    <option>전체</option>
                                    <option>식당</option>
                                    <option>미용실</option>
                                    <option>숙소</option>
                                    <option>기타</option>
                                </select>
                            </div>
                            {/* 대표메뉴 */}
                            <div className="flex flex-col flex-1">
                                <label className="label label-text text-base font-semibold " htmlFor="userName">
                                    대표메뉴
                                </label>
                                <input
                                    type="text"
                                    placeholder="실명"
                                    className="input h-12 border-gray-300"
                                    id="userName"
                                />
                                <span className="label">
                                    <span className="text-red-500 hidden">오류메시지입니다.</span>
                                </span>
                            </div>
                        </div>

                        {/* 가격 */}
                        <div className="relative mb-3">
                            <label className="label label-text text-base font-semibold " htmlFor="userName">
                                가격
                            </label>
                            <input
                                type="text"
                                placeholder="실명"
                                className="input h-12 border-gray-300  "
                                id="userName"
                            />
                            <span className="label">
                                <span className="text-red-500 hidden">오류메시지입니다.</span>
                            </span>
                            <div className="border border-blue-400 bg-blue-100 text-blue-600 p-3 rounded mb-2">
                                서울 지역 삼겹살 평균 가격 20,083원보다 35% 저렴해요 😊
                            </div>
                            <div className="border border-red-400 bg-red-100 text-red-600 p-3 rounded">
                                서울 지역 삼겹살 평균 가격 20,083원보다 35% 비싸요 🥺
                            </div>
                        </div>

                        {/* 전화번호 */}
                        <div className="relative mb-3">
                            <label className="label label-text text-base font-semibold " htmlFor="userName">
                                전화번호
                            </label>
                            <input
                                type="text"
                                placeholder="실명"
                                className="input h-12 border-gray-300  "
                                id="userName"
                            />
                            <span className="label">
                                <span className="text-red-500 hidden">오류메시지입니다.</span>
                            </span>
                        </div>

                        {/* 예약 가능 여부 */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <label className="label label-text text-base font-semibold " htmlFor="userName">
                                    예약가능여부
                                </label>
                                <p className="text-sm text-gray-500 pl-1">
                                    사람들이 웹페이지를 통해 예약하고 방문할 수 있어요
                                </p>
                            </div>
                            <div className="flex items-center gap-2 relative">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-transform peer-checked:translate-x-4"></div>
                                </label>
                            </div>
                        </div>

                        {/* 편의시설 */}
                        <div className="relative mb-3">
                            <label className="label label-text text-base font-semibold " htmlFor="userName">
                                편의시설
                            </label>

                            <div className="flex gap-3 flex-wrap">
                                <div class="flex items-center gap-1">
                                    <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
                                    <label class="label label-text text-base" for="defaultCheckbox1">
                                        주차
                                    </label>
                                </div>
                                <div class="flex items-center gap-1">
                                    <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
                                    <label class="label label-text text-base" for="defaultCheckbox1">
                                        포장
                                    </label>
                                </div>
                                <div class="flex items-center gap-1">
                                    <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
                                    <label class="label label-text text-base" for="defaultCheckbox1">
                                        배달
                                    </label>
                                </div>
                                <div class="flex items-center gap-1">
                                    <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
                                    <label class="label label-text text-base" for="defaultCheckbox1">
                                        와이파이
                                    </label>
                                </div>
                                <div class="flex items-center gap-1">
                                    <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
                                    <label class="label label-text text-base" for="defaultCheckbox1">
                                        반려동물
                                    </label>
                                </div>
                                <div class="flex items-center gap-1">
                                    <input type="checkbox" class="checkbox" id="defaultCheckbox1" />
                                    <label class="label label-text text-base" for="defaultCheckbox1">
                                        유아시설
                                    </label>
                                </div>
                            </div>
                            <span className="label">
                                <span className="text-red-500 hidden">오류메시지입니다.</span>
                            </span>
                        </div>

                        {/* 등록신청 */}
                        <button className="w-full h-14 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition">
                            등록 신청
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BusinessApply;
