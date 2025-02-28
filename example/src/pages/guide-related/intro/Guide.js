import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoDocuments } from "react-icons/io5";
import { HiMiniPencil } from "react-icons/hi2";
import axios from "axios";

const GUIDE_SUBJECTS = ["검색 가이드", "리뷰 가이드", "공지사항"];

const ICONS = [
  <CiSearch size={30} key="search" />,
  <IoDocuments size={30} key="docs" />,
  <HiMiniPencil size={30} key="pencil" />,
];

const HeroSection = () => {
  return (
    <div className="w-screen bg-blue-600 py-14 flex flex-col items-center text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        착한가격업소에 온걸 환영합니다!
      </h1>
      <p className="mt-4 text-lg text-white max-w-2xl">
        이 페이지는 이용자 가이드 페이지입니다.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-white-600 transition">
        기능 살펴보기
      </button>
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
      className="p-6 border-4 border-blue-400 rounded-xl bg-white flex flex-col justify-center min-h-[300px] w-[1000px]" // 🔹 너비 고정
    >
      <div className="text-left">
        <div className="flex items-center mb-3">
          {icon}
          <h4 className="text-2xl font-bold ml-2">{title}</h4>
        </div>
        <hr className="border-gray-300 mb-3 w-full" />
        <h3 className="text-lg font-semibold mb-3">{subtitle}</h3>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
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

      <div className="w-full max-w-screen-2xl p-6 flex flex-wrap">
        <div
          className="w-1/4 pr-6 sticky top-8 self-start"
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          <ul className="space-y-40">
            {GUIDE_SUBJECTS.map((text, index) => (
              <li
                key={text}
                className="flex items-center gap-x-2 cursor-pointer p-3 rounded-lg transition-all duration-300"
                onClick={() => {
                  setActiveIndex(index);
                  sectionRefs.current[index].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <span
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-bold border border-black ${
                    activeIndex === index && "bg-blue-500 text-white"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-lg font-semibold pl-4">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[70%]">
          {GUIDE_SUBJECTS.map((text, index) => (
            <div
              key={text}
              ref={(el) => (sectionRefs.current[index] = el)}
              data-index={index}
              className="flex flex-row justify-center items-center min-h-[400px] max-w-[1000px] w-full mx-auto gap-x-8 mt-[100px]"
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
          ))}
        </div>
      </div>

      {modal && modal !== "videoModal" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold">
              {modal === "helpModal" ? "도움말" : "SNS"}
            </h2>
            <p className="text-gray-600 mt-4">
              {modal === "helpModal"
                ? "이곳에서 정보를 확인하세요."
                : "SNS 소식을 확인하세요."}
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-gray-300 rounded-md"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
