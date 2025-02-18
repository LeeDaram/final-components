import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

function BusinessForm() {
    // 툴팁
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };
    const closeTooltip = () => {
        setTooltipVisible(false);
    };

    // 파일 업로드
    const [file, setFile] = useState(null); // 선택된 파일 상태
    const [preview, setPreview] = useState(null); // 파일 미리보기 상태
    const [isUploaded, setIsUploaded] = useState(false); // 파일 업로드 상태

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

            // 파일 자동 업로드 (실제 API를 호출할 수 있습니다)
            handleUpload(selectedFile);
        }
    };

    // 자동 업로드 (여기서는 파일을 바로 처리하는 로직을 작성합니다)
    const handleUpload = (selectedFile) => {
        console.log('자동 업로드 중...', selectedFile);
        // 실제 업로드 API 호출을 여기에 넣을 수 있습니다.
        // 예시: axios.post('/upload', formData);

        // 업로드 완료 후 상태 변경
        setIsUploaded(true);
    };

    // 약관 열고닫기 상태값
    const [openItem, setOpenItem] = useState('');
    const toggleItem = (itemId) => {
        setOpenItem(openItem === itemId ? null : itemId); // 클릭하면 열리거나 닫힘
    };

    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        terms1: false,
        terms2: false,
    });

    // 전체동의 체크박스 변경
    const handleAllChange = (e) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setCheckedItems({
            terms1: checked,
            terms2: checked,
        });
    };

    // 개별 약관 체크박스 변경
    const handleItemChange = (e, key) => {
        const checked = e.target.checked;
        setCheckedItems((prev) => {
            const updatedItems = {
                ...prev,
                [key]: checked,
            };

            // 전체 선택 상태 업데이트
            const allSelected = Object.values(updatedItems).every((item) => item);
            setAllChecked(allSelected);

            return updatedItems;
        });
    };

    return (
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-24">
            <div className="flex mx-auto max-w-xl flex-col">
                {/* 폼 제목 */}
                <p className="text-2xl font-bold mt-24 mb-8 text-center">착한업소 솔루션 기업회원 가입</p>

                {/* 기업인증 */}
                <div className="mb-3">
                    <div className="mb-3 flex justify-between items-center">
                        {/* 레이블 */}
                        <label className="label label-text text-base font-semibold" htmlFor="storeName">
                            기업인증
                        </label>

                        {/* 툴팁 버튼 */}
                        <div className="relative">
                            <button
                                className="p-2 flex justify-between"
                                aria-label="Tooltip Button"
                                onClick={toggleTooltip}
                            >
                                <FiAlertCircle />

                                <span className="text-xs underline">기업 정보가 올바르게 인식되지 않았어요</span>
                            </button>

                            {/* 툴팁 내용 */}
                            {tooltipVisible && (
                                <div
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full w-80 bg-white border border-gray-300 rounded-lg p-4 text-left shadow-lg"
                                    role="tooltip"
                                >
                                    <span className="text-gray-800 text-sm font-semibold">
                                        기업 정보가 올바르게 인식되지 않았어요
                                    </span>
                                    <p className="text-gray-600 text-sm pt-2">
                                        올바른 사업자 등록증 파일인지 확인 후 다시 업로드해 주세요. 초기화 버튼을
                                        클릭하면 기업 인증을 다시 진행할 수 있습니다.
                                    </p>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <button className="btn btn-outline btn-accent" onClick={closeTooltip}>
                                            취소
                                        </button>
                                        <button className="btn bg-accent text-white shadow-none">초기화</button>
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
                                            사업자등록증
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
                            class="alert alert-success flex items-center gap-4 bg-accent-content text-accent"
                            role="alert"
                        >
                            <span class="icon-[tabler--circle-check] size-6"></span>
                            <p>
                                <span class="text-lg font-semibold">파일 업로드 성공 : </span> AI가 인식한 정보가 하단에
                                보여질거예요
                            </p>
                        </div>
                    )}
                </div>

                {/* 사업자등록번호 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" for="storeName">
                        사업자등록번호
                    </label>
                    <input
                        type="text"
                        placeholder="인식된 사업자등로번호가 들어갑니다"
                        className="input h-12 border-gray-300 focus:border-blue-500"
                        id="storeName"
                        disabled
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">비밀번호를 입력해주세요</span>
                    </span>
                </div>

                {/* 업소명 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" for="storeName">
                        업소명
                    </label>
                    <input
                        type="text"
                        placeholder="인식된 상호명이 들어갑니다"
                        className="input h-12 border-gray-300 focus:border-blue-500"
                        id="storeName"
                        disabled
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">비밀번호를 입력해주세요</span>
                    </span>
                </div>

                {/* 주소 (사업자소재지) */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" for="userAddress">
                        주소(사업자소재지)
                    </label>
                    <div className="join w-full">
                        <input
                            type="text"
                            className="input h-12 border-gray-300 join-item focus:border-blue-500"
                            id="userAddress"
                            placeholder="업소 주소를 검색해 입력해주세요"
                            disabled
                        />
                        <button className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500">
                            검색
                        </button>
                    </div>
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">주소를 입력해주세요</span>
                    </span>
                </div>

                {/* 아이디 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" for="userId">
                        아이디
                    </label>
                    <div className="join w-full">
                        <input
                            type="text"
                            className="input h-12 border-gray-300 join-item focus:border-blue-500"
                            id="userId"
                            placeholder="5~20자리 / 영문, 숫자 포함"
                        />
                        <button className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500">
                            중복확인
                        </button>
                    </div>
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">아이디를 입력해주세요</span>
                    </span>
                </div>

                {/* 비밀번호 */}
                <div className="relative">
                    <label className="label label-text text-base font-semibold" for="userPassword">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        placeholder="8~16자리 / 영문, 숫자, 특수기호 포함 "
                        className="input h-12 border-gray-300 focus:border-blue-500"
                        id="userPassword"
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">비밀번호를 입력해주세요</span>
                    </span>
                </div>

                {/* 비밀번호 확인 */}
                <div className="relative mb-3">
                    <input
                        type="password"
                        placeholder="비밀번호를 한 번 더 입력해 주세요"
                        className="input h-12 border-gray-300 focus:border-blue-500"
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">비밀번호 확인을 입력해주세요</span>
                    </span>
                </div>

                {/* 이름 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " for="userName">
                        이름
                    </label>
                    <input
                        type="text"
                        placeholder="실명"
                        className="input h-12 border-gray-300  focus:border-blue-500"
                        id="userName"
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">이름을 입력해주세요</span>
                    </span>
                </div>

                {/* 생년월일 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" for="userBirth">
                        생년월일
                    </label>
                    <input
                        type="date"
                        placeholder="숫자 8자리 / 예 : 20021001"
                        className="input h-12 border-gray-300 focus:border-blue-500"
                        id="userBirth"
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">생년월일을 입력해주세요</span>
                    </span>
                </div>

                {/* 휴대폰 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" for="userPhone">
                        휴대폰
                    </label>
                    <input
                        type="tel"
                        placeholder="01012345678"
                        className="input h-12 border-gray-300 focus:border-blue-500"
                        id="userPhone"
                    />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">휴대폰번호를 입력해주세요</span>
                    </span>
                </div>

                {/* 이메일 */}
                <div className="relative">
                    <label className="label label-text text-base font-semibold" for="userEmail">
                        이메일
                    </label>
                    <div className="join w-full">
                        <input
                            type="email"
                            className="h-12 input join-item border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            id="userEmail"
                            placeholder="email@goodprice.com"
                        />
                        <button className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500">
                            인증번호 전송
                        </button>
                    </div>
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">이메일 주소를 입력해주세요</span>
                    </span>
                </div>

                {/* 인증번호 입력 */}
                <div className="relative mb-3">
                    <div className="flex w-full items-center space-x-3">
                        <div className="join flex-1">
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                className="h-12 input join-item w-full border-gray-300 focus:border-blue-500"
                                id="helperTextInput"
                            />
                            <button className="h-12 btn join-item w-3/12 border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-gray-500 hover:border-gray-500">
                                확인
                            </button>
                        </div>
                        <button className="h-12 btn border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-gray-500 hover:border-gray-500 shadow-none">
                            인증번호 재전송 (<span id="timer">60</span>초)
                        </button>
                    </div>
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">인증번호를 입력해주세요</span>
                    </span>
                </div>

                {/* 약관 */}
                <label className="label label-text text-base font-semibold" for="userName">
                    약관
                </label>
                <div className="accordion divide-neutral/20 divide-y rounded border p-5 mb-10">
                    {/* 전체약관 동의 */}
                    <div className="space-y-2 mb-5">
                        <label className="flex items-center">
                            <input
                                checked={allChecked}
                                onChange={handleAllChange}
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 font-semibold text-lg">전체동의</span>
                        </label>
                        <p className="text-sm text-gray-500 ml-7">
                            위치기반 서비스 이용약관(선택), 마케팅 정보 수신 동의 (이메일,SMS/MMS)(선택) 동의를
                            포함합니다.
                        </p>
                    </div>

                    {/* 첫번째 약관 */}
                    <div className={`accordion-item ${openItem === 'terms1' ? 'active' : ''}`} id="terms1">
                        <label className="flex items-center justify-between w-full cursor-pointer py-2">
                            <div className="flex items-center">
                                <input
                                    checked={checkedItems.terms1}
                                    onChange={(e) => handleItemChange(e, 'terms1')}
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 font-semibold text-lg">(필수) 개인회원 약관에 동의</span>
                            </div>

                            <button
                                className="accordion-toggle w-0"
                                onClick={() => toggleItem('terms1')}
                                aria-controls="terms1-collapse"
                                aria-expanded={openItem === 'terms1'}
                            >
                                <span
                                    className={`icon-[tabler--chevron-right] size-5 shrink-0 transition-transform duration-300 ${
                                        openItem === 'terms1' ? 'rotate-90' : 'rotate-0'
                                    }`}
                                ></span>
                            </button>
                        </label>
                        {openItem === 'terms1' && (
                            <div
                                id="terms1-collapse"
                                className="accordion-content w-full overflow-hidden transition-[height] duration-300"
                            >
                                <div className="px-5 pb-4">
                                    <p className="text-base-content/80 font-normal">
                                        본 약관은 ㈜착한가격업소 (이하 "회사"라 합니다)이 운영하는 웹사이트(이하
                                        “사이트”라 합니다) 및 모바일 애플리케이션(이하 “애플리케이션”이라 하며, 사이트와
                                        애플리케이션을 총칭하여 “사이트 등”이라 합니다)을 통해 서비스를 제공함에 있어
                                        회사와 이용자의 이용조건 및 제반 절차, 기타 필요한 사항의 규정을 목적으로
                                        합니다.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 두번째 약관 */}
                    <div className={`accordion-item ${openItem === 'terms2' ? 'active' : ''}`} id="terms2">
                        <label className="flex items-center justify-between w-full cursor-pointer py-2">
                            <div className="flex items-center">
                                <input
                                    checked={checkedItems.terms2}
                                    onChange={(e) => handleItemChange(e, 'terms2')}
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 font-medium text-lg">(선택) 마케팅 정보 수신 동의 - 이메일</span>
                            </div>

                            <button
                                className="accordion-toggle w-0"
                                onClick={() => toggleItem('terms2')}
                                aria-controls="terms2-collapse"
                                aria-expanded={openItem === 'terms2'}
                            >
                                <span
                                    className={`icon-[tabler--chevron-right] size-5 shrink-0 transition-transform duration-300 ${
                                        openItem === 'terms2' ? 'rotate-90' : 'rotate-0'
                                    }`}
                                ></span>
                            </button>
                        </label>
                        {openItem === 'terms2' && (
                            <div
                                id="terms2-collapse"
                                className="accordion-content w-full overflow-hidden transition-[height] duration-300"
                            >
                                <div className="px-5 pb-4">
                                    <p className="text-base-content/80 font-normal">
                                        본 약관은 ㈜착한가격업소 (이하 "회사"라 합니다)이 운영하는 웹사이트(이하
                                        “사이트”라 합니다) 및 모바일 애플리케이션(이하 “애플리케이션”이라 하며, 사이트와
                                        애플리케이션을 총칭하여 “사이트 등”이라 합니다)을 통해 서비스를 제공함에 있어
                                        회사와 이용자의 이용조건 및 제반 절차, 기타 필요한 사항의 규정을 목적으로
                                        합니다.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 회원가입 버튼 */}
                <button className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700">
                    회원가입 하기
                </button>
            </div>
        </div>
    );
}
export default BusinessForm;
