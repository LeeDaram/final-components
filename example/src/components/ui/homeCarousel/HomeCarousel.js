import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CustomArrow from "./CustomArrow";

export default function SimpleSlider({ data }) {
  var settings = {
    dots: true,
    infinite: true,
    // speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomArrow direction="prev" />, // 컴포넌트 왼쪽 화살표 적용
    nextArrow: <CustomArrow direction="next" />, // 컴포넌트 오른쪽 화살표 적용
  };
  return (
    <>
      {/* 라이브러리에서 사용하는 클래스명에 다시 스타일을 입히는 작성방식으로 이렇게 작성할 수도 있는데, 간단한거 정도는 이걸로 제어해도 큰 문제는 없는데
          보통은 이 컴포넌트에서 다시 재정의할 스타일 시트 파일을 만들어서 그 css 파일에서 해당 클래스 스타일 재정의 내려서 import하거나
          styled-components 설치 후 이걸 통해서 스타일을 다시 재정의 내리기도 해요! 
      */}
      <style>{`.slick-slide {margin: 3px}`}</style>

      <Slider {...settings}>
        {data.map((store) => (
          <div className="border p-4 rounded shadow hover:bg-gray-100">
            <Link key={store.id} to={`/store/${store.id}`}>
              <img
                src={store.src}
                alt="업소사진"
                className="w-full h-64 object-cover rounded mb-4"
              />
              <div className="text-lg font-semibold">{store.name}</div>
              <div className="text-sm text-gray-500">{store.description}</div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   };
//   return (
//     <div className="slider-container">
//       <h2> Resizable Collapsible </h2>

//       <Slider {...settings}>
//         {data.map((store) => (
//           <div className="border p-4 rounded shadow hover:bg-gray-100 mx-4">
//             <Link key={store.id} to={`/store/${store.id}`}>
//               <img
//                 src={store.src}
//                 alt="업소사진"
//                 className="w-full h-64 object-cover rounded mb-4"
//               />
//               <div className="text-lg font-semibold">{store.name}</div>
//               <div className="text-sm text-gray-500">{store.description}</div>
//             </Link>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
