import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 로컬 이미지 경로
import frontImage from "../../../assets/images/Brand/front.png";
import midImage from "../../../assets/images/Brand/mid.png";
import n1 from "../../../assets/images/Brand/n1.png";
import n2 from "../../../assets/images/Brand/n2.png";
import n3 from "../../../assets/images/Brand/n3.png";

const ValueAndGoal = () => {
  const [modal, setModal] = useState(null);

  // 📌 더미 데이터 (추후 API 연결 시 대체)
  const dummyData = [
    {
      id: 1,
      title: "우리의 가치",
      description: "소상공인을 돕고, 소비자가 믿을 수 있는 환경을 만듭니다.",
      image: frontImage,
    },
    {
      id: 2,
      title: "핵심 가치",
      description: "착한 소비 문화를 조성하고, 지역 경제 활성화를 돕습니다.",
      image: midImage,
    },
    {
      id: 3,
      title: "투명한 운영",
      description: "정직한 소통과 신뢰를 기반으로 장기적인 관계를 형성합니다.",
      image: midImage,
    },
  ];

  const philosophyData = [
    {
      img: n1,
      title: "시작과 목적",
      desc: "착한 업소 솔루션은 소상공인을 돕고, 소비자가 믿고 찾을 수 있는 환경을 만들기 위해 시작되었습니다.",
    },
    {
      img: n2,
      title: "핵심 가치",
      desc: "단순한 장소 추천을 넘어, 착한 소비 문화를 조성하며 지역 경제 활성화에 기여하고자 합니다.",
    },
    {
      img: n3,
      title: "앞으로의 목표",
      desc: "앞으로도 소상공인과 소비자가 함께 성장하는 지속 가능한 플랫폼으로 발전해 나가겠습니다.",
    },
  ];

  const openModal = (id) => setModal(id);
  const closeModal = () => setModal(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 슬라이드 속도 4초로 설정
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900">
          <div className="bg-white w-full">
            {/* 🔹 우리의 가치 섹션 */}
            <section className="text-center py-16">
              <h2 className="text-3xl font-extrabold text-blue-700">
                우리의 가치와 목표
              </h2>
              <div className="mt-6 mx-auto w-full max-w-4xl border border-blue-700 rounded-xl h-full p-6 bg-white-50">
                <ul className="text-left text-gray-700 space-y-4 leading-relaxed">
                  {dummyData.map(({ id, title, description }) => (
                    <li key={id} className="flex items-start">
                      <span className="mr-2 text-blue-600 font-bold">✔</span>
                      <span className="text-blue-600 font-semibold">
                        {title}
                      </span>
                      {description}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 🔹 이미지 슬라이더 (dummyData 활용) */}
            <div className="relative w-full max-w-4xl mx-auto">
              <Slider {...settings}>
                {dummyData.map(({ image, title }, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* 🔹 브랜드 철학 섹션 */}
            <section className="py-8">
              <h2 className="text-[40px] font-semibold text-center">
                브랜드 철학
              </h2>
              <div className="flex flex-wrap justify-center gap-7 mt-12">
                {philosophyData.map(({ img, title, desc }, index) => (
                  <div
                    key={index}
                    className="w-[300px] bg-white text-center p-6 rounded-lg"
                  >
                    <img src={img} className="h-50 mx-auto mb-6" alt={title} />
                    <h3 className="text-[22px] font-semibold">{title}</h3>
                    <p className="text-gray-600 text-[15px]">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 🔹 FAQ & 모달 */}
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg mt-16">
              <div className="relative mt-12 p-6 border border-gray-300 rounded-lg bg-white">
                <p className="text-gray-800 text-lg font-semibold">
                  착한가격업소, 무엇이 더 궁금하신가요?
                </p>
                <p className="text-gray-500 text-sm mt-4">
                  전화상담을 원할 시 010-1111-1111으로 연락주세요.
                </p>
                <div className="flex justify-center space-x-6 mt-8">
                  {[
                    { id: "helpModal", icon: "❓", label: "도움말" },
                    { id: "videoModal", icon: "▶️", label: "영상보기" },
                    { id: "snsModal", icon: "📷", label: "SNS" },
                  ].map(({ id, icon, label }) => (
                    <button
                      key={id}
                      onClick={() =>
                        id === "videoModal"
                          ? window.open("https://www.youtube.com", "_blank")
                          : openModal(id)
                      }
                      className="flex items-center border border-gray-300 rounded-md px-6 py-3"
                    >
                      <span className="text-black text-lg">{icon}</span>
                      <span className="ml-4 text-gray-700">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 🔹 모달 창 */}
            {modal && modal !== "videoModal" && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    {modal === "helpModal" ? "도움말" : "SNS"}
                  </h2>
                  <p className="text-gray-600 mt-4">
                    {modal === "helpModal"
                      ? "이곳에서 착한가격업소에 대한 정보를 확인하세요."
                      : "착한가격업소 관련 SNS 소식을 확인하세요."}
                  </p>
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-300 rounded-md"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueAndGoal;
