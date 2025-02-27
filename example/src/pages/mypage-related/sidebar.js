import { useState } from 'react';

function Sidebar() {
    const [userRole, setUserRole] = useState('user');

    const menuStructure =
        userRole === 'user'
            ? [
                  {
                      name: '내정보관리',
                      link: '/personal/update',
                      subMenu: [
                          { name: '내정보수정', route: '/personal/update' },
                          { name: '비밀번호변경', route: '/personal/change-password' },
                          { name: '회원탈퇴', route: '/personal/delete-account' },
                      ],
                  },
                  { name: '작성한 리뷰', route: '/personal/reviews' },
                  { name: '예약현황', route: '/personal/reservations' },
              ]
            : userRole === 'business'
            ? [
                  {
                      name: '내정보관리',
                      link: '/business/update',
                      subMenu: [
                          { name: '내정보수정', route: '/business/update' },
                          { name: '비밀번호변경', route: '/business/change-password' },
                          { name: '회원탈퇴', route: '/business/delete-account' },
                      ],
                  },
                  {
                      name: '업소정보관리',
                      link: '/business/register',
                      subMenu: [
                          { name: '착한가격업소 등록 신청', route: '/business/register' },
                          { name: '등록신청결과조회', route: '/business/application-status' },
                          { name: '업소정보변경', route: '/business/update-info' },
                      ],
                  },
                  { name: '예약현황', route: '/business/reservations' },
              ]
            : userRole === 'admin'
            ? [
                  {
                      name: '내정보관리',
                      link: '/admin/update',
                      subMenu: [
                          { name: '내정보수정', route: '/admin/update' },
                          { name: '비밀번호변경', route: '/admin/change-password' },
                      ],
                  },
                  { name: '착한가격업소 승인 관리', route: '/admin/approval' },
                  { name: '통계 및 업소 대시보드', route: '/admin/dashboard' },
              ]
            : [];

    return (
        <>
            <div className="drawer-body px-2 pt-4 ">
                <aside
                    id="multilevel-with-separator"
                    class="overlay sm:shadow-none overlay-open:translate-x-0  hidden max-w-64 sm:z-0 sm:flex sm:translate-x-0 sm:z-0 "
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
