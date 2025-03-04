import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Map,
  MapMarker,
  ZoomControl,
  MapTypeControl,
  MarkerClusterer,
} from "react-kakao-maps-sdk";

const center = {
  lat: 36.326784862,
  lng: 127.40783579,
};

function StoreMap() {
  const [address, setAddress] = useState([]); // 주소 목록
  const [targets, setTargets] = useState([]); // 마커 상태 관리
  const [isSdkLoaded, setIsSdkLoaded] = useState(false); // SDK 로드 상태

  // 주소 데이터 가져오기
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/address`);
        setAddress(res.data); // 주소 데이터 업데이트
      } catch (error) {
        console.log("fetchAddress error", error);
      }
    };
    fetchAddress();
  }, []);

  // 마커 데이터 업데이트
  useEffect(() => {
    if (!address || address.length === 0) return;

    const filteredTargets = address
      .map((building) => {
        if (building.lat && building.lng) {
          return {
            lat: building.lat,
            lng: building.lng,
          };
        }
        return null;
      })
      .filter(Boolean);

    setTargets(filteredTargets);
  }, [address]);

  // 카카오 맵 SDK 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&libraries=clusterer&autoload=false`; // 📌 `libraries=clusterer` 추가
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("카카오맵 SDK 로드 완료");
        setIsSdkLoaded(true); // SDK가 로드되면 true로 변경
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // SDK가 로드되지 않으면 스피너 표시
  if (!isSdkLoaded) {
    return <span class="loading loading-spinner loading-lg" />;
  }

  return (
    <div className="w-full h-full">
      <Map
        center={center}
        className="w-full h-full"
        level={3} // 지도 확대 레벨
        minLevel={15} // 클러스터 할 최소 지도 레벨
      >
        {/* 줌 컨트롤러 추가 */}
        <ZoomControl position={"RIGHT"} />

        {/* 지도 타입 컨트롤러 추가 */}
        <MapTypeControl position={"TOPRIGHT"} />

        {/* 클러스터러 */}
        <MarkerClusterer
          averageCenter={true} // 클러스터 중심을 평균 위치로 설정
          minLevel={4} // 클러스터링 적용 최소 줌 레벨
        >
          {targets.map((pos, i) => (
            <MapMarker
              key={i}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          ))}
        </MarkerClusterer>

        {/* 기준좌표 마커 */}
        <MapMarker
          position={center}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            size: { width: 30, height: 35 },
          }}
        />
      </Map>
    </div>
  );
}

export default StoreMap;
