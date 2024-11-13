import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import RatingChart from "../../../components/RatingChart/RatingChart";

const Container = styled.div`
  width: calc((100% - 16px) / 2);

  @media (max-width: 960px) {
    width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

function MyRating({ ratingArray, level }) {
  return (
    <Container>
      <Title>별점 분포</Title>
      <Wrapepr>
        <RatingChart ratingArray={ratingArray} level={level} />
      </Wrapepr>
    </Container>
  );
}

export default MyRating;
