import React, { useState, useEffect } from "react";
import HmImg0 from "../../../assets/images/herosection/hm-0.png";
import HmImg from "../../../assets/images/herosection/hm-1.png";
import HmImg2 from "../../../assets/images/herosection/hm-2.png";
import HmImg3 from "../../../assets/images/herosection/hm-3.png";
import QR from "../../../assets/images/site/QR-1.png";

const HeroSection = () => {
  const [showMore, setShowMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedBoxes, setExpandedBoxes] = useState({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const images = [HmImg, HmImg2, HmImg3];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("dynamic-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleBox = (index) => {
    setExpandedBoxes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 bg-white">
        {/* About Section */}
        <section className="flex flex-col lg:flex-row items-center justify-center w-full px-6 text-black py-24">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl w-full gap-16">
            {/* 텍스트 컨텐츠 */}
            <div className="lg:w-1/2 w-full text-left">
              <h2 className="text-4xl font-extrabold mt-4 mb-6 leading-relaxed">
                소비자를 위한 <br /> 착한녀석들 가이드
              </h2>
              <hr className="border-blue-500 w-16 mb-7" />
              <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                정부와 지방자치단체가 지정한 물가안정 모범업소로 소비자에게{" "}
                <br />
                저렴한 가격과 우수한 서비스를 제공합니다.
              </p>

              {/* CTA 버튼 */}
              <div className="mt-6">
                <a href="#" className="inline-block">
                  <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition">
                    착한가격 업소 찾기
                  </button>
                </a>
              </div>

              {/* 통계 정보 */}
              <div className="mt-10 flex flex-wrap gap-6">
                <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                  <h3 className="text-3xl font-bold text-blue-600 ">높음</h3>
                  <p className="text-gray-700 text-sm mt-2">소비자들 만족</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                  <h3 className="text-3xl font-bold text-blue-600">정상</h3>
                  <p className="text-gray-700 text-sm mt-2">이용가능 녀부</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                  <h3 className="text-3xl font-bold text-blue-600">우수</h3>
                  <p className="text-gray-700 text-sm mt-2">공공기관 평가</p>
                </div>
              </div>
            </div>

            {/* 이미지 */}
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
              <img
                src={HmImg0}
                alt="About"
                className="w-full max-w-[480px] rounded-lg drop-shadow-lg transform transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </section>

        <div className="max-w-5xl w-full text-center">
          <div className="mt-16 space-y-10" id="dynamic-section">
            {["discount", "review", "security"].map((item, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="flex items-center space-x-6 hover:bg-gray-200 bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                  onClick={() => toggleBox(index)}
                >
                  <img
                    src={images[index]}
                    alt="관련 이미지"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                  />
                  <div className="text-left">
                    <p className="text-gray-800 font-semibold text-2xl mb-3">
                      {item === "discount" && "가격이 왜 저렴할까요?"}
                      {item === "review" && "문제가 생기면 어떻게 하나요?"}
                      {item === "security" && "품질은 어떻게 보장되나요?"}
                    </p>
                    <p className="text-gray-700 text-base">
                      {item === "discount" &&
                        '"요즘 물가가 많이 비싼데... 착한가격 업소는 왜 가격이 저렴한가요?"'}
                      {item === "review" &&
                        '"서비스 이용 후 문제가 생기면 어떻게 해야 하나요?"'}
                      {item === "security" &&
                        '"가격이 저렴하면 품질도 낮은 거 아닌가요?"'}
                    </p>
                  </div>
                </div>
                {expandedBoxes[index] && (
                  <div className="mt-4 bg-gray-100 p-6 rounded-lg shadow-md">
                    <p className="text-gray-700 font-medium text-lg">
                      📌{" "}
                      {item === "discount" &&
                        "착한가격 업소는 정부와 지자체의 지원을 받아 운영되기 때문에 가격을 합리적으로 유지할 수 있습니다."}
                      {item === "review" &&
                        "걱정하지 마세요! 착한가격 업소는 소비자를 위한 보호 시스템이 마련되어 있습니다."}
                      {item === "security" &&
                        "아니에요! 착한가격 업소는 정부의 엄격한 기준을 통과한 믿을 수 있는 업소입니다."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            onClick={() => setShowMore(!showMore)}
          >
            <span
              className={`transition-transform duration-300 ${
                showMore ? "rotate-180" : ""
              }`}
            >
              {showMore ? "간략히 보기 ▲" : "더 보기"}
            </span>
          </button>
          {showMore && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                착한가격 업소, 왜 선택해야 할까요?
              </h3>
              <p className="text-gray-700">
                착한가격 업소란 정부에서 가격과 서비스의 적정성을 평가하여
                인증한 업소입니다. 합리적인 소비를 위한 정보를 제공합니다.
              </p>
            </div>
          )}
          {showMore && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md text-left relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                착한가격 업소, 정말 믿을 수 있을까요?
              </h3>
              <p className="text-gray-700">
                착한가격 업소는 정부와 지자체의 심사를 거쳐 가격과 서비스 품질을
                인증받은 업소이며, 단순히 저렴한 가격만을 내세우는 곳이
                아닙니다.
              </p>
            </div>
          )}
          {showMore && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md text-left relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                착한가격 업소, 가격과 품질 모두 만족할 수 있는 이유
              </h3>
              <p className="text-gray-700">
                착한가격 업소는 가격이 저렴하면서도 품질이 우수합니다. 정부
                인증을 받은 업소로, 두 가지 모두 만족할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 헬프미 (항상 하단에 위치) */}
      <section className="p-16 bg-white w-full">
        <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl rounded-lg flex justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-left">
              착한녀석들, 무엇이 더 궁금하신가요?
            </h3>
            <p className="text-left text-blue-500">
              전화상담 연결은 해당 업소 주문 관련 상담만 가능합니다.
            </p>
          </div>
          <div className="flex space-x-6">
            {[
              { label: "도움요청", icon: "fa-info-circle" },
              {
                label: "챗봇문의",
                icon: "fa-video-camera",
                onClick: () => setIsChatbotOpen(true),
              },
              { label: "전화상담", icon: "fa-phone" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="bg-white border border-gray-300 text-gray-800 flex flex-col items-center p-4 shadow-sm rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 ease-in-out"
              >
                <i className={`fa ${item.icon} text-3xl mb-2`}></i>
                <span className="text-base font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 챗봇 팝업 */}
      {isChatbotOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-all"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              챗봇 문의
            </h2>
            <img
              src={QR}
              alt="챗봇 이미지"
              className="mx-auto mb-4 w-32 h-32 rounded-lg shadow-md"
            />
            <p className="text-gray-600 text-center leading-relaxed">
              스마트폰 카메라 및 QR스캐너를 이용하여 <br />
              스캔하면 모바일 챗봇으로 연결됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
