import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [userRole, setUserRole] = useState("user"); // user, business, admin 로 로그인 구분 null이거나 undefined시 로그아웃으로 간주함

  const userRole1 = "user"; // user, business, admin 로 로그인 구분 null이거나 undefined시 로그아웃으로 간주함

  const menuStructure = [
    {
      title: "착한가격업소 안내",
      link: "/company",
      subMenu: [
        {
          title: "소개",
          link: "/guide/intro",
          subMenu: [
            { title: "사이트소개", link: "/guide-related/intro/site" },
            { title: "서비스 소개", link: "/guide-related/intro/g-service" },
            { title: "이용가이드", link: "/guide/intro/guide" },
            { title: "브랜드 가이드", link: "/guide/intro/brand" },
            { title: "연혁 페이지", link: "/guide/intro/history" },
          ],
        },
        {
          title: "소비자편",
          link: "/guide/consumer",
          subMenu: [
            {
              title: "소비자 혜택",
              link: "/guide/consumer/benefit",
            },
          ],
        },
        {
          title: "업소편",
          link: "/guide/shop",
          subMenu: [{ title: "점주 혜택", link: "/guide/shop/benefit" }],
        },
      ],
    },
    {
      title: "착한업소찾기",
      link: "/contact",
      subMenu: [{ title: "착한업소 지도", link: "/find/map" }],
    },
    {
      title: "커뮤니티",
      link: "/marketplace",
      subMenu: [
        { title: "공지사항", link: "/community/notice" },
        { title: "Q&A", link: "/community/qna" },
        { title: "FAQ", link: "/community/faq" },
      ],
    },
    {
      title: "채팅",
      link: "/features",
      subMenu: [{ title: "내 채팅방", link: "/chat/room" }],
    },
    {
      title: "마이페이지",
      link: "/team",
      subMenu: [
        { title: "내 정보", link: "/mypage/info" },
        ...(userRole === "user"
          ? [
              { title: "내가 쓴 후기", link: "/mypage/user/review" },
              { title: "내 예약 정보", link: "/mypage/user/reservation" },
            ]
          : userRole === "business"
          ? [
              { title: "착한업소 등록", link: "/mypage/business/register" },
              { title: "내 업소 정보 변경", link: "/mypage/business/info" },
              {
                title: "내 가계 예약 정보",
                link: "/mypage/business/reservation",
              },
            ]
          : userRole === "admin"
          ? [
              { title: "사업자 승인 페이지", link: "/mypage/admin/approval" },
              { title: "통계 및 업소 대시보드", link: "/mypage/admin/stats" },
            ]
          : []),
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const toggleDropdown = (event) => {
    const dropdownMenu = event.currentTarget.nextElementSibling;
    dropdownMenu.classList.toggle("hidden");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4766/4766832.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              착한업소 솔루션
            </span>
          </Link>
          <div className="hidden lg:flex lg:space-x-6">
            {menuStructure.map((menu, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={menu.link}
                  className="block py-2 px-4 text-gray-700 hover:text-blue-700"
                >
                  {menu.title}
                </Link>
                {menu.subMenu.length > 0 && activeMenu === index && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border rounded-md w-48">
                    {menu.subMenu.map((sub, subIndex) => (
                      <div key={subIndex} className="border-b last:border-none">
                        <Link
                          to={sub.link}
                          className="block py-2 px-4 hover:bg-blue-100"
                        >
                          {sub.title}
                        </Link>
                        {sub.subMenu?.length > 0 && (
                          <div className="ml-4 bg-gray-50">
                            {sub.subMenu.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                to={child.link}
                                className="block py-1 px-4 hover:bg-blue-200"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center lg:order-2">
            <div className="w-48 flex justify-center min-w-[192px]">
              {userRole ? (
                <>
                  <div className="dropdown relative inline-flex ml-4 mr-4">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-text btn-circle size-10"
                      onClick={toggleDropdown}
                    >
                      <div className="indicator">
                        <span className="indicator-item bg-error size-2 rounded-full"></span>
                        <span className="icon-[tabler--bell] text-base-content size-[1.375rem]"></span>
                      </div>
                    </button>
                    <div className="dropdown-item absolute top-full left-0 mt-2 z-50 w-60 bg-white shadow-lg border rounded-md flex flex-col hidden">
                      <div className="dropdown-header justify-center">
                        <h6 className="text-base-content text-base">
                          Notifications
                        </h6>
                      </div>
                      <div className="max-h-56 overflow-auto">
                        <div className="dropdown-item">
                          <div className="avatar away-bottom">
                            <div className="w-10 rounded-full">
                              <img
                                src="https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png"
                                alt="avatar 1"
                              />
                            </div>
                          </div>
                          <div className="w-60">
                            <h6 className="truncate text-base">
                              Charles Franklin
                            </h6>
                            <small className="text-base-content/50 truncate">
                              Accepted your connection
                            </small>
                          </div>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="dropdown-footer justify-center gap-1"
                      >
                        <span className="icon-[tabler--eye] size-4"></span>
                        View all
                      </a>
                    </div>
                  </div>
                  <div className="dropdown relative inline-flex ml-4 mr-4">
                    <button
                      type="button"
                      className="dropdown-toggle flex items-center"
                      onClick={toggleDropdown}
                    >
                      <div className="avatar">
                        <div className="size-9.5 rounded-full">
                          <img
                            src="https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png"
                            alt="avatar"
                          />
                        </div>
                      </div>
                    </button>
                    <ul className="dropdown-item absolute top-full left-0 mt-2 z-50 w-60 bg-white shadow-lg border rounded-md flex flex-col hidden">
                      <li className="dropdown-header gap-2">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src="https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png"
                              alt="avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <h6 className="text-base-content text-base font-semibold">
                            John Doe
                          </h6>
                          <small className="text-base-content/50">
                            {userRole}
                          </small>
                        </div>
                      </li>
                      <li>
                        <a
                          className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                          href="#"
                        >
                          My Profile
                        </a>
                      </li>
                      <li className="dropdown-footer gap-2">
                        <button
                          className="btn btn-error btn-soft btn-block"
                          onClick={() => setUserRole(null)}
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/join"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 ml-4"
                  >
                    Join us
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
