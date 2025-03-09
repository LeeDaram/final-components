import React, { useState, useEffect, useRef } from "react";
import * as tmImage from "@teachablemachine/image";

const KitchenTest = () => {
  // 모델 URL (Teachable Machine에서 제공)
  const URL = "https://teachablemachine.withgoogle.com/models/0mpeZYm5b/";
  const [model, setModel] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // 이미지
  const [predictions, setPredictions] = useState([]); // 분석결과
  const fileInputRef = useRef(null);

  // 모델 초기화 (컴포넌트가 마운트될 때)
  useEffect(() => {
    async function init() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    }
    init();
    //결과 값이 있을때 반려 대기 판단.
    const vlaue = parseInt(
      parseFloat(predictions[0]?.probability.toFixed(2)) * 100
    );
    if (predictions.length > 0) {
      console.log(predictions[0]?.className, vlaue);
    }
  }, [predictions]);

  console.log(predictions, "결과물");

  // 파일 업로드 후 이미지 판단측 실행
  const readURL = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      // 약간의 딜레이주기
      setTimeout(() => {
        predict();
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      readURL(file);
    }
  };

  // 업로드된 이미지 제거 (초기화)
  const removeUpload = () => {
    setImageSrc(null);
    setPredictions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 예측 함수: 모델을 통해 이미지를 분석하고 결과를 상태에 저장
  const predict = async () => {
    if (!model) return;
    const imageElement = document.getElementById("face-image");
    const prediction = await model.predict(imageElement, false);
    setPredictions(prediction);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 영역 */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800">주방 판단하기</h1>
        <h2 className="text-2xl text-gray-600 mt-2">과연 깨끗할까?</h2>
      </section>

      {/* 업로드 영역 */}
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="file-upload">
          {!imageSrc ? (
            <div
              className="border-4 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition duration-200 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  readURL(e.dataTransfer.files[0]);
                }
              }}
            >
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <img
                src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
                alt="upload icon"
                className="w-20 h-20 mb-4"
              />
              <p className="text-gray-600">눌러서 사진을 업로드하세요!</p>
            </div>
          ) : (
            <div className="relative">
              <img
                id="face-image"
                src={imageSrc}
                alt="Uploaded"
                onLoad={predict} // 이미지 로드 후 판단
                style={{
                  opacity: 0,
                  position: "absolute",
                  width: "300px",
                  height: "auto",
                }}
              />
              <button
                onClick={removeUpload}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenTest;
