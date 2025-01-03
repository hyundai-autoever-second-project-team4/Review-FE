import React, { useState } from "react";
import * as S from "./ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import StarIcon from "../../assets/svg/star.svg";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import upLogo from "/src/assets/svg/up.svg";
import downLogo from "/src/assets/svg/down.svg";
import redUp from "/src/assets/svg/redUp.svg";
import blueDown from "/src/assets/svg/blueDown.svg";
import { useThearMutation } from "../../hooks/useThearMutation";
import { useNavigate, useParams } from "react-router-dom";
import ReviewDetailModal from "../ReviewDetailModal/ReviewDetailModal";
import Swal from "sweetalert2";
import useUserStore from "../../store/userStore";

function Review({
  reviewId,
  width,
  id,
  level,
  starRate,
  profileImg,
  profileName,
  content,
  isBlur,
  theUpCnt,
  theDownCnt,
  theIsUp,
  theIsDown,
  commentCnt,
  contentClick,
  movieName,
  isMine,
  queryKeyType,
  memberId,
  movieId,
  isWriter,
}) {
  const [blur, setBlur] = useState(isBlur);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { mutate: thearUp } = useThearMutation(reviewId, queryKeyType, "up");
  const { mutate: thearDown } = useThearMutation(
    reviewId,
    queryKeyType,
    "down"
  );

  const handleUpButtonClick = () => {
    if (user.id === null) {
      Swal.fire({
        text: "로그인 후 공감할 수 있습니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }

    if (isWriter) {
      Swal.fire({
        text: "내가 작성한 리뷰에는 공감할 수 없습니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }

    if (theIsDown) {
      Swal.fire({
        text: "이미 공감한 리뷰입니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    if (queryKeyType !== "hotReview") thearUp();
  };

  const handleDownButtonClick = () => {
    if (user.id === null) {
      Swal.fire({
        text: "로그인 후 공감할 수 있습니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    if (isWriter) {
      Swal.fire({
        text: "내가 작성한 리뷰에는 공감할 수 없습니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }

    if (theIsUp) {
      Swal.fire({
        text: "이미 공감한 리뷰입니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    if (queryKeyType !== "hotReview") thearDown();
  };

  const handleUserInfoClick = () => {
    navigate(`/userPage/${memberId}`);
  };

  const handleTitleClick = () => {
    navigate(`/movieDetail/${movieId}`);
  };

  const handleModalOpen = () => {
    if (!blur) setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <S.Container
      width={width}
      $hasMovieName={movieName !== undefined}
      $isMine={isMine}
    >
      {!isMine && (
        <S.TopArea>
          <S.ProfileWrapper onClick={handleUserInfoClick}>
            <img src={level} width={18} height={18} alt="" />
            <S.ProfileImg src={profileImg} alt="" />
            <S.ProfileName>{profileName}</S.ProfileName>
          </S.ProfileWrapper>
          <S.StarRate>
            <img src={StarIcon} width={12} height={12} />
            <p>{starRate}</p>
          </S.StarRate>
        </S.TopArea>
      )}
      {movieName !== undefined && (
        <S.MovieNameArea onClick={handleTitleClick}>
          <S.MovieTitle>{movieName}</S.MovieTitle>
          {isMine && (
            <S.StarRate>
              <img src={StarIcon} width={12} height={12} />
              <p>{starRate}</p>
            </S.StarRate>
          )}
        </S.MovieNameArea>
      )}
      <div style={{ position: "relative" }}>
        <S.ContentArea onClick={handleModalOpen} $isBlur={blur}>
          {content}
        </S.ContentArea>
        {blur && (
          <S.BlurArea>
            <Button
              // color="primary"
              onClick={() => setBlur(false)}
            >
              스포일러 보기
            </Button>
          </S.BlurArea>
        )}
      </div>
      <S.BottomArea>
        <S.ThumbWrapper>
          <S.ThumbWrapper>
            <img
              src={theIsUp ? redUp : upLogo}
              width={18}
              height={18}
              style={{
                cursor: queryKeyType !== "hotReview" ? "pointer" : "default",
              }}
              onClick={handleUpButtonClick}
            />
            <p>{theUpCnt}</p>
          </S.ThumbWrapper>
          <S.ThumbWrapper>
            <img
              src={theIsDown ? blueDown : downLogo}
              width={18}
              height={18}
              style={{
                cursor: queryKeyType !== "hotReview" ? "pointer" : "default",
                position: "relative",
                top: "4px",
              }}
              onClick={handleDownButtonClick}
            />

            <p>{theDownCnt}</p>
          </S.ThumbWrapper>
        </S.ThumbWrapper>
        <S.ThumbWrapper>
          <S.ThumbWrapper>
            <DynamicSVG
              svgUrl={ChatLogo}
              color={theme.colors.gray3}
              width={18}
              height={18}
            />
            <p>{commentCnt}</p>
          </S.ThumbWrapper>
        </S.ThumbWrapper>
      </S.BottomArea>
      {isModalOpen && (
        <ReviewDetailModal
          modalOpen={isModalOpen}
          modalClose={handleModalClose}
          id={reviewId}
          queryKeyType={queryKeyType}
        />
      )}
    </S.Container>
  );
}

export default Review;
