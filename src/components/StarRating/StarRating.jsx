import React, { useState } from "react";
import * as S from "./StartRatingStyle";
import StarIcon from "../../assets/svg/star.svg";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";
import { Rating } from "@mui/material";

function StarRating({ rate, readOnly, setRating }) {
  return (
    <S.Wrapper>
      <Rating
        name="starRating"
        onChange={(e) => setRating(Number(e.target.value))}
        value={rate}
        precision={readOnly ? 0.1 : 0.5}
        readOnly={readOnly}
        // icon={
        //   <DynamicSVG
        //     svgUrl={StarIcon}
        //     width={24}
        //     height={24}
        //     color={theme.colors.primary}
        //   />
        // }
        // emptyIcon={
        //   <DynamicSVG
        //     svgUrl={StarIcon}
        //     width={24}
        //     height={24}
        //     color={theme.colors.gray2}
        //   />
        // }
      />
      {!readOnly && (
        <div
          style={{
            marginLeft: "4px",
            display: "flex",
            gap: "4px",
            alignItems: "flex-end",
          }}
        >
          <p>별점:</p>
          <p style={{ color: theme.colors.primary, fontSize: "20px" }}>
            {rate}
          </p>
        </div>
      )}
    </S.Wrapper>
  );
}

export default StarRating;
