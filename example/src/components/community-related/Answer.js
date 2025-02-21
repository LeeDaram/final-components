import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImgCarousel } from "../../components/ui/Carousel";
import DeletModal from "./CommuModal";

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
  const [editingContent, setEditingContent] = useState(""); //답글 수정
  const USER_ROLE = "user"; // 현재 관리자 역할 (테스트용)
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태

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

  const [isEditingMain, setIsEditingMain] = useState(false); // 메인글 수정 상태
  const [editingMain, setEditingMain] = useState(
    "여기 작성된 내용은 사용자가 궁금해하는 내용입니다. 여기 작성된 내용은 사용자가 궁금해하는 내용입니다. 여기 작성된 내용은 사용자가 궁금해하는 내용입니다."
  ); // 메인글 내용

  // 메인글 수정 시작
  const handleEditMain = () => {
    setIsEditingMain(true);
  };

  // 메인글 저장
  const handleSaveMain = () => {
    setIsEditingMain(false);
    alert("완료되었습니다");
  };

  // 메인글 수정 취소
  const handleCancelMain = () => {
    setIsEditingMain(false);
  };

  // 메인글 삭제
  const handleDeleteMain = () => {
    setIsModalOpen(true);
  };

  // 답글 삭제
  const handleDelete = (id) => {
    // 이것도 바로 삭제되면 안됨 키벨류로 넣어서 모달에서 판단해보자
    setIsModalOpen(true);
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
  //qna 글 삭제
  const handleDeletQna = () => {
    setIsModalOpen(true);
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

            {/* 본 내용 수정 모드일 때 textarea 표시 아닐 때 기존 내용 표시 */}
            {isEditingMain ? (
              <textarea
                className="w-full p-3 border rounded h-24 resize-none"
                value={editingMain}
                onChange={(e) => setEditingMain(e.target.value)}
              />
            ) : (
              <p className="mt-4 text-gray-700 leading-relaxed py-7">
                {editingMain}
              </p>
            )}
          </div>

          {/* 관리자가 쓴 공지사항일 때만 수정 & 삭제 버튼 표시 */}
          {data?.notice && USER_ROLE === "admin" && (
            <div className="flex justify-center space-x-4 mt-6 mb-6">
              {isEditingMain ? (
                <>
                  <button
                    onClick={handleSaveMain}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelMain}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEditMain}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDeleteMain}
                    className="bg-white text-black px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}

          {/* 회원 본인이 쓴 글일때만 표시 id확인해서 일치할때만 띄우기 */}
          {data?.qna && USER_ROLE === "user" && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleDeletQna}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-4"
              >
                삭제
              </button>
            </div>
          )}

          {/* qna일때는 모두 답변가능*/}
          {data?.qna && (USER_ROLE === "admin" || USER_ROLE === "user") && (
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

          {/* notice일때는 관리자만 답변가능*/}
          {data?.notice && USER_ROLE === "admin" && (
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
                  {USER_ROLE === "admin" ? (
                    editingId === c.id ? (
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
                    )
                  ) : null}{" "}
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
      {isModalOpen && (
        <DeletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Answer;
