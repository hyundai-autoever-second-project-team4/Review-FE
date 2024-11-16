import React from "react";
import {
  BadgeImg,
  CommentBox,
  CommentContainer,
  CommentText,
  DateText,
  Name,
  NoCommentContainer,
  ProfileImg,
  ProfileImgContainer,
  TierImg,
  UserBox,
} from "./ReviewDetailModalStyle";
import { useGetCommentList } from "../../hooks/useGetCommentList";

function CommentList({ reviewId, page }) {
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

  const comments = data?.commentList;

  return (
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
            <DateText>{comment.createdAt}</DateText>
            {/* 날짜 형식 수정 필요 */}
          </CommentBox>
        ))
      )}
    </CommentContainer>
  );
}

export default CommentList;
