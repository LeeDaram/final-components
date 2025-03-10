import { Button, Modal } from 'flowbite-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { handleEnterKey, handleEscKey } from '../../utils/Keydown'; //키다운함수수
import axios from 'axios';

export function CommuModal({ isOpen, onClose }) {
    const navigate = useNavigate();

    // 모달이 열려 있을 때만 적용시키기기
    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (e) => {
                handleEnterKey(e, () => {
                    onClose();
                    navigate('/community-related/notice'); // Enter키 == 확인
                });

                handleEscKey(e, onClose); // Esc키 == 취소
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose, navigate]);

    return (
        <Modal show={isOpen} size="lg" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
                        게시글 작성을 취소하시겠습니까?
                    </h3>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        작성 중인 내용이 모두 삭제되고 목록으로 돌아갑니다. <br />
                        취소 후에는 복구할 수 없습니다.
                        <br />
                        그래도 취소하시겠습니까?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={() => {
                                onClose();
                                navigate('/community-related/notice');
                            }}
                        >
                            {'확인'}
                        </Button>
                        <Button color="gray" onClick={onClose}>
                            취소
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default function DeletModal({ isOpen, onClose, notice, qna }) {
    const navigate = useNavigate();
    const handleDeleteNoticeMain = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/notice/delete/${notice.id}`);
        } catch (error) {
            console.error('ERROR');
        }
    };

    const handleDeleteQnaMain = async () => {
        try {
            // 현재 id 체크 후 작성자가 날려야함
            await axios.delete(`${process.env.REACT_APP_API_URL}/qna/delete/${qna.id}`);
        } catch (error) {
            console.error('ERROR');
        }
    };

    const handleDeleteAnswer = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/qna/delete/answer/${qna.deleteAnswerId}`);
        } catch (error) {
            console.error('ERROR');
        }
    };

    // 모달이 열려 있을 때만 적용시키기기
    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (e) => {
                handleEnterKey(e, () => {
                    // Enter키 == 확인
                    onClose();
                });

                handleEscKey(e, onClose); // Esc키 == 취소
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose, navigate]);

    return (
        <Modal show={isOpen} size="lg" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
                        게시글을 삭제하시겠습니까?
                    </h3>

                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={() => {
                                onClose();
                                if (notice?.page === 'notice') {
                                    handleDeleteNoticeMain();
                                    alert('공지사항이 삭제되었습니다');
                                    navigate('/community-related/notice');
                                } else if (qna?.page === 'qna') {
                                    if (qna?.deleteAnswerId) {
                                        handleDeleteAnswer();
                                        alert('답글이 삭제되었습니다');
                                    } else {
                                        handleDeleteQnaMain();
                                        alert('Qna가 삭제되었습니다');
                                        navigate('/community-related/qna');
                                    }
                                }
                            }}
                        >
                            확인
                        </Button>

                        <Button color="gray" onClick={onClose}>
                            취소
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
