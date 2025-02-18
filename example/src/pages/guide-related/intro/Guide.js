import React from "react";
import n1 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Brand/n1.png";
import n2 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Brand/n2.png";
import n3 from "/Users/nextit/Documents/GitHub/final-components/example/src/assets/images/Brand/n3.png";
const Guide = () => {
  return (
    <div className="bg-white h-screen w-screen flex flex-col items-center overflow-y-scroll">
      <div className="w-full max-w-5xl p-6">
        <div className="flex">
          <div className="w-1/4 pr-8 mt-24">
            {" "}
            <ul className="space-y-8">
              {" "}
              <li className="flex items-center gap-x-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                  1
                </span>
                <span className="text-lg font-semibold text-blue-500">
                  검색 가이드
                </span>
              </li>
              <li className="flex items-center gap-x-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 font-bold">
                  2
                </span>
                <span className="text-lg font-semibold text-gray-600">
                  리뷰 가이드
                </span>
              </li>
              <li className="flex items-center gap-x-2">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 font-bold">
                  3
                </span>
                <span className="text-lg font-semibold text-gray-600">
                  공지사항
                </span>
              </li>
            </ul>
          </div>

          <div className="w-3/4 space-y-16">
            {" "}
            <div className="flex items-start">
              <img
                src={n1}
                alt="검색 가이드"
                className="w-[25%] rounded-lg shadow-md"
              />
              <div className="w-[55%] pl-8">
                <h2 className="text-xl font-bold mb-4">검색 가이드</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를
                  보다 빠르게 찾을 수 있습니다. 조건별 필터를 적용하여 원하는
                  업소를 검색하거나, 해당 조건에 맞는 업소 목록을 효율적으로
                  검색할 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src={n2}
                alt="리뷰 가이드"
                className="w-[25%] rounded-lg shadow-md"
              />
              <div className="w-[55%] pl-8">
                <h2 className="text-xl font-bold mb-4">리뷰 가이드</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  이용한 업소에 대한 평가를 작성할 수 있으며, 평점과 사진을 남겨
                  상세한 정보를 제공할 수 있습니다. 이용한 메뉴와 가격을
                  입력하여 다른 사용자들에게 유용한 정보를 공유할 수 있도록
                  구성되었습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src={n3}
                alt="공지사항"
                className="w-[25%] rounded-lg shadow-md"
              />
              <div className="w-[55%] pl-8">
                <h2 className="text-xl font-bold mb-4">공지사항</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  중요한 공지를 신속하게 확인하고 최신 정보를 빠르게 얻을 수
                  있습니다. 공지사항 목록에서 필요한 정보를 쉽게 찾아볼 수
                  있도록 구성되었습니다.
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
