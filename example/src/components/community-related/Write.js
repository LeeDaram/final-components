import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImgCarousel } from "../../components/ui/Carousel";
import { FileInput, Label } from "flowbite-react";
import { CommuModal } from "./CommuModal";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState(""); //제목
  const [content, setContent] = useState(""); //내용

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHeader, setIsHeader] = useState(false);

  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달상태
  const navigate = useNavigate();

  //넘어오는 페이지 별로 제목 수정
  const location = useLocation();
  const data = location.state;

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    //공지사항인지 qna인지 조건걸기기
    if (data?.notice) {
      try {
        await axios.post(`http://localhost:8080/notice/create`, {
          title: title,
          content: content,
          isMainNotice: isNotice,
        });
      } catch (error) {
        console.log("ERROR");
      }
    }

    alert("글이 작성되었습니다.");

    if (data?.notice) {
      navigate("/community-related/notice");
    } else if (data?.qna) {
      navigate("/community-related/qna");
    }
  };

  //취소버튼 모달열기
  const handleCancel = () => {
    setIsModalOpen(true);
  };

  const toggleBold = () => setIsBold((prev) => !prev);
  const toggleItalic = () => setIsItalic((prev) => !prev);
  const toggleHeader = () => setIsHeader((prev) => !prev);

  const getTextAreaStyle = () => {
    let styles = "w-full p-3 border border-gray-300 rounded h-48 resize-none ";
    if (isBold) styles += "font-bold ";
    if (isItalic) styles += "italic ";
    if (isHeader) styles += "text-xl ";
    return styles;
  };

  //업로드 파일 이름 표기
  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };
  //중요공지 체크박스 T, F 판단
  const [isNotice, setIsNotice] = useState("F");
  const handleCheckboxChange = (e) => {
    setIsNotice(e.target.checked ? "T" : "F");
  };

  return (
    <>
      <div className="mt-10">
        <div className="flex justify-center items-center">
          <div className="w-9/12">
            <ImgCarousel />
          </div>
        </div>
        <div className="flex justify-center items-center pb-10 mt-10">
          <div className="w-9/12 bg-white p-6 rounded border h-full">
            <div className="flex justify-end mb-4">
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => navigate("/community-related/notice")}
              >
                ☰ 목록가기
              </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">
              {data?.notice}
              {data?.qna}
            </h1>
            {/* 공지사항일때 && 어드민일때(어드민일때만 버튼 보여서 ㄱㅊ을듯) 중요공지 보이기 */}
            {data?.notice && (
              <div className="mb-4 flex ">
                <input
                  type="text"
                  placeholder="제목을 입력해 주세요"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-[88%] p-3 border border-gray-300 rounded mr-auto"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={isNotice === "T"}
                    onChange={(e) => handleCheckboxChange(e)}
                  />
                  <span className="font-bold">중요공지로 등록</span>
                </div>
              </div>
            )}
            {data?.qna && (
              <div className="mb-4 flex ">
                <input
                  type="text"
                  placeholder="제목을 입력해 주세요"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full p-3 border border-gray-300 rounded mr-auto"
                />
              </div>
            )}

            <div className="mb-4">
              <div className="border border-black p-2 mb-2 flex items-center space-x-2">
                {" "}
                <button
                  className={`text-gray-700 font-bold px-3 py-1 ${
                    isBold ? "bg-gray-300" : ""
                  }`}
                  onClick={toggleBold}
                >
                  B
                </button>
                <button
                  className={`text-gray-700 italic px-3 py-1 ${
                    isItalic ? "bg-gray-300" : ""
                  }`}
                  onClick={toggleItalic}
                >
                  I
                </button>
                <button
                  className={`text-gray-700 font-bold px-3 py-1 ${
                    isHeader ? "bg-gray-300" : ""
                  }`}
                  onClick={toggleHeader}
                >
                  H
                </button>
                <button
                  className="text-gray-700 px-3 py-1"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  🔗
                </button>
              </div>
              <textarea
                placeholder="내용을 입력해 주세요"
                value={content}
                onChange={handleContentChange}
                className={`h-80 ${getTextAreaStyle()}`}
              ></textarea>
            </div>

            <div className="mb-4">
              <Label htmlFor="file-upload" className="block text-gray-700 mb-2">
                파일 업로드
              </Label>
              <FileInput
                id="file-upload"
                multiple
                onChange={handleFileChange}
              />
              {files.length > 0 && (
                <ul className="mt-2 text-gray-700">
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-10 py-3 rounded hover:bg-gray-800"
              >
                확인
              </button>
              <button
                onClick={handleCancel}
                className="bg-white text-black px-10 py-3 border border-gray-400 rounded hover:bg-gray-100"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CommuModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Write;
