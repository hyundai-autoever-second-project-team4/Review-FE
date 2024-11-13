import React, { useState } from "react";
import * as S from "./ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import StarIcon from "../../assets/svg/star.svg";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import upLogo from "/src/assets/svg/up.svg";
import downLogo from "/src/assets/svg/down.svg";

function Review({
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
}) {
  const [blur, setBlur] = useState(isBlur);
  const [upCnt, setUpCnt] = useState(theUpCnt);
  const [downCnt, setDownCnt] = useState(theDownCnt);
  const [isUp, setIsUp] = useState(theIsUp);
  const [isDown, setIsDown] = useState(theIsDown);

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

  return (
    <S.Container width={width}>
      <S.TopArea>
        <S.ProfileWrapper>
          <DynamicSVG
            svgUrl={`/levels/${level}.svg`}
            width={18}
            height={18}
            color={theme.colors.super[level]}
          />
          <S.ProfileImg src={profileImg} alt="" />
          <S.ProfileName>{profileName}</S.ProfileName>
        </S.ProfileWrapper>
        <S.StarRate>
          <img src={StarIcon} width={12} height={12} />
          <p>{starRate}</p>
        </S.StarRate>
      </S.TopArea>
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
              svgUrl={upLogo}
              color={isUp ? theme.colors.red : theme.colors.gray3}
              width={18}
              height={18}
              style={{ cursor: "pointer" }}
              onClick={toggleUpVote}
            />
            <p>{upCnt}</p>
          </S.ThumbWrapper>
          <S.ThumbWrapper>
            <DynamicSVG
              svgUrl={downLogo}
              color={isDown ? theme.colors.blue : theme.colors.gray3}
              width={18}
              height={18}
              style={{ cursor: "pointer" }}
              onClick={toggleDownVote}
            />
            <p>{downCnt}</p>
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
