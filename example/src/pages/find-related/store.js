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
  const [stores, setStores] = useState([]); // 업소 정보들
  const [filteredStores, setFilteredStores] = useState([]); // 필터링된 업소 데이터
  const [sido, setSido] = useState([]); // 시도
  const [sigungu, setSigungu] = useState([]); // 시군구
  const [filterSigungu, setFilterSigungu] = useState([]); // 필터링된 시군구
  const [selectSido, setSelectSido] = useState(""); // 선택된 시도
  const [selectSigungu, setSelectSigungu] = useState([]); // 선택된 시군구
  const [industry, setIndustry] = useState([]); // 업종
  const [selectIndustry, setSelectIndustry] = useState([]); // 선택된 업종
  // const [searchTerm, setSearchTerm] = useState(""); // 검색어
  // const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 편의시설
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩
  const [activeSort, setActiveSort] = useState("recommend"); // 추천순or평점순or거리순의 현재 값

  // 페이지 기본 값
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
        const sidoData = await axios.get(`http://localhost:8080/sido`);
        const sigunguData = await axios.get(`http://localhost:8080/sigungu`);
        const industryData = await axios.get(`http://localhost:8080/industry`);

        setStores(resp.data.content);
        setSido(sidoData.data);
        setSigungu(sigunguData.data);
        setIndustry(industryData.data);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
      setIsLoading(false);
    }

    fetch();
  }, [currentPage]);

  // 시도 선택 시 시군구 필터링
  useEffect(() => {
    setFilterSigungu([]);

    if (selectSido) {
      setFilterSigungu(
        sigungu.filter(
          (sigunguList) => sigunguList.sidoId === parseInt(selectSido)
        )
      );
    }
  }, [selectSido, sigungu]);

  // 시도, 시군구, 업종 선택 시 자동 필터링
  useEffect(() => {
    let filtered = stores.filter((store) => {
      return (
        (!selectSido || store.sidoId === parseInt(selectSido)) &&
        (!selectSigungu || store.sigunguId === parseInt(selectSigungu)) &&
        (!selectIndustry || store.industryId === parseInt(selectIndustry))
      );
    });

    // 필터링된 데이터가 없으면 전체 데이터를 유지
    if (filtered.length === 0) {
      filtered = [...stores];
    }

    // 정렬 적용
    let sortedStores = [...filtered];
    if (activeSort === "rating") {
      sortedStores.sort((a, b) => b.averageRating - a.averageRating);
    } else if (activeSort === "distance") {
      sortedStores.sort((a, b) => a.distance - b.distance);
    }

    setFilteredStores(sortedStores);
  }, [stores, selectSido, selectSigungu, selectIndustry, activeSort]);

  // 검색 버튼
  const handleSearchClick = () => {};

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
      {/* 카카오 지도 api 넣을 곳 */}
      <div className="w-full h-96 bg-current"></div>

      {/* 옵션 관련 */}
      <div className="w-9/12 mx-auto">
        <div className="flex justify-evenly items-center gap-6 py-4">
          <div className="flex items-center">
            <label className="font-bold mr-2">시도</label>
            <select
              className="border border-gray-400 px-4 py-2 rounded-md text-center sm:w-64 md:w-80 lg:w-96"
              value={selectSido}
              onChange={(e) => setSelectSido(Number(e.target.value))}
            >
              <option value="">전체</option>
              {sido.map((value) => (
                <option value={`${value.sidoId}`} key={`${value.sidoId}`}>
                  {value.sidoName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">시군구</label>
            <select
              className="border border-gray-400 px-4 py-2 rounded-md text-center sm:w-64 md:w-80 lg:w-96"
              value={selectSigungu}
              onChange={(e) => setSelectSigungu(e.target.value)}
            >
              <option value="">전체</option>
              {filterSigungu.map((value) => (
                <option
                  key={`sigungu-${value.sigunguId}`}
                  value={value.sigunguId}
                >
                  {value.sigunguName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">업종</label>
            <select
              className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400"
              value={selectIndustry}
              onChange={(e) => setSelectIndustry(e.target.value)}
            >
              <option value="">전체</option>
              {industry.map((value) => (
                <option
                  value={value.industryId}
                  key={`industry-${value.industryId}`}
                >
                  {value.industryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 업소명, 대표메뉴 검색 필터링 */}
        <div className="flex justify-evenly items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400">
              <option value="">업소명</option>
              <option value="">대표메뉴</option>
            </select>

            {/* 검색바 */}
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="border border-gray-400 px-4 py-2 rounded-md text-center w-60 mr-40 sm:w-64 md:w-80 lg:w-96"
            />
          </div>

          {/* 추천순, 평점순, 거리순 필터링 */}
          <div className="flex items-center gap-2 text-gray-400">
            <p
              onClick={() => setActiveSort("recommend")}
              className={`cursor-pointer ${
                activeSort === "recommend" ? "text-blue-500 font-bold" : ""
              }`}
            >
              추천순
            </p>
            ㅣ
            <p
              onClick={() => setActiveSort("rating")}
              className={`cursor-pointer ${
                activeSort === "rating" ? "text-blue-500 font-bold" : ""
              }`}
            >
              평점순
            </p>
            ㅣ
            <p
              onClick={() => setActiveSort("distance")}
              className={`cursor-pointer ${
                activeSort === "distance" ? "text-blue-500 font-bold" : ""
              }`}
            >
              거리순
            </p>
          </div>
        </div>

        {/* 편의시설 필터링 */}
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
        {/* 검색, 초기화 버튼 */}
        <div className="flex justify-center mt-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-center mr-4"
            onClick={() => handleSearchClick()}
          >
            검색
          </button>
          <button className="border bg-white text-blue-600 px-4 py-2 rounded-md text-center">
            초기화
          </button>
        </div>

        {/* 업소 목록 */}
        {isLoading ? (
          <div className="text-center py-6 font-bold text-gray-600">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 p-6">
            {filteredStores.length > 0 ? (
              filteredStores.map((d, index) => (
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
