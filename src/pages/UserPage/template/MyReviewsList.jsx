import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import Review from "../../../components/Review/Review";
import { useNavigate, useParams } from "react-router-dom";

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
  align-items: flex-start;
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

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.sub1};
  font-weight: 600;
  padding: 4px 8px;

  transition: 0.4s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

function MyReviewsList({ reviews, queryKeyType }) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleMoveReviewListPage = () => {
    navigate(`/userReview/${userId}`);
  };

  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>작성한 리뷰</Title>
        {reviews?.length > 5 && (
          <StyledButton onClick={() => handleMoveReviewListPage()}>
            더보기
          </StyledButton>
        )}
      </div>

      <ReviewWrapper>
        {reviews?.length === 0 ? (
          <>아직 작성된 리뷰가 없습니다. 첫번째 리뷰를 달아주세요~^^</>
        ) : (
          reviews.map((review) => {
            return (
              <CardWrapper key={review.reviewId}>
                <Review
                  width={"100%"}
                  level={review.level}
                  reviewId={review.reviewId}
                  movieName={review.movieTitle}
                  starRate={review.starRate}
                  profileName={review.profileName}
                  profileImg={review.profileImg}
                  content={review.content}
                  isBlur={review.spoiler} // 내 리뷰 일때도 스포일러
                  theUpCnt={review.ThearUpCount}
                  theDownCnt={review.ThearDownCount}
                  theIsUp={review.isThearUp}
                  theIsDown={review.isThearDown}
                  commentCnt={review.commentCount}
                  isMine
                  queryKeyType={queryKeyType}
                  movieId={review.movieId}
                  userId={userId}
                  isWriter={review.isWriter}
                />
              </CardWrapper>
            );
          })
        )}
      </ReviewWrapper>
    </Container>
  );
}

export default MyReviewsList;
