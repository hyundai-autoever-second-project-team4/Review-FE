import React, { useEffect, useState } from "react";
import * as S from "./RatingChartStyle";
import { Tooltip } from "@mui/material";
import StarIcon from "../../assets/svg/star.svg";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";

function RatingChart({ ratingArray, level }) {
  const [max, setMax] = useState(Math.max(...ratingArray));
  const [heights, setHeights] = useState(Array(ratingArray?.length).fill(0));

  useEffect(() => {
    setMax(Math.max(...ratingArray));

    setTimeout(() => {
      setHeights(ratingArray?.map((rate) => 150 * (rate / max)));
    }, 300);
  }, [ratingArray]);

  return (
    <S.Container>
      {ratingArray?.map((rate, index) => {
        return (
          <div key={index}>
            <Tooltip
              title={
                <S.ToolTipWrap>
                  <DynamicSVG
                    width={12}
                    height={12}
                    svgUrl={StarIcon}
                    color={theme.colors.primary}
                  />
                  <S.styledP>{`${index * 0.5 + 0.5} : ${
                    ratingArray[index]
                  } 개`}</S.styledP>
                </S.ToolTipWrap>
              }
            >
              <S.Bar
                height={heights[index]}
                $isMax={max === rate}
                $level={level}
              />
            </Tooltip>
          </div>
        );
      })}
    </S.Container>
  );
}

export default RatingChart;
