import React, { useState } from "react";
import { Phone, Banknote } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import StoreDetail from "./ui/StoreDetail";
import { useNavigate } from "react-router-dom";

function StoreComponent({ data }) {
  const [isAdding, setIsAdding] = useState(false); // 새페이지
  const navigate = useNavigate();

  // 팝업창 클릭
  const handleStoreDetail = () => {
    navigate(`/find/map/${encodeURIComponent(data.storeName)}`, {
      state: { storeData: data },
    });
  };

  return (
    <div
      className="w-80 min-h-72 border rounded-lg shadow-lg overflow-hidden p-4 bg-white flex flex-col cursor-pointer  transition hover:scale-105"
      onClick={() => handleStoreDetail()}
    >
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
        {data.storeImage ? (
          <img
            src={data.storeImage}
            alt="업소대표 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={
              "https://e7.pngegg.com/pngimages/365/94/png-clipart-sasuke-uchiha-madara-uchiha-itachi-uchiha-kakashi-hatake-sharingan-naruto-symmetry-sasuke-uchiha-thumbnail.png"
            }
            alt="업소대표 이미지"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="mt-4 px-2">
        <span className="flex text-blue-600 text-sm font-bold">
          <div className="mt-0.5 pr-0.5">
            <FaStar />
          </div>
          {data.reviewAvg === 0 ? "New Store!" : data.reviewAvg}
        </span>
        <div className="mt-2 text-lg font-semibold">{data.storeName}</div>

        <div className="mt-3 text-sm space-y-2">
          <div>
            <span className="text-gray-500">업종:</span>
            <span className="ml-2 font-medium">{data.industryName}</span>
          </div>
          <div>
            <span className="text-gray-500">품목:</span>
            <span className="ml-2 font-medium">{data.mainMenu}</span>
          </div>
          <div className="flex items-center">
            <Banknote size={16} className="text-gray-500 mr-1" />
            <span className="text-gray-500">가격:</span>
            <span className="ml-2 font-medium">{data.price}원</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-gray-500 mr-1" />
            <span className="text-gray-500">전화번호:</span>
            <span className="ml-2 font-medium">{data.contact}</span>
          </div>
        </div>
      </div>
      {isAdding && <StoreDetail data={data} />}
    </div>
  );
}

export default StoreComponent;
