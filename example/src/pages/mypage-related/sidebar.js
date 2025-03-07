import { useState, useEffect } from 'react';
import { useAuth } from '../../pages/login-related/AuthContext';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    const { user } = useAuth();
    const location = useLocation();

    // 메뉴 구조
    const menuStructure =
        user?.role === 'ROLE_USER'
            ? [
                  {
                      name: '내정보관리',
                      link: '/mypage/update/info',
                      subMenu:
                          user?.loginType === 'SOCIAL'
                              ? [
                                    { name: '내정보수정', route: '/mypage/update/info' },
                                    { name: '회원탈퇴', route: '/mypage/delete/account' },
                                ]
                              : [
                                    { name: '내정보수정', route: '/mypage/update/info' },
                                    { name: '비밀번호변경', route: '/mypage/update/password' },
                                    { name: '회원탈퇴', route: '/mypage/delete/account' },
                                ],
                  },
                  { name: '작성한 리뷰', route: '/mypage/reviews' },
                  { name: '예약현황', route: '/mypage/reservations' },
              ]
            : user?.role === 'ROLE_BIZ'
            ? [
                  {
                      name: '내정보관리',
                      link: '/mypage/update/info',
                      subMenu: [
                          { name: '내정보수정', route: '/mypage/update/info' },
                          { name: '비밀번호변경', route: '/mypage/update/password' },
                          { name: '회원탈퇴', route: '/mypage/delete/account' },
                      ],
                  },
                  {
                      name: '업소정보관리',
                      link: '/business/apply',
                      subMenu: [
                          { name: '착한가격업소 등록 신청', route: '/mypage/business/apply' },
                          { name: '착한가격업소 재신청', route: '/mypage/business/register' },
                          { name: '등록신청결과조회', route: '/mypage/business/apply-status' },
                          { name: '업소정보변경', route: '/mypage/business/update-info' },
                      ],
                  },
                  { name: '예약현황', route: '/mypage/business/reservations' },
              ]
            : user?.role === 'ROLE_ADMIN'
            ? [
                  {
                      name: '내정보관리',
                      link: '/mypage/update/info',
                      subMenu: [
                          { name: '내정보수정', route: '/mypage/update/info' },
                          { name: '비밀번호변경', route: '/mypage/update/password' },
                      ],
                  },
                  { name: '착한가격업소 승인 관리', route: '/mypage/admin/approval' },
                  { name: '통계 및 업소 대시보드', route: '/mypage/admin/dashboard' },
              ]
            : [];

    const [activeMenu, setActiveMenu] = useState('');
    const [activeSubMenu, setActiveSubMenu] = useState('');

    useEffect(() => {
        const activeSub = menuStructure
            .flatMap((item) => item.subMenu || [])
            .find((subItem) => subItem.route === location.pathname);

        if (activeSub) {
            setActiveSubMenu(activeSub.name);
            setActiveMenu(activeSub.route);
        } else {
            const activeMainMenu = menuStructure.find(
                (item) => item.link === location.pathname || item.route === location.pathname
            );
            if (activeMainMenu) {
                setActiveMenu(activeMainMenu.route || activeMainMenu.link);
            }
        }
    }, [location, menuStructure]);

    return (
        <div className="drawer-body px-2 pt-4">
            <aside
                id="multilevel-with-separator"
                className="overlay sm:shadow-none overlay-open:translate-x-0 hidden max-w-64 sm:z-0 sm:flex sm:translate-x-0"
                tabIndex="-1"
            >
                <div className="drawer-body px-2 pt-4">
                    <ul className="menu space-y-0.5 [&_.nested-collapse-wrapper]:space-y-0.5 [&_ul]:space-y-0.5 p-0">
                        {menuStructure.map((item, index) => (
                            <li className="space-y-0.5" key={index}>
                                <a
                                    className={`font-bold text-lg ${
                                        activeMenu === item.link || activeMenu === item.route
                                            ? 'text-blue-500 font-bold'
                                            : ''
                                    }`}
                                    href={item.link || item.route}
                                    onClick={() => setActiveMenu(item.route || item.link)}
                                >
                                    {item.name}
                                </a>
                                {item.subMenu && (
                                    <ul className="pl-4">
                                        {item.subMenu.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <a
                                                    className={`${
                                                        activeSubMenu === subItem.name ? 'text-blue-500 font-bold' : ''
                                                    }`}
                                                    href={subItem.route}
                                                    onClick={() => setActiveSubMenu(subItem.name)}
                                                >
                                                    {subItem.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
