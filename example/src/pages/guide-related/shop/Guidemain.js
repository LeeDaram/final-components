import { useState } from "react";
import GuideStep from "./guidestep";
import EvaluationTable from "./Criteria";
import BenefitsSection from "./benefit";
import EconomyDiagram from "./economy";
import Features from "./features";
import ChartComponent from "./Chartcomponent";
const GuidePage = () => {
  const [activeTab, setActiveTab] = useState("intro");

  const tabs = [
    { key: "intro", label: "착한가격업소 안내" },
    { key: "designation status", label: "지정 현황" },
    { key: "criteria", label: "지정 기준" },
    { key: "procedure", label: "지정 절차" },
    { key: "benefits", label: "업소 혜택" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "intro":
        return (
          <div className="flex justify-center">
            <div className="text-center w-9/12">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                착한가격업소 안내
              </h2>
              <p className="text-lg">
                착한가격업소는 정부와 지방자치단체가 지정한{" "}
                <span className="text-blue-500 font-semibold">
                  물가안정 모범업소
                </span>
                입니다.
              </p>
              <div>
                <EconomyDiagram />
              </div>

              <p>
                저렴하게 안심하고 이용할 수 있는 착한가격업소 효율적인 경영을
                통하여 소비자에게 저렴한 가격으로 양질의 서비스를 제공하는
                정부와 지방자치단체가 지정, 관리하는 업소를 말합니다.
              </p>
              <div>
                <Features />
              </div>
              <p>
                각 지자체별 착한가격업소에 대한 다양한 지원 혜택 착한가격업소로
                지정되면 정책혜택 및 기타혜택을 제공합니다. 1. 각 지자체별로
                쓰레기 봉투, 상하수도 요금 감면 등 다양한 혜택을 제공합니다.
                (지원 사항이 다소 차이가 있어 해당 지자체에 지원 사항을
                확인하세요) 2. 온라인/모바일을 통한 업소 홍보를 제공합니다.
              </p>
            </div>
          </div>
        );
      case "designation status":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold">착한가격업소의 확대를 통해</h2>
            <p className="text-blue-500">
              소비자물가 안정에 기여하며 개인 서비스 업소의 매출 증대를 통해
              서민경제 살리기에 기여하고 있습니다.
            </p>
            <p>
              2011년 물가안정을 위해 전국에서 저렴한 가격과 위생적인 서비스를
              제공하는 2,497개 업소를 착한가격업소로 지정했으며, 2025년 2월 19일
              <br />
              기준 9,771개의 업소(외식업, 이미용업, 세탁업 등)를 착한가격업소로
              지정하여 지원하고 있습니다.
            </p>
            <div>
              <ChartComponent />
            </div>
          </div>
        );
      case "criteria":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              착한가격업소는,
              <br />
              <span className="text-blue-500">
                착한 가격과 깨끗하고 위생적인환경, 친절한 서비스
              </span>
              를 통해
              <br />
              소비자들이 다시 찾고 싶어하는 업소입니다.
            </h2>
            <p className="text-sx">
              저렴한 가격으로 깨끗한 시설에서 믿을 수 있는 재료를 사용하고
              친절한 서비스를 제공하는 업소는 착한 가격업소로 지정받을 수
              있습니다.
            </p>
            <div>
              <EvaluationTable />
            </div>
          </div>
        );
      case "procedure":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-500">
              착한가격업소 지정
            </h2>
            <p>
              영업자가 직접 신청을 하거나, 읍면동장/소비자단체 등의 추천을
              받아야 합니다.
              <br />
              직접 신청 및 추천을 받은 업소를 시장/군수/구청장의 현지실사/평가
              및 심사를 거친 후 지정됩니다.
            </p>
            <div className="mt-6">
              <GuideStep />
            </div>
          </div>
        );
      case "benefits":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold">착한가격업소로 지정되면</h2>

            <h2 className="text-2xl font-bold">
              업소 홍보 및 각 지자체별
              <span className="text-blue-500 font-semibold">다양한 혜택</span>을
              제공 합니다.
            </h2>

            <div>
              <BenefitsSection />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-6 ">
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-6 py-3 rounded-full text-lg font-semibold ${
              activeTab === tab.key ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default GuidePage;
