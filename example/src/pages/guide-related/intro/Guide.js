import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Banner from "../../../assets/images/Guide/Guide4.jpg";
import ImchatBot from "./imchat.js/Imchatbot";

import {
  ImAddressBook,
  ImBaffled2,
  ImBookmarks,
  ImBullhorn,
  ImCreditCard,
} from "react-icons/im";
import {
  FaQuestionCircle,
  FaPlayCircle,
  FaTimes,
  FaInstagramSquare,
} from "react-icons/fa";
import {
  AiFillCheckCircle,
  AiFillBuild,
  AiFillBook,
  AiFillBell,
} from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";

const GUIDE_SUBJECTS = [
  "검색",
  "리뷰",
  "회원가입(사업자)",
  "마이 페이지(사업자)",
  "업소찾기",
  "고객 관리",
];

const ICONS = [
  <CiSearch size={30} key="search" />,
  <IoDocuments size={30} key="docs" />,
  <HiMiniPencil size={30} key="pencil" />,
  <AiFillBell size={30} key="bell" />,
  <AiFillCheckCircle size={30} key="ci" />,
  <AiFillBuild size={30} key="build" />,
  <AiFillBook size={30} key="book" />,
  <ImAddressBook size={30} key="address" />,
  <ImBaffled2 size={30} key="affled2" />,
  <ImBookmarks size={30} key="marks" />,
  <ImBullhorn size={30} key="horn" />,
  <ImCreditCard size={30} key="ard" />,
];

// 1) HeroSection
const HeroSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="w-full bg-blue-500 py-8 sm:py-14 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 max-w-5xl mx-auto">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left text-white">
          <h3 className="text-xl sm:text-2xl font-bold">
            착한가격업소에 온걸 환영합니다!
          </h3>
          <p className="mt-4 text-base sm:text-lg max-w-lg">
            이 페이지는 이용자 가이드 페이지입니다. 챗봇을 이용하여 다양한
            기능을 알 수 있습니다. 또한 밑에 스크롤을 내려서 다양한 기능을 볼 수
            있습니다.
          </p>
          <button
            className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-800 hover:text-white hover:scale-105 transition-transform duration-300"
            onClick={onOpenChat}
          >
            챗봇 열기
          </button>
          {isChatOpen && (
            <div className="fixed top-[204px] right-4 z-50 flex justify-end items-start">
              <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-80 h-[400px] md:h-[500px] flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 flex justify-between border-b">
                  <h2 className="text-base sm:text-lg font-semibold">챗봇</h2>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                </div>
                <div className="flex-1">
                  <ImchatBot />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={Banner}
            alt="Guide"
            className="w-48 sm:w-64 md:w-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

// 2) GuideContent
const GuideContent = ({ data }) => {
  const { id, icon, title, subtitle, description } = data || {};

  if (!id) {
    return <div>데이터가 없습니다....</div>;
  }

  return (
    <div
      id={id}
      className="p-4 sm:p-6 bg-white min-h-[300px] flex flex-col justify-center space-y-4 w-full hover:bg-gray-50 transition-colors duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0">
          {icon &&
            React.cloneElement(icon, {
              className: "w-full h-full object-contain",
            })}
        </div>
        <h4 className="flex-1 text-2xl sm:text-3xl font-bold text-gray-900 text-left tracking-tight min-w-0">
          {title}
        </h4>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <h3 className="text-lg sm:text-xl font-semibold text-black text-left tracking-normal">
          {subtitle}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-left tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
};

// 3) HeaderSection
const HeaderSection = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleHelpModal = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  return (
    <div className="w-full bg-white py-6 sm:py-8 mt-12 sm:mt-24 mb-12 sm:mb-24 border border-gray-300 rounded-lg">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
            <FaQuestionCircle className="text-white w-6 sm:w-8 h-6 sm:h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
            착한가격업소, 무엇이 더 궁금하신가요?
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a
            href="https://www.youtube.com/watch?v=kdqPw9kCth0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
          >
            <FaPlayCircle className="w-5 sm:w-6 h-5 sm:h-6" />
            <span className="text-base sm:text-lg font-semibold">
              가이드 영상 보기
            </span>
          </a>
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
            onClick={toggleHelpModal}
          >
            <FaQuestionCircle className="w-5 sm:w-6 h-5 sm:h-6" />
            <span className="text-base sm:text-lg font-semibold">도움말</span>
          </button>
          <a
            href="https://www.instagram.com/withyou3542/?utm_source=ig_embed&ig_rid=5a14ad0c-ea41-4cd1-b0c9-fc9ab905e1d4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:scale-110 transition-transform duration-300"
          >
            <FaInstagramSquare className="w-5 sm:w-6 h-5 sm:h-6" />
            <span className="text-base sm:text-lg font-semibold">
              공식 인스타
            </span>
          </a>
        </div>
      </div>
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold">도움말</h3>
              <button
                onClick={toggleHelpModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                무엇이 더 궁금하신가요?
              </p>
              <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm">
                <li>자주 묻는 질문은 챗봇을 써 주시길 바랍니다</li>
                <li>
                  자세한 질문은 <span className="font-bold">010-1111-1111</span>
                  로 연락주시길 바랍니다.
                </li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleHelpModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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

// 4) Guide 메인 컴포넌트
const Guide = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/guides/all`
        );
        setData(
          res.data.map((item, index) => ({
            id: `content${index}`,
            icon: ICONS[index],
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            imageUrl: item.imageUrl,
          }))
        );
      } catch (error) {
        console.error("Error fetching guide data:", error);
      }
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center z-10">
      <HeroSection />

      <div className="w-full max-w-screen-2xl px-4 sm:px-7 flex flex-col md:flex-row flex-wrap">
        {/* 사이드바 */}
        <div
          className="w-full md:w-1/5 sticky top-4 sm:top-8 self-start bg-blue-50 p-3 sm:p-4 rounded-lg md:ml-[-10px] mb-6 md:mb-0"
          style={{
            height: "auto",
            maxHeight: "calc(100vh - 80px)",
          }}
        >
          <ul className="space-y-6 sm:space-y-8 md:space-y-10 overflow-y-auto scrollbar-hide">
            {GUIDE_SUBJECTS.map((text, index) => (
              <li
                key={text}
                className={`flex items-center gap-x-3 sm:gap-x-4 cursor-pointer p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-blue-500 text-white"
                    : "hover:bg-white text-gray-800"
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  sectionRefs.current[index].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <span className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full font-bold">
                  {ICONS[index]}
                </span>
                <span className="text-sm sm:text-base md:text-lg font-semibold">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="w-full md:w-[70%]">
          {GUIDE_SUBJECTS.map((text, index) => (
            <React.Fragment key={text}>
              <div
                ref={(el) => (sectionRefs.current[index] = el)}
                data-index={index}
                className="flex flex-col md:flex-row justify-center items-center min-h-[400px] max-w-[1000px] w-full mx-auto gap-x-6 md:gap-x-8 gap-y-6"
              >
                {data && (
                  <>
                    {data[index]?.imageUrl && (
                      <img
                        src={data[index].imageUrl}
                        alt={`Guide ${index}`}
                        className="w-full md:w-[45%] h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                        // onError={(e) =>
                        //   (e.target.src =
                        //     "http://localhost:8080/uploads/default.jpg")
                        // }
                      />
                    )}
                    <div className="w-full md:w-[55%]">
                      <GuideContent data={data[index]} />
                    </div>
                  </>
                )}
              </div>
              {index < GUIDE_SUBJECTS.length - 1 && (
                <hr className="border-gray-200 my-8 sm:my-16 w-full max-w-[1000px] mx-auto" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <HeaderSection />
    </div>
  );
};

export default Guide;
