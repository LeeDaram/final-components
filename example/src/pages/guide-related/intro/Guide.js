import React, { useState, useEffect } from "react";
import main2 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3-1img.png";
import main1 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3-2 img.png";
import main3 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3-3 img.png";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";

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
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen w-screen flex flex-col items-center py-12 h-[2000px]">
      <div className="w-full max-w-5xl p-6 flex">
        {/* ✅ 수정: 사이드바가 스크롤을 따라오도록 `fixed` 적용 */}
        <div
          className="w-1/4 pr-8 fixed"
          style={{
            top: `${sidebarTop}px`, // 동적으로 `top` 값 설정
            left: "320px", // 위치 조정 (원래 -150px에서 조정)
            transition: "top 0.2s ease-out", // 부드럽게 움직이도록 설정
          }}
        >
          <ul className="space-y-20">
            <li
              className={`flex items-center gap-x-2 cursor-pointer ${
                activeStep === 1 ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => {
                setActiveStep(1);
                scrollToSection("content1");
              }}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  activeStep === 1
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300"
                }`}
              >
                1
              </span>
              <span className="text-lg font-semibold">검색 가이드</span>
            </li>

            <li
              className={`flex items-center gap-x-2 cursor-pointer ${
                activeStep === 2 ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => {
                setActiveStep(2);
                scrollToSection("content2");
              }}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  activeStep === 2
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300"
                }`}
              >
                2
              </span>
              <span className="text-lg font-semibold">리뷰 가이드</span>
            </li>

            <li
              className={`flex items-center gap-x-2 cursor-pointer ${
                activeStep === 3 ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => {
                setActiveStep(3);
                scrollToSection("content3");
              }}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  activeStep === 3
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300"
                }`}
              >
                3
              </span>
              <span className="text-lg font-semibold">공지사항</span>
            </li>
          </ul>
        </div>

        <div className="w-3/4 space-y-16 ml-[300px]">
          <div
            id="content1"
            className="flex items-start p-6 border-2 border-blue-500 rounded-lg"
          >
            <img
              src={main1}
              alt="리뷰 가이드"
              className="w-[30%] rounded-lg mt-4"
            />
            <div className="w-[60%] pl-8">
              <div className="flex">
                <CiSearch size={35} />
                <h2 className="text-2xl font-bold mb-4">검색 가이드</h2>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
                검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
                검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
              </p>
            </div>
          </div>

          <div
            id="content2"
            className="flex items-start p-6 border-2 border-blue-500 rounded-lg"
          >
            <img
              src={main2}
              alt="리뷰 가이드"
              className="w-[30%] rounded-lg mt-4"
            />
            <div className="w-[60%] pl-8">
              <div className="flex">
                <HiMiniPencil size={25} />
                <h2 className="text-2xl font-bold mb-4">리뷰 가이드</h2>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
                검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
                검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
              </p>
            </div>
          </div>

          <div
            id="content3"
            className="flex items-start p-6 border-2 border-blue-500 rounded-lg"
          >
            <img
              src={main3}
              alt="공지사항"
              className="w-[30%] rounded-lg mt-4"
            />
            <div className="w-[60%] pl-8">
              <div className="flex">
                <IoDocuments size={25} />
                <h2 className="text-2xl font-bold mb-4">공지사항</h2>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
                검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                보다 빠르게 찾을 수 있습니다. 착한가격업소 찾기 페이지에서
                검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.
                착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
