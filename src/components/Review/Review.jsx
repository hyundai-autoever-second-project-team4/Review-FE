import React, { useState } from "react";
import * as S from "./ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import StarIcon from "../../assets/svg/star.svg";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import upLogo from "/src/assets/svg/up.svg";
import downLogo from "/src/assets/svg/down.svg";
import up2Logo from "/src/assets/svg/up2.svg";
import down2Logo from "/src/assets/svg/down2.svg";
import { useUpMutation } from "../../hooks/useUpMutation";
import { useDownMutation } from "../../hooks/useDownMutation";

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
}) {
  const [blur, setBlur] = useState(isBlur);
  const { mutate: thearup } = useUpMutation(reviewId, queryKeyType);
  const { mutate: theardown } = useDownMutation(reviewId, queryKeyType);

  const handleUpButtonClick = () => {
    thearup();
  };
  const handleDownButtonClick = () => {
    theardown();
  };

  return (
    <S.Container
      width={width}
      $hasMovieName={movieName !== undefined}
      $isMine={isMine}
    >
      {!isMine && (
        <S.TopArea>
          <S.ProfileWrapper>
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
          <p>{movieName}</p>
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
            <DynamicSVG
              svgUrl={theIsUp ? upLogo : up2Logo}
              color={theIsUp ? theme.colors.red : theme.colors.gray3}
              width={18}
              height={18}
              style={{ cursor: "pointer" }}
              onClick={handleUpButtonClick}
            />
            <p>{theUpCnt}</p>
          </S.ThumbWrapper>
          <S.ThumbWrapper>
            <DynamicSVG
              svgUrl={theIsDown ? downLogo : down2Logo}
              color={theIsDown ? theme.colors.blue : theme.colors.gray3}
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
