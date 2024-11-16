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
  upClick,
  downClick,
  contentClick,
  movieName,
  isMine,
  queryKeyType,
  memberId,
}) {
  const [blur, setBlur] = useState(isBlur);
  const navigate = useNavigate();

  const { mutate: thearUp } = useThearMutation(reviewId, queryKeyType, "up");
  const { mutate: thearDown } = useThearMutation(
    reviewId,
    queryKeyType,
    "down"
  );

  const handleUpButtonClick = () => {
    if (queryKeyType !== "hotReview") thearUp();
  };
  const handleDownButtonClick = () => {
    if (queryKeyType !== "hotReview") thearDown();
  };

  const handleUserInfoClick = () => {
    navigate(`/userPage/${memberId}`);
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
            {/* <DynamicSVG
              svgUrl={`/levels/${level}.svg`}
              width={18}
              height={18}
              color={theme.colors.super[level]}
            /> */}
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
        <S.MovieNameArea>
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
        <S.ContentArea onClick={() => contentClick(id)} $isBlur={blur}>
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
              style={{ cursor: "pointer" }}
              onClick={handleUpButtonClick}
            />
            <p>{theUpCnt}</p>
          </S.ThumbWrapper>
          <S.ThumbWrapper>
            <img
              src={theIsDown ? blueDown : downLogo}
              width={18}
              height={18}
              style={{ cursor: "pointer", position: "relative", top: "4px" }}
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
    </S.Container>
  );
}

export default Review;
