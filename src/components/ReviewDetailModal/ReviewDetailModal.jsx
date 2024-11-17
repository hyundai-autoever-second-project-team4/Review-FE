import React, { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import ReviewDetailModalHeader from "../ReviewDetailModalHeader/ReviewDetailModalHeader";
import {
  BadgeImg,
  CommentBox,
  CommentContainer,
  CommentText,
  CommentUploadContainer,
  CommetUploadBox,
  ContentContainer,
  DateText,
  MyBadgeImg,
  MyContainer,
  MyName,
  MyProfileImg,
  MyProfileImgContainer,
  MyTierImg,
  Name,
  NoCommentContainer,
  PaginationContainer,
  ProfileImg,
  ProfileImgContainer,
  ReviewInput,
  StyledLine,
  SubmitBtn,
  TierImg,
  UpDownContainer,
  UpDownText,
  UserBox,
} from "./ReviewDetailModalStyle";
import * as S from "../Review/ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import { Pagination } from "@mui/material";
import { useGetMovieReviewDetail } from "../../hooks/useGetMovieReviewDetail";
import { useGetCommentList } from "../../hooks/useGetCommentList";
import CommentList from "./CommentList";

function ReviewDetailModal({ modalOpen, modalClose, id }) {
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "영화 리뷰에 대한 자신의 생각을 입력 해보세요."
  ); // placeholder 상태 추가
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetMovieReviewDetail(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const reviewData = data?.reviewInfo;

  const toggleUpVote = () => {
    setIsUp((prev) => !prev);
    setUpCnt((prev) => (isUp ? prev - 1 : prev + 1));
    upClick();
  };

  const toggleDownVote = () => {
    setIsDown((prev) => !prev);
    setDownCnt((prev) => (isDown ? prev - 1 : prev + 1));
    downClick();
  };

  const handleFocus = () => {
    setPlaceholder(""); // 포커스 시 placeholder 비우기
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setPlaceholder("영화 리뷰에 대한 자신의 생각을 입력 해보세요."); // 포커스 해제 시 입력이 없으면 placeholder 복원
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 변경
  };

  return (
    <CustomModal
      modal={modalOpen}
      modalClose={modalClose}
      title={
        <ReviewDetailModalHeader
          tierImg={reviewData.memberTierImg}
          profileImg={reviewData.memberProfileImg}
          nickname={reviewData.memberName}
          starRate={reviewData.starRate}
          reviewDate={reviewData.createdAt}
          badgeImg={reviewData.memberBadgeImg}
        />
      }
      large
      titleHeight={"50px"}
    >
      <ContentContainer> {reviewData.content}</ContentContainer>
      <UpDownContainer>
        <S.ThumbWrapper>
          <DynamicSVG
            svgUrl="/src/assets/svg/up.svg"
            color={reviewData.isThearUp ? theme.colors.red : theme.colors.gray3}
            width={29}
            height={28}
            style={{ cursor: "pointer" }}
            onClick={toggleUpVote}
          />
          <UpDownText>{reviewData.ThearUpCount}</UpDownText>
        </S.ThumbWrapper>
        <S.ThumbWrapper>
          <DynamicSVG
            svgUrl="/src/assets/svg/down.svg"
            color={
              reviewData.isThearDown ? theme.colors.blue : theme.colors.gray3
            }
            width={29}
            height={28}
            style={{ cursor: "pointer" }}
            onClick={toggleDownVote}
          />
          <UpDownText>{reviewData.ThearDownCount}</UpDownText>
        </S.ThumbWrapper>
      </UpDownContainer>
      <StyledLine />
      <S.ThumbWrapper>
        <DynamicSVG
          svgUrl={ChatLogo}
          color={theme.colors.gray3}
          width={29}
          height={28}
        />
        <UpDownText>댓글 {reviewData.commentCount}</UpDownText>
      </S.ThumbWrapper>
      <CommentList page={page} reviewId={id} />
      <PaginationContainer>
        <Pagination
          count={parseInt(reviewData.commentCount / 10)}
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
      <CommentUploadContainer>
        <CommetUploadBox>
          <MyContainer>
            <MyTierImg src={reviewData.memberTierImg} />
            <MyProfileImgContainer>
              <MyProfileImg src={reviewData.memberProfileImg} />
              <MyBadgeImg src={reviewData.memberBadgeImg} />
            </MyProfileImgContainer>
            <MyName>{reviewData.memberName}</MyName>
          </MyContainer>
          <ReviewInput
            placeholder={placeholder} // placeholder 상태 사용
            onFocus={handleFocus} // 포커스 이벤트 핸들러
            onBlur={handleBlur} // 블러 이벤트 핸들러
          />
          <SubmitBtn>등록</SubmitBtn>
        </CommetUploadBox>
      </CommentUploadContainer>
    </CustomModal>
  );
}

export default ReviewDetailModal;
