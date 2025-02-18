import { useState } from 'react';

function PersonalForm() {
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
                <p className="text-2xl font-bold mt-24 mb-8 text-center">착한업소 솔루션 개인 회원가입</p>

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
export default PersonalForm;
