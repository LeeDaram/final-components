import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import CustomArrow from './CustomArrow';
import { FaRegThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SimpleSlider({ data }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <CustomArrow direction="prev" />, // 컴포넌트 왼쪽 화살표 적용
        nextArrow: <CustomArrow direction="next" />, // 컴포넌트 오른쪽 화살표 적용
    };
    const navigate = useNavigate();

    // 데이터 평점 불러와야함
    const storeAvg = async (data) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/stores`, {
                params: data,
            });

            const storeData = response.data.content[0];
            navigate(`/find/map/${encodeURIComponent(storeData.storeName)}`, {
                state: { storeData: storeData },
            });
        } catch (error) {
            console.error(' 필터 검색 실패:', error);
        }
    };

    const handleStoreDetail = (store) => {
        storeAvg(store);
    };

    return (
        <>
            <Slider {...settings}>
                {data.map((store) => (
                    <div className="px-2 py-10 hover:scale-105 transition-transform" key={store.storeId}>
                        <div className="border p-4 rounded shadow hover:bg-gray-100 ">
                            <button onClick={() => handleStoreDetail(store)}>
                                <img
                                    src={store.storeImage}
                                    alt="업소사진"
                                    className="w-full h-72 object-cover rounded mb-4"
                                />
                                <div className="flex items-center space-x-2">
                                    <div className="text-lg font-semibold">{store.storeName}</div>
                                    <div className="text-sm text-gray-500 inline-flex items-center">
                                        <FaRegThumbsUp className="mr-1" />
                                        {store.likeCount}
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500 text-left">
                                    <span>오늘의 착한 가격업소입니다!</span>
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
}
