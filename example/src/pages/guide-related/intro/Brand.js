import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 로컬 이미지 경로 예시 (프로젝트 상황에 맞게 수정하세요)
import frontImage from "../../../assets/images/Brand/front.png";
import midImage from "../../../assets/images/Brand/mid.png";
//import backImage from "../../../assets/images/Brand/front.jpg";
import n1 from "../../../assets/images/Brand/n1.png";
import n2 from "../../../assets/images/Brand/n2.png";
import n3 from "../../../assets/images/Brand/n3.png";

/* <div className="flex justify-center items-center">
        <div className="w-9/12 mx-auto">  
나중에 통일할것 */

const ValueAndGoal = () => {
  const [modal, setModal] = useState(null);

  const openModal = (id) => setModal(id);
  const closeModal = () => setModal(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900">
          <div className="bg-white w-full">
            <section className="text-center py-16">
              <h2 className="text-3xl font-extrabold text-blue-700">
                우리의 가치와 목표
              </h2>
              <div className="mt-6 mx-auto w-full max-w-4xl border border-blue-700 rounded-xl h-full p-6 bg-white-50">
                <ul className="text-left text-gray-700 space-y-4 leading-relaxed">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600 font-bold">✔</span>
                    창업부터 성장까지 필요한
                    <span className="text-blue-600 font-semibold"> 정보 </span>
                    와
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      네트워크
                    </span>
                    를 제공하여
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      안정적인 운영{" "}
                    </span>
                    과
                    <span className="text-blue-600 font-semibold">
                      {" "}
                      경쟁력 강화{" "}
                    </span>
                    를 지원합니다.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600 font-bold">✔</span>
                    변화하는 시장에 맞게 유연한 전략을 세우고,
                    <span className="text-blue-600 font-semibold"> 혁신 </span>
                    으로 지속 성장합니다.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600 font-bold">✔</span>
                    <span className="text-blue-600 font-semibold">
                      투명한 운영과 정직한 소통
                    </span>
                    으로 신뢰를 구축하고 장기적인 관계를 형성합니다.
                  </li>
                </ul>
              </div>
            </section>

            <div className="relative w-full max-w-4xl mx-auto">
              <Slider {...settings}>
                {[frontImage, midImage, midImage].map((img, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={img}
                      alt={`슬라이드 이미지 ${index + 1}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <section className="text-center py-16">
              <h2 className="text-3xl font-extrabold text-blue-700">
                소상공인을 돕고, 소비자가 믿을 수 있게.{" "}
              </h2>
              <div className="mt-6 mx-auto w-full max-w-4xl border border-blue-700 rounded-xl h-full p-6 bg-white-50">
                <ul className="text-left text-gray-700 space-y-4 leading-relaxed">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600 font-bold">✔</span>
                    창업부터 성장까지 필요한
                    <span className="text-blue-600 font-semibold"> 정보 </span>
                    와
                    <span className="text-blue-600 font-semibold">
                      네트워크
                    </span>
                    를 제공하여
                    <span className="text-blue-600 font-semibold">
                      안정적인 운영
                    </span>
                    과
                    <span className="text-blue-600 font-semibold">
                      경쟁력 강화
                    </span>
                    를 지원합니다.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600 font-bold">✔</span>
                    변화하는 시장에 맞게 유연한 전략을 세우고,
                    <span className="text-blue-600 font-semibold"> 혁신 </span>
                    으로 지속 성장합니다.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600 font-bold">✔</span>
                    <span className="text-blue-600 font-semibold">
                      투명한 운영과 정직한 소통
                    </span>
                    으로 신뢰를 구축하고 장기적인 관계를 형성합니다.
                  </li>
                </ul>
              </div>
            </section>

            <section className="py-8">
              <h2 className="text-[40px] font-semibold text-center">
                브랜드 철학
              </h2>
              <div className="flex flex-wrap justify-center gap-7 mt-12 ">
                {[
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
                ].map(({ img, title, desc }, index) => (
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
