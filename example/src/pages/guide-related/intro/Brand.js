import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import n1 from "../../../assets/images/Brand/n1.png";
import n2 from "../../../assets/images/Brand/n2.png";
import n3 from "../../../assets/images/Brand/n3.png";
import banner from "../../../assets/images/Brand/banner.png";
import frontImage from "../../../assets/images/Brand/front.png";

const HeroSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="w-full bg-blue-500 py-14 flex justify-center px-6 gap-20">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex justify-end flex-col md:flex-row items-center max-w-5xl w-1/2">
        <div className="flex flex-col items-center md:items-start text-center md:text-left text-white md:w-1/2 ">
          <h3 className="text-3xl md:text-3xl font-bold">
            착한가격업소에 온걸 환영합니다!
          </h3>
          <p className="mt-4 text-lg max-w-lg">
            이 페이지는 이용자 가이드 페이지입니다. 챗봇을 이용하여 다양한
            기능을 알 수 있습니다. 또한 밑에 스크롤을 내려서 다양한 기능을 볼 수
            있습니다.
          </p>

          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-500 hover:text-white transition">
            자세히 보기{" "}
          </button>

          {/* 챗봇 모달 */}
        </div>
      </div>

      {/* 오른쪽 이미지 영역 */}
      <div className="mt-10 md:mt-0 md:w-1/2">
        <img
          src={n1}
          alt="Guide"
          className="w-64 md:w-80 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

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
            className="w-full border-gray-200"
            style={{ borderTopWidth: "20px" }}
          />
        </div>
      ))}
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <div className="py-16 flex flex-col items-center bg-white w-full px-0">
      <div className="flex flex-col md:flex-row items-center w-full">
        {/* 왼쪽: 철학 다이어그램 */}
        <div className="md:w-1/2 flex justify-center p-10">
          <div className="h-[806px] relative">
            <div className="w-[742px] h-[806px] static">
              <div className="bg-[#ffffff] rounded-[50%] border-solid border-[#000000] border w-[638px] h-[644px] absolute left-14 top-[35px]"></div>
              <div className="bg-[#ffffff] rounded-[50%] border-solid border-[#000000] border w-[424px] h-[428px] absolute left-[163px] top-[137px]"></div>
              <div className="text-[#000000] text-left font-bold text-2xl absolute left-[calc(50%_-_-194px)] top-[219px] w-[106.37px] h-[19.78px] flex items-center justify-start">
                앞으로의 목표
              </div>
              <img
                className="rounded-[233px] border-solid border-[#000000] border w-[200px] h-[24.81%] absolute left-[calc(50%_-_371px)] bottom-[56.58%] top-[18.61%]"
                style={{ objectFit: "cover" }}
                src={n1}
              />
              <img
                className="rounded-[233px] border-solid border-[#000000] border w-[200px] h-[24.81%] absolute left-[calc(50%_-_-171px)] bottom-[75.19%] top-[0%]"
                style={{ objectFit: "cover" }}
                src={n2}
              />
              <div className="w-[200px] h-[230px] static">
                <div className="text-[#000000] text-left font-bold text-2xl absolute left-[calc(50%_-_-9px)] top-[790px] w-[100px] h-4 flex items-center justify-start">
                  핵심 가치
                </div>
                <img
                  className="rounded-[233px] border-solid border-[#000000] border w-[200px] h-[24.81%] absolute left-[calc(50%_-_49px)] bottom-[3.72%] top-[71.46%]"
                  style={{ objectFit: "cover" }}
                  src={n3}
                />
              </div>
              <div className="text-[#000000] text-left font-bold text-2xl absolute left-[calc(50%_-_240px)] top-[368px] w-[68.8px] h-[25.61px] flex items-center justify-start">
                시작과 목적
              </div>
            </div>
            <div className="text-[#000000] text-center font-bold text-5xl absolute left-[calc(50%_-_83px)] top-[306px] w-[277px] h-[103px] flex items-center justify-center">
              기업철학
            </div>
          </div>
        </div>

        {/* 오른쪽: 설명 및 이미지 */}
        <div className="md:w-1/3 p-6 flex flex-col justify-center border-2 border-blue-500 rounded-lg h-[850px] translate-x-[250px]">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">기업철학</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-2">
            기업이 나아가야 할 방향과 가치, 그리고 목표를 명확히 하여 지속적인
            성장을 이끌어갑니다.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            우리는 핵심 가치를 중심으로 창업과 경영의 모든 과정에서 올바른
            철학을 가지고 나아갑니다.
          </p>
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
