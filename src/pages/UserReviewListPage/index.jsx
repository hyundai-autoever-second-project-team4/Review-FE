import React, { useEffect, useState } from "react";
import {
  Container,
  DropDownContainer,
  HeaderBackground,
  HeaderText,
  HeaderTextContainer,
  ReviewContainer,
} from "./UserReviewListPageStyle";
import Review from "../../components/Review/Review";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { getUserReview } from "../../api/api";
import ReviewDetailModal from "../../components/ReviewDetailModal/ReviewDetailModal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { smoothScrollTo } from "../../utils/smoothScrollTop";
import ReviewSkeleton from "../../components/Review/ReviewSkeleton";
import MetaTag from "../../MetaTag/MetaTag";

const sortOptions = [
  { value: "likes", label: "UP 순" },
  { value: "latest", label: "최신 순" },
  { value: "ratingHigh", label: "별점 높은 순" },
  { value: "ratingLow", label: "별점 낮은 순" },
  { value: "comments", label: "댓글 많은 순" },
];

function UserReviewListPage() {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["userReviews", userId, selectedSort, page],
    queryFn: () => getUserReview(userId, selectedSort, page - 1),
    select: (data) => data.data.reviewInfos,
  });

  useEffect(() => {
    setPage(1);
  }, [selectedSort]);

  useEffect(() => {
    if (data && totalPages === null) setTotalPages(data?.totalPages);
  }, [data]);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 680);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModalOpen = (id) => {
    setReviewId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setTimeout(() => {
      smoothScrollTo(0, 500);
    }, 0);
  };

  return (
    <Container>
      <MetaTag
        title={data?.content[0].memberName + "님의 리뷰"}
        description={data?.content[0].memberName + " 리뷰 목록 페이지"}
        imgsrc={"https://theaterup.site/ThearUpImg.png"}
        url={`https://theaterup.site/userReview/${userId}`}
        original={true}
      />
      <HeaderTextContainer>
        <HeaderText>작성한 리뷰 목록</HeaderText>
      </HeaderTextContainer>
      <HeaderBackground>
        <DropDownContainer>
          {data?.totalPages !== 0 && (
            <select value={selectedSort} onChange={handleSortChange}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </DropDownContainer>
      </HeaderBackground>
      <ReviewContainer>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ReviewSkeleton key={index} width={isMobile ? "80%" : "640px"} />
          ))
        ) : data?.content.length === 0 ? (
          <>아직 작성된 리뷰가 없습니다. 첫번째 리뷰를 달아주세요~^^</>
        ) : (
          data?.content.map((review) => (
            <Review
              key={review.reviewId}
              width={isMobile ? "80%" : "640px"}
              id={review.id}
              starRate={review.starRate}
              content={review.content}
              isBlur={review.isBlur}
              theUpCnt={review.ThearUpCount}
              theDownCnt={review.ThearDownCount}
              commentCnt={review.commentCount}
              movieName={review.movieTitle}
              contentClick={() => handleModalOpen(review.reviewId)}
              memberId={review.memberId}
              reviewId={review.reviewId}
              theIsUp={review.isThearUp}
              movieId={review.movieId}
              theIsDown={review.isThearDown}
              queryKeyType={["userReviews", userId, selectedSort, page]}
              isWriter={review.isWriter}
              isMine
            />
          ))
        )}
      </ReviewContainer>
      {totalPages !== null && (
        <CustomPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}
      {isModalOpen && (
        <ReviewDetailModal
          modalOpen={isModalOpen}
          modalClose={handleModalClose}
          id={reviewId}
        />
      )}
    </Container>
  );
}

export default UserReviewListPage;
