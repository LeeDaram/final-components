import Sidebar from '../sidebar.js';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Dialog } from '@mui/material';
import { useAuth } from '../../../pages/login-related/AuthContext';
import { useState, useEffect } from 'react';

function UserReviews() {
    // 유저 정보
    const { user, token } = useAuth();

    // 리뷰 정보
    const [review, setReview] = useState([]);

    // 사진 더보기
    const [open, setOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    // 기간 필터 버튼
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const periods = [
        { id: 'all', label: '전체' },
        { id: 'today', label: '오늘' },
        { id: '1month', label: '1개월' },
        { id: '3months', label: '3개월' },
        { id: '6months', label: '6개월' },
        { id: '1year', label: '1년' },
        { id: '3years', label: '3년' },
    ];

    // 리뷰 불러오기
    useEffect(() => {
        if (user && token) {
            fetchUserReviewPeriod('all');
        }
    }, [user, token]);

    // 사진 더보기 클릭
    const handleImageClick = (images) => {
        setSelectedImages(images);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 리뷰 불러오기
    const fetchUserReviewPeriod = async (period) => {
        try {
            const response = await fetch(`http://localhost:8080/api/mypage/review/${user.id}/filter?period=${period}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
            }

            const reviewData = await response.json();
            setReview(reviewData);
        } catch (err) {
            console.error('리뷰 조회 실패: ', err);
        }
    };

    // 리뷰 삭제 처리
    const handleDeleteReview = async (reviewId) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(`http://localhost:8080/api/mypage/review/delete/${reviewId}`, {
                method: 'DELETE',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error('리뷰 삭제 실패');
            }

            setReview(review.filter((item) => item.reviewId !== reviewId));
        } catch (error) {
            console.error('리뷰 삭제 실패: ', error);
        }
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        fetchUserReviewPeriod(period);
    };

    // 이미지 출력
    const renderImages = (images) => {
        if (!images || images.length === 0) {
            return;
        }

        return images
            .slice(0, 3)
            .map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`리뷰 이미지 ${index}`}
                    className={`w-24 h-24 rounded-md object-cover ${
                        index === 2 && images.length > 3 ? 'relative' : ''
                    }`}
                    style={index === 2 && images.length > 3 ? { cursor: 'pointer' } : {}}
                />
            ))
            .concat(
                images.length > 3 ? (
                    <div
                        key="more"
                        className="w-24 h-24 rounded-md bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer"
                        onClick={() => handleImageClick(images)}
                    >
                        더보기
                    </div>
                ) : null
            );
    };

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
                        <div className="mb-3 flex">
                            <div className="border-base-content/20 flex gap-0.5 rounded-btn border p-0.5">
                                {periods.map((p) => (
                                    <label
                                        key={p.id}
                                        className={`btn btn-sm btn-text ${selectedPeriod === p.id ? 'btn-active' : ''}`}
                                    >
                                        <span>{p.label}</span>
                                        <input
                                            type="radio"
                                            name="toggle-price-count"
                                            className="hidden"
                                            onChange={() => handlePeriodChange(p.id)}
                                            checked={selectedPeriod === p.id}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 리뷰 목록 돌리기 */}
                        {review.map((item, index) => (
                            <div key={item.reviewId} className="border-t pt-4 mt-4">
                                <div className="flex items-center space-x-2">
                                    <p className="font-semibold text-xl text-gray-700">{item.storeName}</p>
                                    <Rating name="size-medium" value={item.rating} readOnly />
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    {item.reviewMenu} / {item.reviewPrice.toLocaleString()}원
                                </p>
                                <p className="mt-3">{item.content}</p>
                                <div className="flex gap-2 mt-2">{renderImages(item.reviewImg)}</div>
                                <p className="text-sm text-gray-400 mt-2">
                                    {new Date(item.createdAt).toLocaleDateString()} |{' '}
                                    <span
                                        className="text-blue-500 cursor-pointer hover:underline"
                                        onClick={() => {
                                            handleDeleteReview(item.reviewId);
                                        }}
                                    >
                                        삭제
                                    </span>
                                </p>
                            </div>
                        ))}

                        <Stack spacing={2} className="mt-8" alignItems="center">
                            <Pagination count={10} color="primary" />
                        </Stack>
                    </div>
                </div>
            </div>

            {/* 이미지 더보기 버튼 */}
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
