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

function MyRating({ starRateList, level }) {
  return (
    <Container>
      <Title>별점 분포</Title>
      <Wrapepr>
        <RatingChart ratingArray={starRateList?.starRate} level={level} />
        <InfoWrap>
          <Info>
            <Value>{starRateList?.averageRate.toFixed(1)}</Value>
            <Name>별점 평균</Name>
          </Info>
          <Info>
            <Value>{starRateList?.totalRateCount}</Value>
            <Name>별점 개수</Name>
          </Info>
          <Info>
            <Value>{starRateList?.mostRated}</Value>
            <Name>많이 준 평점</Name>
          </Info>
        </InfoWrap>
      </Wrapepr>
    </Container>
  );
}

export default MyRating;
