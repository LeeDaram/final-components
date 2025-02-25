import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
const EconomyDiagram = () => {
  return (
    <div className="flex items-center justify-center p-6 space-x-6">
      {/* 소비자 */}
      <div className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-xl shadow-md w-48 ">
        <h3 className="text-lg font-bold">소비자</h3>
        <div className="bg-white text-black text-sm rounded-md px-6 py-2 mt-2 w-36 text-center shadow-inner">
          저렴한 가격
        </div>
        <div className="bg-white text-black text-sm rounded-md px-6 py-2 mt-2 w-36 text-center shadow-inner">
          우수한 서비스
        </div>
      </div>

      <div>
        <FaPlus />
      </div>

      {/* 업소 */}
      <div className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-xl shadow-md w-50 ">
        <h3 className="text-lg font-bold">업소</h3>
        <div className="bg-white text-black text-sm rounded-md px-8 py-2 mt-2 w-48 text-center shadow-inner">
          다양한 혜택지원
        </div>
      </div>

      <div>
        <FaArrowRight />
      </div>

      {/* 물가안정 및 서민경제 활성화 */}
      <div className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-xl shadow-md w-48 ">
        <h3 className="text-lg font-bold">물가안정</h3>
        <div className="text-black bg-white text-sm rounded-md px-6 py-2 mt-2 w-36 text-center shadow-inner">
          서민경제
          <br /> 활성화
        </div>
      </div>
    </div>
  );
};

export default EconomyDiagram;
