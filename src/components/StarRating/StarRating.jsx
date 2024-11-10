import React from "react";
import * as S from "./StartRatingStyle";
import StarIcon from "../../assets/svg/star.svg";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";
import { Rating } from "@mui/material";

function StarRating({ rate }) {
  return (
    <S.Wrapper>
      <DynamicSVG
        svgUrl={StarIcon}
        width={24}
        height={24}
        color={theme.colors.primary}
      />
      <Rating
        name="half-rating"
        defaultValue={3.3} // 3.3 같은 소수점 값
        precision={0.1} // 소수점 첫째 자리까지 표현
      />
    </S.Wrapper>
  );
}

export default StarRating;
