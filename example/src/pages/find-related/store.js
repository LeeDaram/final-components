import { useEffect, useState } from "react";
import StoreComponent from "../../components/Store";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";

// 체크박스 옵션
const option = [
  "주차",
  "포장",
  "배달",
  "예약",
  "와이파이",
  "반려동물",
  "유아시설",
];

function Store() {
  // 상태 관리
  const [stores, setStores] = useState([]);
  const [sido, setSido] = useState([]);
  const [sigungu, setSigungu] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지네이션 설정
  const totalElement = 8707;
  const size = 8;
  const totalPages = Math.ceil(totalElement / size);

  // 데이터 가져오기
  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `http://localhost:8080/stores?page=${currentPage}&size=${size}`
        );
        setStores(resp.data.content);
        // console.log(setStores(resp.data.content));
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
      setIsLoading(false);
    }
    fetch();
  }, [currentPage]);

  // 페이지 번호 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 10;
    let start = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;

    if (end >= totalPages) {
      end = totalPages - 1;
      start = Math.max(0, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      {/* 나중에 카카오 지도 api 넣을 곳 */}
      <div className="w-full h-96 bg-current"></div>

      {/* 옵션 관련 */}
      <div className="w-9/12 mx-auto">
        <div className="flex justify-evenly items-center gap-6 py-4">
          <div className="flex items-center">
            <label className="font-bold mr-2">시도</label>
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center sm:w-64 md:w-80 lg:w-96">
              <option value="">전체</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">시군구</label>
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center sm:w-64 md:w-80 lg:w-96">
              <option value="">전체</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">업종</label>
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400">
              <option value="">전체</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400">
              <option value="">업소명</option>
            </select>

            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="border border-gray-400 px-4 py-2 rounded-md text-center w-60 mr-40"
            />
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <p>추천순 |</p>
            <p>평점순 |</p>
            <p>거리순</p>
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-4">
          {option.map((label, index) => (
            <div
              key={`${label}-${index}`}
              className="flex items-center gap-1 mr-10 px-5"
            >
              <input
                id={`checkbox${label}`}
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor={`checkbox${label}`}
                className="text-sm cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </div>

        {/* 카드 레이아웃 */}
        {isLoading ? (
          <div className="text-center py-6 font-bold text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 p-6">
            {stores.length > 0 ? (
              stores.map((d, index) => (
                <StoreComponent key={`${d.storeId}-${index}`} data={d} />
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500">
                데이터가 없습니다.
              </div>
            )}
          </div>
        )}

        {/* 페이지 관련 */}
        <div className="flex justify-center items-center mt-6">
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                currentPage === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(0)}
            >
              <FiChevronsLeft />
            </button>
            <button
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                currentPage === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FiChevronLeft />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={`i-${page}`}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                currentPage === totalPages - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FiChevronRight />
            </button>

            <button
              className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                currentPage === totalPages - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(totalPages - 1)}
            >
              <FiChevronsRight />
            </button>
          </nav>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          페이지 {currentPage + 1} / {totalPages}
        </div>
      </div>
    </>
  );
}

export default Store;
