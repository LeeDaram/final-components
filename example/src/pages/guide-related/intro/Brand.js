import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import n1 from "../../../assets/images/Brand/n1.png";
import n2 from "../../../assets/images/Brand/n2.png";
import n3 from "../../../assets/images/Brand/n3.png";

import frontImage from "../../../assets/images/Brand/front.png";


const HeroSection = () => {
  return (
    <div className="w-full bg-blue-500 py-14 flex justify-center px-6">
      <div className="max-w-5xl w-full text-center text-white">
        <h3 className="text-3xl font-bold">착한가격업소에 오신 것을 환영합니다</h3>
        <p className="mt-4 text-lg">
          이 페이지는 가이드 페이지로, 여기서 자세한 기능을 소개합니다.
        </p>
      </div>
    </div>
  );
};

const GoalsSection = () => {
  const [imageSize, setImageSize] = useState("w-1/2 md:w-1/3");

  const goalData = [
    {
      title: "우리의 목표",
      description:
        "창업부터 성장까지 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 지원합니다.",
      image: n1,
      reverse: false,
    },
    {
      title: "소상공인을 돕고 소비자가 믿을 수 있게",
      description:
        "창업부터 성장까지 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 지원합니다.",
      image: n2,
      reverse: true,
    },
    {
      title: "우리의 가치와 목표",
      description:
        "창업부터 성장까지 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 지원합니다.",
      image: n3,
      reverse: false,
    },
  ];

  return (
    <div className="py-16 flex flex-col items-center bg-white-100 w-full px-6">
      <div className="mb-6">
        <label className="text-lg font-bold mr-4">이미지 크기 조절:</label>
        <select
          value={imageSize}
          onChange={(e) => setImageSize(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="w-full md:w-3/4">크게</option>
          <option value="w-3/4 md:w-1/2">중간</option>
          <option value="w-1/2 md:w-1/3">작게</option>
        </select>
      </div>
      {goalData.map((goal, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center max-w-5xl w-full my-10 ${
            goal.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold text-gray-900">{goal.title}</h2>
            <p className="mt-4 text-lg text-gray-700">{goal.description}</p>
          </div>
          <div className="md:w-1/2 p-6 flex justify-center">
            <img
              src={goal.image}
              alt={goal.title}
              className={`${imageSize} rounded-lg shadow-lg`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <div className="py-16 flex flex-col items-center bg-white w-full px-6">
      <h2 className="text-3xl font-bold text-gray-900">기업철학</h2>
      <div className="relative flex justify-center mt-8 w-full max-w-3xl">
        {/* 중앙 원 */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-72 h-72 border border-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">기업철학</span>
          </div>
        </div>
        {/* 조정된 삼각형 형태 배치 */}
        <div className="relative w-full max-w-4xl flex justify-center items-center">
          <div className="absolute top-[-140px] left-1/3 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">앞으로의 목표</span>
            </div>
          </div>
          <div className="absolute top-[-120px] right-1/3 transform translate-x-1/2">
            <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">핵심 가치</span>
            </div>
          </div>
          <div className="absolute bottom-[-150px] left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">시작과 목적</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalSection = () => {
  return (
    <div className="py-64 flex flex-col items-center bg-white w-full px-6">
      <div className="w-full max-w-5xl flex justify-center mb-10">
        <img
          src={frontImage}
          alt="지원 이미지"
          className="w-full md:w-4/5 rounded-lg "
        />
      </div>
      <div className="w-full md:w-4/5 text-left border border-blue-500 p-8 rounded-2xl bg-white text-gray-900 shadow-md">
        <ul className="text-lg text-gray-700 space-y-4">
          <li>소상공인을 돕고 성장할 기회를 제공합니다.</li>
          <li>소비자가 신뢰하고 찾을 수 있는 환경을 만듭니다.</li>
        </ul>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <div>
      <HeroSection />
      <GoalsSection />
      <PhilosophySection />
      <FinalSection />
    </div>
  );
};

export default App;
