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
import { Pagination } from "@mui/material";
import { getUserReview } from "../../api/api";
import ReviewDetailModal from "../../components/ReviewDetailModal/ReviewDetailModal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { smoothScrollTo } from "../../utils/smoothScrollTop";

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
  const { data, isLoading } = useQuery({
    queryKey: ["userReviews", userId, selectedSort, page],
    queryFn: () => getUserReview(userId, selectedSort, page - 1),
    select: (data) => data.data.reviewInfos,
  });

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
    setPage(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  return (
    <Container>
      <HeaderTextContainer>
        <HeaderText>작성한 리뷰 목록</HeaderText>
      </HeaderTextContainer>
      <HeaderBackground>
        <DropDownContainer>
          <select value={selectedSort} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </DropDownContainer>
      </HeaderBackground>
      <ReviewContainer>
        {!isLoading &&
          data?.content.map((review) => (
            <Review
              key={review.reviewId}
              width={isMobile ? "80%" : "640px"} // 화면 크기에 따라 width 설정
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
              theIsDown={review.isThearDown}
              queryKeyType={["userReviews", userId, selectedSort, page]}
              isMine
            />
          ))}
      </ReviewContainer>
      <Pagination
        count={data?.totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#F2B705",
          },
        }}
      />
      <ReviewDetailModal
        modalOpen={isModalOpen}
        modalClose={handleModalClose}
        id={reviewId}
      />
    </Container>
  );
}

export default UserReviewListPage;
