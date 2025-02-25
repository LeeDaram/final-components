import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import { FaAward } from "react-icons/fa";
import { GiBrainFreeze } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { BiMessageCheck } from "react-icons/bi";
import step from "../../../assets/images/Park/step.png";
import step2 from "../../../assets/images/Park/step2.png";
import step3 from "../../../assets/images/Park/step3.png";

const Button = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md shadow-md ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const steps = [
  {
    icon: <BiMessageCheck size={40} />,
    title: "상시신청",
    desc: "사이트에서 언제든지 신청",
    step: "Step 1",
  },
  {
    icon: <GiBrainFreeze size={40} />,
    title: "AI 심사",
    desc: "메뉴 가격 심사 및 매장 청결도 심사",
    step: "Step 2",
  },
  {
    icon: <FaAward size={40} />,
    title: "결정통보 및 지정증 교부",
    desc: "착한가격업소 등록완료",
    step: "Step 3",
    highlight: true,
  },
];

const GuideStep = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleApplyClick = () => {
    navigate("/apply"); // 신청 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-12">
      {/* Step icons and descriptions */}
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex flex-col items-center justify-center w-32 h-32 rounded-full ${
                  step.highlight ? "bg-blue-500 text-white" : "bg-gray-200"
                } shadow-lg p-4`}
              >
                {step.icon}
                <h3 className="mt-2 text-base font-bold">{step.title}</h3>
              </div>
              <p className="mt-4 text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                {step.step}
              </p>
              <p className="mt-2 text-sm text-gray-700">{step.desc}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center mx-8">
                <FaArrowRight size={32} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image section above the buttons */}
      <div className="flex items-center justify-center space-x-6 mt-12">
        <div className="flex-1 bg-gray-300 aspect-video">
          <img
            src={step}
            alt="Step 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <FaArrowRight size={32} className="text-gray-600" />
        <div className="flex-1 bg-gray-300 aspect-video">
          <img
            src={step2}
            alt="Step 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <FaArrowRight size={32} className="text-gray-600" />
        <div className="flex-1 bg-gray-300 aspect-video">
          <img
            src={step3}
            alt="Step 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Button section below the images */}
      <div className="flex space-x-4 mt-12">
        <Button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500"
          onClick={handleApplyClick} // 클릭하면 /apply 페이지로 이동
        >
          신청하러 가기
        </Button>
      </div>
    </div>
  );
};

export default GuideStep;
