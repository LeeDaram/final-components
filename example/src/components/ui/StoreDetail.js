import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi"; // 주요정보 아이콘
import { GrMoney } from "react-icons/gr"; // 품목(가격) 아이콘
import { FaCarSide, FaWifi } from "react-icons/fa"; // 자동차 아이콘, 와이파이 배달 아이콘
import {
  MdOutlineTakeoutDining,
  MdOutlineDeliveryDining,
} from "react-icons/md"; // 포장 아이콘, 배달 아이콘
import { FaDog, FaBaby } from "react-icons/fa6"; // 반려동물 아이콘, 유아시설 아이콘

// material ui
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const StoreDetail = () => {
  const { storeName } = useParams(); // url에서 storeName 가져오기
  const { state } = useLocation(); // 전달된 state 데이터 가져오기
  const store = state?.storeData; // 데이터 없을 경우 예외처리
  const [modalOn, setModalOn] = useState(false); // 모달창 표시
  const modalBackground = useRef(); // 콘텐츠 바깥 클릭 시 닫히게

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

  // 데이터 없을경우 화면 처리
  if (!store) return <span class="loading loading-spinner loading-lg"></span>;

  console.log(store);

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
      <div className="w-full h-full">
        {/* 편의시설 목록 */}
        <div className="flex gap-4 mt-4 w-full h-full">
          {filterCheckboxes
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
            ))}
          {/* 카카오 맵 */}
          <div className="flex justify-around mt-4 w-1/2 h-1/2 bg-black"></div>
        </div>

        <div className=" w-1/2 border-t pt-4"></div>

        {/* 이용후기 모달 */}
        <button
          className="w-1/2 h-1/2 border border-blue-500 bg-white text-blue-500 rounded-lg text-lg"
          onClick={() => setModalOn(true)}
        >
          이용후기 작성하기
        </button>

        {modalOn && (
          <div
            ref={modalBackground}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => {
              // 클릭한 대상이 모달 배경(div) 자체라면 모달을 닫음
              if (e.target === modalBackground.current) {
                setModalOn(false);
              }
            }}
          >
            {/* 모달 내용 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 ">이용후기</h2>
              {/* 리뷰 작성 폼 등이 들어갈 수 있음 */}
              <p className="text-blue-500 text-xl">별점</p>
              <Rating name="size-medium" defaultValue={0} />
              <div className="flex gap-2 mt-4">
                <button
                  className="px-3 py-1 border border-blue-500 bg-white text-blue-500 rounded"
                  onClick={() => setModalOn(false)}
                >
                  닫기
                </button>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setModalOn(false)}
                >
                  작성
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 border-t pt-4"></div>
      </div>
      {/* 평점 */}
      <div className="mt-6">
        <p className="text-lg font-bold text-gray-800 flex items-center">
          😊 총 리뷰수{" "}
          <span className="ml-2 text-xl text-blue-500">4.93점</span>
        </p>
        <div className="flex mt-2 space-x-2 text-sm">
          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          <p className="text-gray-500">85%가 긍정적(파이썬)</p>
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <div className="mt-6 space-y-6">
        {[1, 2].map((review) => (
          <div key={review} className="border-t pt-4">
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
            key={num}
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
