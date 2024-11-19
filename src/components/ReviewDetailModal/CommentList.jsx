import React, { useState } from "react";
import {
  BadgeImg,
  CancelBtn,
  CommentBox,
  CommentContainer,
  CommentDeleteBtn,
  CommentText,
  DateText,
  EditContainer,
  Name,
  NoCommentContainer,
  PaginationContainer,
  ProfileImg,
  ProfileImgContainer,
  ReviewEditInput,
  ReviewInput,
  SubmitBtn,
  TierImg,
  UpdateBtn,
  UserBox,
} from "./ReviewDetailModalStyle";
import { useGetCommentList } from "../../hooks/useGetCommentList";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import { usePutComment } from "../../hooks/usePutComment";
import CustomPagination from "../CustomPagination/CustomPagination";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", options).replace(",", ""); // 'ko-KR' 로 한국어 형식으로 변환
}

function CommentList({ reviewId }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { data, isLoading, isError, error } = useGetCommentList(reviewId, page);
  const { mutate: deleteComment } = useDeleteComment(reviewId, page);
  const { mutate: updateComment } = usePutComment(
    editingCommentId,
    editContent,
    reviewId,
    page
  );

  if (isLoading) {
    return (
      <CommentContainer>
        <NoCommentContainer>Loading...</NoCommentContainer>
      </CommentContainer>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const comments = data?.commentList.content;

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 변경
  };

  const handleEditClick = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleEditCancleClick = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleSaveClick = () => {
    if (editingCommentId) {
      Swal.fire({
        text: "정말 수정하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          updateComment({
            commentId: editingCommentId,
            content: editContent,
          });
          setEditingCommentId(null); // 편집 모드 종료
          setEditContent(""); // 입력 필드 초기화
        }
      });
    }
  };

  const handleDeleteButtonClick = (commentId) => {
    Swal.fire({
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(commentId); // commentId를 직접 전달
      }
    });
  };

  return (
    <>
      <CommentContainer>
        {data.totalComment == 0 ? (
          <NoCommentContainer>리뷰에 대한 댓글이 없습니다.</NoCommentContainer>
        ) : (
          comments.map((comment) => (
            <CommentBox key={comment.commentId}>
              <UserBox>
                <div style={{ display: "flex" }}>
                  <TierImg src={comment.tierImage} />
                  <ProfileImgContainer>
                    <ProfileImg src={comment.profileImage} />
                    <BadgeImg src={comment.badgeImage} />
                  </ProfileImgContainer>
                  <Name>{comment.name}</Name>
                </div>
                {comment.user ? (
                  <div style={{ display: "flex" }}>
                    <CommentDeleteBtn
                      onClick={() =>
                        handleEditClick(comment.commentId, comment.content)
                      }
                    >
                      댓글 수정
                    </CommentDeleteBtn>
                    <CommentDeleteBtn
                      onClick={() => handleDeleteButtonClick(comment.commentId)}
                    >
                      댓글 삭제
                    </CommentDeleteBtn>
                  </div>
                ) : (
                  <></>
                )}
              </UserBox>
              {editingCommentId === comment.commentId ? (
                <EditContainer>
                  <ReviewEditInput
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ border: "2px solid black" }}
                  ></ReviewEditInput>
                  <UpdateBtn color="primary" onClick={handleSaveClick}>
                    수정
                  </UpdateBtn>
                  <CancelBtn onClick={handleEditCancleClick}>취소</CancelBtn>
                </EditContainer>
              ) : (
                <CommentText>{comment.content}</CommentText>
              )}
              <DateText>{formatDate(comment.createdAt)}</DateText>
            </CommentBox>
          ))
        )}
      </CommentContainer>
      <PaginationContainer>
        <CustomPagination
          count={data.commentList.totalPages}
          page={page} // 현재 페이지
          onChange={handlePageChange} // 페이지 변경 핸들러
        />
      </PaginationContainer>
    </>
  );
}

export default CommentList;
