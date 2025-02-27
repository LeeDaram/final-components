import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";
import axios from "axios";

const GuideContent = ({ step, guideData }) => {
  const { id, icon, title, subtitle, description } = guideData[step] || {};

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id={id}
      className="p-6 border-4 border-blue-400 rounded-xl w-full max-w-[1500px] bg-white overflow-hidden flex flex-col justify-center"
    >
      <div className="flex flex-col justify-center px-4">
        <div className="flex justify-center items-center mb-3">
          {icon}
          <h4 className="text-2xl font-bold ml-2">{title}</h4>
        </div>
        <hr className="border-gray-300 mb-3" />
        <h3 className="text-lg font-semibold mb-3 text-center">{subtitle}</h3>
        <p className="text-base text-gray-600 leading-relaxed text-center whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

const Guide = () => {
  const [data, setData] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [sidebarTop, setSidebarTop] = useState(150);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axios.get("http://localhost:8080/guides/all");
        console.log("API Response:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching guide data:", error);
      }
    };
    fetchGuides();
  }, []);

  const guideData = data.reduce((acc, item, index) => {
    const icons = [
      <CiSearch size={30} />,
      <IoDocuments size={30} />,
      <HiMiniPencil size={30} />,
    ];
    acc[index + 1] = {
      id: `content${index + 1}`,
      icon: icons[index % icons.length],
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      imageUrl: `http://localhost:8080/uploads/Guide${index + 1}.png`,
    };
    return acc;
  }, {});

  const openModal = (id) => {
    setModal(id);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center py-12">
      <div className="w-full max-w-screen-2xl p-6 flex flex-wrap">
        {/* 사이드바 */}
        <div
          className="w-1/4 pr-6 sticky top-24 self-start transition-all duration-200"
          style={{
            top: `${sidebarTop}px`,
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto",
          }}
        >
          <ul className="space-y-40">
            {["검색 가이드", "리뷰 가이드", "공지사항"].map((text, index) => (
              <li
                key={index}
                className={`flex items-center gap-x-2 cursor-pointer py-2 
                  ${
                    activeStep === index + 1 ? "text-blue-500" : "text-gray-600"
                  }`}
                onClick={() => {
                  setActiveStep(index + 1);
                  document
                    .getElementById(`content${index + 1}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  setTimeout(() => window.scrollBy(0, -36), 200);
                }}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold 
                  ${
                    activeStep === index + 1
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-lg font-semibold pl-4">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 가이드 콘텐츠 */}
        <div className="w-[70%] space-y-64">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex flex-col md:flex-row-reverse items-center gap-x-16"
            >
              <GuideContent step={step} guideData={guideData} />
              {/* GuideContent 바깥에서 이미지 렌더링 */}
              {guideData[step]?.imageUrl && (
                <img
                  src={guideData[step].imageUrl}
                  alt={`Guide ${step}`}
                  className="w-full max-w-[350px] h-auto object-cover rounded-lg"
                  onError={(e) =>
                    (e.target.src = "http://localhost:8080/uploads/default.png")
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
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

      {/* 모달 창 */}
      {modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setModal(null)} // 배경 클릭 시 닫기
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-sm"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
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
                onClick={() => setModal(null)}
                className="px-6 py-3 bg-gray-300 rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
