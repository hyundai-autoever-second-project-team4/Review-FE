import React, { useState } from "react";
import * as S from "./ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import StarIcon from "../../assets/svg/star.svg";
import theme from "../../styles/theme";
import Button from "../Button/Button";

function Review({
  width,
  level,
  proflieImg,
  profileName,
  content,
  isBlur,
  upCnt,
  downCnt,
  isUp,
  isDown,
  setUpCnt,
  setDownCnt,
  setIsUp,
  setIsDown,
}) {
  const [blur, setBlur] = useState(isBlur);

  const toggleUpVote = () => {
    setIsUp((prev) => !prev);
    setUpCnt((prev) => (isUp ? prev - 1 : prev + 1));
  };

  const toggleDownVote = () => {
    setIsDown((prev) => !prev);
    setDownCnt((prev) => (isDown ? prev - 1 : prev + 1));
  };

  return (
    <S.Container width={width}>
      <S.TopArea>
        <S.ProfileWrapper>
          <DynamicSVG
            svgUrl={`./src/assets/svg/levels/${level}.svg`}
            width={18}
            height={18}
            color={theme.colors.super[level]}
          />

          <S.ProfileImg src={proflieImg} alt="" />
          <S.ProfileName>{profileName}</S.ProfileName>
        </S.ProfileWrapper>
        <S.StarRate>
          <img src={StarIcon} width={12} height={12} />
          <p>3.5</p>
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
              svgUrl="./src/assets/svg/up.svg"
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
              svgUrl="./src/assets/svg/down.svg"
              color={isDown ? theme.colors.blue : theme.colors.gray3}
              width={18}
              height={18}
              style={{ cursor: "pointer" }}
              onClick={toggleDownVote}
            />
            <p>{downCnt}</p>
          </S.ThumbWrapper>
        </S.ThumbWrapper>
        <div></div>
      </S.BottomArea>
    </S.Container>
  );
}

export default Review;
