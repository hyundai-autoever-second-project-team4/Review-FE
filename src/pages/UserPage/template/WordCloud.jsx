import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import ReactWordcloud from "react-wordcloud";

const Container = styled.div`
  width: calc((100% - 16px) / 2);

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 24px;
`;

const Wrapepr = styled.div`
  border: 1px solid #f5f5f5;
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  height: 300px;
`;

function WordCloud({ level, genre }) {
  const options = {
    rotations: 1,
    rotationAngles: [0],
    fontSizes: [16, 48],
    colors: [theme.colors.super[level], theme.colors.sub[level]],
    enableTooltip: false,
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return (
    <Container>
      <Title>영화 선호 장르</Title>
      <Wrapepr>
        <ReactWordcloud options={options} words={genre} />
      </Wrapepr>
    </Container>
  );
}

export default WordCloud;
