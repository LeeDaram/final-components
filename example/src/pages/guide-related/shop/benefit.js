import { FaPlus } from "react-icons/fa";
const BenefitsSection = () => {
  return (
    <div className="flex items-center justify-center gap-6 p-6">
      {/* 정책 혜택 박스 */}
      <div className="bg-white rounded-lg shadow-md w-96">
        <div className="bg-blue-500 text-white text-center p-3 font-semibold rounded-t-lg">
          정책혜택
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-gray-200 p-3 rounded-md ">
            행정안전부와 지자체에서 착한가격업소를 다양한 매체를 통하여 적극
            홍보
          </div>
          <div className="bg-gray-200 p-3 rounded-md ">
            쓰레기봉투 무상 제공, 상하수도 감면 등
          </div>
          <div className="bg-gray-200 p-3 rounded-md ">
            기타 자치단체별 시설 개보수 등
          </div>
        </div>
      </div>

      {/* + 기호 */}
      <div>
        <FaPlus />
      </div>

      {/* 기타 혜택 박스 */}
      <div className="bg-white rounded-lg shadow-md w-80">
        <div className="bg-blue-500 text-white text-center p-3 font-semibold rounded-t-lg">
          기타혜택
        </div>
        <div className="p-4">
          <div className="bg-gray-200 p-3 rounded-md ">
            기획재정부 물가안정관리 정부 포상 시, 물가안정 모범업소 우선 고려
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
