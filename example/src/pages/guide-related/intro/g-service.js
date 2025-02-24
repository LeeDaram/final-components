import React, { useState, useEffect } from "react";
import aboutImg from "../../../assets/images/g-service/about.png";
import functionImg from "../../../assets/images/g-service/function-4.png";
import partnerImg from "../../../assets/images/g-service/partner-1.png";
import partnerImg2 from "../../../assets/images/g-service/partner-2.png";
import partnerImg3 from "../../../assets/images/g-service/partner-3.png";
import partnerImg4 from "../../../assets/images/g-service/partner-4.png";
import partnerImg5 from "../../../assets/images/g-service/partner-5.png";
import partnerImg6 from "../../../assets/images/g-service/partner-6.png";

// 슬라이드 이미지
import eat1 from "../../../assets/images/g-service/eat-1.jpg";
import eat2 from "../../../assets/images/g-service/eat-2.jpeg";
import eat3 from "../../../assets/images/g-service/eat-3.png";
import eat4 from "../../../assets/images/g-service/eat-4.jpg";
import eat5 from "../../../assets/images/g-service/eat-5.png";
import eat6 from "../../../assets/images/g-service/eat-6.jpg";

const Service = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      name: "나영왕돈까스",
      city: "대전시",
      desc: "대전에 위치한 나영왕돈까스는 지역 주민들에게 저렴한 가격으로 고품질의 반찬과 간단한 식사를 제공하는 맛집입니다. 신선한 재료로 만든 바삭한 돈까스와 다양한 반찬이 특징이며, 아늑한 분위기와 친절한 서비스로 많은 사랑을 받고 있습니다. 가성비 좋은 식사를 원하는 이들에게 안성맞춤인 곳입니다.",
      image: eat1,
    },
    {
      name: "신가네칼국수",
      city: "서울시",
      desc: "신가네칼국수는 서울에 위치한 식당으로, 합리적인 가격에 맛있는 칼국수와 다양한 반찬을 제공합니다. 신선한 재료로 만든 칼국수는 깊은 국물 맛이 특징이며, 다양한 반찬과 함께 제공되어 만족스러운 식사를 경험할 수 있습니다.",
      image: eat2,
    },
    {
      name: "돌고래순두부",
      city: "부산시",
      desc: "부산의 돌고래순두부는 착한가격업소로서, 합리적인 가격에 신선하고 맛있는 순두부 요리를 제공하여 지역 주민들에게 경제적 부담을 덜어주고, 동시에 지역 사회의 식문화 발전에 기여하며 많은 사랑을 받고 있는 식당입니다.",
      image: eat3,
    },
    {
      name: "가이오청년밥상",
      city: "청주시",
      desc: "청주의 가이오청년밥상은 착한가격업소로서, 깊고 진한 국물 맛이 특징인 다양한 한식 메뉴를 제공하며, 신선한 재료를 아낌없이 사용하여 저렴한 가격에 푸짐한 한 끼를 즐길 수 있는 곳입니다. 다양한 연령층들이 이 곳을 찾고 있습니다.",
      image: eat4,
    },
    {
      name: "고가네칼국수",
      city: "공주시",
      desc: "공주의 고가네칼국수는 착한가격업소의 대표적인 사례로, 가족 단위 손님부터 친구들과의 모임까지 다양한 고객층이 찾는 인기 있는 장소로, 저렴한 가격에 맛있는 칼국수를 제공하여 지역 주민들과 관광객들에게 사랑받고 있는 곳입니다.",
      image: eat5,
    },
    {
      name: "돈오야",
      city: "서울시",
      desc: "서울의 돈오야는 착한가격업소로서, 고물가 시대에 보기 힘든 금액으로 숙성삼겹살을 판매하는 장소로, 삼겹살 뿐만 아니라 다양한 계절 메뉴로 든든하게 한 끼를 즐길 수 있는 곳입니다. 관광객들에게 많은 사랑을 받고 있습니다.",
      image: eat6,
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
          <img src={aboutImg} alt="About" className="w-100 rounded-xl" />
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
      <div className="flex justify-center items-center">
        <div className="w-9/12 mx-auto">
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
                    src={functionImg}
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
          <section className="p-16 bg-gray-100">
            <h2 className="text-4xl text-center font-extrabold mb-16 text-gray-900">
              착한가격업소 사례
            </h2>
            <div className="relative w-full overflow-hidden rounded-xl shadow-xl">
              <div
                className="flex w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-full flex flex-col md:flex-row items-center bg-white p-12 gap-12"
                  >
                    {/* 텍스트 영역 */}
                    <div className="flex-1 max-w-3xl text-left">
                      <h5 className="text-3xl font-bold mb-4 text-blue-600">
                        {item.name}
                      </h5>
                      <p className="text-lg text-gray-600 mb-6">{item.city}</p>
                      <p className="text-gray-800 text-1xl leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* 이미지 영역 */}
                    <div className="w-80 h-52 self-end ml-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* 파트너사 소개 */}
      <section className="flex flex-col items-center p-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
        {/* 파트너사 소개 제목 */}
        <div className="w-full p-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12">파트너사 소개</h2>
        </div>

        {/* 파트너사 로고 영역 */}
        <div className="flex flex-wrap justify-center gap-8">
          <img
            src={partnerImg4}
            alt="Partner 1"
            className="w-48 h-48 object-contain mx-auto mt-0"
          />
          <img
            src={partnerImg5}
            alt="Partner 2"
            className="w-48 h-48 object-contain mx-auto mt-8"
          />
          <img
            src={partnerImg}
            alt="Partner 3"
            className="w-48 h-48 object-contain mx-auto mt-0"
          />
          <img
            src={partnerImg2}
            alt="Partner 4"
            className="w-48 h-48 object-contain mx-auto mt-8"
          />
          <img
            src={partnerImg3}
            alt="Partner 5"
            className="w-48 h-48 object-contain mx-auto mt-0"
          />
          <img
            src={partnerImg6}
            alt="Partner 6"
            className="w-48 h-48 object-contain mx-auto mt-8"
          />
        </div>
      </section>

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
