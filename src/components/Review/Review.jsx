import React, { useState } from "react";
import * as S from "./ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import StarIcon from "../../assets/svg/star.svg";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";

function Review({
  width,
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
}) {
  const [blur, setBlur] = useState(isBlur);
  const [upCnt, setUpCnt] = useState(theUpCnt);
  const [downCnt, setDownCnt] = useState(theDownCnt);
  const [isUp, setIsUp] = useState(theIsUp);
  const [isDown, setIsDown] = useState(theIsDown);

  const svgFiles = import.meta.glob("/src/assets/svg/levels/*.svg");

  function getSvgUrl(level) {
    // `svgFiles` 객체에서 동적으로 필요한 경로를 선택합니다.
    return svgFiles[`/src/assets/svg/levels/${level}.svg`];
  }

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
            svgUrl={getSvgUrl(level)}
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
        <S.ContentArea $isBlur={blur}>{content}</S.ContentArea>
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
              svgUrl="/src/assets/svg/up.svg"
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
              svgUrl="/src/assets/svg/down.svg"
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
