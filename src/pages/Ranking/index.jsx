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
import { Helmet } from "react-helmet-async";

function Ranking() {
  return (
    <div>
      <Helmet>
        <title>랭킹페이지 - ThearUp</title>
        <meta name="description" content="자신의 랭킹을 확인해보세요!" />
        <meta property="og:url" content="https://theaterup.site/ranking" />
        <meta property="og:title" content="랭킹페이지 - ThearUp" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://theaterup.site/ThearUpImg.png"
        />
        <meta property="og:description" content="자신의 랭킹을 확인해보세요!" />
      </Helmet>
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
    </div>
  );
}

export default Ranking;
