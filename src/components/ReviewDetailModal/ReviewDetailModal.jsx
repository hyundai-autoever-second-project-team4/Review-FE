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
  DeleteButton,
} from "./ReviewDetailModalStyle";
import * as S from "../Review/ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import { Pagination } from "@mui/material";
import { useGetReviewDetail } from "../../hooks/useGetReviewDetail";
import { useGetCommentList } from "../../hooks/useGetCommentList";
import CommentList from "./CommentList";
import upLogo from "/src/assets/svg/up.svg";
import downLogo from "/src/assets/svg/down.svg";
import redUp from "/src/assets/svg/redUp.svg";
import blueDown from "/src/assets/svg/blueDown.svg";
import { useThearMutation } from "../../hooks/useThearMutation";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDeleteReview } from "../../hooks/useDeleteReview";

function ReviewDetailModal({ modalOpen, modalClose, id, queryKeyType }) {
  const [placeholder, setPlaceholder] = useState(
    "영화 리뷰에 대한 자신의 생각을 입력 해보세요."
  ); // placeholder 상태 추가
  const { data, isLoading, isError, error } = useGetReviewDetail(id);
  const { mutate: thearUp } = useThearMutation(id, ["reviewDetail", id], "up");
  const navigate = useNavigate();
  const { mutate: thearDown } = useThearMutation(
    id,
    ["reviewDetail", id],
    "down"
  );
  const { mutate: deleteReview } = useDeleteReview(id, queryKeyType);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const reviewData = data?.reviewInfo;

  const toggleUpVote = () => {
    thearUp();
  };

  const toggleDownVote = () => {
    thearDown();
  };

  const handleFocus = () => {
    setPlaceholder(""); // 포커스 시 placeholder 비우기
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setPlaceholder("영화 리뷰에 대한 자신의 생각을 입력 해보세요."); // 포커스 해제 시 입력이 없으면 placeholder 복원
    }
  };

  const handleProfileClick = () => {
    navigate(`/userPage/${reviewData?.memberId}`);
  };

  const handleDeleteButtonClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteReview();
      alert("삭제되었습니다.");
    }
  };

  return (
    <CustomModal
      modal={modalOpen}
      modalClose={modalClose}
      title={
        !isLoading && (
          <ReviewDetailModalHeader
            tierImg={reviewData?.memberTierImg}
            profileImg={reviewData?.memberProfileImg}
            nickname={reviewData?.memberName}
            starRate={reviewData?.starRate}
            reviewDate={reviewData?.createdAt}
            badgeImg={reviewData?.memberBadgeImg}
            handleProfileClick={handleProfileClick}
          />
        )
      }
      large
      titleHeight={"50px"}
    >
      {!isLoading && (
        <>
          <ContentContainer>{reviewData.content}</ContentContainer>
          <UpDownContainer>
            <S.ThumbWrapper>
              <S.ThumbWrapper>
                <img
                  src={reviewData.isThearUp ? redUp : upLogo}
                  width={24}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={toggleUpVote}
                />
                <UpDownText>{reviewData.ThearUpCount}</UpDownText>
              </S.ThumbWrapper>
              <S.ThumbWrapper>
                <img
                  src={reviewData.isThearDown ? blueDown : downLogo}
                  width={24}
                  height={24}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    top: "6px",
                  }}
                  onClick={toggleDownVote}
                />
                <UpDownText>{reviewData.ThearDownCount}</UpDownText>
              </S.ThumbWrapper>
            </S.ThumbWrapper>
            {reviewData.isWriter && (
              <DeleteButton onClick={handleDeleteButtonClick}>
                리뷰 삭제
              </DeleteButton>
            )}
          </UpDownContainer>
          <StyledLine />
          <S.ThumbWrapper>
            <DynamicSVG
              svgUrl={ChatLogo}
              color={theme.colors.gray3}
              width={24}
              height={24}
            />
            <UpDownText>댓글 {reviewData.commentCount}</UpDownText>
          </S.ThumbWrapper>
          <CommentList reviewId={id} />
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
              <SubmitBtn color="primary">등록</SubmitBtn>
            </CommetUploadBox>
          </CommentUploadContainer>
        </>
      )}
    </CustomModal>
  );
}

export default ReviewDetailModal;
