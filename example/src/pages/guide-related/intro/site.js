import introduceImg from "../../../assets/images/site/introduce-1.jpg";
import introduceImg2 from "../../../assets/images/site/intro-2.png";
import group from "../../../assets/images/site/group-1.png";
import React, { useState, useEffect } from "react";

const Service = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    "https://via.placeholder.com/800x400?text=Chart+1",
    "https://via.placeholder.com/800x400?text=Chart+2",
    "https://via.placeholder.com/800x400?text=Chart+3",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 제목 및 설명 */}
      <section className="p-12 text-center bg-gradient-to-r text-black rounded-lg">
        <h2 className="text-3xl font-semibold mt-10 mb-6">
          착한업소솔루션 소개
        </h2>
        <hr className="border-blue-500 w-[5%] mx-auto align-middle mb-7" />
        <p className="text-md text-black max-w-2xl mx-auto">
          착한업소솔루션은 전국 각지의 가성비 좋은 업소들을 엄선해 한눈에 비교할
          수 있도록 도와주는 플랫폼입니다. 우리는 소비자들이 쉽고 빠르게 믿을
          만한 업소 정보를 찾아내어 합리적인 선택을 할 수 있도록 지원합니다.
        </p>
      </section>

      <div className="flex justify-center items-center">
        <div className="w-9/12 mx-auto">
          {/* 차트 이미지 슬라이더 */}
          <section className="p-12">
            <div className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-xl">
              <div
                className="flex w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={introduceImg2}
                    alt={`Chart ${index + 1}`}
                    className="min-w-full h-[450px] object-cover rounded-2xl"
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 중간 제목 및 설명 */}
      <section className="p-12 text-center bg-gradient-to-r text-black rounded-lg">
        <h2 className="text-3xl font-semibold mb-6">합리적 소비 촉진</h2>
        <hr className="border-blue-500 w-[5%] mx-auto align-middle mb-7" />
        <p className="text-md text-black max-w-2xl mx-auto">
          전국의 다양한 업소 중 가성비가 뛰어난 곳을 한 곳에 모아 소비자들이
          현명한 선택을 할 수 있도록 돕습니다. 정보의 투명성: 실제 이용 후기와
          평가를 통해 업소의 실질적인 장단점을 투명하게 제공하여 소비자의 신뢰를
          쌓습니다. 지역 경제 활성화: 지역 내 숨은 맛집, 카페, 서비스 업체 등을
          발굴하여 지역 경제 발전에 기여합니다.
        </p>

        {/* 중앙 정렬된 이미지 */}
        <div className="flex justify-center mt-20">
          <img
            src={group}
            alt="설명 이미지"
            className="max-w-7xl w-[80%] rounded-lg "
          />
        </div>
      </section>
      <div className="flex justify-center items-center">
        <div className="w-9/12 mx-auto">
          {/* 5개 정보 카드 */}
          <section className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "목표 설정",
                  description: "소비자에게 가성비 좋은\n업소정보 제공",
                },
                {
                  title: "정보 투명성",
                  description: "실제 후기와 평가로\n업소 장단점 전달",
                },
                {
                  title: "업소 발굴",
                  description: "지역 내 숨은 맛집과\n서비스 업체 조사",
                },
                {
                  title: "소비자 참여",
                  description: "후기 작성 및 평가\n시스템 구축",
                },
                {
                  title: "경제 활성화",
                  description: "발굴된 업소로\n지역경제 발전 기여",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-xl hover:scale-105 transition-transform transform flex flex-col items-center text-center"
                >
                  <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* 하단 섹션 */}
      <section className="p-12 text-center bg-gradient-to-r  text-black rounded-lg">
        <h2 className="text-3xl font-semibold mb-6">우리의 목적은</h2>
        <hr className="border-blue-500  w-[5%] mx-auto align-middle mb-7" />
        <p className="text-md max-w-2xl mx-auto">
          투명한 가격 정보 제공: 소비자가 정확한 정보를 바탕으로 합리적인 선택을
          할 수 있도록 지원합니다. 소상공인과 소비자 간의 소통을 통해 지역 경제
          발전을 촉진합니다. 신뢰 기반 사회 구현 신뢰할 수 있는 데이터와 정보
          공유로 모두가 함께 성장하는 사회를 만듭니다.
        </p>
      </section>
      <div className="flex justify-center items-center">
        <div className="w-9/12 mx-auto">
          {/* 하단 3개 이미지 */}
          <section className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center hover:scale-105 transition-transform"
                >
                  <img
                    src={introduceImg}
                    alt={`Image ${index + 1}`}
                    className="w-full h-80 object-cover rounded-xl shadow-md"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      {/* 헬프미 */}
      <section className="p-16 bg-white">
        <div className="max-w-4xl mx-auto p-10 bg-white shadow-xl rounded-lg flex justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-left">
              착한가격업소, 무엇이 더 궁금하신가요?
            </h3>
            <p className="text-left text-blue-500">
              전화상담 연결은 해당 업소 주문 관련 상담만 가능합니다.
            </p>
          </div>
          <div className="flex space-x-6">
            {[
              { label: "도움요청", icon: "fa-info-circle" },
              { label: "영상보기", icon: "fa-video-camera" },
              { label: "전화상담", icon: "fa-phone" },
            ].map((item, index) => (
              <button
                key={index}
                className="bg-white border border-gray-300 text-gray-800 flex flex-col items-center p-4 shadow-sm rounded-lg
                     hover:bg-gray-100 active:scale-95 transition-all duration-200 ease-in-out"
              >
                <i className={`fa ${item.icon} text-3xl mb-2`}></i>
                <span className="text-base font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
