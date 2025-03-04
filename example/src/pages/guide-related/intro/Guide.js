import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";
import { AiFillBell } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillBuild } from "react-icons/ai";
import { AiFillBook } from "react-icons/ai";
import axios from "axios";
import Banner from "../../../assets/images/Guide/Guide4.jpg";
import ImchatBot from "./imchat.js/Imchatbot";
import { ImAddressBook } from "react-icons/im";
import { ImBaffled2 } from "react-icons/im";
import { ImBookmarks } from "react-icons/im";
import { ImBullhorn } from "react-icons/im";
import { ImCreditCard } from "react-icons/im";
//나중에 사이드바 늘어나면 주석 풀것
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
{
  /*아이콘: 사이드바 추가하면 자동으로 추가됨 */
}

const HeroSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const onOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="w-full bg-blue-500 py-14 flex justify-center px-6 gap-20">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex justify-end flex-col md:flex-row items-center max-w-5xl w-1/2">
        <div className="flex flex-col items-center md:items-start text-center md:text-left text-white md:w-1/2 ">
          <h3 className="text-2xl md:text-3xl font-bold">
            착한가격업소에 온걸 환영합니다!
          </h3>
          <p className="mt-4 text-lg max-w-lg">
            이 페이지는 이용자 가이드 페이지입니다. 챗봇을 이용하여 다양한
            기능을 알 수 있습니다. 또한 밑에 스크롤을 내려서 다양한 기능을 볼수
            있습니다.
          </p>

          {/* 🔹 챗봇 열기 버튼 */}
          <button
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-500 hover:text-white transition"
            onClick={onOpenChat}
          >
            챗봇 열기
          </button>

          {/* 챗봇 모달 */}
          {isChatOpen && (
            <div className="fixed top-56 left-[1550px] items-center flex justify-end z-50 mr-8">
              <div className="bg-white rounded-lg shadow-lg w-80 h-[500px] flex flex-col">
                <div className="p-4 flex justify-between border-b">
                  <h2 className="text-lg font-semibold">챗봇</h2>
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
      </div>

      {/* 오른쪽 이미지 영역 */}
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

const GuideContent = ({ data }) => {
  const { id, icon, title, subtitle, description } = data || {};

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id={id}
      // 전체 컨테이너: 상하좌우 여백(p-6)과 자식 요소 간의 간격(space-y-4) 지정
      className="p-6 bg-white w-[1000px] min-h-[300px] flex flex-col justify-center space-y-4"
    >
      {/* 아이콘 + 타이틀을 함께 배치하는 영역 */}
      <div className="flex items-start gap-3">
        {/* 아이콘(이미지) 영역을 고정된 크기로 감싸서 레이아웃이 흔들리지 않도록 처리 */}
        <div className="w-12 h-12 flex-shrink-0 overflow-hidden">
          {icon &&
            React.cloneElement(icon, {
              className: "w-full h-full object-contain",
            })}
        </div>
        <h4 className="text-3xl font-bold text-gray-900 text-left">{title}</h4>
      </div>

      {/* 서브타이틀 + 설명 */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-semibold text-black text-left">
          {subtitle}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

const Guide = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

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

  const openModal = (id) => {
    setModal(id);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center z-10">
      <HeroSection />

      <div className="w-full max-w-screen-2xl p-7 flex flex-wrap">
        <div
          className="w-1/5 sticky top-8 self-start bg-blue-50 p-4 rounded-lg ml-[-10px]"
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "hidden",
          }}
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

        {/*
         */}
        <div className="w-[70%]">
          {GUIDE_SUBJECTS.map((text, index) => (
            <React.Fragment key={text}>
              <div
                ref={(el) => (sectionRefs.current[index] = el)}
                data-index={index}
                className="flex flex-row justify-center items-center min-h-[400px] max-w-[1000px] w-full mx-auto gap-x-8"
              >
                {data && (
                  <>
                    {data[index]?.imageUrl && (
                      <img
                        src={data[index].imageUrl}
                        alt={`Guide ${index}`}
                        className="w-[400px] h-auto rounded-lg"
                        onError={(e) =>
                          (e.target.src =
                            "http://localhost:8080/uploads/default.jpg")
                        }
                      />
                    )}
                    <GuideContent data={data[index]} />
                  </>
                )}
              </div>

              {/* 🔹 검색 가이드, 리뷰 가이드, 공지사항 사이에 구분선 추가 */}
              {index < GUIDE_SUBJECTS.length - 1 && (
                <hr className="border-gray-200 my-16 w-full max-w-[1000px] mx-auto" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* 🔹 FAQ & 모달 섹션 */}
      <div className="w-full bg-white rounded-lg flex justify-center">
        <div className="  relative p-8 border border-gray-300 rounded-lg bg-white w-1/3 my-15">
          <p className="text-gray-800 text-xl font-semibold text-left">
            착한가격업소, 무엇이 더 궁금하신가요?
          </p>
          <p className="text-gray-500 text-base mt-4 text-left">
            전화상담을 원할 시 010-8764-8222으로 연락주세요.
          </p>
        </div>
      </div>

      {/* 🔹 모달 창 */}
      {modal && modal !== "videoModal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {modal === "helpModal" ? "도움말" : "SNS"}
            </h2>
            <p className="text-gray-600 text-center">
              {modal === "helpModal"
                ? "이곳에서 착한가격업소에 대한 정보를 확인하세요."
                : "착한가격업소 관련 SNS 소식을 확인하세요."}
            </p>
            <div className="flex justify-center mt-10">
              <button
                onClick={closeModal}
                className="px-8 py-4 bg-gray-300 rounded-lg text-lg"
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
