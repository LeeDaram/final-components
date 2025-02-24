import React, { useState, useEffect } from "react";
import { ImgCarousel } from "../../components/ui/Carousel";
import { Link } from "react-router-dom";
import { handleEnterKey, handleEscKey } from "../../utils/Keydown";
import axios from "axios";
const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNotice, setSearchNotice] = useState("");
  const totalPages = 13;

  const [notices, setNotice] = useState([]);
  // 첫 로드때 데이터 가져오기기
  useEffect(() => {
    const getNoticeData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/notice/main");
        setNotice(res.data);
      } catch (error) {
        console.log("ERROR");
      }
    };
    getNoticeData();
  }, []);

  // 검색시 제목, 내용에 있는 거 검색어 일치하는거 가져오기기
  const handleSearch = () => {
    const getNoticeData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/notice/main/search/${searchNotice}`
        );
        setNotice(res.data);
      } catch (error) {
        console.log("ERROR");
      }
    };
    getNoticeData();
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* 테이블 위에 정보 */}
      <div className="flex justify-center items-center pb-20 mt-10">
        <div className="w-9/12">
          <ImgCarousel />
          <h1 className="text-3xl font-bold mb-4 mt-10">공지사항</h1>

          <div className="flex justify-between items-center border-b pb-4 mb-1 border-black">
            <div className="text-gray-700">
              전체 124건 - 현재 페이지 {currentPage}/13
            </div>
            <div className="flex items-center border rounded overflow-hidden">
              <input
                type="text"
                placeholder="제목 또는 내용을 입력해주세요"
                className="p-2 w-64 border-none outline-none bg-white"
                onChange={(e) => setSearchNotice(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e, handleSearch)}
              />
              <button
                className="bg-black text-white px-4 py-2"
                onClick={handleSearch}
              >
                검색
              </button>
            </div>
          </div>

          {/* 테이블 시작 */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="p-3 w-[7rem] ">번호</th>
                <th className="p-3 text-center">제목</th>
                <th className="p-3  w-[7rem]">작성자</th>
                <th className="p-3 text-center w-[10rem]">작성일</th>
                <th className="p-3 w-[7rem] ">첨부파일</th>
                <th className="p-3 w-[7rem]">조회수</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {notice.isMainNotice === "T" ? (
                      <span className="bg-black text-white px-2 py-1 text-sm rounded-full">
                        공지
                      </span>
                    ) : (
                      notice.noticeId
                    )}
                  </td>
                  <Link
                    to="/answer"
                    state={{ notice: "공지사항", id: notice.noticeId }}
                  >
                    <div className="hover:underline">
                      <td
                        className={`p-3 ${notice.important && "font-semibold"}`}
                      >
                        {notice.title}
                      </td>
                    </div>
                  </Link>
                  <td className="p-3">관리자</td>
                  <td className="p-3 text-center">{notice.createdAt}</td>
                  <td className="p-3 pl-8">{notice.attachment && "📂"}</td>
                  <td className="p-3">{notice.views}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 임시 페이징처리리 */}
          <nav className="flex items-center justify-center gap-x-1 mt-20">
            <button type="button" className="btn btn-soft btn-square">
              <span className="icon-[tabler--chevron-left] size-5 rtl:rotate-180"></span>
            </button>
            <div className="flex items-center gap-x-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn btn-soft btn-square aria-[current='page']:text-bg-soft-primary ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {/* 아래 버튼에 페이지 넘기는 로직 픽요함함 */}
            <button type="button" className={`btn btn-soft btn-square`}>
              <span className="icon-[tabler--chevron-right] size-5 rtl:rotate-180"></span>
            </button>
          </nav>

          {/* admin 일때만만 글쓰기 버튼 */}
          <div className="flex justify-end mt-6">
            <Link
              to="/components/community-related/write"
              state={{ notice: "공지사항" }}
            >
              <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-700">
                글쓰기 USER_ROLE에 따라서 컨트롤
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticePage;
