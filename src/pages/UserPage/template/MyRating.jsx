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
  flex-direction: column;
  gap: 24px;
`;

const InfoWrap = styled.div`
  width: 100%;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: column;
`;

const Name = styled.p`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
`;

const Value = styled.p`
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.bold};
`;

function MyRating({ ratingArray, level, rateInfo }) {
  return (
    <Container>
      <Title>별점 분포</Title>
      <Wrapepr>
        <RatingChart ratingArray={ratingArray} level={level} />
        <InfoWrap>
          <Info>
            <Value>{rateInfo.average}</Value>
            <Name>별점 평균</Name>
          </Info>
          <Info>
            <Value>{rateInfo.cnt}</Value>
            <Name>별점 개수</Name>
          </Info>
          <Info>
            <Value>{rateInfo.best}</Value>
            <Name>많이 준 평점</Name>
          </Info>
        </InfoWrap>
      </Wrapepr>
    </Container>
  );
}

export default MyRating;
