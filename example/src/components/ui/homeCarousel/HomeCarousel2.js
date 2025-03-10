import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CustomArrow from "./CustomArrow";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/images/CarouselImg2/CarouselImg.png";
import img2 from "../../../assets/images/CarouselImg2/CarouselImg2.png";
import img3 from "../../../assets/images/CarouselImg2/CarouselImg3.png";
import img4 from "../../../assets/images/CarouselImg2/CarouselImg4.png";
import img5 from "../../../assets/images/CarouselImg2/CarouselImg5.png";
import img6 from "../../../assets/images/CarouselImg2/CarouselImg6.png";
import { PiNewspaperClippingBold } from "react-icons/pi";

export default function SimpleSlider2() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    // prevArrow: <CustomArrow direction="prev" />, // 컴포넌트 왼쪽 화살표 적용
    // nextArrow: <CustomArrow direction="next" />, // 컴포넌트 오른쪽 화살표 적용
  };
  const [img, setImg] = useState([img1, img2, img3, img4, img5, img6]);
  return (
    <>
      <Slider {...settings}>
        {img.map((images, i) => (
          <div className="px-2" key={i}>
            <div className="border p-4 rounded shadow hover:bg-gray-100">
              <div>
                <img
                  src={images}
                  alt="업소사진"
                  className="w-full h-[300px]] object-cover rounded mb-4"
                />
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500 inline-flex items-center">
                    <PiNewspaperClippingBold className="mr-1" />
                  </div>
                  <div className="text-sm text-gray-500 text-left">
                    <span>오늘의 착한 소식</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
