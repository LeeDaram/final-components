import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";
// import { LuGuitar } from "react-icons/lu";
import axios from "axios";
import Banner from "../../../assets/images/Guide/Guide4.jpg";

const GUIDE_SUBJECTS = [
  "검색 가이드",
  "리뷰 가이드",
  "공지사항",
  "기타 질문사항",
];

const ICONS = [
  <CiSearch size={30} key="search" />,
  <IoDocuments size={30} key="docs" />,
  <HiMiniPencil size={30} key="pencil" />,
  // <LuGuitar size={30} key="LuGuitar" />,
];

const HeroSection = () => {
  return (
    <div className="w-full bg-blue-500 py-14 flex justify-center px-6">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left text-white md:w-1/2">
          <h3 className="text-3xl md:text-3xl font-bold">
            착한가격업소에 온걸 환영합니다!
          </h3>
          <p className="mt-4 text-lg max-w-lg">
            이 페이지는 이용자 가이드 페이지입니다. 이 페이지는 이용자 가이드
            페이지입니다. 이 페이지는 이용자 가이드 페이지입니다.
          </p>

          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-500 hover:text-white transition">
            기능 살펴보기
          </button>
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={Banner}
            alt="Guide"
            className="w-64 md:w-80 object-cover rounded-lg shadow-lg"
          />
        </div>
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
      className="p-6  bg-white flex flex-col justify-center min-h-[300px] w-[1000px]"
    >
      <div className="">
        <div className="flex items-left mb-3 ">
          {icon}
          <h4 className="text-3xl font-bold text-gray-900 text-left pl-3  ">
            {title}
          </h4>
        </div>
        <h3 className="text-xl font-semibold text-black text-left">
          {subtitle}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed text-left ">
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
    <div className="bg-white min-h-screen w-full flex flex-col items-center">
      <HeroSection />

      <div className="w-full max-w-screen-2xl p-7 flex flex-wrap">
        <div
          className="w-1/4 sticky top-8 self-start bg-white p-4 rounded-lg "
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          <ul className="space-y-40">
            {GUIDE_SUBJECTS.map((text, index) => (
              <li
                key={text}
                className={`flex items-center gap-x-4 cursor-pointer p-4 rounded-lg transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-blue-500 text-white "
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
                            "http://localhost:8080/uploads/default.png")
                        }
                      />
                    )}
                    <GuideContent data={data[index]} />
                  </>
                )}
              </div>

              {/* 🔹 검색 가이드, 리뷰 가이드, 공지사항 사이에 구분선 추가 */}
              {index < GUIDE_SUBJECTS.length - 1 && (
                <hr className="border-gray-300 my-16 w-full max-w-[1000px] mx-auto" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 🔹 FAQ & 모달 섹션 */}
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
  );
};

export default Guide;
