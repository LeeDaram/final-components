import introduceImg from "../../../assets/images/site/introduce-1.png";
import introduceImg1 from "../../../assets/images/site/intro-1.png";
import introduceImg2 from "../../../assets/images/site/intro-2.png";
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
        <h2 className="text-3xl font-semibold mb-6">합리적 소비 촉진</h2>
        <hr className="border-black  w-[5%] mx-auto align-middle mb-7" />
        <p className="text-md text-black max-w-2xl mx-auto">
          전국의 다양한 업소 중 가성비가 뛰어난 곳을 한 곳에 모아 소비자들이
          현명한 선택을 할 수 있도록 돕습니다. 정보의 투명성: 실제 이용 후기와
          평가를 통해 업소의 실질적인 장단점을 투명하게 제공하여 소비자의 신뢰를
          쌓습니다. 지역 경제 활성화: 지역 내 숨은 맛집, 카페, 서비스 업체 등을
          발굴하여 지역 경제 발전에 기여합니다.
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
      <section className="p-12 text-center bg-gradient-to-r  text-black rounded-lg">
        <h2 className="text-3xl font-semibold mb-6">합리적 소비 촉진</h2>
        <hr className="border-black  w-[5%] mx-auto align-middle mb-7" />
        <p className="text-md text-black max-w-2xl mx-auto">
          전국의 다양한 업소 중 가성비가 뛰어난 곳을 한 곳에 모아 소비자들이
          현명한 선택을 할 수 있도록 돕습니다. 정보의 투명성: 실제 이용 후기와
          평가를 통해 업소의 실질적인 장단점을 투명하게 제공하여 소비자의 신뢰를
          쌓습니다. 지역 경제 활성화: 지역 내 숨은 맛집, 카페, 서비스 업체 등을
          발굴하여 지역 경제 발전에 기여합니다.
        </p>
      </section>
      <div className="flex justify-center items-center">
        <div className="w-9/12 mx-auto">
          {/* 5개 정보 카드 */}
          <section className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-xl hover:scale-105 transition-transform transform"
                >
                  <h3 className="text-xl font-semibold mb-3 text-indigo-600">
                    기능 {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600">
                    이 기능은 사용자의 필요에 맞춰 다양한 작업을 지원합니다.
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
        <hr className="border-black  w-[5%] mx-auto align-middle mb-7" />
        <p className="text-md max-w-2xl mx-auto">
          투명한 가격 정보 제공: 소비자가 정확한 정보를 바탕으로 합리적인 선택을
          할 수 있도록 지원합니다. 지역 경제 활성화: 소상공인과 소비자 간의
          소통을 통해 지역 경제 발전을 촉진합니다. 신뢰 기반 사회 구현: 신뢰할
          수 있는 데이터와 정보 공유로 모두가 함께 성장하는 사회를 만듭니다.
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
    </div>
  );
};

export default Service;
