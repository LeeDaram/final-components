import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";

// 이미지 임포트
import header from "../../../assets/images/Brand/001.png";
import n1 from "../../../assets/images/Brand/n1.jpg";
import n2 from "../../../assets/images/Brand/n2.jpg";
import n3 from "../../../assets/images/Brand/n3.jpg";
import banner from "../../../assets/images/Brand/banner.png";
import banner2 from "../../../assets/images/Brand/banner2.jpg";
import banner3 from "../../../assets/images/Brand/banner.jpg";
import SECTION2 from "../../../assets/images/Brand/SECTION5.png";

import ImchatBot from "./imchat.js/Imchatbot";
import {
  FaQuestionCircle,
  FaPlayCircle,
  FaTimes,
  FaInstagramSquare,
} from "react-icons/fa";

const SingleComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const HeroSection = () => {
    return (
      <div className="w-full bg-blue-500 py-8 sm:py-14 px-4 sm:px-6 mb-3">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 max-w-5xl mx-auto">
          {/* 왼쪽 텍스트 영역 */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left text-white">
            <h3 className="text-xl sm:text-2xl font-bold">
              착한가격업소에 온걸 환영합니다!
            </h3>
            <p className="mt-4 text-base sm:text-lg max-w-lg">
              이 페이지는 브랜드 가이드 영역입니다. 착한가격업소의 브랜드 가치
              이 사업을 시작한 이유들을 소개하는 페이지입니다. 이 사업을 시작한
              이유들을 소개하는 페이지입니다.
            </p>
            <button
              className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-800 hover:text-white hover:scale-105 transition-transform duration-300"
              onClick={onOpenChat}
            >
              자세히 보기
            </button>
            {isChatOpen && (
              <div className="fixed inset-0 md:top-[calc(56px+10px)] md:left-auto md:right-4 flex items-center justify-center md:justify-end z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-80 h-[400px] md:h-[500px] flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4 flex justify-between border-b">
                    <h2 className="text-base sm:text-lg font-semibold">챗봇</h2>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✖
                    </button>
                  </div>
                  <div className="flex-1">
                    <ImchatBot />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽 이미지 영역 */}
          <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src={header}
              alt="Guide"
              className="w-48 sm:w-64 md:w-80 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    );
  };

  const GoalsSection = () => {
    const goalData = [
      {
        title1: "소상공인의 꿈과 소비자의 자유를 위해",
        description:
          "우리는 양심 있고 성실한 소상공인들을 지원하고, 소비자들에게 더 나은 선택의 기회를 제공하기 위해 이 브랜드를 시작했습니다.",
        image: banner,
        reverse: false,
      },
      {
        title: "우리의 가치와 사명",
        description:
          "창업에서 성장까지, 소상공인에게 꼭 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 돕습니다.",
        image: banner2,
        reverse: true,
      },
      {
        title: "우리의 약속",
        description:
          "창업의 첫걸음부터 성장의 순간까지, 소상공인의 안정과 성공을 위한 정보와 네트워크를 함께 만들어갑니다.",
        image: banner3,
        reverse: false,
      },
    ];

    return (
      <>
        <hr
          className="w-full border-white"
          style={{ borderTopWidth: "10px" }}
        />
        <div className="flex flex-col items-center bg-white-100 w-full px-4 sm:px-0">
          {goalData.map((goal, index) => (
            <div key={index} className="w-full">
              <div
                className={`flex flex-col md:flex-row items-center w-full my-0 ${
                  goal.reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 글 영역 */}
                <div className="md:flex-[4] p-4 sm:p-6 flex justify-center items-center bg-white hover:bg-gray-50 transition-colors duration-300">
                  <div className="max-w-md">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                      {goal.title}
                    </h2>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {goal.title1}
                    </h2>
                    <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>

                {/* 이미지 영역 */}
                <div className="md:flex-[6] flex justify-center my-[10px] hover:scale-105 transition-transform duration-300">
                  <img
                    src={goal.image}
                    alt={goal.title || goal.title1}
                    className="w-full h-auto max-h-[300px] object-cover"
                  />
                </div>
              </div>
              <hr
                className="w-full border-white"
                style={{ borderTopWidth: "10px" }}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  const PhilosophySection = () => {
    return (
      <div className="w-full bg-white py-12 sm:py-16 px-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-6 md:gap-20">
          {/* 이미지 */}
          <div className="w-full md:w-1/2 flex justify-center items-center px-4 hover:scale-105 transition-transform duration-300">
            <img
              src={SECTION2}
              alt="Brand Philosophy"
              className="w-full h-auto object-contain"
            />
          </div>
          {/* 텍스트 */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 mb-8 md:mb-0 hover:bg-gray-50 transition-colors duration-300">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              기업철학
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              기업이 나아가야 할 방향과 가치, 그리고 목표를 명확히 하여 지속적인
              성장을 이끌어 갑니다.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              우리는 핵심 가치를 중심으로 창업과 경영의 모든 과정에서 올바른
              철학을 가지고 나아갑니다.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const WhyInfotech = () => {
    return (
      <div className="bg-white w-full px-4 sm:px-6 py-12 sm:py-16">
        <div className="w-full sm:w-3/4 md:w-1/2 mx-auto mb-8">
          <h3 className="text-blue-500 font-bold text-lg sm:text-xl mb-2 text-center sm:text-left">
            착한가격업소
          </h3>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
            소상공인들이 이 사이트를 선택한 이유!
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
          {/* 카드 1 */}
          <div className="p-4 sm:p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-lg transition-transform duration-300">
            <img
              src={n1}
              alt="시작과 목적"
              className="mb-4 w-full max-w-[200px] sm:max-w-[243px] h-auto object-cover rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              사용하기 쉬운 시스템
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm mb-2">
              직관적인 UI로 초보자도 쉽게 사용 가능
            </p>
            <p className="text-gray-700 text-xs sm:text-sm mb-2">
              모바일 최적화로 어디서나 간편 관리
            </p>
          </div>

          {/* 카드 2 */}
          <div className="p-4 sm:p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-lg transition-transform duration-300">
            <img
              src={n2}
              alt="핵심 가치"
              className="mb-4 w-full max-w-[200px] sm:max-w-[243px] h-auto object-cover rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              운영 효율성
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm mb-2">
              저렴한 초기 비용 또는 무료 플랜 제공
            </p>
            <p className="text-gray-700 text-xs sm:text-sm mb-2">
              마케팅 툴 지원으로 추가 비용 없이 매출 증가
            </p>
          </div>

          {/* 카드 3 */}
          <div className="p-4 sm:p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-lg transition-transform duration-300">
            <img
              src={n3}
              alt="앞으로의 목표"
              className="mb-4 w-full max-w-[200px] sm:max-w-[243px] h-auto object-cover rounded-xl"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              신뢰할 수 있는 지원
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm mb-2">
              24시간 고객 지원 및 교육 자료 제공
            </p>
            <p className="text-gray-700 text-xs sm:text-sm mb-2">
              제휴 및 홍보 기회로 고객 확보 가능
            </p>
          </div>
        </div>
      </div>
    );
  };

  const HeaderSection = () => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const toggleHelpModal = () => {
      setIsHelpOpen(!isHelpOpen);
    };

    return (
      <div className="w-full bg-white py-6 sm:py-8 mt-12 sm:mt-24 mb-12 sm:mb-24 border border-gray-300 rounded-lg">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
          {/* 왼쪽 텍스트 */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-full shadow-lg">
              <FaQuestionCircle className="text-white w-6 sm:w-8 h-6 sm:h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
              착한가격업소, 무엇이 더 궁금하신가요?
            </h2>
          </div>

          {/* 오른쪽 아이콘 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="https://www.youtube.com/watch?v=kdqPw9kCth0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
            >
              <FaPlayCircle className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-base sm:text-lg font-semibold">
                가이드 영상 보기
              </span>
            </a>
            <button
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
              onClick={toggleHelpModal}
            >
              <FaQuestionCircle className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-base sm:text-lg font-semibold">도움말</span>
            </button>
            <a
              href="https://www.instagram.com/withyou3542/?utm_source=ig_embed&ig_rid=5a14ad0c-ea41-4cd1-b0c9-fc9ab905e1d4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
            >
              <FaInstagramSquare className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-base sm:text-lg font-semibold">
                공식 인스타
              </span>
            </a>
          </div>
        </div>

        {/* 도움말 모달 */}
        {isHelpOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold">도움말</h3>
                <button
                  onClick={toggleHelpModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 text-sm sm:text-base">
                  무엇이 더 궁금하신가요?
                </p>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm">
                  <li>자주 묻는 질문은 챗봇을 써 주시길 바랍니다</li>
                  <li>
                    자세한 질문은{" "}
                    <span className="font-bold">010-1111-1111</span>로
                    연락주시길 바랍니다.
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleHelpModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <HeroSection />
      <div className="w-full sm:w-11/12 md:w-9/12 mx-auto flex flex-col items-center">
        <GoalsSection />
        <PhilosophySection />
        <WhyInfotech />
      </div>
      <HeaderSection />
    </>
  );
};

export default SingleComponent;
