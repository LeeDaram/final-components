import React from "react";

const CustomArrow = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-white text-blue-500 text-xl w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-100 ${
        direction === "prev" ? "-left-20" : "-right-20"
      }`}
    >
      {direction === "prev" ? "◀" : "▶"}
    </button>
  );
};

export default CustomArrow;
