import React, { useState } from "react";

import main2 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3-1img.png";
import main1 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3-2 img.png";
import main3 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Guide/Main3-3 img.png";

const Guide = () => {
  const [activeStep, setActiveStep] = useState(1);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen w-screen flex flex-col items-center overflow-y-scroll py-12">
      <div className="w-full max-w-5xl p-6">
        <div className="flex">
          <div className="w-1/4 pr-8 mt-24 relative" style={{ left: "-150px" }}>
            <ul className="space-y-40">
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
                <span className="text-lg font-semibold">{""} 공지사항</span>
              </li>
            </ul>
          </div>

          <div className="w-3/4 space-y-16">
            <div id="content1" className="flex items-start p-6 rounded-lg ">
              <img
                src={main1}
                alt="검색 가이드"
                className="w-[30%] rounded-lg "
              />

              <div className="w-[60%] pl-8 border-2 border-blue-500 rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">검색 가이드</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                  보다 빠르게 찾을 수 있습니다. 조건별 필터를 적용하여 원하는
                  업소를 검색하거나, 해당 조건에 맞는 업소 목록을 효율적으로
                  검색할 수 있습니다.
                </p>
              </div>
            </div>

            <div
              id="content2"
              className="flex items-start p-6 border-2 border-blue-500 rounded-lg "
            >
              <img
                src={main2}
                alt="리뷰 가이드"
                className="w-[30%] rounded-lg shadow-md mt-4"
              />

              <div className="w-[60%] pl-8">
                <h2 className="text-2xl font-bold mb-4">검색 가이드</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                  보다 빠르게 찾을 수 있습니다. 조건별 필터를 적용하여 원하는
                  업소를 검색하거나, 해당 조건에 맞는 업소 목록을 효율적으로
                  검색할 수 있습니다.
                </p>
              </div>
            </div>

            <div id="content3" className="flex items-start p-6 rounded-lg">
              <img
                src={main3}
                alt="리뷰 가이드"
                className="w-[30%] rounded-lg shadow-md mt-4"
              />

              <div className="w-[60%] pl-8 border-2 border-blue-500 rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">검색 가이드</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                  보다 빠르게 찾을 수 있습니다. 조건별 필터를 적용하여 원하는
                  업소를 검색하거나, 해당 조건에 맞는 업소 목록을 효율적으로
                  검색할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
