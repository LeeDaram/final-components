import { FaBalanceScale, FaTags, FaShieldAlt } from "react-icons/fa";

const criteria = [
  {
    icon: <FaTags size={20} />,
    title: "가격기준",
    description: [
      "응애",
      "가격 안정을 위해 1년 이상 평균가격 이하 운영(재지정 시)",
    ],
  },
  {
    icon: <FaBalanceScale size={20} />,
    title: "공공성 기준",
    description: [
      "지역화폐 가맹점",
      "지역특화자원(로컬푸드 활용, 빈집을 활용한 숙박업 등) 활용도",
      "지역사회 공헌도(기부, 봉사 등)",
      "착한가격업소 메뉴 표시 및 표찰 부착(재지정 시)",
    ],
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: "위생·청결 기준",
    description: [
      "주방 내 바닥 내수처리 및 수세·배수시설 청결도, 위생복·위생모 착용 등",
      "매장 내 식탁·의자 정리, 청소 등 용도별 사용, 소독용품 비치 또는 쓰레기 시설 설치",
      "화장실 내 수세·소독 및 환기 등 관리 정도 (세척제, 에어타월, 위생종이 구비여부, 남녀 구분 등)",
    ],
  },
];

const EvaluationTable = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 테이블 헤더 */}
      <div className="flex justify-center items-center bg-gray-200 p-4 rounded-md font-bold text-gray-700 text-lg">
        <div>항목</div>
        <div className="mx-4 text-gray-500">/</div>
        <div>평가지표</div>
      </div>

      {/* 평가 기준 리스트 */}
      {criteria.map((item, index) => (
        <div
          key={index}
          className="grid  border-b border-gray-300 py-8 gap-6 items-center"
        >
          {/* 항목 (아이콘 포함) */}
          <div className="flex flex-row items-center justify-center text-center bg-blue-500 text-white p-1 rounded-lg mx-auto py-2 shadow-md w-full">
            {item.icon}
            <h3 className="mt-1 ml-2 text-lg font-semibold">{item.title}</h3>
          </div>

          {/* 평가지표 (숫자 리스트) */}
          <ul className="text-gray-700 text-lg leading-relaxed list-decimal pl-5 pr-6 space-y-2">
            {item.description.map((desc, idx) => (
              <li key={idx} className="ml-5">
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* 추가 안내 문구 */}
      <p className="mt-6 text-sm text-gray-600 flex items-center">
        <span className="mr-2">🔊</span>
        착한가격업소 지정과 인센티브 지원 등에 관한 사항은 해당 시·군·구 담당
        부서로 문의하시면 됩니다.
      </p>
    </div>
  );
};

export default EvaluationTable;
