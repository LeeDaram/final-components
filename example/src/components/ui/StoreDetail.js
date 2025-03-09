import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi"; // 주요정보 아이콘
import { GrMoney } from "react-icons/gr"; // 품목(가격) 아이콘
import { FaCarSide, FaWifi, FaRegSmile } from "react-icons/fa"; // 자동차, 와이파이 배달, 총 평점 아이콘
import {
  MdOutlineTakeoutDining,
  MdOutlineDeliveryDining,
} from "react-icons/md"; // 포장 아이콘, 배달 아이콘
import { FaDog, FaBaby } from "react-icons/fa6"; // 반려동물 아이콘, 유아시설 아이콘
import { CiImageOn } from "react-icons/ci";
import { useAuth } from "../../pages/login-related/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// 카카오맵 SDK
import { Map, MapMarker } from "react-kakao-maps-sdk";

// material ui
import Rating from "@mui/material/Rating";
import { format } from "date-fns";
import Storereview from "./StoreReview";

const StoreDetail = () => {
  const { storeName } = useParams(); // url에서 storeName 가져오기
  const { state } = useLocation(); // 전달된 state 데이터 가져오기
  const store = state?.storeData; // 데이터 없을 경우 예외처리
  const [modalOn, setModalOn] = useState(false); // 이용후기 모달
  const [ismodal, setIsmodal] = useState(false); // 예약하기 모달
  const [selectedDate, setSelectedDate] = useState(null); // 날짜 선택
  const modalBackground = useRef(); // 콘텐츠 바깥 클릭 시 닫히게

  const [images, setImages] = useState(); // 업로드된 이미지 상태
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null); // 파일 업로드 input 참조

  const [rating, setRating] = useState(1); // 별점
  const [menu, setMenu] = useState("");
  const [cost, setCost] = useState();
  const [review, setReview] = useState("");
  const { user } = useAuth();

  console.log("@@@@@@@@@@@@@", store);

  useEffect(() => {
    console.log("데이터받기 777777777777 2", store.storeId);
  }, [store, user]);

  const [isSdkLoaded, setIsSdkLoaded] = useState(false); // SDK 로드 상태
  const storeCoord = {
    lat: store.lat,
    lng: store.lng,
  };

  // 체크박스 옵션
  const filterCheckboxes = [
    { icon: <FaCarSide />, name: "주차", checking: store.parking },
    { icon: <MdOutlineTakeoutDining />, name: "포장", checking: store.takeout },
    {
      icon: <MdOutlineDeliveryDining />,
      name: "배달",
      checking: store.delivery,
    },
    { icon: <FaWifi />, name: "와이파이", checking: store.wifi },
    { icon: <FaDog />, name: "반려동물", checking: store.pet },
    { icon: <FaBaby />, name: "유아시설", checking: store.kid },
  ];

  // 0으로 나눔 방지
  const totalReviews = store.reviewCount || 1;

  // 평점 그래프
  const ratingData = [
    {
      rt: 5,
      value: Math.round((store.rating5Count / totalReviews) * 100),
    },
    {
      rt: 4,
      value: Math.round((store.rating4Count / totalReviews) * 100),
    },
    {
      rt: 3,
      value: Math.round((store.rating3Count / totalReviews) * 100),
    },
    {
      rt: 2,
      value: Math.round((store.rating2Count / totalReviews) * 100),
    },
    {
      rt: 1,
      value: Math.round((store.rating1Count / totalReviews) * 100),
    },
  ];

  const allFalse = filterCheckboxes.every((item) => item.checking === "F");
  const result = allFalse ? true : false;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&libraries=clusterer&autoload=false`; // 📌 `libraries=clusterer` 추가
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsSdkLoaded(true); // SDK가 로드되면 true로 변경
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // SDK가 로드되지 않으면 스피너 표시
  if (!isSdkLoaded) {
    return <span className="loading loading-spinner loading-lg" />;
  }

  // 날짜 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 예약 저장 핸들러
  const handleReservation = async () => {
    if (!selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const requestData = {
      reservationDate: formattedDate,
      userId: user.id,
      storeId: store.storeId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/reservation",
        requestData
      );

      alert("예약이 완료되었습니다!");
    } catch (error) {
      console.error("예약 실패:", error);

      // 예약 중복 시 서버에서 메시지 날림
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        // 서버 및 통신 문제 오류
        alert("예약 중 오류가 발생했습니다.");
      }
    }

    // 예약 완료 후 모달 닫기
    setIsmodal(false);
  };

  // 예약버튼
  const handleReservationClick = () => {
    if (!user) {
      alert("로그인 후 이용하실 수 있습니다.");
      setIsmodal(false);
      return;
    }
    setIsmodal(true);
  };

  // 데이터 없을경우 화면 처리
  if (!store)
    return <span className="loading loading-spinner loading-lg"></span>;

  const handleReviewSubmit = () => {
    if (!user) {
      alert("로그인 후 이용하실 수 있습니다.");
    } else {
      setModalOn(true);
    }
  };

  // 사진 업로드 버튼 클릭
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  // 저장 버튼
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("storeId", store.storeId);
    formData.append("userId", user.id);
    formData.append("rating", rating);
    formData.append("cost", cost);
    formData.append("menu", menu);
    formData.append("review", review);

    for (let i = 0; i < images.length; i++) {
      formData.append(`files`, images[i]);
    }

    const response = await axios.post(
      "http://localhost:8080/api/review",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setModalOn(false);
  };

  return (
    <div className="w-9/12 mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* 아이콘 및 업소이름 */}
      <p className="text-2xl font-semibold"> {storeName} </p>
      {/* 업소 정보 섹션 */}
      <div className="grid grid-cols-3 gap-4 mt-2">
        {/* 대표 이미지 */}
        <div className="col-span-2 flex flex-col gap-2">
          <div className="bg-gray-300 w-full h-72 rounded-md">
            <img
              src={store.storeImage}
              alt="업소 대표 이미지"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* 업소 정보 */}
        <div className="border border-gray-200 p-4 rounded-md space-y-5">
          {/* 주요정보 */}
          <div className="flex">
            <TfiWrite />
            <p className="text-base text-black ml-2">주요 정보</p>
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="text-sm text-gray-600">
              {" "}
              <span className="text-black font-bold">주소</span>:{" "}
              {store.address}
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-black font-bold">전화번호</span>:{" "}
              {store.contact}
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-black font-bold">업종</span>:{" "}
              {store.industryName}
            </p>
            {/* 예약버튼*/}
            <div className="flex">
              <button
                className="mt-2 px-3 py-1 text-sm border border-blue-500 bg-white text-blue-500 rounded mx-3 w-full"
                onClick={() => handleReservationClick()}
              >
                예약하기
              </button>
              {/* 모달창 (ismodal이 true일 때만 표시) */}
              {ismodal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-lg font-bold mb-4">예약하기</h2>

                    {/* 날짜 선택 */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        날짜 선택
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()} // 오늘 이전 날짜 선택 불가
                        dateFormat="yyyy-MM-dd"
                        className="border p-2 w-full rounded"
                        inline // 인라인으로 캘린더 표시
                      />
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => setIsmodal(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        닫기
                      </button>
                      <button
                        onClick={handleReservation}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        예약
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex">
              <GrMoney />
              <p className="text-sm text-gray-600">
                <span className="text-black font-bold pl-2">품목(가격)</span>{" "}
              </p>
            </div>
            <div className="flex">
              <div className="bg-blue-500 text-white rounded text-sm">
                착한가격
              </div>
              <div className="text-gray-400 text-sm pl-1">{store.mainMenu}</div>
              <div className="text-black text-base pl-1">{store.price}원</div>
            </div>
          </div>
        </div>
      </div>

      {/* 편의시설 및 카카오맵 */}
      <div className="w-full h-36">
        {/* 편의시설 목록 */}
        <div className="flex mt-4 w-full h-1/2">
          {/*  */}
          {result ? (
            <div className="w-1/2">등록된 편의시설이 없습니다.</div>
          ) : (
            filterCheckboxes
              .filter((item) => item.checking === "T")
              .map((item) => (
                <div key={item.name} className=" flex flex-col text-sm w-1/3">
                  <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full text-2xl">
                    {item.icon}
                  </div>
                  <p className="mt-1">{item.name}</p>
                </div>
              ))
          )}
          {/* 카카오 맵 */}

          <Map
            center={storeCoord}
            style={{ width: "100%", height: "140px" }}
            className=""
            level={3} // 지도 확대 레벨
          >
            {/* 줌 컨트롤러 추가 */}
            {/* <ZoomControl position={"RIGHT"} /> */}

            {/* 지도 타입 컨트롤러 추가 */}
            {/* <MapTypeControl position={"TOPRIGHT"} /> */}

            {/* 기준좌표 마커 */}
            <MapMarker
              position={storeCoord}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                size: { width: 30, height: 35 },
              }}
            />
          </Map>
        </div>

        <div className=" w-1/2 border-t pt-4 mt-2"></div>
        {/* 이용후기 모달 */}
        <button
          className="w-1/2 h-9 border border-blue-500 bg-white text-blue-500 rounded-lg text-lg"
          onClick={() => handleReviewSubmit()}
        >
          이용후기 작성하기
        </button>

        {modalOn && (
          <div
            ref={modalBackground}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalOn(false);
              }
            }}
          >
            {/* 모달 내용 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 ">이용후기</h2>
              {/* 별점*/}
              <p className="text-blue-500 text-xl ">별점</p>
              <Rating
                name="size-medium"
                defaultValue={1}
                onClick={(e) => setRating(e.target.value)}
              />
              {/* 사진 */}
              <p className="text-blue-500 text-xl mt-4">사진</p>
              <div className="flex items-center gap-3">
                {/* 아이콘 클릭시 사진 업로드 실행 */}
                <CiImageOn
                  className="cursor-pointer"
                  size={40}
                  onClick={() => triggerFileUpload()}
                />
                {/* 숨겨진 파일 업로드 */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const files = e.target.files;
                    setImages(files);

                    let newPreviews = [];
                    if (files.length > 0) {
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        newPreviews.push(URL.createObjectURL(file));
                      }
                    }
                    setPreviews(newPreviews);
                  }}
                  className="hidden"
                />

                {/* 업로드된 이미지 미리보기 */}

                <div className="flex items-center gap-2">
                  {previews.slice(0, 2).map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`업로드된 이미지 ${index + 1}`}
                      className="w-10 h-10 object-cover border rounded"
                    />
                  ))}

                  {previews.length > 2 && (
                    <p className="text-base font-bold">+{images.length - 2}</p>
                  )}

                  {/* {images.slice(0, 2).map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`업로드된 이미지 ${index + 1}`}
                      className="w-10 h-10 object-cover border rounded"
                    />
                  ))} */}

                  {/* 추가된 이미지 개수 표시 */}
                  {/* {images.length > 2 && (
                    <p className="text-base font-bold">+{images.length - 2}</p>
                  )} */}
                </div>
              </div>

              {/* 이용메뉴 */}
              <div className="flex w-full">
                <div className="flex flex-col w-28 mr-3">
                  <p className="w-full text-blue-500 text-xl mt-4">이용메뉴</p>
                  <input
                    type="text"
                    className="w-full border border-blue-500 rounded"
                    defaultValue={menu}
                    onBlur={(e) => setMenu(e.target.value)}
                  />
                </div>
                {/* 가격 */}
                <div className="flex flex-col w-28">
                  <p className="w-full text-blue-500 text-xl mt-4">가격</p>
                  <div className="flex items-center border border-blue-500 rounded px-2">
                    <input
                      type="number"
                      className="w-full border-none outline-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                      defaultValue={cost}
                      onBlur={(e) => setCost(e.target.value)}
                    />
                    <span className="ml-2 text-black">원</span>
                  </div>
                </div>
              </div>
              {/* 후기작성 */}
              <p className="w-full text-blue-500 text-xl mt-4">후기작성</p>
              <input
                type="text"
                className="w-full border border-blue-500 rounded"
                defaultValue={review}
                onBlur={(e) => setReview(e.target.value)}
              />

              <div className="w-full flex justify-between mt-3">
                <button
                  className="w-1/2 px-3 py-1 border border-blue-500 bg-white text-blue-500 rounded"
                  onClick={() => setModalOn(false)}
                >
                  닫기
                </button>
                <button
                  className="w-1/2 px-3 py-1 bg-blue-500 text-white rounded mx-2"
                  onClick={handleSubmit}
                >
                  작성
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 border-t pt-4"></div>
      </div>

      {/* 업소 평점 */}
      <div className="flex w-full mt-6">
        {/* 아이콘 및 퍼센트 비율 */}
        <div className="w-1/2 flex flex-col items-center">
          <p className="text-lg font-bold text-gray-800 flex items-center p-5">
            <FaRegSmile className="size-15" />
          </p>
          <div className="flex mt-2 space-x-2 font-medium">
            <p className="text-gray-500">
              전체후기의{" "}
              <span className="text-blue-500">85%가 긍정적(파이썬)</span>
            </p>
          </div>
        </div>
        <div className="ml-4 border-l h-36"></div>

        {/* 평점 비율1 */}
        <div className="w-1/2 flex items-center">
          <div className="flex flex-col items-center w-1/2">
            <p className="text-sm font-bold text-gray-800 flex items-center">
              총 {store.reviewCount}건
            </p>
            <p className="text-xl font-bold text-gray-800 flex items-center">
              {store.reviewAvg}점
            </p>
            <Rating
              name="half-rating-read"
              defaultValue={store.reviewAvg}
              precision={0.5}
              readOnly
            />
          </div>
          {/* 평점 비율2 */}
          <div className="flex flex-col w-1/2 gap-2">
            {ratingData.map((item) => (
              <div
                className="flex items-center gap-2"
                key={`rating-${item.rt}-${item.value}`}
              >
                <div
                  className="progress h-4 flex-1 bg-gray-200 rounded-full"
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar bg-gray-800 text-white text-xs rounded-full px-2"
                    style={{ width: `${item.value}%` }} // ⭐ 비율에 맞게 width 동적 적용
                  >
                    {item.value}%
                  </div>
                </div>
                <span className="text-gray-800 font-medium w-10 text-right">
                  {item.rt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <div className="mt-6 space-y-6">
        <Storereview data={store.storeId} />
      </div>
    </div>
  );
};

export default StoreDetail;
