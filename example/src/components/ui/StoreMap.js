import React, { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
  ZoomControl,
  MapTypeControl,
} from "react-kakao-maps-sdk";

export const MapComponent = () => {
  // 대전 시청 좌표
  const [center, setCenter] = useState({
    lat: 36.3504119,
    lng: 127.3845475,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // SDK 로드 함수 추가
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log("카카오맵 SDK 로드 완료");
        setIsScriptLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log("카카오맵 SDK 상태:", window.kakao);
    console.log("카카오맵 maps 객체:", window.kakao?.maps);
    console.log("스크립트 로드 상태:", isScriptLoaded);
  }, [isScriptLoaded]);

  if (!isScriptLoaded) {
    return <div>카카오맵 로딩중...</div>;
  }

  console.log("렌더링 시 center 좌표:", center);

  return (
    <div className="w-full h-screen p-4">
      <Map
        center={center}
        style={{
          // 지도 크기 설정
          width: "100%",
          height: "600px",
          borderRadius: "12px", // 모서리 둥글게
        }}
        level={3} // 지도 확대 레벨
        onTileLoaded={() => {
          console.log("지도 타일 로딩 완료");
          setIsLoading(false);
        }}
        onCreate={(map) => {
          console.log("지도 인스턴스 생성:", map);
        }}
        onCenterChanged={(map) =>
          console.log("지도 중심 좌표:", map.getCenter().toString())
        }
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
        <MapMarker
          position={center}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            size: { width: 64, height: 69 },
          }}
          onLoad={() => console.log("마커 로드 완료")}
          onClick={() => console.log("마커 클릭됨")}
        >
          <div style={{ padding: "5px", color: "#000" }}>대전광역시청</div>
        </MapMarker>
      </Map>

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
