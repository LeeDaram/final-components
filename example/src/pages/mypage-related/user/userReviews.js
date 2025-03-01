import Sidebar from '../sidebar.js';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Dialog } from '@mui/material';

function UserReviews() {
    const [open, setOpen] = React.useState(false);
    const [selectedImages, setSelectedImages] = React.useState([]);

    const handleImageClick = (images) => {
        setSelectedImages(images);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderImages = (images) => {
        return images
            .map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt="리뷰 이미지"
                    className={`w-24 h-24 rounded-md object-cover ${
                        index === 2 && images.length > 3 ? 'relative' : ''
                    }`}
                    onClick={() => handleImageClick(images)}
                    style={index === 2 && images.length > 3 ? { cursor: 'pointer' } : {}}
                />
            ))
            .slice(0, 3)
            .concat(
                images.length > 3 ? (
                    <div
                        key="more"
                        className="w-24 h-24 rounded-md bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer"
                        onClick={() => handleImageClick(images)}
                    >
                        더보기
                    </div>
                ) : (
                    []
                )
            );
    };

    const images = [
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMjFfNiAg%2FMDAxNzEwOTg2NzcyODE3.iFUfqTpFFZdCOOZh0ihLLK5kF43bJtgzI4yFB2EkOG4g.SKuH0giYEAcdEk7VKvgWI-3XkahkEDb7F6B0roEaG6Qg.JPEG%2FIMG_3489.jpg',
        'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231005_153%2F1696482856601U68NN_JPEG%2F0A8D4712-DA45-4CAE-97D6-3234BE81293E.jpeg',
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MTVfMTgw%2FMDAxNzI2NDA5ODEzNTU2.N_m7ACCcp3TYrpig17mexLe45YZxjoAk1kNfTLz5BFog.odqIzrzAGdCJxyGNYm23PCqmq5K9vINlRLpx5Lf5Wjgg.JPEG%2FIMG_1294.jpeg',
        'https://cdn.hellodd.com/news/photo/202212/99035_316290_5712.jpg',
    ];

    return (
        <div className="bg-white sm:p-6 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="w-1/4">
                        <Sidebar />
                    </div>

                    {/* 우측 */}
                    <div className="w-3/4 pl-10 pt-10 border-l border-gray-200 ">
                        <h2 className="text-2xl font-bold mb-6">작성한 리뷰</h2>
                        {/* 기간 조회 버튼 */}
                        <div class="mb-3 flex">
                            <div
                                id="toggle-price-count"
                                class="border-base-content/20 flex gap-0.5 rounded-btn border p-0.5"
                            >
                                <label
                                    for="toggle-price-count-all"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>전체</span>
                                    <input
                                        id="toggle-price-count-all"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                        checked
                                    />
                                </label>
                                <label
                                    for="toggle-price-count-today"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>오늘</span>
                                    <input
                                        id="toggle-price-count-today"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                    />
                                </label>
                                <label
                                    for="toggle-price-count-1month"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>1개월</span>
                                    <input
                                        id="toggle-price-count-1month"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                    />
                                </label>
                                <label
                                    for="toggle-price-count-3months"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>3개월</span>
                                    <input
                                        id="toggle-price-count-3months"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                    />
                                </label>
                                <label
                                    for="toggle-price-count-6months"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>6개월</span>
                                    <input
                                        id="toggle-price-count-6months"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                    />
                                </label>
                                <label
                                    for="toggle-price-count-1year"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>1년</span>
                                    <input
                                        id="toggle-price-count-1year"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                    />
                                </label>
                                <label
                                    for="toggle-price-count-3years"
                                    class="btn btn-sm btn-text has-[:checked]:btn-active"
                                >
                                    <span>3년</span>
                                    <input
                                        id="toggle-price-count-3years"
                                        name="toggle-price-count"
                                        type="radio"
                                        class="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-center space-x-2">
                                <p className="font-semibold text-xl text-gray-700">업소명</p>
                                <Rating name="size-medium" defaultValue={2} readOnly />
                            </div>
                            <p className="text-sm text-gray-400 mt-1">메뉴명 / 00,000원</p>
                            <p className="mt-5">처음 이용해봤는데 기대 이상으로 만족스러웠습니다.</p>
                            <div className="flex gap-2 mt-4">{renderImages(images)}</div>
                            <p className="text-sm text-gray-400 mt-3">
                                2025년 02월 05일 | <span className="text-blue-500 cursor-pointer">삭제</span>
                            </p>
                        </div>
                        <Stack spacing={2} className="mt-8" alignItems="center">
                            <Pagination count={10} color="primary" />
                        </Stack>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <div className="p-4 flex flex-wrap gap-2">
                    {selectedImages.map((img, index) => (
                        <img key={index} src={img} alt="확대 이미지" className="w-32 h-32 rounded-md object-cover" />
                    ))}
                </div>
            </Dialog>
        </div>
    );
}

export default UserReviews;
