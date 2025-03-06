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

// 가이드 주제 및 아이콘 정의
const GUIDE_SUBJECTS = [
  "공지사항",
  "마이 페이지(사업자)",
  "마이 페이지(관리자)",
  "업소찾기",
  "고객 관리",
  "고객 예약 챗봇",
  "사업자 회원가입",
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

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// 에러 메시지 컴포넌트
const ErrorMessage = ({ message }) => (
  <div className="text-red-500 text-center py-4">{message}</div>
);

// 모달 관리 훅
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return { isOpen, openModal, closeModal };
};

// HeroSection 컴포넌트
const HeroSection = ({ onOpenChat }) => {
  return (
    <div className="w-full bg-blue-500 py-14 flex justify-center px-6 gap-20">
      <div className="flex justify-end flex-col md:flex-row items-center max-w-5xl w-1/2">
        <div className="flex flex-col items-center md:items-start text-center md:text-left text-white md:w-1/2">
          <h3 className="text-2xl md:text-2xl font-bold">
            착한가격업소에 온걸 환영합니다!
          </h3>
          <p className="mt-4 text-lg max-w-lg">
            이 페이지는 이용자 가이드 페이지입니다. 챗봇을 이용하여 다양한
            기능을 알 수 있습니다. 또한 밑에 스크롤을 내려서 다양한 기능을 볼수
            있습니다.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-500 hover:text-white transition"
            onClick={onOpenChat}
          >
            챗봇 열기
          </button>
        </div>
      </div>
      <div className="mt-10 md:mt-0 md:w-1/2">
        <img
          src={Banner}
          alt="Guide"
          className="w-64 md:w-80 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

// GuideContent 컴포넌트
const GuideContent = ({ data }) => {
  if (!data) return <ErrorMessage message="데이터가 없습니다." />;

  const { id, icon, title, subtitle, description, imageUrl } = data;

  return (
    <div
      id={id}
      className="p-6 bg-white w-[1000px] min-h-[300px] flex flex-col justify-center space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex-shrink-0">
          {React.cloneElement(icon, {
            className: "w-full h-full object-contain",
          })}
        </div>
        <h4 className="flex-1 text-3xl font-bold text-gray-900 text-left tracking-tight min-w-0">
          {title}
        </h4>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <h3 className="text-xl font-semibold text-black text-left tracking-normal">
          {subtitle}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed text-left tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
};

// HeaderSection 컴포넌트
const HeaderSection = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="w-full bg-white py-8 mt-[100px] mb-[100px] border border-gray-300 rounded-lg">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-full shadow-lg">
            <FaQuestionCircle className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            착한가격업소, 무엇이 더 궁금하신가요?
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.youtube.com/watch?v=kdqPw9kCth0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
          >
            <FaPlayCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">가이드 영상 보기</span>
          </a>
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
            onClick={openModal}
          >
            <FaQuestionCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">도움말</span>
          </button>
          <a
            href="https://www.instagram.com/withyou3542/?utm_source=ig_embed&ig_rid=5a14ad0c-ea41-4cd1-b0c9-fc9ab905e1d4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
          >
            <FaInstagramSquare className="w-6 h-6" />
            <span className="text-lg font-semibold">공식 인스타</span>
          </a>
        </div>
      </div>

      {/* 도움말 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">도움말</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">무엇이 더 궁금하신가요?</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>자주 묻는 질문은 챗봇을 써 주시길 바랍니다</li>
                <li>
                  자세한 질문은 <span className="font-bold">010-1111-1111</span>
                  로 연락주시길 바랍니다.
                </li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
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

// Guide 컴포넌트
const Guide = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const {
    isOpen: isChatOpen,
    openModal: openChat,
    closeModal: closeChat,
  } = useModal();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axios.get("http://localhost:8080/guides/all");
        setData(
          res.data.map((item, index) => ({
            id: `content${index}`,
            icon: ICONS[index],
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            imageUrl: `http://localhost:8080/uploads/Guide${index + 1}.png`,
          }))
        );
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
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
      { threshold: 0.5, rootMargin: "0px 0px -50% 0px" }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center z-10">
      <HeroSection onOpenChat={openChat} />
      {isChatOpen && (
        <div className="fixed top-56 left-[1550px] items-center flex justify-end z-50 mr-8">
          <div className="bg-white rounded-lg shadow-lg w-80 h-[500px] flex flex-col">
            <div className="p-4 flex justify-between border-b">
              <h2 className="text-lg font-semibold">챗봇</h2>
              <button
                onClick={closeChat}
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

      <div className="w-full max-w-screen-2xl p-7 flex flex-wrap">
        <div
          className="w-1/5 sticky top-8 self-start bg-blue-50 p-4 rounded-lg ml-[-10px]"
          style={{ maxHeight: "calc(100vh - 100px)", overflowY: "hidden" }}
        >
          <ul className="space-y-10 overflow-y-hidden scrollbar-hide">
            {GUIDE_SUBJECTS.map((text, index) => (
              <li
                key={text}
                className={`flex items-center gap-x-4 cursor-pointer p-4 rounded-lg transition-all duration-300 ${
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
                <span className="w-10 h-10 flex items-center justify-center rounded-full font-bold">
                  {ICONS[index]}
                </span>
                <span className="text-lg font-semibold">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[70%]">
          {GUIDE_SUBJECTS.map((text, index) => (
            <React.Fragment key={text}>
              <div
                ref={(el) => (sectionRefs.current[index] = el)}
                data-index={index}
                className="flex flex-row justify-center items-center min-h-[400px] max-w-[1000px] w-full mx-auto gap-x-8"
              >
                {data[index]?.imageUrl && (
                  <img
                    src={data[index].imageUrl}
                    alt={`Guide ${index}`}
                    className="w-[500px] h-[600px] rounded-lg md:object-contain"
                    onError={(e) =>
                      (e.target.src =
                        "http://localhost:8080/uploads/default.jpg")
                    }
                  />
                )}
                <GuideContent data={data[index]} />
              </div>
              {index < GUIDE_SUBJECTS.length - 1 && (
                <hr className="border-gray-200 my-16 w-full max-w-[1000px] mx-auto" />
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
