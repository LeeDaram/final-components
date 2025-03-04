export const handleEnterKey = (e, callback) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 키의 브라우저 기본 동작 방지, 이걸로 다른 동작 커스텀가능
    callback();
  }
};

export const handleEscKey = (e, callback) => {
  if (e.key === "Escape") {
    e.preventDefault();
    callback();
  }
};

// 아래와 같이 사용할 페이지에 넣으면 됨

// import { handleEnterKey, handleEscKey } from "../../utils/Keydown";
// const onEnterPress = () => {
//     console.log("Escape key pressed!");
//   };

//   const onEscPress = () => {
//     console.log("Escape key pressed!");
//   };

//   onKeyDown={(e) => handleEnterKey(e, 실행될 콜백함수 넣기)}
