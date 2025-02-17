import { useState } from "react";

const Guide = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [modal, setModal] = useState(null);

  const openModal = (id) => setModal(id);
  const closeModal = () => setModal(null);

  const steps = [
    {
      id: 1,
      title: "검색 가이드",
      content: "검색하여 원하는 업소 찾기",
      description:
        "착한가격업소 찾기 페이지에서 검색어를 입력하여 원하는 업소를 보다 빠르게 찾을 수 있습니다.",
    },
    {
      id: 2,
      title: "리뷰 가이드",
      content: "간단하고 손쉽게 리뷰 작성하기",
      description:
        "이용한 업소에 대한 후기를 작성할 수 있으며, 사진과 상세 정보를 제공할 수 있습니다.",
    },
    {
      id: 3,
      title: "공지사항",
      content: "쉽고 빠르게 공지 확인하기",
      description:
        "중요한 공지를 신속하게 확인하고, 최신 정보를 빠르게 얻을 수 있습니다.",
    },
  ];

  return (
    <div className="bg-white-100 p-8 h-screen w-screen flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg flex">
        <ul className="relative flex h-96 flex-col gap-y-2 w-1/2">
          {steps.map((step) => (
            <li
              key={step.id}
              className="group flex flex-1 shrink basis-0 flex-col w-fit"
            >
              <div className="flex items-center justify-center gap-2.5 text-sm">
                <span
                  className={`bg-neutral/20 text-base-content size-7.5 flex flex-shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                    activeStep === step.id ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {step.id}
                </span>
                <div
                  className="text-base-content block cursor-pointer"
                  onClick={() => setActiveStep(step.id)}
                >
                  {step.title}
                </div>
              </div>
              <div className="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
            </li>
          ))}
        </ul>

        <div className="w-1/2 flex overflow-x-auto space-x-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`min-w-[300px] ${
                activeStep === step.id ? "block" : "hidden"
              }`}
            >
              <h2 className="text-xl font-bold text-center">{step.title}</h2>
              <div className="mt-4 border p-4 rounded-lg bg-white-50 text-center">
                <h3 className="font-semibold">{step.content}</h3>
                <p className="text-sm text-gray-600 mt-2">{step.description}</p>
                <img
                  src={step.img}
                  alt={step.title}
                  className="mt-4 w-48 mx-auto"
                />
              </div>
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
