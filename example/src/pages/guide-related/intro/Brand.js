import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";

// 이미지 임포트 (사용 중인 경로 그대로 유지)
import n1 from "../../../assets/images/Brand/n1.png";
import n2 from "../../../assets/images/Brand/n2.png";
import n3 from "../../../assets/images/Brand/n3.png";
import banner from "../../../assets/images/Brand/banner.png";
import SECTION2 from "../../../assets/images/Brand/SECTION5.png";

import ImchatBot from "./imchat.js/Imchatbot";

import {
  FaQuestionCircle,
  FaPlayCircle,
  FaTimes,
  FaInstagramSquare,
} from "react-icons/fa";
// 1) HeroSection 서브 컴포넌트
const SingleComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const HeroSection = () => {
    return (
      <div className="w-full bg-blue-500 py-14 flex justify-center px-6 gap-20">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex justify-end flex-col md:flex-row items-center max-w-5xl w-1/2">
          <div className="flex flex-col items-center md:items-start text-center md:text-left text-white md:w-1/2 ">
            <h3 className="text-2xl md:text-2xl font-bold">
              착한가격업소에 온걸 환영합니다!
            </h3>
            <p className="mt-4 text-lg max-w-lg">
              이 페이지는 브랜드 가이드 영역입니다. 착한가격업소의 브랜드 가치
              이 사업을 시작한 이유들을 소개하는 페이지입니다.
            </p>

            <a
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-500 hover:text-white transition"
              onClick={onOpenChat}
            >
              자세히 보기{" "}
            </a>
            {isChatOpen && (
              <div className="fixed top-56 left-[1550px] items-center flex justify-end z-50 mr-8">
                <div className="bg-white rounded-lg shadow-lg w-80 h-[500px] flex flex-col">
                  <div className="p-4 flex justify-between border-b">
                    <h2 className="text-lg font-semibold">챗봇</h2>
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
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <img
            src={n1}
            alt="Guide"
            className="w-64 md:w-80 object-cover rounded-xl shadow-lg "
          />
        </div>
      </div>
    );
  };

  // 2) GoalsSection 서브 컴포넌트
  const GoalsSection = () => {
    const goalData = [
      {
        title: "우리의 목표",
        description:
          "창업부터 성장까지 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 지원합니다.",
        image: banner,
        reverse: false,
      },
      {
        title: "소상공인을 돕고, 소비자가 믿을 수 있게",
        description:
          "창업부터 성장까지 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 지원합니다.",
        image: banner,
        reverse: true,
      },
      {
        title: "우리의 가치와 목표",
        description:
          "창업부터 성장까지 필요한 정보와 네트워크를 제공하여 안정적인 운영과 경쟁력 강화를 지원합니다.",
        image: banner,
        reverse: false,
      },
    ];

    return (
      <>
        <hr
          className="w-full border-white"
          style={{ borderTopWidth: "20px" }}
        />
        <div className="flex flex-col items-center bg-white-100 w-full px-0">
          {goalData.map((goal, index) => (
            <div key={index} className="w-full">
              <div
                className={`flex flex-col md:flex-row items-center w-full my-0 ${
                  goal.reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 글 영역 (30%) */}
                <div className="flex-[4] p-10 flex justify-center items-center bg-white">
                  <div className="max-w-lg">
                    <h2 className="text-4xl font-bold text-gray-900">
                      {goal.title}
                    </h2>
                    <p className="mt-6 text-xl text-gray-700 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>

                {/* 이미지 영역 (70%) */}
                <div className="flex-[6] flex justify-center">
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 구분선 (20px 두께) */}
              <hr
                className="w-full border-white"
                style={{ borderTopWidth: "20px" }}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  // 3) PhilosophySection 서브 컴포넌트
  const PhilosophySection = () => {
    return (
      <div className="w-full bg-white py-16 px-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto  md:gap-x-[160px]">
          {/* 오른쪽: 이미지 */}
          <div className="md:w-1/2 flex justify-center items-center px-4">
            <img
              src={SECTION2}
              alt="Brand Philosophy"
              className="w-full h-auto object-contain"
            />
          </div>
          {/* 왼쪽: 설명 텍스트 */}
          <div className="md:w-1/2 flex flex-col justify-center px-4 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">기업철학</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              기업이 나아가야 할 방향과 가치, 그리고 목표를 명확히 하여 지속적인
              성장을 이끌어 갑니다.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              우리는 핵심 가치를 중심으로 창업과 경영의 모든 과정에서 올바른
              철학을 가지고 나아갑니다.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 4) WhyInfotech 서브 컴포넌트
  const WhyInfotech = () => {
    return (
      <div className="bg-white w-full px-6 py-16">
        <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8 ml-[550px]">
          <h3 className="text-blue-500 font-bold text-xl mb-2 ml-[150px]">
            착한가격업소
          </h3>
          <h2 className="text-2xl font-semibold mb-4">
            소상공인들이 왜 이 사이트를 선택한 이유!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[100px]">
          {/* 1) 첫 번째 카드 */}
          <div className="p-6 flex flex-col items-center text-center">
            <img
              src={n1}
              alt="시작과 목적"
              className="mb-4 w-[243px] h-[209px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">사용하기 쉬운 시스템</h3>
            <p className="text-gray-700 text-sm">
              직관적인 UI로 초보자도 쉽게 사용 가능
            </p>
            <p className="text-gray-700 text-sm">
              {" "}
              모바일 최적화로 어디서나 간편 관리.
            </p>
          </div>

          {/* 2) 두 번째 카드 */}
          <div className="p-6 flex flex-col items-center text-center">
            <img
              src={n2}
              alt="핵심 가치"
              className="mb-4 w-[243px] h-[209px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">운영 효율성</h3>
            <p className="text-gray-700 text-sm">
              저렴한 초기 비용 또는 무료 플랜 제공
            </p>
            <p className="text-gray-700 text-sm">
              {" "}
              마케팅 툴 지원으로 추가 비용 없이 매출 증가
            </p>
          </div>

          {/* 3) 세 번째 카드 */}
          <div className="p-6 flex flex-col items-center text-center">
            <img
              src={n3}
              alt="앞으로의 목표"
              className="mb-4 w-[243px] h-[209px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">신뢰할 수 있는 지원</h3>
            <p className="text-gray-700 text-sm">
              24시간 고객 지원 및 교육 자료 제공
            </p>
            <p className="text-gray-700 text-sm">
              {" "}
              제휴 및 홍보 기회로 고객 확보 가능
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 맨 윗 부분 (헤더)*/}
      <HeroSection />

      {/* 중간 부분 (메인 내용) */}
      <div className="w-9/12 mx-auto flex flex-col items-center">
        <GoalsSection />
        <PhilosophySection />
        <WhyInfotech />
      </div>
      {/* 맨 밑 부분 (가이드 페이지)*/}
      <HeaderSection />
    </>
  );
};

const HeaderSection = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false); // 도움말 모달 상태

  // 도움말 모달 열기/닫기 함수
  const toggleHelpModal = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  return (
    <div className="w-full bg-white py-8 mt-[100px] mb-[100px] border border-gray-300 rounded-lg">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-full shadow-lg">
            <FaQuestionCircle className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            착한가격업소, 무엇이 더 궁금하신가요?
          </h2>
        </div>

        {/* 오른쪽 아이콘 영역 */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.youtube.com/watch?v=kdqPw9kCth0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
          >
            <FaPlayCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">가이드 영상 보기</span>
          </a>
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
            onClick={toggleHelpModal}
          >
            <FaQuestionCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">도움말</span>
          </button>
          <a
            href="https://www.instagram.com/withyou3542/?utm_source=ig_embed&ig_rid=5a14ad0c-ea41-4cd1-b0c9-fc9ab905e1d4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
          >
            <FaInstagramSquare className="w-6 h-6" />
            <span className="text-lg font-semibold">공식 인스타</span>
          </a>
        </div>
      </div>

      {/* 도움말 모달 */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">도움말</h3>
              <button
                onClick={toggleHelpModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="space-y-4">
              <p className="text-gray-700">무엇이 더 궁금하신가요?</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>자주 묻는 질문은 챗봇을 써 주시길 바랍니다</li>
                <li>
                  자세한 질문은 <span className="font-bold">010-1111-1111</span>
                  로 연락주시길 바랍니다.
                </li>
              </ul>
            </div>
            {/* 모달 푸터 */}
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

export default SingleComponent;
