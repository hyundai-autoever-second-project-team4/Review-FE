import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import Review from "../../../components/Review/Review";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 24px;
`;

const ReviewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const CardWrapper = styled.div`
  flex-basis: calc((100% - 64px) / 5);

  @media (max-width: 1320px) {
    flex-basis: calc((100% - 48px) / 4);
  }
  @media (max-width: 960px) {
    flex-basis: calc((100% - 32px) / 3);
  }

  @media (max-width: 640px) {
    flex-basis: calc((100% - 16px) / 2);
  }
`;

function MyReviewsList({ reviews }) {
  return (
    <Container>
      <Title>내가 작성한 리뷰</Title>
      <ReviewWrapper>
        {reviews.map((review, index) => {
          return (
            <CardWrapper key={index}>
              <Review
                level={review.level}
                movieName={review.movieName}
                starRate={review.starRate}
                profileName={review.profileName}
                profileImg={review.profileImg}
                content={review.content}
                isBlur={review.isBlur}
                theUpCnt={review.theUpCnt}
                theDownCnt={review.theDownCnt}
                theIsUp={review.theIsUp}
                theIsDown={review.theIsDown}
                commentCnt={review.commentCnt}
                upClick={review.upClick}
                downClick={review.downClick}
                isMine
              />
            </CardWrapper>
          );
        })}
      </ReviewWrapper>
    </Container>
  );
}

export default MyReviewsList;
