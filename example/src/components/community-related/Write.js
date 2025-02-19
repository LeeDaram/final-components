import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImgCarousel } from "../../components/ui/Carousel";
import { FileInput, Label } from "flowbite-react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isHeader, setIsHeader] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = () => {
    console.log("제목:", title);
    console.log("내용:", content);
    console.log("첨부파일:", files);
    alert("글이 작성되었습니다.");
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
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

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
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

            <h1 className="text-3xl font-bold mb-6">Q&A</h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="제목을 입력해 주세요"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <div className="border border-black p-2 mb-2 flex space-x-4">
                <button
                  className={`text-gray-700 font-bold ${
                    isBold ? "bg-gray-300" : ""
                  }`}
                  onClick={toggleBold}
                >
                  B
                </button>
                <button
                  className={`text-gray-700 italic ${
                    isItalic ? "bg-gray-300" : ""
                  }`}
                  onClick={toggleItalic}
                >
                  I
                </button>
                <button
                  className={`text-gray-700 font-bold ${
                    isHeader ? "bg-gray-300" : ""
                  }`}
                  onClick={toggleHeader}
                >
                  H
                </button>
                <button
                  className="text-gray-700"
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
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
              >
                확인
              </button>
              <button
                onClick={handleCancel}
                className="bg-white text-black px-6 py-3 border border-gray-400 rounded hover:bg-gray-100"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
