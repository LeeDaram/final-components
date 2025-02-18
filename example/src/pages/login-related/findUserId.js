function FindUserId() {
    return (
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 mb-24">
            <div className="flex mx-auto max-w-xl flex-col">
                {/* 폼 제목 */}
                <p className="text-2xl font-bold mt-24 mb-8 text-center">아이디 찾기</p>

                <p className="text-base font-semibold mb-5">회원정보에 등록된 정보로 아이디를 찾을 수 있습니다.</p>

                {/* 이름 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " for="userName">
                        이름
                    </label>
                    <input type="text" placeholder="실명" className="input h-12 border-gray-300  " id="userName" />
                    <span className="label">
                        <span className="label-text-alt text-red-500 hidden">이름을 입력해주세요</span>
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
                            className="h-12 input join-item border-gray-300  "
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
                                className="h-12 input join-item w-full border-gray-300 "
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

                {/* 회원가입 버튼 */}
                <button className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700">
                    인증확인
                </button>
            </div>
        </div>
    );
}
export default FindUserId;
