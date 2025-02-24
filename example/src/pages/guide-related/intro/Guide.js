import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";
import Main1 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main1.png";
import Main2 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main2.png";
import Main3 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3.png";

const Guide = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [sidebarTop, setSidebarTop] = useState(150);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setSidebarTop(Math.max(100, scrollY + 50));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        window.scrollBy(0, -36);
      }, 200);
    }
  };

  const images = [Main1, Main2, Main3];

  return (
    <div className="bg-white min-h-screen w-screen flex flex-col items-center py-12 h-[1500px]">
      <div className="w-full max-w-6xl p-6 flex">
        <div
          className="w-1/4 pr-8 fixed"
          style={{
            top: `${sidebarTop}px`,
            left: "200px",
            transition: "top 0.2s ease-out",
          }}
        >
          <ul className="space-y-40">
            {["검색 가이드", "리뷰 가이드", "공지사항"].map((text, index) => (
              <li
                key={index}
                className={`flex items-center gap-x-4 cursor-pointer ${
                  activeStep === index + 1 ? "text-blue-500" : "text-gray-600"
                }`}
                onClick={() => {
                  setActiveStep(index + 1);
                  scrollToSection(`content${index + 1}`);
                }}
              >
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
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

        <div className="w-full ml-[250px] space-y-24">
          {[1, 2, 3].map((step, index) => (
            <div
              key={step}
              className="flex flex-row-reverse items-center gap-x-24"
            >
              <GuideContent step={step} />

              <img
                src={images[index]}
                alt={`Guide ${step}`}
                className="w-[400px] h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GuideContent = ({ step }) => {
  const guideData = {
    1: {
      id: "content1",
      icon: <CiSearch size={35} />,
      title: "검색 가이드",
      subtitle: "착한가격업소 검색 가이드",
      description:
        "착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를 쉽고 빠르게 찾을 수 있습니다.\n\n" +
        "조건별 필터를 적용하여 원하는 업종을 선택하면, 해당 조건에 맞는 업소 목록을 효율적으로 검색할 수 있습니다.",
    },
    2: {
      id: "content2",
      icon: <IoDocuments size={35} />,
      title: "리뷰 가이드",
      subtitle: "착한가격업소 리뷰 가이드",
      description:
        "이용한 업소에 대한 후기를 작성할 수 있으며, 평점과 사진을 남겨 상세한 정보를 제공할 수 있습니다.\n\n" +
        "이용한 메뉴와 가격을 입력하여 다른 사용자들에게 유용한 정보를 공유할 수 있도록 구성되었습니다.",
    },
    3: {
      id: "content3",
      icon: <HiMiniPencil size={35} />,
      title: "공지사항",
      subtitle: "착한가격업소 공지사항",
      description:
        "착한가격업소에 대한 새로운 소식과 업데이트 정보를 공지사항에서 확인할 수 있습니다.\n\n" +
        "운영 정책 변경, 새로운 기능 추가 등의 공지를 확인하고 원활한 서비스 이용을 위해 참고하세요.",
    },
  };

  const { id, icon, title, subtitle, description } = guideData[step];

  return (
    <div
      id={id}
      className="p-6 border-4 border-blue-400 rounded-xl w-[500px] h-auto bg-white overflow-hidden flex flex-col justify-center"
    >
      <div className="flex flex-col justify-center px-4">
        <div className="flex justify-center items-center mb-4">
          {icon}
          <h4 className="text-2xl font-bold ml-2">{title}</h4>
        </div>
        <hr className="border-gray-300 mb-4" />
        <h3 className="text-lg font-semibold mb-4 text-center">{subtitle}</h3>
        <p className="text-base text-gray-600 leading-relaxed text-center whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Guide;
