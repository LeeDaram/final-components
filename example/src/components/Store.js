import React from "react";
import { Phone, Banknote } from "lucide-react";

function StoreComponent({ data }) {
  return (
    <div className="w-80 min-h-72 border rounded-lg shadow-lg overflow-hidden p-4 bg-white flex flex-col">
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
        <img
          src={data.storeImage}
          alt="이미지"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 px-2">
        <span className="text-blue-600 text-sm font-bold">New</span>
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
    </div>
  );
}

export default StoreComponent;
