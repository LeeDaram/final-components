import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function Ocrtest() {
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

            setBizInfo(data.data.images[0].bizLicense.result);
        } catch (error) {
            console.error(error);
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
            const bizShopName = bizInfo.companyName[0].text; //사업장이름

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

                    //valid_msg 가 undefined면 사업자로 판단해도 될듯?
                    if (!res.data.data[0].valid_msg) {
                        alert('인증되었습니다');
                        //여기에 set bizNumber, bizopenDate, bizName이거 붙이기
                        return;
                    } else {
                        alert('없는 사업자 번호입니다');
                    }
                } catch (e) {
                    console.error(e);
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
        // 업로드 완료 후 상태 변경
        setIsUploaded(true);
        // 실제 업로드 API 호출
        OcrFile(selectedFile);
    };

    return (
        <>
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
                                <span className="text-base-content pe-1 text-base font-medium">을 첨부해주세요</span>
                            </div>
                        </div>
                    </label>
                </div>
            )}

            {/* 업로드 완료 후 새로운 안내 문구 표시 */}
            {isUploaded && (
                <div className="alert alert-success flex items-center gap-4 bg-accent-content text-accent" role="alert">
                    <span className="icon-[tabler--circle-check] size-6"></span>
                    <p>
                        <span className="text-lg font-semibold">파일 업로드 성공 : </span> AI가 인식한 정보가 하단에
                        보여질거예요
                    </p>
                </div>
            )}
        </>
    );
}

export default Ocrtest;
