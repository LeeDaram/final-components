import React, { useState, useEffect } from 'react';
import { ImgCarousel } from '../../components/ui/Carousel';
import { Link } from 'react-router-dom';
import { handleEnterKey, handleEscKey } from '../../utils/Keydown';
import axios from 'axios';
import { useAuth } from '../login-related/AuthContext';
import { FaFileAlt } from 'react-icons/fa';
import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
const NoticePage = () => {
    const { user, token } = useAuth();

    // 페이지네이션
    const SIZE = 8;
    const MAX_PAGES_TO_SHOW = 10; // 10개씩
    const [page, setPage] = useState(null);
    const [totalPages, setTotalPages] = useState(0); // 총 페이지의 개수
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

    const [currentPage, setCurrentPage] = useState(1);
    const [searchNotice, setSearchNotice] = useState('');

    const [notices, setNotice] = useState([]);

    const getNoticeData = async (page = 0) => {
        const params = {
            page,
            size: SIZE,
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/notice/main/pagination`, {
                params,
            });

            setTotalPages(res.data.page.totalPages);
            if (res.data && res.data.content.length > 0) {
                setPage(res.data.page);
                setNotice(res.data.content);
            }
        } catch (error) {
            console.error('ERROR');
        }
    };

    // 첫 로드때 데이터 가져오기기
    useEffect(() => {
        async function getData() {
            try {
                await getNoticeData();
            } catch (e) {
                console.error(e);
            }
        }
        getData();
    }, [user]);

    // 검색시 제목, 내용에 있는 거 검색어 일치하는거 가져오기기
    const handleSearch = () => {
        const getNoticeData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/notice/main/search/${searchNotice}`);
                setNotice(res.data);
            } catch (error) {
                console.error('ERROR');
            }
        };
        getNoticeData();
    };
    const handlePageClick = (page) => {
        setCurrentPage(page);
        getNoticeData(page - 1);
    };

    return (
        <>
            {/* 테이블 위에 정보 */}
            <div className="flex justify-center items-center pb-20 mt-10">
                <div className="w-9/12">
                    <ImgCarousel />
                    <h1 className="text-3xl font-bold mb-4 mt-10">공지사항</h1>

                    <div className="flex justify-between items-center border-b pb-4 mb-1 border-black">
                        <div className="text-gray-700">전체 124건 - 현재 페이지 {currentPage}/13</div>
                        <div className="flex items-center border rounded overflow-hidden">
                            <input
                                type="text"
                                placeholder="제목 또는 내용을 입력해주세요"
                                className="p-2 w-64 border-none outline-none bg-white"
                                onChange={(e) => setSearchNotice(e.target.value)}
                                onKeyDown={(e) => handleEnterKey(e, handleSearch)}
                            />
                            <button className="bg-black text-white px-4 py-2" onClick={handleSearch}>
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
                                        {notice.isMainNotice === 'T' ? (
                                            <span className="bg-black text-white px-2 py-1 text-sm rounded-full">
                                                공지
                                            </span>
                                        ) : (
                                            notice.noticeId
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <Link to="/answer" state={{ notice: '공지사항', id: notice.noticeId }}>
                                            <div className="hover:underline">
                                                <span className={`p-3 ${notice.important && 'font-semibold'}`}>
                                                    {notice.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="p-3">관리자</td>
                                    <td className="p-3 text-center">{notice.createdAt}</td>
                                    <td className="p-3 pl-8">{notice.attachmentsCount > 0 && <FaFileAlt />}</td>
                                    <td className="p-3">{notice.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 페이지네이션 필요함 */}
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
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                        }`}
                                        disabled={page.number === 0}
                                        onClick={() => getNoticeData(0)}
                                    >
                                        <FiChevronsLeft />
                                    </button>

                                    {/* 전 페이지로 이동 */}
                                    <button
                                        className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                                            page.number === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                        }`}
                                        disabled={page.number === 0}
                                        onClick={() =>
                                            getNoticeData(
                                                makePageNumbers(page.number, page.totalPages)[MAX_PAGES_TO_SHOW - 10] -
                                                    1
                                            )
                                        }
                                    >
                                        <FiChevronLeft />
                                    </button>

                                    {/* 페이지 넘버 */}
                                    {makePageNumbers(page.number, page.totalPages).map((navNum) => (
                                        <button
                                            key={navNum}
                                            onClick={() => handlePageClick(navNum + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                page.number === navNum
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-white text-gray-900 hover:bg-gray-100'
                                            }`}
                                        >
                                            {navNum + 1}
                                        </button>
                                    ))}

                                    {/* 다음 페이지로 이동 */}
                                    <button
                                        className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                                            page.number === page.totalPages
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                        }`}
                                        disabled={page.number === page.totalPages}
                                        onClick={() =>
                                            getNoticeData(
                                                makePageNumbers(page.number, page.totalPages)[MAX_PAGES_TO_SHOW - 1] + 1
                                            )
                                        }
                                    >
                                        <FiChevronRight />
                                    </button>

                                    {/* 끝 페이지로 이동 */}
                                    <button
                                        className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                                            page.number === page.totalPages - 1
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-white text-gray-900 hover:bg-gray-100'
                                        }`}
                                        disabled={page.number === page.totalPages - 1}
                                        onClick={() => getNoticeData(page.totalPages - 1)}
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

                    {/* admin 일때만만 글쓰기 버튼 */}
                    {user?.role == 'ROLE_ADMIN' && (
                        <div className="flex justify-end mt-6">
                            <Link to="/components/community-related/write" state={{ notice: '공지사항' }}>
                                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-700">
                                    공지사항 작성
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NoticePage;
