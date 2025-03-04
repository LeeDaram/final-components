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

// 카카오맵 SDK
import {
  Map,
  MapMarker,
  ZoomControl,
  MapTypeControl,
} from "react-kakao-maps-sdk";

// material ui
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

// 임시 유저
const user = "user128";

const StoreDetail = () => {
  const { storeName } = useParams(); // url에서 storeName 가져오기
  const { state } = useLocation(); // 전달된 state 데이터 가져오기
  const store = state?.storeData; // 데이터 없을 경우 예외처리
  const [modalOn, setModalOn] = useState(false); // 모달창 표시
  const modalBackground = useRef(); // 콘텐츠 바깥 클릭 시 닫히게
  const [images, setImages] = useState([]); // 업로드된 이미지 상태
  const fileInputRef = useRef(null); // 파일 업로드 input 참조
  const [rating, setRating] = useState(1); // 별점
  const menu = useRef(null); // 이용메뉴
  const cost = useRef(null); // 가격
  const review = useRef(null); // 리뷰

  const [isSdkLoaded, setIsSdkLoaded] = useState(false); // SDK 로드 상태
  const storeCoord = {
    lat: store.lat,
    lng: store.lng,
  };

  // 체크박스 옵션(나중에 filterChecking에 업뎃해줘야됨)
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

  // 평점 그래프
  const ratingData = [
    { rt: 5, value: 20, width: "w-1/4" },
    { rt: 4, value: 50, width: "w-1/2" },
    { rt: 3, value: 70, width: "w-3/4" },
    { rt: 2, value: 100, width: "w-full" },
    { rt: 1, value: 100, width: "w-full" },
  ];

  const allFalse = filterCheckboxes.every((item) => item.checking === "F");
  const result = allFalse ? true : false;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&libraries=clusterer&autoload=false`; // 📌 `libraries=clusterer` 추가
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("카카오맵 SDK 로드 완료");
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
    return <span class="loading loading-spinner loading-lg" />;
  }

  // 데이터 없을경우 화면 처리
  if (!store) return <span class="loading loading-spinner loading-lg"></span>;

  console.log(store);

  const handleReviewSubmit = () => {
    if (!user) {
      alert("로그인 후 이용하실 수 있습니다.");
    } else {
      setModalOn(true);
    }
  };

  // 파일 업로드 핸들러
  const handlePhoto = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = [
      ...images,
      ...Array.from(files).map((file) => URL.createObjectURL(file)),
    ];

    setImages(newImages);
  };

  // 사진 업로드 버튼 클릭
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  // 저장 버튼
  const handleSubmit = () => {
    console.log("메뉴확인", menu.current.value);
    console.log("가격확인", cost.current.value);
    console.log("후기확인", review.current.value);
    console.log("이미지 확인", images);
    console.log("리뷰확인", rating);
    setModalOn(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
            {/* 예약 & 문의 */}
            <div className="flex">
              <button className="mt-2 px-3 py-1 text-sm border border-blue-500 bg-white text-blue-500 rounded mx-3">
                예약하기
              </button>
              <button className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded">
                문의하기
              </button>
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
        <div className="flex gap-4 mt-4 w-full h-1/2">
          {/*  */}
          {result ? (
            <div className="w-1/2">등록된 편의시설이 없습니다.</div>
          ) : (
            filterCheckboxes
              .filter((item) => item.checking === "T")
              .map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-start text-sm w-1/2 h-1/2"
                >
                  <div className="flex items-center justify-center bg-gray-300 w-12 h-12 rounded-full text-2xl">
                    {item.icon}
                  </div>
                  <p className="mt-1">{item.name}</p>
                </div>
              ))
          )}
          {/* 카카오 맵 */}
          <div className="w-1/2">
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
                  onChange={handlePhoto}
                  className="hidden"
                />

                {/* 업로드된 이미지 미리보기 */}
                <div className="flex items-center gap-2">
                  {images.slice(0, 2).map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`업로드된 이미지 ${index + 1}`}
                      className="w-10 h-10 object-cover border rounded"
                    />
                  ))}

                  {/* 추가된 이미지 개수 표시 */}
                  {images.length > 2 && (
                    <p className="text-base font-bold">+{images.length - 2}</p>
                  )}
                </div>
              </div>

              {/* 이용메뉴 */}
              <div className="flex w-full">
                <div className="flex flex-col w-28 mr-3">
                  <p className="w-full text-blue-500 text-xl mt-4">이용메뉴</p>
                  <input
                    type="text"
                    className="w-full border border-blue-500 rounded"
                    ref={menu}
                  />
                </div>
                {/* 가격 */}
                <div className="flex flex-col w-28">
                  <p className="w-full text-blue-500 text-xl mt-4">가격</p>
                  <div className="flex items-center border border-blue-500 rounded px-2">
                    <input
                      type="number"
                      className="w-full border-none outline-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                      ref={cost}
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
                ref={review}
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
              총 리뷰수
            </p>
            <p className="text-xl font-bold text-gray-800 flex items-center">
              총 평점
            </p>
            <Rating
              name="half-rating-read"
              defaultValue={5}
              precision={0.5}
              readOnly
            />
          </div>
          {/* 평점 비율2 */}
          <div className="flex flex-col w-1/2 gap-2">
            {ratingData.map((item) => (
              <div className="flex items-center gap-2" key={`i-${item.value}`}>
                <div
                  className="progress h-4 flex-1 bg-gray-200 rounded-full"
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={`progress-bar ${item.width} bg-gray-800 text-white text-sm rounded-full px-2`}
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
        {[1, 2].map((review) => (
          <div key={`review-${review}`} className="border-t pt-4">
            {/* 사용자 정보 */}
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-700">사용자 아이디</p>
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            </div>
            {/* 리뷰 내용 */}
            <p className="text-sm text-gray-600 mt-2">
              처음 이용해봤는데 기대 이상으로 만족스러웠습니다. 직원분들도
              친절하고 서비스도 훌륭하게 제공되었습니다. 시설이 깔끔하고
              분위기가 좋아서 편안하게 이용할 수 있었습니다.
            </p>
            {/* 이미지 */}
            <div className="flex gap-2 mt-3">
              <div className="bg-gray-300 w-24 h-24 rounded-md"></div>
              <div className="bg-gray-300 w-24 h-24 rounded-md"></div>
              <div className="bg-gray-300 w-24 h-24 rounded-md"></div>
            </div>
            {/* 도움이 되었나요? */}
            <div className="flex justify-between mt-4 text-sm">
              <p className="text-gray-500">이 리뷰가 도움이 되셨나요?</p>
              <button className="text-blue-500">👍 2</button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={`num-${num}`}
            className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreDetail;
