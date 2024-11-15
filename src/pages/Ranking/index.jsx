import React from "react";
import {
  Container,
  HeaderBackground,
  HeaderSubText,
  HeaderText,
  HeaderTextBox,
  HeaderTextWrap,
} from "./RankingPageStyle";

import RankingBoard from "./RankingBoard";

function Ranking() {
  return (
    <Container>
      <HeaderBackground>
        <HeaderTextBox>
          <HeaderTextWrap>
            <HeaderText>실시간 ThearUp 랭킹</HeaderText>
            <HeaderSubText>
              본 영화를 리뷰하고 랭킹에 도전 해보세요!
            </HeaderSubText>
          </HeaderTextWrap>
        </HeaderTextBox>
      </HeaderBackground>
      <RankingBoard />
    </Container>
  );
}

export default Ranking;
