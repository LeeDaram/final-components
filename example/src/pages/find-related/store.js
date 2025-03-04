import { useEffect, useState } from "react";
import StoreComponent from "../../components/Store";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";
import StoreMap from "../../components/ui/StoreMap";

// 체크박스 옵션
const filterCheckboxes = [
  { key: "parking", name: "주차" },
  { key: "takeout", name: "포장" },
  { key: "delivery", name: "배달" },
  // {key: 'parking', name: '예약'}, // TODO: 예약 관련 코드 추가
  { key: "wifi", name: "와이파이" },
  { key: "pet", name: "반려동물" },
  { key: "kid", name: "유아시설" },
];

const SIZE = 8;
const MAX_PAGES_TO_SHOW = 10; // 10개씩 그룹화

function Store() {
  // 상태 관리
  const [stores, setStores] = useState([]); // 업소 정보들

  /**
   * Filters
   */
  const [sido, setSido] = useState([]); // 시도
  const [selectSido, setSelectSido] = useState(6); // 선택된 시도

  const [sigungu, setSigungu] = useState([]); // 시군구
  const [selectSigungu, setSelectSigungu] = useState(0); // 선택된 시군구

  const [industry, setIndustry] = useState([]); // 업종
  const [selectIndustry, setSelectIndustry] = useState([]); // 선택된 업종

  const [searchType, setSearchType] = useState("storeName"); // 업소명/대표메뉴 선택
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드

  const [totalPages, setTotalPages] = useState(0); // 총 페이지의 개수
  const [rating, setRating] = useState(0); // 평점
  const [sort, setSort] = useState(0); // 추천순 혹은 평점순

  // 체크박스 상태 관리
  const [filters, setFilters] = useState({
    parking: "",
    takeout: "",
    delivery: "",
    wifi: "",
    pet: "",
    kid: "",
  });

  const [filterSigungu, setFilterSigungu] = useState([]); // 필터링된 시군구

  const [isLoading, setIsLoading] = useState(false); // 로딩

  const [page, setPage] = useState(null);

  // 시도 선택 시 시군구 필터링
  useEffect(() => {
    if (!selectSido) {
      setFilterSigungu([]);
      return;
    }

    if (sigungu.length > 0) {
      const filtered = sigungu.filter(
        (sigunguList) => Number(sigunguList.sidoId) === Number(selectSido)
      );
      setFilterSigungu(filtered);
    }
  }, [selectSido, sigungu]);

  // 검색 버튼
  const handleSearchClick = async (page = 0, value = sort) => {
    const { parking, takeout, delivery, wifi, pet, kid } = filters; // TODO: 예약 관련 코드 추가해야 함
    console.log(filters);
    const params = {
      page,
      size: SIZE,
      storeId: stores.storeId,
      sidoId: selectSido || null,
      sigunguId: selectSigungu || null,
      industryId: selectIndustry || null,
      storeName: searchType === "storeName" ? searchKeyword : "",
      mainMenu: searchType === "mainMenu" ? searchKeyword : "",
      parking,
      takeout,
      delivery,
      wifi,
      pet,
      kid,
      sort: value,
    };

    console.log("검색 요청 파라미터:", params);
    // console.log("sort 값", params.sort);

    try {
      const response = await axios.get("http://localhost:8080/stores", {
        params,
      });

      console.log("서버 응답:", response.data);
      // console.log("현재페이지의 총 개수", response.data.page.totalPages);
      setTotalPages(response.data.page.totalPages);

      if (response.data && response.data.content.length > 0) {
        // const isAnyFilterChecked = Object.values(filters).some(Boolean);

        // console.log("필터 적용 여부:", isAnyFilterChecked);
        setStores(response.data.content);
        setPage(response.data.page); // 페이지 정보 업데이트
      } else {
        setStores([]); // 데이터 없을 경우 빈 배열로 초기화
        setPage(null);
      }
    } catch (error) {
      console.error(" 필터 검색 실패:", error);
    }
  };

  // 페이지 번호 생성
  const makePageNumbers = (currentPage, totalPages) => {
    let pages = [];

    // 현재 그룹의 시작/끝 페이지 계산
    let start = Math.floor(currentPage / MAX_PAGES_TO_SHOW) * MAX_PAGES_TO_SHOW;
    let end = Math.min(start + MAX_PAGES_TO_SHOW - 1, totalPages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 검색조건 가져오기
  useEffect(() => {
    async function fetch() {
      try {
        // const resp = await axios.get(
        //   `http://localhost:8080/stores?page=${currentPage}&size=${size}`
        // );
        const sidoData = await axios.get(`http://localhost:8080/sido`);
        const sigunguData = await axios.get(`http://localhost:8080/sigungu`);
        const industryData = await axios.get(`http://localhost:8080/industry`);

        await handleSearchClick();

        // setStores(resp.data.content);
        setSido(sidoData.data);
        setSigungu(sigunguData.data);
        setIndustry(industryData.data);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }

    fetch();
  }, []);

  // 추천,평점 클릭 함수
  const handleSortClick = (value) => {
    setSort(value);
    handleSearchClick(0, value);
  };

  // 편의시설 옵션 체크
  const handleFilterChange = (event) => {
    console.log(event);
    const { id, name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked ? "T" : "",
    }));
  };

  // 초기화 버튼
  const handleResetButton = () => {
    setSelectSido("");
    setSelectSigungu("");
    setSelectIndustry("");
    setSearchType("storeName");
    setSearchKeyword("");
    setSort(0);
    setFilters({
      parking: "",
      takeout: "",
      delivery: "",
      wifi: "",
      pet: "",
      kid: "",
    });
  };

  useEffect(() => {
    console.log("선택된 시도", selectSido);
    console.log("선택된 시군구", selectSigungu);
  }, [selectSido, selectSigungu]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(); // 검색 실행
    }
  };

  return (
    <>
      {/* 카카오 지도 api 넣을 곳 */}
      {/* <div className="w-full h-96 bg-current" id="map"> */}
      <div className="w-full h-96" id="map">
        <StoreMap />
      </div>

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
              // value={selectSigungu}
              // onChange={(e) => setSelectSigungu(e.target.value)}
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
            <select
              className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="storeName">업소명</option>
              <option value="mainMenu">대표메뉴</option>
            </select>

            {/* 검색바 */}
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="border border-gray-400 px-4 py-2 rounded-md text-center w-60 mr-40 sm:w-64 md:w-80 lg:w-96"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          {/* 추천순, 평점순 정렬 */}
          <div className="flex items-center gap-2 text-gray-400">
            <p
              onClick={() => handleSortClick(0)}
              className={`cursor-pointer ${
                sort === 0 ? "text-blue-500 font-bold" : "text-gray-400"
              }`}
            >
              추천순
            </p>
            ㅣ
            <p
              onClick={() => handleSortClick(1)}
              className={`cursor-pointer ${
                sort === 1 ? "text-blue-500 font-bold" : "text-gray-400"
              }`}
            >
              평점순
            </p>
          </div>
        </div>

        {/* 편의시설 필터링 */}
        <div className="flex justify-center items-center w-full mt-4">
          {filterCheckboxes.map((item, index) => (
            <div
              key={`${item.key}`}
              className="flex items-center gap-1 mr-10 px-5"
            >
              <input
                id={item.key}
                type="checkbox"
                name={item.name}
                checked={filters[item.key] === "T"}
                onChange={handleFilterChange}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor={item.key} className="text-sm cursor-pointer">
                {item.name}
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
          <button
            className="border bg-white text-blue-600 px-4 py-2 rounded-md text-center"
            onClick={handleResetButton}
          >
            초기화
          </button>
        </div>

        {/* 업소 목록 */}
        {isLoading ? (
          <div className="text-center py-6 font-bold text-gray-600">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 p-6">
            {stores.length > 0 ? (
              stores.map((d, index) => (
                <StoreComponent key={`${d.storeId}-${index}`} data={d} />
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500">
                <span class="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
        )}

        {/* 페이지 관련 */}
        {page && (
          <>
            <div className="flex justify-center items-center mt-6">
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                    page.number === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                  disabled={page.number === 0}
                  onClick={() => handleSearchClick(0)}
                >
                  <FiChevronsLeft />
                </button>

                {/* 전 페이지로 이동 */}
                <button
                  className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                    page.number === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                  disabled={page.number === 0}
                  onClick={() =>
                    handleSearchClick(
                      makePageNumbers(page.number, page.totalPages)[
                        MAX_PAGES_TO_SHOW - 10
                      ] - 1
                    )
                  }
                >
                  <FiChevronLeft />
                </button>

                {/* 페이지 넘버 */}
                {makePageNumbers(page.number, page.totalPages).map((navNum) => (
                  <button
                    key={navNum}
                    onClick={() => handleSearchClick(navNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page.number === navNum
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {navNum + 1}
                  </button>
                ))}

                {/* 다음 페이지로 이동 */}
                <button
                  className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                    page.number === page.totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                  disabled={page.number === page.totalPages}
                  onClick={() =>
                    handleSearchClick(
                      makePageNumbers(page.number, page.totalPages)[
                        MAX_PAGES_TO_SHOW - 1
                      ] + 1
                    )
                  }
                >
                  <FiChevronRight />
                </button>

                {/* 끝 페이지로 이동 */}
                <button
                  className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                    page.number === page.totalPages - 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                  disabled={page.number === page.totalPages - 1}
                  onClick={() => handleSearchClick(page.totalPages - 1)}
                >
                  <FiChevronsRight />
                </button>
              </nav>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
              페이지 {page.number + 1} / {page.totalPages}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Store;
