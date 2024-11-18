import React, { useState } from "react";
import {
  BadgeImg,
  CommentBox,
  CommentContainer,
  CommentDeleteBtn,
  CommentText,
  DateText,
  Name,
  NoCommentContainer,
  PaginationContainer,
  ProfileImg,
  ProfileImgContainer,
  TierImg,
  UserBox,
} from "./ReviewDetailModalStyle";
import { useGetCommentList } from "../../hooks/useGetCommentList";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { useDeleteComment } from "../../hooks/useDeleteComment";

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
  const { data, isLoading, isError, error } = useGetCommentList(reviewId, page);
  const { mutate: deleteComment } = useDeleteComment(selected, reviewId, page);

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

  const handleDeleteButtonClick = (commentId) => {
    setSelected(commentId);
    Swal.fire({
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(commentId, reviewId, page);
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
                    <CommentDeleteBtn>댓글 수정</CommentDeleteBtn>
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
              <CommentText>{comment.content}</CommentText>
              <DateText>{formatDate(comment.createdAt)}</DateText>
            </CommentBox>
          ))
        )}
      </CommentContainer>
      <PaginationContainer>
        <Pagination
          count={data.commentList.totalPages}
          page={page} // 현재 페이지
          siblingCount={3}
          onChange={handlePageChange} // 페이지 변경 핸들러
          sx={{
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#F2B705",
            },
          }}
        />
      </PaginationContainer>
    </>
  );
}

export default CommentList;
