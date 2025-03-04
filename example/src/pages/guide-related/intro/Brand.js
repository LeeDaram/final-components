import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 이미지 임포트 (사용 중인 경로 그대로 유지)
import n1 from "../../../assets/images/Brand/n1.png";
import n2 from "../../../assets/images/Brand/n2.png";
import n3 from "../../../assets/images/Brand/n3.png";
import banner from "../../../assets/images/Brand/banner.png";
import frontImage from "../../../assets/images/Brand/front.png";
import SECTION2 from "../../../assets/images/Brand/SECTION2.png";
import SECTION3 from "../../../assets/images/Brand/SECTION4.png";

// 원하는 이름으로 통합 컴포넌트를 선언 (예: SingleComponent)
const SingleComponent = () => {
  // 1) HeroSection 서브 컴포넌트
  const HeroSection = () => {
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
              기능을 알 수 있습니다. 또한 밑에 스크롤을 내려서 다양한 기능을 볼
              수 있습니다.
            </p>

            <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-500 hover:text-white transition">
              자세히 보기{" "}
            </button>
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
        <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
          <h3 className="text-blue-500 font-bold text-xl mb-2">착한가격업소</h3>
          <h2 className="text-2xl font-semibold mb-4">
            소상공인들이 왜 이 사이트를 선택한 이유!
          </h2>
          <p className="text-gray-700 mb-4">지금 확인하세요!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[100px]">
          {/* 1) 첫 번째 카드 */}
          <div className="p-6 flex flex-col items-center text-center">
            <img
              src={n1}
              alt="시작과 목적"
              className="mb-4 w-[243px] h-[209px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">시작과 목적</h3>
            <p className="text-gray-700 text-sm">
              착한 업소 솔루션은 소상공인을 돕고, 소비자가 믿고 찾을 수 있는
              공간을 만들기 위해 시작되었습니다.
            </p>
          </div>

          {/* 2) 두 번째 카드 */}
          <div className="p-6 flex flex-col items-center text-center">
            <img
              src={n2}
              alt="핵심 가치"
              className="mb-4 w-[243px] h-[209px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">핵심 가치</h3>
            <p className="text-gray-700 text-sm">
              단순한 업소 추천을 넘어, 착한 소비 문화를 조성하며 지역 경제
              활성화에 기여하고자 합니다.
            </p>
          </div>

          {/* 3) 세 번째 카드 */}
          <div className="p-6 flex flex-col items-center text-center">
            <img
              src={n3}
              alt="앞으로의 목표"
              className="mb-4 w-[243px] h-[209px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2">앞으로의 목표</h3>
            <p className="text-gray-700 text-sm">
              앞으로도 소상공인과 소비자가 함께 성장하는 지속 가능한 플랫폼으로
              발전해 나가겠습니다.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 여기서 "하나의 컴포넌트"로 전체 화면을 구성
  return (
    <>
      {/* HeroSection (상단 배너) */}
      <HeroSection />

      {/* 중앙 정렬 컨테이너 안에 3개 섹션 나열 */}
      <div className="w-9/12 mx-auto flex flex-col items-center">
        <GoalsSection />
        <PhilosophySection />
        <WhyInfotech />
      </div>
    </>
  );
};

export default SingleComponent;
