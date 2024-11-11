import React, { useState } from "react";
import * as S from "./ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import StarIcon from "../../assets/svg/star.svg";
import theme from "../../styles/theme";

function Review({
  width,
  level,
  proflieImg,
  profileName,
  content,
  isBlur,
  upCnt,
  downCnt,
}) {
  const [blur, setBlur] = useState(isBlur);

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
          <button
            onClick={() => setBlur(false)}
            style={{ position: "absolute", top: "36px", left: "64px" }}
          >
            스포일러 보기
          </button>
        )}
      </div>
      <S.BottomArea>
        <div>{upCnt}</div>
        <div>{downCnt}</div>
      </S.BottomArea>
    </S.Container>
  );
}

export default Review;
