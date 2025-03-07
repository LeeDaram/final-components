import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa6";

// Material UI
import Rating from "@mui/material/Rating";

function Storereview({ data }) {
  const [review, setReview] = useState([]); // 리뷰 데이터 저장
  const [imgNum, setImgNum] = useState({}); // 이미지 ID 저장 (객체 형태)
  const [likedReviews, setLikedReviews] = useState({}); // 개별 공감 상태 관리

  console.log("데이터받기", data);

  useEffect(() => {
    console.log("데이터받기 2", data);

    const fetchReviews = async () => {
      try {
        console.log("storeId", data.storeId);

        const received = await axios.get(
          `http://localhost:8080/store/reviews/${data.storeId}`
        );
        console.log("데이터받기 44444", received.data);

        setReview(received.data.content);

        // 이미지 ID 변환 및 저장
        const newImgNumList = {};
        received.data.content.forEach((item) => {
          newImgNumList[item.reviewId] = item.imageIds
            ? item.imageIds.split(",")
            : [];
        });

        console.log("가공된 이미지 리스트:", newImgNumList);
        setImgNum(newImgNumList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [data]);

  // 개별 리뷰 공감 상태 토글 함수
  const toggleLike = async (reviewId) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId], // 해당 리뷰 ID의 상태만 변경
    }));

    // 좋아요 API 호출
    try {
      await axios.post(
        `http://localhost:8080/review/${reviewId}/like?isLiked=${isLiked}`
      );

      // 좋아요 숫자 업데이트
      setReview((prevReviews) =>
        prevReviews.map((r) =>
          r.reviewId === reviewId
            ? { ...r, likeCount: isLiked ? r.likeCount + 1 : r.likeCount - 1 }
            : r
        )
      );
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    console.log("업데이트된 리뷰 상태:", review);
  }, [review]);

  return (
    <div>
      {review.length > 0 ? (
        review.map((v, index) => (
          <div key={`review-${index}`} className="border-t pt-4 gap-5">
            {/* 사용자 정보 */}
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-700 text-xl">{v.userId}</p>
              <Rating
                name="half-rating-read"
                defaultValue={v.rating}
                precision={0.5}
                readOnly
              />
            </div>

            {/* 메뉴, 가격 */}
            <p className="text-xs text-gray-400">
              {v.reviewMenu}/{v.reviewPrice}원
            </p>
            {/* 작성일 */}
            <p className="text-xs text-gray-400">{v.createdAt}초</p>

            {/* 리뷰 내용 */}
            <p className="text-xl text-gray-600 mt-2">{v.content}</p>

            {/* 이미지 */}
            <div className="flex gap-2 mt-3">
              {imgNum[v.reviewId]?.map((imgId, i) => (
                <img
                  key={i}
                  src={`http://localhost:8080/review/attachments/${imgId}/download`}
                  alt={`review-${imgId}`}
                />
              ))}
            </div>

            {/* 공감수 버튼 */}
            <div className="flex items-center mt-2">
              <div className="text-black text-xl">
                이 리뷰가 마음에 들으셨나요?
              </div>
              <button
                onClick={() => toggleLike(v.reviewId)}
                className={`ml-3 flex items-center px-3 py-1 border rounded-full transition-all 
    ${
      likedReviews[v.reviewId]
        ? "border-red-500 text-red-500"
        : "border-gray-300 text-gray-500"
    } 
    hover:border-gray-400`}
              >
                <FaRegThumbsUp
                  className={`w-5 h-5 mr-1 ${
                    likedReviews[v.reviewId] ? "fill-red-500 text-white" : ""
                  }`}
                />
                <span className="text-sm">{v.likeCount}</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  );
}

export default Storereview;
