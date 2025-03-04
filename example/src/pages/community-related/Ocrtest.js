import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Ocrtest() {
  const [imageFile, setImageFile] = useState([]);
  // 파일 업로드

  const [isUploaded, setIsUploaded] = useState(false); // 파일 업로드 상태
  const OcrFile = async (file) => {
    try {
      const formData = new FormData();
      const message = {
        version: "V2",
        requestId: Math.random().toString(),
        timestamp: dayjs().format("YYYYMMDDHHmmss"),
        images: [{ format: "jpeg", name: file.name }],
      };

      formData.append("message", JSON.stringify(message));
      formData.append("file", file);

      const data = await axios.post(
        process.env.REACT_APP_NAVER_OCR_INVOKE_URL || "",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-OCR-SECRET": process.env.REACT_APP_NAVER_X_OCR_SECRET,
          },
        }
      );
      // 사등증 번호가 없을때 예외처리(사업자 등록증이 아닙니다) 있을때 정규식으로 자르기

      // await axios 로 사업자 진위여부 판단 api날려서(필수값: 사업자번호, 개업일자, 대표자이름)
      // 등록 완료 메세지 띄워주고 disabled에 값 날려주기기
      console.log(data.data, "@@@@@@@@@");
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

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
    console.log("자동 업로드 중...", selectedFile);
    // 실제 업로드 API 호출
    // 업로드 완료 후 상태 변경
    setIsUploaded(true);
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
            <span className="text-lg font-semibold">파일 업로드 성공 : </span>{" "}
            AI가 인식한 정보가 하단에 보여질거예요
          </p>
        </div>
      )}
    </>
  );
}

export default Ocrtest;
