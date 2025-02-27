import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Map,
  MapMarker,
  ZoomControl,
  MapTypeControl,
} from "react-kakao-maps-sdk";

const center = {
  lat: 36.326784862,
  lng: 127.40783579,
};

function StoreMap() {
  const [address, setAddress] = useState([]); // 주소
  const [targets, setTargets] = useState([]); // 마커 상태 관리

  // 주소 데이터 fetch
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/address`);
        setAddress(res.data); // 주소 데이터 업데이트
      } catch (error) {
        console.log("fetAddress error", error);
      }
    };
    fetchAddress();
  }, []);

  // 마커 클릭 처리 함수 최적화
  const handleMarkerClick = useCallback(() => {
    console.log("마커 클릭됨");
  }, []);

  // 마커 데이터 업데이트 함수
  useEffect(() => {
    if (!address || address.length === 0) return; // address가 없으면 종료

    // address가 변경될 때마다 필터링된 마커를 업데이트
    const filteredTargets = address
      .map((building) => {
        if (building.lat && building.lng) {
          return {
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            lat: building.lat,
            lng: building.lng,
          };
        }
        return null; // lat, lng가 없는 데이터는 무시
      })
      .filter(Boolean); // null 값 필터링

    setTargets(filteredTargets); // 상태 업데이트
  }, [address]); // address가 변경될 때마다 실행

  // 카카오 맵 SDK 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("카카오맵 SDK 로드 완료");
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Map
        center={center}
        className="w-full h-full"
        level={3} // 지도 확대 레벨
        minLevel={10} // 클러스터 할 최소 지도 레벨
      >
        {/* 줌 컨트롤러 추가 */}
        <ZoomControl
          position={"RIGHT"}
          onZoomChanged={(map) => {
            console.log("현재 줌 레벨:", map.getLevel());
          }}
        />

        {/* 지도 타입 컨트롤러 추가 */}
        <MapTypeControl position={"TOPRIGHT"} />

        {/* 마커 추가 */}
        {targets.map((d, i) => (
          <MapMarker
            key={i}
            position={{ lat: d.lat, lng: d.lng }}
            image={{
              src: d.src,
              size: { width: 24, height: 35 },
            }}
            onLoad={() => console.log("마커 로드 완료")}
            onClick={handleMarkerClick} // 최적화된 클릭 핸들러 사용
          />
        ))}

        {/* 기준좌표 마커 */}
        <MapMarker
          position={center}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            size: { width: 24, height: 35 },
          }}
          onLoad={() => console.log("마커 로드 완료")}
          onClick={handleMarkerClick} // 기준좌표 마커도 클릭 핸들러 최적화
        />
      </Map>
    </div>
  );
}

export default StoreMap;
