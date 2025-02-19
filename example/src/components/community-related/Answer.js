import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImgCarousel } from "../../components/ui/Carousel";
import { useLocation } from "react-router-dom";

const Answer = () => {
  const location = useLocation();
  const data = location.state;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "관리자",
      content: "질문에 대한 답변입니다.",
      date: "2025.02.15",
    },
    {
      id: 2,
      author: "관리자",
      content: "질문에 대한 답변입니다.",
      date: "2025.02.15",
    },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const USER_ROLE = "admin"; // 현재 관리자 역할 (테스트용)
  const navigate = useNavigate();

  // 답글 등록
  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    setComments([
      {
        id: comments.length + 1,
        author: "관리자",
        content: comment,
        date: "2025.02.19",
      },
      ...comments, // 최신 답글이 위에 오도록 설정
    ]);
    setComment("");
  };

  // 답글 삭제
  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // 답글 수정 모드 활성화
  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditingContent(content);
  };

  // 답글 수정 저장
  const handleSaveEdit = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, content: editingContent } : c))
    );
    setEditingId(null);
    setEditingContent("");
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="w-9/12">
          <ImgCarousel />
        </div>
      </div>

      <div className="flex justify-center items-center pb-10 mt-10">
        <div className="w-9/12 bg-white p-8 rounded border">
          {/* 목록 버튼 */}
          <div className="flex justify-between mb-4 border-b border-black">
            <h1 className="text-2xl font-semibold mb-4">
              {data?.notice}
              {data?.qna}
            </h1>
            <button
              className="text-sm text-gray-600 hover:underline"
              onClick={() => navigate("/community-related/notice")}
            >
              ☰ 목록가기
            </button>
          </div>

          {/* 질문 내용 */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">질문이 있는데요.</h2>
            <div className="border-b py-2">
              <span className="text-gray-600 mr-5">회원ID</span>
              <span className="text-gray-600 mt-2">2025.02.10</span>
            </div>
            <p className="mt-4 text-gray-700 leading-relaxed py-7">
              여기 작성된 내용은 사용자가 궁금해하는 내용입니다. <br />
              여기 작성된 내용은 사용자가 궁금해하는 내용입니다. 여기 작성된
              내용은 사용자가 궁금해하는 내용입니다.
            </p>
          </div>

          {/* 관리자 답변 입력란 (상단에 위치) */}
          {USER_ROLE === "admin" && (
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border rounded h-24 resize-none"
                placeholder="답글을 입력하세요..."
              />
              <div className="flex justify-end">
                <button
                  onClick={handleCommentSubmit}
                  className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  등록
                </button>
              </div>
            </div>
          )}

          {/* 관리자 답변 목록 */}
          <h2 className="text-xl font-semibold mb-4">답변</h2>
          {comments.map((c) => (
            <div
              key={c.id}
              className="border p-4 mb-3 rounded-lg bg-gray-50 relative"
            >
              <div className="flex justify-between">
                <span className="font-semibold">관리자</span>
                <div>
                  {editingId === c.id ? (
                    <>
                      <button
                        className="text-sm text-green-600 hover:underline mr-2"
                        onClick={() => handleSaveEdit(c.id)}
                      >
                        저장
                      </button>
                      <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => setEditingId(null)}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-sm text-gray-600 hover:underline mr-2"
                        onClick={() => handleEdit(c.id, c.content)}
                      >
                        수정
                      </button>
                      <button
                        className="text-sm text-gray-600 hover:underline"
                        onClick={() => handleDelete(c.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>

              {editingId === c.id ? (
                <textarea
                  className="w-full p-2 border rounded h-20 my-3"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 mt-5">{c.content}</p>
              )}

              <p className="text-gray-500 text-sm absolute right-4 bottom-2">
                {c.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Answer;
