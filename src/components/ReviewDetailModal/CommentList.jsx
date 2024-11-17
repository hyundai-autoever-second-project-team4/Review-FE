import React, { useState } from "react";
import {
  BadgeImg,
  CommentBox,
  CommentContainer,
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
  const { data, isLoading, isError, error } = useGetCommentList(reviewId, page);
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

  return (
    <>
      <CommentContainer>
        {data.totalComment == 0 ? (
          <NoCommentContainer>리뷰에 대한 댓글이 없습니다.</NoCommentContainer>
        ) : (
          comments.map((comment) => (
            <CommentBox key={comment.commentId}>
              <UserBox>
                <TierImg src={comment.tierImage} />
                <ProfileImgContainer>
                  <ProfileImg src={comment.profileImage} />
                  <BadgeImg src={comment.badgeImage} />
                </ProfileImgContainer>
                <Name>{comment.name}</Name>
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
          onChange={() => handlePageChange} // 페이지 변경 핸들러
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
