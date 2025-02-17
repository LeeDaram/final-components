import React, { useState, useEffect } from "react";

const Service = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      name: "나영왕돈까스",
      city: "대전시",
      desc: "대전에 위치한 나영왕돈까스는 지역 주민들에게 저렴한 가격으로 고품질 반찬과 간단한 식사를 제공하는 곳입니다.",
    },
    {
      name: "신가네칼국수",
      city: "서울시",
      desc: "서울에 위치한 신가네칼국수는 지역 주민들에게 합리적인 가격으로 맛있는 칼국수와 다양한 반찬을 제공하는 식당입니다.",
    },
    {
      name: "돌고래순두부",
      city: "부산시",
      desc: "부산의 돌고래순두부는 착한가격업소의 좋은 예로, 합리적인 가격에 맛있는 음식을 제공하여 지역 주민들에게 큰 사랑을 받고 있습니다.",
    },
    {
      name: "ㅇㅇ",
      city: "ㅇㅇ",
      desc: "ㅇㅇ",
    },
    {
      name: "ㅇㅇ",
      city: "ㅇㅇ",
      desc: "ㅇㅇ",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-white text-gray-900">
      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center p-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="images/about-img.png"
            alt="About"
            className="w-72 shadow-xl rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            <span className="text-yellow-300">착한가격업소</span>는 저렴한
            가격과 <br />
            우수한 서비스를 제공합니다.
          </h2>
          <p className="mb-6 text-lg">
            정부와 지방자치단체가 지정한 물가안정 모범업소로 소비자에게 <br />
            저렴한 가격과 우수한 서비스를 제공합니다.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-yellow-300 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition shadow-lg"
          >
            바로가기
          </a>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="p-12">
        <h2 className="text-center text-4xl font-extrabold mb-12 text-gray-800">
          주요 기능 알아보기
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            "합리적인 가격 정책",
            "고품질 서비스 제공",
            "전문가 팀의 신뢰성",
            "고객의 맞춤형 서비스",
          ].map((title, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-blue-50 p-6 rounded-xl shadow-lg hover:scale-105 transition transform hover:shadow-xl"
            >
              <img
                src={`images/t${index + 1}.png`}
                alt={title}
                className="w-24 h-24 mb-6"
              />
              <h4 className="text-xl font-semibold text-center text-gray-800">
                {title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* 착한가격업소 사례 */}
      <section className="p-12 bg-gray-100">
        <h2 className="text-4xl text-center font-extrabold mb-12 text-gray-900">
          착한가격업소 사례
        </h2>
        <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-xl">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                className="min-w-full bg-white p-8 flex flex-col justify-center items-center text-center"
              >
                <h5 className="text-2xl font-bold mb-3 text-blue-600">
                  {item.name}
                </h5>
                <p className="text-sm text-gray-500 mb-4">{item.city}</p>
                <p className="text-gray-700 text-lg max-w-xl">{item.desc}</p>
              </div>
            ))}
          </div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-700"
            onClick={prevSlide}
          >
            ◀
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-700"
            onClick={nextSlide}
          >
            ▶
          </button>
        </div>
      </section>

      {/* 파트너사 소개 */}
      <section className="flex flex-col md:flex-row items-center p-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="images/about-img.png"
            alt="About"
            className="w-72 shadow-xl rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            <span className="text-yellow-300">착한가격업소</span>는 저렴한
            가격과 <br />
            우수한 서비스를 제공합니다.
          </h2>
          <p className="mb-6 text-lg">
            정부와 지방자치단체가 지정한 물가안정 모범업소로 소비자에게 <br />
            저렴한 가격과 우수한 서비스를 제공합니다.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-yellow-300 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition shadow-lg"
          >
            바로가기
          </a>
        </div>
      </section>

      <section className="p-16 bg-white">
        <div className="max-w-5xl mx-auto p-10 bg-white shadow-xl rounded-lg flex justify-between">
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
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white text-gray-800 border border-gray-400 rounded-md hover:bg-gray-100 transition shadow-sm w-23 h-23"
              >
                <i className={`fa ${item.icon} text-3xl mb-3`}></i>
                <span className="text-base font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
