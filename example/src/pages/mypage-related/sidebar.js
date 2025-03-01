import { useState, useEffect } from 'react';
import { useAuth } from '../../pages/login-related/AuthContext';

function Sidebar() {
    // 로그인, 로그아웃
    const { user } = useAuth();

    // 권한 상태값
    const [userRole, setUserRole] = useState('');

    const roleMap = {
        ROLE_USER: 'user',
        ROLE_BIZ: 'business',
        ROLE_ADMIN: 'admin',
    };

    // 로그인 타입 상태값
    const [userLoginType, setUserLoginType] = useState('');

    useEffect(() => {
        if (user?.role) {
            setUserRole(roleMap[user?.role] || '손님');
        } else {
            setUserRole('손님');
        }
        if (user?.loginType) {
            setUserLoginType(user?.loginType);
        } else {
            setUserLoginType('');
        }
    }, [user]);

    const menuStructure =
        userRole === 'user'
            ? [
                  {
                      name: '내정보관리',
                      link: '/mypage/update/info',
                      subMenu:
                          userLoginType === 'SOCIAL'
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
            : userRole === 'business'
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
            : userRole === 'admin'
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

    return (
        <>
            <div className="drawer-body px-2 pt-4 ">
                <aside
                    id="multilevel-with-separator"
                    class="overlay sm:shadow-none overlay-open:translate-x-0  hidden max-w-64 sm:z-0 sm:flex sm:translate-x-0"
                    tabindex="-1"
                >
                    <div class="drawer-body px-2 pt-4">
                        <ul class="menu space-y-0.5 [&_.nested-collapse-wrapper]:space-y-0.5 [&_ul]:space-y-0.5 p-0">
                            {menuStructure.map((item, index) => (
                                <li class="space-y-0.5 " key={index}>
                                    <a className="font-bold text-lg" href={item.link || item.route}>
                                        {item.name}
                                    </a>
                                    {item.subMenu && (
                                        <ul className="pl-4">
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <a href={subItem.route}>{subItem.name}</a>
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
        </>
    );
}
export default Sidebar;
