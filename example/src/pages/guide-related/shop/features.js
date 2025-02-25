import React from "react";
import {
  FaWonSign,
  FaUtensilSpoon,
  FaHandHoldingHeart,
  FaStore,
} from "react-icons/fa";

const Features = () => {
  const items = [
    { icon: <FaWonSign size={40} />, text: "저렴한 가격", active: false },
    { icon: <FaUtensilSpoon size={40} />, text: "안전한 재료", active: true },
    {
      icon: <FaHandHoldingHeart size={40} />,
      text: "친절한 서비스",
      active: false,
    },
    { icon: <FaStore size={40} />, text: "청결한 가게", active: true },
  ];

  return (
    <div className="flex justify-center space-x-24 p-10">
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center w-44 h-44 rounded-full shadow-md text-center p-6 ${
            item.active ? "bg-blue-500 text-white" : "bg-gray-100 text-blue-500"
          }`}
        >
          <div className="text-5xl">{item.icon}</div>
          <span className="mt-3 text-xl font-bold">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Features;
