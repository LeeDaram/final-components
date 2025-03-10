import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImgCarousel } from '../../components/ui/Carousel';
import DeletModal from './CommuModal';
import axios from 'axios';
import { useAuth } from '../../pages/login-related/AuthContext';
const Answer = () => {
    const { user, token } = useAuth();

    const location = useLocation();
    const data = location.state;
    const { state } = useLocation();
    const mainPageNotice = state?.mainPageNotice;

    const [comment, setComment] = useState('');
    const [isEditingMain, setIsEditingMain] = useState(false); // 메인글 수정 상태
    const [editingMain, setEditingMain] = useState({}); // 메인글 제목, 내용
    const [comments, setComments] = useState([]); // 답글(댓글) 내용; 배열로 관리
    const [editingAnswerId, setEditingAnswerId] = useState(null); // 답글이 있으면 수정 아니면 냅두기
    const [editingContent, setEditingContent] = useState(''); // 수정 중인 답글 내용
    // const USER_ROLE = 'admin'; // 현재 관리자 역할 (테스트용)
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [deleteAnswerId, setDeleteAnswerId] = useState(null); // 삭제할 답글 아이디
    const [files, setFiles] = useState([]); //각 공지사항의 첨부파일

    // 페이지 첫 로드 시 공지사항 또는 Q&A 데이터 가져오기
    useEffect(() => {
        const getData = async () => {
            try {
                if (data.notice === '공지사항') {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/notice/main/${data.id}`);
                    setEditingMain(res.data);
                    const attachments = await axios.get(
                        `${process.env.REACT_APP_API_URL}/notice/attachment/${data.id}/download`
                    );
                    setFiles(attachments.data);
                }
                if (data.qna === 'Q&A') {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/qna/main/${data.id}`);
                    setEditingMain(res.data);
                    setComments(res.data.answers);
                }
                if (mainPageNotice) {
                    const res = await axios.get(
                        `${process.env.REACT_APP_API_URL}/notice/main/${mainPageNotice.noticeId}`
                    );
                    setEditingMain(res.data);
                    const attachments = await axios.get(
                        `${process.env.REACT_APP_API_URL}/notice/attachment/${mainPageNotice.noticeId}/download`
                    );
                    setFiles(attachments.data);
                }
            } catch (error) {
                console.error('ERROR', error);
            }
        };
        getData();
    }, [data, comment, editingContent, isModalOpen, user]);

    // Qna 답글 등록 (DB 통신)
    const handleCommentSubmit = async () => {
        if (!comment.trim()) {
            alert('내용을 입력해주세요');
            return;
        }
        try {
            // Q&A 답글 등록 (POST)
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/qna/create/answer`, {
                questionId: data.id,
                content: comment,
            });

            alert('등록되었습니다');
            setComment('');
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    // 메인글 수정 시작
    const handleEditMain = () => {
        setIsEditingMain(true);
    };

    // 메인글 저장
    const handleSaveMain = async () => {
        try {
            //notice qna로직 구분
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/notice/update/${data.id}`, {
                title: editingMain.title,
                content: editingMain.content,
            });
            setEditingMain(res.data);
        } catch (error) {
            console.error('ERROR', error);
        }
        setIsEditingMain(false);
        alert('완료되었습니다');
        navigate('/community-related/notice');
    };

    // 메인글 수정 취소
    const handleCancelMain = () => {
        setIsEditingMain(false);
    };

    // 메인글 삭제 (모달 통해 처리)
    const handleDeleteMain = () => {
        setIsModalOpen(true);
    };

    // 답글 수정 모드 활성화
    const handleEdit = (answerId, content) => {
        setEditingAnswerId(answerId);
        setEditingContent(content);
    };

    // 답글 수정 저장
    const handleSaveEdit = async () => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/qna/update/answer/${editingAnswerId}`, {
                content: editingContent,
            });
            // 해당 answerId에 해당하는 답글만 업데이트
            setComments((prevComments) => prevComments.map((c) => (c.answerId === editingAnswerId ? res.data : c)));
            alert('수정되었습니다');
            setEditingAnswerId(null);
            setEditingContent('');
        } catch (error) {
            console.error('ERROR', error);
        }
    };

    // Q&A 글 삭제 (모달 통해 처리)
    const handleDeletQna = () => {
        // delete 완료
        setDeleteAnswerId(null);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <div className="w-9/12">
                    <ImgCarousel />
                </div>
            </div>

            <div className="flex justify-center items-center pb-10 mt-10">
                <div className="w-9/12 bg-white p-8 rounded border">
                    {/* 목록 버튼 */}
                    <div className="flex justify-between mb-4 border-b border-black">
                        <h1 className="text-2xl font-semibold mb-4">
                            {mainPageNotice ? '공지사항' : ''}
                            {data?.notice}
                            {data?.qna}
                        </h1>
                        <button
                            className="text-sm text-gray-600 hover:underline"
                            onClick={() => {
                                if (data.qna === 'Q&A') {
                                    navigate('/community-related/qna');
                                } else if (data.notice === '공지사항') {
                                    navigate('/community-related/notice');
                                } else if (mainPageNotice) {
                                    navigate('/community-related/notice');
                                }
                            }}
                        >
                            ☰ 목록가기
                        </button>
                    </div>

                    {/* 질문 내용 */}
                    <div className="border-b pb-6 mb-6">
                        {isEditingMain ? (
                            <textarea
                                className="w-full text-2xl p-3 border rounded h-15 resize-none"
                                value={editingMain.title || ''}
                                onChange={(e) => setEditingMain({ ...editingMain, title: e.target.value })}
                            />
                        ) : (
                            <h2 className="text-2xl font-bold mb-2">{editingMain.title}</h2>
                        )}
                        <div className="border-b py-2">
                            <span className="text-gray-600 mr-5">
                                {data?.notice ? '관리자' : editingMain?.userId}
                                {mainPageNotice ? '관리자' : ''}
                            </span>
                            <span className="text-gray-600 mt-2">{editingMain.createdAt}</span>
                        </div>

                        {files.map((file) => (
                            <div className="text-right">
                                <a
                                    href={`${process.env.REACT_APP_API_URL}/notice/attachment/img/${file.attachmentId}/download`}
                                    download={file.storedFilename}
                                    style={{ display: 'inline-block', marginTop: '0.5rem' }}
                                >
                                    {file.originFilename}
                                </a>
                            </div>
                        ))}
                        <div style={{ textAlign: 'center' }}>
                            {files.map((file) => (
                                <div key={file.attachmentId} style={{ marginBottom: '1rem' }}>
                                    {file.contentType.startsWith('image/') ? (
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/notice/attachment/img/${file.attachmentId}/download`}
                                            alt={file.originFilename}
                                            style={{
                                                maxWidth: '300px',
                                                display: 'block',
                                                margin: '0 auto',
                                            }}
                                        />
                                    ) : file.contentType === 'application/pdf' ? (
                                        <iframe
                                            src={`${process.env.REACT_APP_API_URL}/notice/attachment/img/${file.attachmentId}/download`}
                                            title={file.originFilename}
                                            width="600"
                                            height="400"
                                            style={{ display: 'block', margin: '0 auto' }}
                                        />
                                    ) : file.contentType === 'video/mp4' ? (
                                        <video
                                            controls
                                            width="600"
                                            height="400"
                                            style={{ display: 'block', margin: '0 auto' }}
                                        >
                                            <source
                                                src={`${process.env.REACT_APP_API_URL}/notice/attachment/img/${file.attachmentId}/download`}
                                                type="video/mp4"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <p>미리보기를 지원하지 않는 파일입니다.</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {isEditingMain ? (
                            <textarea
                                className="w-full p-3 border rounded h-24 resize-none"
                                value={editingMain.content || ''}
                                onChange={(e) => setEditingMain({ ...editingMain, content: e.target.value })}
                            />
                        ) : (
                            <p className="mt-4 text-gray-700 leading-relaxed py-7">{editingMain.content}</p>
                        )}
                    </div>

                    {/* 관리자가 쓴 공지사항: 수정 & 삭제 버튼 */}
                    {(data?.notice && mainPageNotice) ||
                        (user?.role === 'ROLE_ADMIN' && (
                            <div className="flex justify-center space-x-4 mt-6 mb-6">
                                {isEditingMain ? (
                                    <>
                                        <button
                                            onClick={handleSaveMain}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            저장
                                        </button>
                                        <button
                                            onClick={handleCancelMain}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            취소
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {(user?.role === 'ROLE_ADMIN' && user?.role === 'ROLE_USER') || (
                                            <button
                                                onClick={handleEditMain}
                                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                            >
                                                수정
                                            </button>
                                        )}
                                        {(user?.role === 'ROLE_ADMIN' && user?.role === 'ROLE_USER') || (
                                            <button
                                                onClick={handleDeleteMain}
                                                className="bg-white text-black px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                                            >
                                                삭제
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}

                    {/* 버튼을 회원 본인이 쓴 글일때만 표시 id확인해서 일치할때만 띄우기 */}
                    {data?.qna && user?.role === 'ROLE_USER' && user?.id == editingMain.userId && (
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={handleDeletQna}
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-4"
                            >
                                삭제
                            </button>
                        </div>
                    )}

                    {/* Q&A: 관리자만 답글 등록 */}
                    {data?.qna && user?.role === 'ROLE_ADMIN' && (
                        <div className="mb-6">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border rounded h-24 resize-none"
                                placeholder="답글을 입력하세요..."
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleCommentSubmit}
                                    className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                >
                                    등록
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 답변 목록 */}
                    {data?.qna && comments.length > 0 && comments[0].content && (
                        <h2 className="text-xl font-semibold mb-4">답변</h2>
                    )}
                    {data?.qna &&
                        comments.length > 0 &&
                        comments[0].content &&
                        comments.map((c, index) => (
                            <div
                                key={c.answerId ? c.answerId : index}
                                className="border p-4 mb-3 rounded-lg bg-gray-50 relative"
                            >
                                <div className="flex justify-between">
                                    <span className="font-semibold">관리자</span>
                                    {user?.role === 'ROLE_ADMIN' && (
                                        <div>
                                            {editingAnswerId === c.answerId ? (
                                                <>
                                                    <button
                                                        className="text-sm text-green-600 hover:underline mr-2"
                                                        onClick={handleSaveEdit}
                                                    >
                                                        저장
                                                    </button>
                                                    <button
                                                        className="text-sm text-red-600 hover:underline"
                                                        onClick={() => setEditingAnswerId(null)}
                                                    >
                                                        취소
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="text-sm text-gray-600 hover:underline mr-2"
                                                        onClick={() => handleEdit(c.answerId, c.content)}
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        className="text-sm text-gray-600 hover:underline"
                                                        onClick={() => {
                                                            handleDeleteMain();
                                                            setDeleteAnswerId(c.answerId);
                                                        }}
                                                    >
                                                        삭제
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {editingAnswerId === c.answerId ? (
                                    <textarea
                                        className="w-full p-2 border rounded h-20 my-3"
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                    />
                                ) : (
                                    <p className="text-gray-700 mt-5">{c.content}</p>
                                )}
                                <p className="text-gray-500 text-sm absolute right-4 bottom-2">{c.date}</p>
                            </div>
                        ))}
                </div>
            </div>
            {isModalOpen && (
                <DeletModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    {...(data.notice === '공지사항' ? { notice: { page: 'notice', id: data.id } } : {})}
                    {...(data.qna === 'Q&A'
                        ? {
                              qna: {
                                  page: 'qna',
                                  id: data.id,
                                  deleteAnswerId: deleteAnswerId,
                              },
                          }
                        : {})}
                />
            )}
        </>
    );
};

export default Answer;
