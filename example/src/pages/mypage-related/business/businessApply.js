import Sidebar from "../sidebar.js";
import { useState, useEffect, useRef } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../../pages/login-related/AuthContext";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";

function BusinessApply() {
  // ###############################################
  // 모델 URL (Teachable Machine에서 제공)
  const URL = "https://teachablemachine.withgoogle.com/models/0mpeZYm5b/";
  const [model, setModel] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // 이미지
  const [predictions, setPredictions] = useState([]); // 분석결과
  const [imgFile, setImgFile] = useState([]); //DB에 업로드할 사진 이미지

  // 모델 초기화 (컴포넌트가 마운트될 때)
  useEffect(() => {
    async function init() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    }
    init();
    //결과 값이 있을때 반려 대기 판단.
    const vlaue = parseInt(
      parseFloat(predictions[0]?.probability.toFixed(2)) * 100
    );
  }, [predictions]);
  console.log(predictions, "결과물");
  console.log(imgFile, "이미지file");

  // predictions 결과에 따라 from data에 값 저장
  useEffect(() => {
    if (predictions.length > 0 && imgFile.length > 0) {
      const vlaue = parseInt(
        parseFloat(predictions[0]?.probability.toFixed(2)) * 100
      );
      if (vlaue > 60) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          isImgclean: "T",
          files: imgFile[0], // 단일 파일 처리
        }));
        console.log("통과", vlaue);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          isImgclean: "F",
          files: imgFile[0],
        }));
        console.log("실패", vlaue);
      }
    }
  }, [predictions, imgFile]);
  // 파일 업로드 후 이미지 판단측 실행
  const readURL = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);

      // 약간의 딜레이주기
      setTimeout(() => {
        predict();
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImgFile(files);
      readURL(files[0]);
      setIsUploaded(true);
    }
  };

  // 업로드된 이미지 제거 (초기화)
  const removeUpload = () => {
    setImageSrc(null);
    setIsUploaded(false);
    setTooltipVisible(false);
    setPredictions([]);
  };

  // 예측 함수: 모델을 통해 이미지를 분석하고 결과를 상태에 저장
  const predict = async () => {
    if (!model) return;
    const imageElement = document.getElementById("face-image");
    const prediction = await model.predict(imageElement, false);
    setPredictions(prediction);
  };
  // ####################################################
  // 정규식
  const numberRegex = /^[0-9]+$/;
  const textRegex = /^.{2,}$/;

  // 유저 정보
  const { user, token } = useAuth();
  const [firstStore, setFirstStroe] = useState(true);

  useEffect(() => {
    if (user && token) fetchUserInfo();
  }, [user, token]);

  // 입력값 관리
  const [formData, setFormData] = useState({
    userSido: "",
    userSigungu: "",
    userIndustry: 0, //gpb
    userMenu: "", //Management
    userPrice: "", //Management
    userPhone: "", //gpb
    userReservation: false, //Management
    facilityParking: false, //gpb
    facilityTakeout: false, //gpb
    facilityDelivery: false, //gpb
    facilityWifi: false, //gpb
    facilityPet: false, //gpb
    facilityKids: false, //gpb
    priceComparison: false, //Management
    isImgclean: "", //Management
    files: "", //Management
  });

  // 입력값 오류
  const [formErrors, setFormErrors] = useState({});

  // 가격정보 보여주기
  const [priceMessage, setPriceMessage] = useState("");
  useEffect(() => {
    fetchAveragePrice();
  }, [formData.userMenu, formData.userPrice]);

  // 유저 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/location/${user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("사용자 정보를 불러오는 데 실패했습니다.");
      }

      const userData = await response.json();

      setFormData((prevFormData) => ({
        ...prevFormData,
        userSido: userData.sidoName,
        userSigungu: userData.sigunguName,
      }));
      console.log(userData, formData, "##################");

      const storeResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mypage/approval/result/${user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!storeResponse.ok) {
        throw new Error("사용자 정보를 불러오는 데 실패했습니다.");
      }

      const storeText = await storeResponse.text();
      const storeData = storeText ? JSON.parse(storeText) : null;

      if (storeData) {
        setFirstStroe(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 가격 조회하기
  const fetchAveragePrice = async () => {
    const { userMenu, userSido, userPrice } = formData;

    if (!userMenu || !userSido || !userPrice) {
      setPriceMessage("");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/approval?mainMenu=${userMenu}&sidoName=${userSido}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("평균 가격을 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      const averagePrice = data.avgPrice;
      const userPriceNumber = Number(userPrice);
      const percent = Math.round(
        ((averagePrice - userPriceNumber) / averagePrice) * 100
      );

      if (percent > 0) {
        setPriceMessage(
          `😊 ${userSido} 지역 ${userMenu} 평균 가격 ${averagePrice.toLocaleString()}원보다 ${percent}% 저렴해요 `
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          priceComparison: true,
        }));
      } else if (percent < 0) {
        setPriceMessage(
          `🥺 ${userSido} 지역 ${userMenu} 평균 가격 ${averagePrice.toLocaleString()}원보다 ${Math.abs(
            percent
          )}% 비싸요`
        );
        setFormData((prevFormData) => ({
          ...prevFormData,
          priceComparison: false,
        }));
      } else {
        setPriceMessage(
          `✅ ${userSido} 지역 ${userMenu} 평균 가격과 동일합니다!`
        );
      }
    } catch (err) {
      console.error(err);

      // 없는 메뉴 에러일 때
      if (err) {
        setPriceMessage(
          `✅ ${userSido} 지역 ${userMenu} 평균 가격과 동일합니다!`
        );
      } else {
        setPriceMessage("");
      }
    }
  };

  // 값 입력 업데이트
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // 오류 메시지 제거
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // 체크박스 값 업데이트
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked, // 체크박스는 true/false 저장
    }));
  };

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

  // 유효성 검사
  const validateForm = () => {
    let errors = {};

    // 이미지 업로드 여부
    if (!isUploaded) {
      errors.file = "매장 사진을 업로드해주세요.";
    }

    // 시도
    if (!formData.userSido || !textRegex.test(formData.userSido)) {
      errors.userSido = "시도명이 정확히 인식되지 않았습니다.";
    }

    // 시군구
    if (!formData.userSigungu || !textRegex.test(formData.userSigungu)) {
      errors.userSigungu = "시군구명이 정확히 인식되지 않았습니다.";
    }

    // 업종
    if (formData.userIndustry === 0) {
      errors.userIndustry = "업종을 선택해주세요.";
    }

    // 대표메뉴
    if (!formData.userMenu) {
      errors.userMenu = "대표메뉴를 입력해주세요.";
    } else if (!textRegex.test(formData.userMenu)) {
      errors.userMenu = "대표메뉴는 2글자 이상 입력해주세요.";
    }

    // 가격
    if (!formData.userPrice) {
      errors.userPrice = "대표메뉴 가격을 입력해주세요.";
    } else if (!numberRegex.test(formData.userPrice)) {
      errors.userPrice = "가격은 숫자만 입력해주세요.";
    }

    // 전화번호
    if (!formData.userPhone) {
      errors.userPhone = "업소 전화번호를 입력해주세요.";
    } else if (!numberRegex.test(formData.userPhone)) {
      errors.userPhone = "전화번호는 숫자로만 입력해주세요.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0; // 에러가 없으면 true 반환
  };

  // 일단 gpb생성
  const createGpb = async () => {
    let storeId;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/bizimg/create`,
        {
          userId: user.id,
          industryId: formData.userIndustry,
          contact: formData.userPhone,
          storeImage: "",
          takeout: formData.facilityTakeout ? "T" : "F",
          delivery: formData.facilityDelivery ? "T" : "F",
          wifi: formData.facilityWifi ? "T" : "F",
          pet: formData.facilityPet ? "T" : "F",
          kid: formData.facilityKids ? "T" : "F",
          parking: formData.facilityParking ? "T" : "F",
        }
      );
      storeId = response.data.storeId;

      const body = {
        storeId: storeId,
        mainMenu: formData.userMenu, // Management
        price: formData.userPrice, // Management
        priceApproval: formData.priceComparison ? "T" : "F", // Management
        cleanlinessApproval: formData.isImgclean, // Management
        isActivate: formData.userReservation ? "T" : "F",
      };

      if (formData.priceComparison && formData.isImgclean == "T") {
        body.finalApprovalStatus = "PENDING";
      } else {
        body.finalApprovalStatus = "AI_REJECTED";
      }

      const createApproval = await axios.post(
        `${process.env.REACT_APP_API_URL}/bizimg/approval`,
        body
      );

      console.log(imgFile, "이미지파일이 어떻게 들어오나요");

      const formDataImg = new FormData();
      formDataImg.append("storeId", storeId);
      formDataImg.append(`files`, imgFile[0]);

      const createBizImg = await axios.post(
        `${process.env.REACT_APP_API_URL}/bizimg/approval/attachment`,
        formDataImg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 저장함수
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("최종 제출 데이터:", formData);
      createGpb();
      alert("신청이 완료되었습니다!");
      // window.location.href = "/mypage/business/apply-status";
    } else {
      alert("입력값을 다시 확인해주세요.");
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
            <h2 className="text-2xl font-bold mb-6">착한가격업소 등록 신청</h2>

            {firstStore ? (
              <>
                {/* 이미지 업로드 */}
                <div className="mb-3">
                  <div className="mb-3 flex justify-between items-center">
                    {/* 레이블 */}
                    <label
                      className="label label-text text-base font-semibold"
                      htmlFor="storeName"
                    >
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

                        <span className="text-xs underline">
                          어떤 매장사진을 첨부해야 하나요?
                        </span>
                      </button>

                      {/* 툴팁 내용 */}
                      {tooltipVisible && (
                        <div
                          className="absolute right-52 top-56 transform -translate-y-1/2 translate-x-full w-80 bg-white border border-gray-300 rounded-lg p-4 text-left shadow-lg z-50"
                          role="tooltip"
                        >
                          <span className="text-gray-800 text-lg font-semibold">
                            📸 이런 매장 사진을 첨부하세요
                          </span>
                          <p className="text-gray-600 text-sm font-semibold pt-3">
                            내부 사진
                          </p>
                          <p className="text-gray-600 text-sm ">
                            매장의 전체적인 내부 모습이 잘 보이도록
                            촬영해주세요. 좌석 배치, 인테리어, 청결 상태 등을
                            확인할 수 있도록 밝고 선명한 사진을 권장합니다.
                          </p>
                          <p className="text-gray-600 text-sm font-semibold pt-3">
                            외부 사진
                          </p>
                          <p className="text-gray-600 text-sm ">
                            업소의 간판과 입구가 명확하게 보이도록 촬영해주세요.
                            주변 환경과 위치를 쉽게 파악할 수 있도록 정면에서
                            촬영하는 것이 좋습니다.
                          </p>
                          <p className="text-gray-600 text-sm font-semibold pt-3">
                            파일 형식
                          </p>
                          <p className="text-gray-600 text-sm ">
                            JPG, PNG 지원 (최대 5MB)
                          </p>
                          <div className="flex justify-end gap-2 pt-4">
                            <button
                              className="btn bg-accent text-white shadow-none"
                              onClick={closeTooltip}
                            >
                              확인
                            </button>
                            <button
                              className="btn bg-error text-white shadow-none"
                              onClick={removeUpload}
                            >
                              초기화
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 파일 업로드 입력란이 업로드 후 사라짐 */}
                  {!isUploaded && (
                    <>
                      <div
                        className="border-base-content/20 bg-base-100 rounded-box flex cursor-pointer justify-center border border-dashed p-12"
                        onDragOver={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            readURL(e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <input
                          type="file"
                          id="fileUpload"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".csv,image/*"
                        />
                        <label
                          htmlFor="fileUpload"
                          className="w-full cursor-pointer"
                        >
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
                      <span className="label">
                        {formErrors.file && (
                          <span className="text-red-500">
                            {formErrors.file}
                          </span>
                        )}
                      </span>
                    </>
                  )}

                  {/* 업로드 완료 후 새로운 안내 문구 표시 */}
                  {isUploaded && (
                    <div
                      className="alert alert-success flex items-center gap-4 bg-accent-content text-accent"
                      role="alert"
                    >
                      <span className="icon-[tabler--circle-check] size-6"></span>
                      <p>
                        <span className="text-lg font-semibold">
                          파일 업로드 성공 :{" "}
                        </span>{" "}
                        AI가 이미지를 인식할거예요.
                      </p>
                      <img
                        id="face-image"
                        src={imageSrc}
                        alt="Uploaded"
                        onLoad={predict} // 이미지 로드 후 판단
                        style={{
                          opacity: 0,
                          position: "absolute",
                          width: "300px",
                          height: "auto",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* 시도 */}
                <div className="relative mb-3">
                  <label
                    className="label label-text text-base font-semibold "
                    htmlFor="userSido"
                  >
                    시도
                  </label>
                  <input
                    type="text"
                    placeholder="시도명이 들어갑니다"
                    className="input h-12 border-gray-300  "
                    id="userSido"
                    value={formData.userSido}
                    onChange={handleChange}
                    disabled
                  />
                  <span className="label">
                    {formErrors.userSido && (
                      <span className="text-red-500">
                        {formErrors.userSido}
                      </span>
                    )}
                  </span>
                </div>

                {/* 시군구 */}
                <div className="relative mb-3">
                  <label
                    className="label label-text text-base font-semibold "
                    htmlFor="userSigungu"
                  >
                    시군구
                  </label>
                  <input
                    type="text"
                    placeholder="시군구명이 들어갑니다"
                    className="input h-12 border-gray-300  "
                    id="userSigungu"
                    value={formData.userSigungu}
                    onChange={handleChange}
                    disabled
                  />
                  <span className="label">
                    {formErrors.userSigungu && (
                      <span className="text-red-500">
                        {formErrors.userSigungu}
                      </span>
                    )}
                  </span>
                </div>

                {/* 업종 & 대표메뉴 */}
                <div className="flex gap-5 mb-5">
                  {/* 업종 */}
                  <div className="flex flex-col">
                    <label
                      className="label label-text text-base font-semibold "
                      htmlFor="userIndustry"
                    >
                      업종
                    </label>
                    <select
                      id="userIndustry"
                      className="border input border-gray-300 rounded-md h-12 w-40 px-3"
                      onChange={handleChange}
                      value={formData.userIndustry}
                    >
                      <option value="0">전체</option>
                      <option value="1">한식</option>
                      <option value="2">중식</option>
                      <option value="3">일식</option>
                      <option value="4">양식</option>
                      <option value="5">기타요식업</option>
                      <option value="6">이용업</option>
                      <option value="7">숙박업</option>
                      <option value="8">세탁업</option>
                      <option value="9">미용업</option>
                      <option value="10">목욕업</option>
                      <option value="11">기타비요식업</option>
                    </select>
                    <span className="label">
                      {formErrors.userIndustry && (
                        <span className="text-red-500">
                          {formErrors.userIndustry}
                        </span>
                      )}
                    </span>
                  </div>
                  {/* 대표메뉴 */}
                  <div className="flex flex-col flex-1">
                    <label
                      className="label label-text text-base font-semibold "
                      htmlFor="userMenu"
                    >
                      대표메뉴
                    </label>
                    <input
                      type="text"
                      placeholder="대표메뉴를 입력해주세요"
                      className="input h-12 border-gray-300"
                      id="userMenu"
                      value={formData.userMenu}
                      onChange={handleChange}
                    />
                    <span className="label">
                      {formErrors.userMenu && (
                        <span className="text-red-500">
                          {formErrors.userMenu}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* 가격 */}
                <div className="relative mb-3">
                  <label
                    className="label label-text text-base font-semibold "
                    htmlFor="userPrice"
                  >
                    가격
                  </label>
                  <input
                    type="text"
                    placeholder="대표메뉴의 가격을 입력해주세요"
                    className="input h-12 border-gray-300  "
                    id="userPrice"
                    value={formData.userPrice}
                    onChange={handleChange}
                  />
                  <span className="label">
                    {formErrors.userPrice && (
                      <span className="text-red-500">
                        {formErrors.userPrice}
                      </span>
                    )}
                  </span>
                  {priceMessage && (
                    <div
                      className={`border p-3 rounded mb-2 ${
                        priceMessage.includes("저렴해요")
                          ? "border-blue-400 bg-blue-100 text-blue-600"
                          : priceMessage.includes("비싸요")
                          ? "border-red-400 bg-red-100 text-red-600"
                          : "border-green-400 bg-green-100 text-green-600"
                      }`}
                    >
                      {priceMessage}
                    </div>
                  )}
                </div>

                {/* 전화번호 */}
                <div className="relative mb-3">
                  <label
                    className="label label-text text-base font-semibold "
                    htmlFor="userPhone"
                  >
                    전화번호
                  </label>
                  <input
                    type="text"
                    placeholder="업소 전화번호를 입력해주세요 ('-'없이)"
                    className="input h-12 border-gray-300 "
                    id="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                  />
                  <span className="label">
                    {formErrors.userPhone && (
                      <span className="text-red-500">
                        {formErrors.userPhone}
                      </span>
                    )}
                  </span>
                </div>

                {/* 예약 가능 여부 */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <label
                      className="label label-text text-base font-semibold "
                      htmlFor="userReservation"
                    >
                      예약가능여부
                    </label>
                    <p className="text-sm text-gray-500 pl-1">
                      사람들이 웹페이지를 통해 예약하고 방문할 수 있어요
                    </p>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <label
                      className="relative inline-flex items-center cursor-pointer"
                      htmlFor="userReservation"
                    >
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        id="userReservation"
                        checked={formData.userReservation}
                        onChange={handleCheckboxChange}
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border rounded-full transition-transform peer-checked:translate-x-4"></div>
                    </label>
                  </div>
                </div>

                {/* 편의시설 */}
                <div className="relative mb-3">
                  <label
                    className="label label-text text-base font-semibold "
                    htmlFor="userAmenities"
                  >
                    편의시설
                  </label>

                  <div className="flex gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="facilityParking"
                        onChange={handleCheckboxChange}
                        checked={formData.facilityParking || false}
                      />
                      <label
                        className="label label-text text-base"
                        htmlFor="facilityParking"
                      >
                        주차
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="facilityTakeout"
                        onChange={handleCheckboxChange}
                        checked={formData.facilityTakeout || false}
                      />
                      <label
                        className="label label-text text-base"
                        htmlFor="facilityTakeout"
                      >
                        포장
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="facilityDelivery"
                        onChange={handleCheckboxChange}
                        checked={formData.facilityDelivery || false}
                      />
                      <label
                        className="label label-text text-base"
                        htmlFor="facilityDelivery"
                      >
                        배달
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="facilityWifi"
                        onChange={handleCheckboxChange}
                        checked={formData.facilityWifi || false}
                      />
                      <label
                        className="label label-text text-base"
                        htmlFor="facilityWifi"
                      >
                        와이파이
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="facilityPet"
                        onChange={handleCheckboxChange}
                        checked={formData.facilityPet || false}
                      />
                      <label
                        className="label label-text text-base"
                        htmlFor="facilityPet"
                      >
                        반려동물
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        id="facilityKids"
                        onChange={handleCheckboxChange}
                        checked={formData.facilityKids || false}
                      />
                      <label
                        className="label label-text text-base"
                        htmlFor="facilityKids"
                      >
                        유아시설
                      </label>
                    </div>
                  </div>
                </div>

                {/* 등록신청 */}
                <button
                  className="w-full h-14 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
                  onClick={handleSubmit}
                >
                  등록 신청
                </button>
              </>
            ) : (
              <div class="alert alert-soft alert-error flex items-start gap-4">
                <span class="icon-[tabler--info-circle] size-6"></span>
                <div class="flex flex-col gap-1">
                  <h5 class="text-lg font-semibold">
                    기존에 착한가격업소에 등록한 적이 있어요
                  </h5>
                  <p class="mt-1.5 list-inside list-disc">
                    현재 귀하의 업소는 착한가격업소에 신청한 이력이 있습니다.
                    착한가격업소 재신청을 이용해주세요.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BusinessApply;
