import { useEffect, useState } from "react";
import slide1 from "../../../assets/images/Park/slide1.png";
import slide2 from "../../../assets/images/Park/slide2.png";
import slide3 from "../../../assets/images/Park/slide3.png";
import project from "../../../assets/images/Park/project.jpg";

const slides = [slide1, slide2, slide3];

const timelineData = [
  { year: "2011", description: "착한가격업소 아이디어 구성" },
  {
    year: "2013",
    description: "시장 조사 및 사업 계획 수립",
    note: "미래를 위한 철저한 준비",
  },
  { year: "2015", description: "첫번째 착한 가격업소 선정" },
  {
    year: "2017",
    description: "고객 만족도 조사 실시",
    note: "고객의 소리를 듣다",
  },
  { year: "2018", description: "착한 가격업소 확대" },
  {
    year: "2019",
    description: "사회 공헌 활동 시작",
    note: "지역사회와 함께 성장",
  },
  { year: "2021", description: "착한 가격업소 인증 기준 강화" },
  {
    year: "2022",
    description: "고객 피드백 시스템 도입",
    note: "더 나은 서비스를 향한 혁신",
  },
  { year: "2024", description: "해외 진출 계획 발표" },
];

function HistoryPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white text-center py-6 text-2xl font-bold">
        우리 회사의 연혁
      </header>

      <div className="mx-auto bg-white p-6 mt-10 text-center">
        <div className="mb-4 relative w-full max-w-5xl mx-auto">
          <img
            src={project}
            alt="회사 연혁"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start bg-black bg-opacity-50 text-white px-6 py-4 rounded-lg">
            <p className="text-lg md:text-xl font-semibold text-left">
              착한 가격업소의 역사는 고객과 함께한 소중한 순간들로 가득합니다.
              <br />
              저희의 발자취를 통해 더 나은 미래를 향한 여정을 함께해주세요.
            </p>
            <p className="text-sm md:text-base text-gray-300 mt-2 text-left">
              착한 가격업소는 고객 여러분의 신뢰와 사랑에 힘입어 성장해
              왔습니다.
              <br />
              저희의 여정을 통해 고객에게 더 나은 서비스와 가치를 제공하기 위한
              노력의 역사를 소개합니다.
              <br />
              함께한 모든 순간들이 저희의 원동력이 되었으며, 앞으로도 지속적으로
              발전해 나갈 것을 약속드립니다.
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg">
          <img
            src={slides[currentSlide]}
            alt="슬라이드 이미지"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        <div className="relative mx-auto w-full max-w-4xl mt-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-10 ${
                index % 2 === 0 ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white"></div>
              <div className="w-1/2 p-4">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <div className="text-blue-600 font-bold text-xl">
                    {item.year}
                  </div>
                  <p className="text-gray-700 mt-2">{item.description}</p>
                </div>
              </div>
              {item.note && (
                <div className="w-1/2 p-4 text-gray-600 italic text-sm md:text-base">
                  {item.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
