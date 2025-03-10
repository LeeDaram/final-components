import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import axios from 'axios';
import dayjs from 'dayjs';

function BusinessForm() {
    // 주소 지도
    const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);
    const [addressData, setAddressData] = useState({ sido: '', sigungu: '' });
    const [coordinate, setCoordinate] = useState({ lat: '', lng: '' });

    // 파입업로드 툴팁 상태
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // 파일 업로드
    const [file, setFile] = useState(null); // 선택된 파일 상태
    const [preview, setPreview] = useState(null); // 파일 미리보기 상태
    //   const [isUploaded, setIsUploaded] = useState(false); // 파일 업로드 상태

    // 화면이동
    const navigate = useNavigate();

    // 정규식
    const businessNumberRegex = /^\d{10}$/;
    const businessNameRegex = /^.{1,300}$/;
    const addressRegex = /^.{1,500}$/;
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 이메일 인증
    const [isLoading, setIsLoading] = useState(false); // 로딩상태
    const [isVerified, setIsVerified] = useState(false); // 인증여부
    const [timer, setTimer] = useState(180); // 인증 제한 시간
    const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머 동작 여부
    const timerRef = useRef(null);

    // 중복확인
    const [isDuplicate, setIsDuplicate] = useState(false);

    // 입력값 관리
    const [formData, setFormData] = useState({
        businessRegistrationNumber: '',
        businessName: '',
        businessAddress: '',
        userId: '',
        userPassword: '',
        confirmPassword: '',
        userName: '',
        userBirth: '',
        userPhone: '',
        userEmail: '',
        verificationCode: '',
    });

    // 입력값 오류
    const [formErrors, setFormErrors] = useState({});

    // 약관상태 관리
    const [terms, setTerms] = useState([]); // 약관 목록
    const [checkedItems, setCheckedItems] = useState({}); // 체크 상태
    const [openItem, setOpenItem] = useState({}); // 펼치기 상태
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 동의 상태

    // 값 입력 업데이트
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // 오류 메시지 제거
        setFormErrors((prev) => ({ ...prev, [id]: '' }));
    };

    // 주소 api
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setFormData({ ...formData, businessAddress: fullAddress });
        setAddressData({ sido: data.sido, sigungu: data.sigungu });
        findCoordinate(fullAddress);
    };

    // 위도 경도 값 추출
    const findCoordinate = async (address) => {
        try {
            const response = await fetch(
                `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${address}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('위도 경도 반환에 실패했습니다.');
            }

            const data = await response.json();
            setCoordinate({ lat: data.documents[0].x, lng: data.documents[0].y });
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    // 툴팁 상태
    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };

    const closeTooltip = () => {
        setTooltipVisible(false);
    };

    const handleReset = () => {
        setFile(null); // 선택된 파일 초기화
        setPreview(null); // 미리보기 초기화
        setIsUploaded(false); // 업로드 상태 초기화
        setFormData({
            ...formData,
            businessRegistrationNumber: '',
            businessName: '',
        }); // 사업자등록번호 업소명 초기화
        // 툴팁 닫기
        setTooltipVisible(false);
    };

    // // 파일이 선택되었을 때
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //         // 이미지 미리보기
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreview(reader.result);
    //         };
    //         reader.readAsDataURL(selectedFile);

    //         // 파일 자동 업로드
    //         handleUpload(selectedFile);
    //     }
    // };

    // // 자동 업로드
    // const handleUpload = (selectedFile) => {
    //     console.log('자동 업로드 중...', selectedFile);
    //     // 실제 업로드 API 호출
    //     // 업로드 완료 후 상태 변경
    //     setIsUploaded(true);
    // };

    const [imageFile, setImageFile] = useState([]);
    // 파일 업로드

    const [isUploaded, setIsUploaded] = useState(false); // 파일 업로드 상태
    const [isTrueBiz, setIsTrueBiz] = useState([]);
    const [bizInfo, setBizInfo] = useState([]);

    const OcrFile = async (file) => {
        try {
            // orc필수 데이터 포멧
            const formData = new FormData();
            const message = {
                version: 'V2',
                requestId: Math.random().toString(),
                timestamp: dayjs().format('YYYYMMDDHHmmss'),
                images: [{ format: 'jpeg', name: file.name }],
            };

            formData.append('message', JSON.stringify(message));
            formData.append('file', file);

            // api로 ocr
            const data = await axios.post(process.env.REACT_APP_NAVER_OCR_INVOKE_URL || '', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-OCR-SECRET': process.env.REACT_APP_NAVER_X_OCR_SECRET,
                },
            });
            setIsTrueBiz(data.data);
            // console.log(data.data, '사업자등록증OCR데이터');

            setBizInfo(data.data?.images[0].bizLicense.result);
            // console.log(data.data.images[0].bizLicense.result, '사업자등록증간편데이터@@@@@@');
        } catch (error) {
            // console.log(error);
            setIsUploaded(false);
        }
    };

    // isTrueBiz에 값이 들어왔을때 검증로직 + 정규식으로 자르고
    // 사등증 번호가 없을때 예외처리(사업자 등록증이 아닙니다) 있을때 정규식으로 자르기
    // await axios 로 사업자 진위여부 판단 api날려서(필수값: 사업자번호, 개업일자, 대표자이름)
    // 등록 완료 메세지 띄워주고 disabled에 값 날려주기기

    useEffect(() => {
        if (isTrueBiz?.images?.length > 0) {
            if (isTrueBiz.images[0].bizLicense?.result === undefined) {
                alert('사업자 등록증이 아닙니다. 사업자 등록증을 첨부해주세요');
                setIsUploaded(false);
                return;
            }
            const bizNumber = String(bizInfo.registerNumber[0].text).replace(/\D/g, ''); // 사업자등록번호
            const bizopenDate = String(bizInfo.openDate[0].text).replace(/\D/g, ''); // 개업날짜
            const bizName = bizInfo.repName[0].text; //사업자 이름
            const bizShopName = bizInfo.companyName[0].text; //사업장 이름

            // console.log(bizNumber, bizopenDate, bizName, bizShopName, '번호 날짜 이름 순');

            const isBizEnter = async () => {
                try {
                    //사업자 등록번호 진위확인
                    const res = await axios.post(
                        `http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.REACT_APP_BIZ_KEY}`,
                        {
                            businesses: [
                                {
                                    b_no: bizNumber,
                                    start_dt: bizopenDate,
                                    p_nm: bizName,
                                },
                            ],
                        }
                    );
                    // console.log(res.data.data[0].valid_msg, '사업자 진위여부확인');
                    //valid_msg 가 undefined면 사업자로 판단해도 될듯?
                    if (!res.data.data[0].valid_msg) {
                        alert('인증되었습니다');
                        //여기에 set bizNumber, bizopenDate, bizName이거 붙이기
                        setFormData({
                            ...formData,
                            businessRegistrationNumber: bizNumber,
                            businessName: bizShopName,
                        });
                        return;
                    } else {
                        alert('없는 사업자 번호입니다');
                    }
                } catch (e) {
                    // console.log(e);
                }
            };
            isBizEnter();
        }
    }, [isTrueBiz]);

    // 파일이 선택되었을 때
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImageFile([selectedFile]);
            // 파일 자동 업로드
            handleUpload(selectedFile);
        }
    };

    // 자동 업로드
    const handleUpload = (selectedFile) => {
        // console.log('자동 업로드 중...', selectedFile);

        // 업로드 완료 후 상태 변경
        setIsUploaded(true);
        // 실제 업로드 API 호출
        OcrFile(selectedFile);
    };

    // 약관 가져오기
    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/terms`);
                if (!response.ok) throw new Error('서버 응답 오류');

                const data = await response.json();
                const termsData = data.map((term) => ({
                    termsId: term.termsId,
                    title: term.title,
                    content: term.content,
                    isRequired: term.isRequired,
                }));

                setTerms(termsData);

                const initialCheckedState = {};
                const initialOpenState = {};
                termsData.forEach((term) => {
                    initialCheckedState[term.termsId] = false;
                    initialOpenState[term.termsId] = false;
                });

                setCheckedItems(initialCheckedState);
                setOpenItem(initialOpenState);
            } catch (error) {
                console.error('약관을 불러오는 중 오류 발생:', error);
            }
        };

        fetchTerms();
    }, []);

    // 개별 체크박스 상태 변경
    const handleCheckboxChange = (termsId) => {
        setCheckedItems((prev) => {
            const updatedCheckedItems = { ...prev, [termsId]: !prev[termsId] };
            const allChecked = Object.values(updatedCheckedItems).every(Boolean);
            setIsAllChecked(allChecked);
            setFormErrors((prev) => ({ ...prev, terms: '' }));
            return updatedCheckedItems;
        });
    };

    // 전체 동의 체크박스 변경
    const handleAllChange = (e) => {
        const isChecked = e.target.checked;
        const newCheckedState = {};

        terms.forEach((term) => {
            newCheckedState[term.termsId] = isChecked;
        });

        setCheckedItems(newCheckedState);
        setIsAllChecked(isChecked);

        setFormErrors((prev) => ({ ...prev, terms: '' }));
    };

    // 약관 펼치기/접기 상태 변경
    const toggleItem = (termsId) => {
        setOpenItem((prev) => ({
            ...prev,
            [termsId]: !prev[termsId],
        }));
    };

    // 타이머 형식
    const timeFormatter = useCallback((param) => {
        const min = String(Math.floor(param / 60)).padStart(2, '0');
        const sec = String(param % 60).padStart(2, '0');
        return `${min}:${sec}`;
    }, []);

    // 타이머 시작 함수
    const startTimer = () => {
        setTimer(180);
        setIsTimerRunning(true);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsTimerRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // 타이머 정리
    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    // 인증코드 전송
    const handleSendCode = async () => {
        if (!formData.userEmail) {
            setFormErrors({ userEmail: '이메일을 입력하세요.' });
            return;
        }

        setIsLoading(true); // 로딩 시작

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/email/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.userEmail }),
            });

            const data = await response.json();
            alert(data.message);

            setTimeout(() => {
                setIsLoading(false);
                startTimer();
            }, 1000);
        } catch (error) {
            console.error('Error sending verification code', error);
            setIsLoading(false);
        }
    };

    // 이메일 인증번호 확인 요청
    const handleVerifyCode = async () => {
        if (!formData.verificationCode) {
            setFormErrors({ verificationCode: '인증번호를 입력하세요.' });
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/email/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.userEmail,
                    verificationCode: formData.verificationCode,
                }),
            });

            const isValid = await response.json();
            if (isValid) {
                alert('이메일 인증 성공!');
                setIsVerified(true);
                clearInterval(timerRef.current); // 타이머 정지
            } else {
                alert('인증번호가 올바르지 않거나 만료되었습니다.');
            }
        } catch (error) {
            console.error('Error verifying code', error);
        }
    };

    // 인증번호 재전송
    const handleResendCode = () => {
        handleSendCode();
    };

    // 아이디 중복확인
    const checkDuplicate = async () => {
        if (!formData.userId || !idRegex.test(formData.userId)) {
            alert('아이디는 5~20자리 영문, 숫자를 포함해야 합니다');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${formData.userId}`);

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            const text = await response.text();
            const data = text ? JSON.parse(text) : null;

            if (!data || Object.keys(data).length === 0) {
                setIsDuplicate(true); // 아이디 사용 가능
                alert('사용 가능한 아이디입니다');
            } else {
                setIsDuplicate(false); // 아이디가 이미 존재
                alert('사용할 수 없는 아이디입니다');
            }
        } catch (error) {
            console.error('중복확인 중 오류 발생: ', error);
            setIsDuplicate(null);
        }
    };

    // 유효성 검사
    const validateForm = () => {
        let errors = {};

        // 사업자 등록번호
        if (!formData.businessRegistrationNumber) {
            errors.businessRegistrationNumber = '사업자 등록번호를 입력해주세요';
        } else if (!businessNumberRegex.test(formData.businessRegistrationNumber)) {
            errors.businessRegistrationNumber = '사업자 등록번호는 숫자 10자리여야 합니다';
        }

        // 업소명
        if (!formData.businessName) {
            errors.businessName = '업소명을 입력해주세요';
        } else if (!businessNameRegex.test(formData.businessName)) {
            errors.businessName = '업소명은 최대 300자까지 입력할 수 있습니다';
        }

        // 주소
        if (!formData.businessAddress) {
            errors.businessAddress = '주소를 입력해주세요';
        } else if (!addressRegex.test(formData.businessAddress)) {
            errors.businessAddress = '주소는 최대 500자까지 입력할 수 있습니다';
        }

        // 아이디
        if (!isDuplicate) {
            errors.userId = '아이디 중복검사를 진행해주세요';
        } else if (!formData.userId || !idRegex.test(formData.userId)) {
            errors.userId = '아이디는 5~20자리 영문, 숫자를 포함해야 합니다';
        }

        // 비밀번호
        if (!formData.userPassword) {
            errors.userPassword = '비밀번호를 입력해주세요';
        } else if (!passwordRegex.test(formData.userPassword)) {
            errors.userPassword = '비밀번호는 8~16자리, 영문/숫자/특수기호를 포함해야 합니다';
        }

        // 비밀번호 확인
        if (!formData.confirmPassword) {
            errors.confirmPassword = '비밀번호확인을 입력해주세요요';
        } else if (formData.userPassword !== formData.confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }

        // 이름
        if (!formData.userName) {
            errors.userName = '이름을 입력해주세요';
        }

        // 생일
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(formData.userBirth).setHours(0, 0, 0, 0);
        if (!formData.userBirth) {
            errors.userBirth = '생년월일을 입력해주세요요';
        } else if (formData.userBirth && !birthRegex.test(formData.userBirth)) {
            errors.userBirth = '생년월일은 YYYY-MM-DD 형식이어야 합니다';
        } else if (selectedDate > today) {
            errors.userBirth = '생년월일은 오늘 날짜 이전이어야 합니다.';
        }

        // 휴대폰번호
        if (formData.userPhone && !phoneRegex.test(formData.userPhone)) {
            errors.userPhone = '휴대폰 번호는 9자리 숫자여야 합니다';
        }

        // 이메일
        if (!formData.userEmail) {
            errors.userEmail = '이메일을 입력해주세요';
        } else if (!emailRegex.test(formData.userEmail)) {
            errors.userEmail = '올바른 이메일 형식이 아닙니다';
        }

        // 이메일 인증
        if (!formData.verificationCode) {
            errors.verificationCode = '이메일 인증을 완료해주세요';
        }

        // 약관
        const requiredTerms = terms.filter((t) => t.isRequired === 'T');
        const allRequiredChecked = requiredTerms.every((term) => checkedItems[term.termsId]);
        if (!allRequiredChecked) {
            errors.terms = '필수 약관에 동의해야 합니다';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // 회원가입 함수
    const handleSubmit = async () => {
        try {
            const optionalTerms =
                terms.filter((term) => term.isRequired === 'F').map((term) => checkedItems[term.termsId] === true)[0] ||
                false;

            const bodyData = {
                businessRegNo: formData.businessRegistrationNumber,
                storeName: formData.businessName,
                address: formData.businessAddress,
                userId: formData.userId,
                password: formData.userPassword,
                name: formData.userName,
                birthDate: formData.userBirth,
                email: formData.userEmail,
                isAgree: optionalTerms,
                sidoName: addressData.sido,
                sigunguName: addressData.sigungu,
                lat: coordinate.lat,
                lng: coordinate.lng,
            };

            if (formData.userPhone) {
                bodyData.phoneNumber = formData.userPhone;
            }

            console.log(bodyData);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/sign-up/biz`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) throw new Error('회원가입 실패');

            alert('회원가입 완료 : 로그인해주세요');
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패', error);
        }
    };

    // 회원가입
    const joinUser = () => {
        if (validateForm()) {
            handleSubmit();
        } else {
            alert('회원가입 오류 : 입력란을 모두 입력해주세요');
        }
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
                                        <button className="btn bg-accent text-white shadow-none" onClick={handleReset}>
                                            초기화
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
                            className="alert alert-success flex items-center gap-4 bg-accent-content text-accent"
                            role="alert"
                        >
                            <span className="icon-[tabler--circle-check] size-6"></span>
                            <p>
                                <span className="text-lg font-semibold">파일 업로드 성공 : </span> AI가 인식한 정보가
                                하단에 보여질거예요
                            </p>
                        </div>
                    )}
                </div>

                {/* 사업자등록번호 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="businessRegistrationNumber">
                        사업자등록번호<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="인식된 사업자등로번호가 들어갑니다"
                        className="input h-12 border-gray-300"
                        id="businessRegistrationNumber"
                        disabled
                        value={formData.businessRegistrationNumber}
                        onChange={(e) => {
                            handleChange(e);
                            setIsDuplicate(false);
                        }}
                    />
                    <span className="label">
                        {formErrors.businessRegistrationNumber && (
                            <span className="text-red-500">{formErrors.businessRegistrationNumber}</span>
                        )}
                    </span>
                </div>

                {/* 업소명 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="businessName">
                        업소명<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        disabled
                        placeholder="인식된 상호명이 들어갑니다"
                        className="input h-12 border-gray-300 "
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => {
                            handleChange(e);
                            setIsDuplicate(false);
                        }}
                    />
                    <span className="label">
                        {formErrors.businessName && <span className="text-red-500">{formErrors.businessName}</span>}
                    </span>
                </div>

                {/* 주소 (사업자소재지) */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userAddress">
                        주소(사업자소재지)<span className="text-red-500">*</span>
                    </label>
                    <div className="join w-full">
                        <input
                            type="text"
                            className="input h-12 border-gray-300 join-item "
                            id="userAddress"
                            placeholder="업소 주소를 검색하세요"
                            value={formData.businessAddress}
                            disabled
                        />
                        <button
                            onClick={handleClick}
                            className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500"
                        >
                            검색
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.businessAddress && (
                            <span className="text-red-500">{formErrors.businessAddress}</span>
                        )}
                    </span>
                </div>

                {/* 아이디 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userId">
                        아이디<span className="text-red-500">*</span>
                    </label>
                    <div className="join w-full">
                        <input
                            type="text"
                            className="input h-12 border-gray-300 join-item "
                            id="userId"
                            placeholder="5~20자리 / 영문, 숫자 포함"
                            value={formData.userId}
                            onChange={(e) => {
                                handleChange(e);
                                setIsDuplicate(false);
                            }}
                        />
                        <button
                            className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500"
                            onClick={checkDuplicate}
                        >
                            중복확인
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.userId && <span className="text-red-500">{formErrors.userId}</span>}
                    </span>
                </div>

                {/* 비밀번호 */}
                <div className="relative">
                    <label className="label label-text text-base font-semibold" htmlFor="userPassword">
                        비밀번호<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="8~16자리 / 영문, 숫자, 특수기호 포함 "
                        className="input h-12 border-gray-300 "
                        id="userPassword"
                        value={formData.userPassword}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userPassword && <span className="text-red-500">{formErrors.userPassword}</span>}
                    </span>
                </div>

                {/* 비밀번호 확인 */}
                <div className="relative mb-3">
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="비밀번호를 한 번 더 입력해 주세요"
                        className="input h-12 border-gray-300 "
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.confirmPassword && (
                            <span className="text-red-500">{formErrors.confirmPassword}</span>
                        )}
                    </span>
                </div>

                {/* 이름 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold " htmlFor="userName">
                        이름<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="실명"
                        className="input h-12 border-gray-300  "
                        id="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userName && <span className="text-red-500">{formErrors.userName}</span>}
                    </span>
                </div>

                {/* 생년월일 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userBirth">
                        생년월일<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        placeholder="숫자 8자리 / 예 : 20021001"
                        className="input h-12 border-gray-300 "
                        id="userBirth"
                        value={formData.userBirth}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userBirth && <span className="text-red-500">{formErrors.userBirth}</span>}
                    </span>
                </div>

                {/* 휴대폰 */}
                <div className="relative mb-3">
                    <label className="label label-text text-base font-semibold" htmlFor="userPhone">
                        휴대폰
                    </label>
                    <input
                        type="tel"
                        placeholder="01012345678"
                        className="input h-12 border-gray-300 "
                        id="userPhone"
                        value={formData.userPhone}
                        onChange={handleChange}
                    />
                    <span className="label">
                        {formErrors.userPhone && <span className="text-red-500">{formErrors.userPhone}</span>}
                    </span>
                </div>

                {/* 이메일 입력 */}
                <div className="relative">
                    <label className="label label-text text-base font-semibold" htmlFor="userEmail">
                        이메일<span className="text-red-500">*</span>
                    </label>
                    <div className="join w-full">
                        <input
                            type="email"
                            className="h-12 input join-item border-gray-300"
                            id="userEmail"
                            placeholder="email@goodprice.com"
                            value={formData.userEmail}
                            onChange={handleChange}
                            disabled={isVerified} // 인증 완료 시 입력 비활성화
                        />
                        <button
                            className="h-12 btn join-item w-3/12 bg-gray-300 text-gray-500 border-gray-300 hover:text-white hover:bg-gray-500 hover:border-gray-500"
                            onClick={handleSendCode}
                            disabled={isLoading || isTimerRunning}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : isTimerRunning ? (
                                `${timeFormatter(timer)}`
                            ) : (
                                '인증번호 전송'
                            )}
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.userEmail && <span className="text-red-500">{formErrors.userEmail}</span>}
                    </span>
                </div>

                {/* 인증번호 입력 */}
                <div className="relative mb-3">
                    <div className="flex w-full items-center space-x-3">
                        <div className="join flex-1">
                            <input
                                type="text"
                                placeholder="인증번호 입력"
                                className="h-12 input join-item w-full border-gray-300"
                                id="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                disabled={isVerified}
                            />
                            <button
                                className="h-12 btn join-item w-3/12 border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-gray-500 hover:border-gray-500"
                                onClick={handleVerifyCode}
                                disabled={isVerified}
                            >
                                확인
                            </button>
                        </div>
                        <button
                            className="h-12 btn border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-gray-500 hover:border-gray-500 shadow-none"
                            onClick={handleResendCode}
                            disabled={isTimerRunning}
                        >
                            인증번호 재전송
                        </button>
                    </div>
                    <span className="label">
                        {formErrors.verificationCode && (
                            <span className="text-red-500">{formErrors.verificationCode}</span>
                        )}
                    </span>
                </div>

                {/* 약관 */}
                <label className="label label-text text-base font-semibold" htmlFor="userName">
                    약관<span className="text-red-500">*</span>
                </label>
                <span className="label">
                    {formErrors.terms && <span className="text-red-500">{formErrors.terms}</span>}
                </span>
                <div className="accordion divide-neutral/20 divide-y rounded border p-5 mb-10">
                    {/* 전체약관 동의 */}
                    <div className="space-y-2 mb-5">
                        <label className="flex items-center">
                            <input
                                checked={isAllChecked}
                                onChange={handleAllChange}
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 "
                            />
                            <span className="ml-2 font-semibold text-lg">전체동의</span>
                        </label>
                        <p className="text-sm text-gray-500 ml-7">
                            실명 인증된 아이디로 가입, 위치기반서비스 이용약관(필수), 이벤트・혜택 정보 수신(선택)
                            동의를 포함합니다.
                        </p>
                    </div>

                    {terms.map((term) => (
                        <div
                            key={term.termsId}
                            className={`accordion-item ${openItem[term.termsId] ? 'active' : ''}`}
                            id={term.termsId}
                        >
                            <label className="flex items-center justify-between w-full cursor-pointer py-2">
                                <div className="flex items-center">
                                    <input
                                        checked={checkedItems[term.termsId] || false}
                                        onChange={() => handleCheckboxChange(term.termsId)}
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600"
                                    />
                                    <span
                                        className={`ml-2 text-lg ${
                                            term.isRequired === 'T' ? 'font-semibold' : 'font-medium'
                                        }`}
                                    >
                                        {term.title}
                                    </span>
                                </div>

                                <button
                                    className="accordion-toggle w-0"
                                    onClick={() => toggleItem(term.termsId)}
                                    aria-controls={`${term.termsId}-collapse`}
                                    aria-expanded={openItem[term.termsId]}
                                >
                                    <span
                                        className={`icon-[tabler--chevron-right] size-5 shrink-0 transition-transform duration-300 ${
                                            openItem[term.termsId] ? 'rotate-90' : 'rotate-0'
                                        }`}
                                    ></span>
                                </button>
                            </label>
                            {openItem[term.termsId] && (
                                <div
                                    id={`${term.termsId}-collapse`}
                                    className="accordion-content w-full overflow-hidden transition-[height] duration-300"
                                >
                                    <div className="px-5 pb-4">
                                        <p className="text-base-content/80 font-normal">{term.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 회원가입 버튼 */}
                <button
                    className="btn btn-primary btn-block h-14 bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-700 hover:border-blue-700"
                    onClick={joinUser}
                >
                    회원가입 하기
                </button>
            </div>
        </div>
    );
}
export default BusinessForm;
