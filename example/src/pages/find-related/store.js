import { useEffect, useState } from "react";
import StoreComponent from "../../components/Store";
import axios from "axios";

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
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLodaing] = useState(false);

  useEffect(() => {
    async function fetch() {
      const resp = await axios.get(
        `http://localhost:8080/stores?page=${currentPage}`
      );
      setIsLodaing(false);
      setStores(resp.data.content);
    }
    fetch();
  }, [currentPage]);

  return (
    <>
      {isLoading
        ? "Loading..."
        : stores.map((d) => <StoreComponent key={d.storeId} data={d} />)}

      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => setCurrentPage(0)}
      >
        1
      </button>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => setCurrentPage(1)}
      >
        2
      </button>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => {
          setCurrentPage(2);
          setIsLodaing(true);
        }}
      >
        3
      </button>

      <div className="w-full h-80 bg-current"></div>

      <div className="max-w-[60%] mx-auto">
        <div className="flex justify-evenly items-center gap-6 py-4">
          <div className="flex items-center">
            <label className="font-bold mr-2">시도</label>
            <input
              type="text"
              placeholder="전체"
              className="border border-gray-400 px-4 py-2 rounded-md text-center"
            />
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">시군구</label>
            <input
              type="text"
              placeholder="전체"
              className="border border-gray-400 px-4 py-2 rounded-md text-center"
            />
          </div>

          <div className="flex items-center">
            <label className="font-bold mr-2">업종</label>
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400">
              <option value="">전체</option>
            </select>
          </div>
        </div>

        <div className="flex justify-evenly items-center gap-2 mt-2">
          <div className="flex items-center gap-2">
            <select className="border border-gray-400 px-4 py-2 rounded-md text-center text-gray-400">
              <option value="">업소명</option>
            </select>

            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="border border-gray-400 px-4 py-2 rounded-md text-center w-60"
            />
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <p>추천순 |</p>
            <p>평점순 |</p>
            <p>거리순</p>
          </div>
        </div>

        <div className="flex justify-evenly items-center w-full mt-4">
          {option.map((label) => (
            <div key={label} className="flex items-center gap-1">
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
      </div>
    </>
  );
}

export default Store;
