import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  const userRole = "business"; // user, business, admin 로 컨트롤

  const menuStructure = [
    {
      title: "착한가격업소 안내",
      link: "/guide",
      subMenu: [
        {
          title: "소개",
          link: "/guide/intro",
          subMenu: [
            { title: "사이트소개", link: "/guide/intro/site" },
            { title: "서비스 소개", link: "/guide/intro/service" },
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
      link: "/find",
      subMenu: [{ title: "착한업소 지도", link: "/find/map" }],
    },
    {
      title: "커뮤니티",
      link: "/community",
      subMenu: [
        { title: "공지사항", link: "/community/notice" },
        { title: "Q&A", link: "/community/qna" },
        { title: "FAQ", link: "/community/faq" },
      ],
    },
    {
      title: "채팅",
      link: "/chat",
      subMenu: [{ title: "내 채팅방", link: "/chat/room" }],
    },
    {
      title: "마이페이지",
      link: "/mypage",
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
            <Link
              to="/login"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Log in
            </Link>
            <Link
              to="/join"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
