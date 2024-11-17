import React, { useEffect, useState } from "react";
import {
  Container,
  DropDownContainer,
  HeaderBackground,
  HeaderText,
  HeaderTextContainer,
  ReviewContainer,
} from "./MovieReviewStyle";
import Review from "../../components/Review/Review";
import { useLocation, useParams } from "react-router-dom";
import { getMovieReviewList } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { smoothScrollTo } from "../../utils/smoothScrollTop";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ReviewSkeleton from "../../components/Review/ReviewSkeleton";

const sortOptions = [
  { value: "likes", label: "UP 순" },
  { value: "latest", label: "최신 순" },
  { value: "ratingHigh", label: "별점 높은 순" },
  { value: "ratingLow", label: "별점 낮은 순" },
  { value: "comments", label: "댓글 많은 순" },
];

function MovieReview() {
  const location = useLocation();
  const movieTitle = location.state?.movieTitle; // 상태에서 movieTitle을 가져옵니다.
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const { movieId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", movieId, selectedSort, page],
    queryFn: () => getMovieReviewList(movieId, selectedSort, page),
    select: (data) => data.data,
    keepPreviousData: true, // 페이지 이동 시 이전 데이터를 유지
  });

  useEffect(() => {
    setPage(1);
  }, [selectedSort]);

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

  const handlePageChange = (event, value) => {
    setPage(value);
    setTimeout(() => {
      smoothScrollTo(0, 500);
    }, 0);
  };

  return (
    <Container>
      <HeaderTextContainer>
        <HeaderText>"{movieTitle}" 리뷰 목록</HeaderText>
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
        {!isLoading
          ? data?.reviewInfos?.content.map((review) => (
              <Review
                key={review.reviewId}
                memberId={review.memberId}
                width={isMobile ? "80%" : "640px"} // 화면 크기에 따라 width 설정
                id={review.reviewId}
                level={review.memberTierImg}
                starRate={review.starRate}
                profileImg={review.memberProfileImg}
                profileName={review.memberName}
                content={review.content}
                isBlur={review.spoiler}
                theUpCnt={review.ThearUpCount}
                theDownCnt={review.ThearDownCount}
                commentCnt={review.commentCount}
                theIsUp={review.isThearUp}
                theIsDown={review.isThearDown}
                reviewId={review.reviewId}
                queryKeyType={["reviews", movieId, selectedSort, page]}
              />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <ReviewSkeleton key={index} width={isMobile ? "80%" : "640px"} />
            ))}
      </ReviewContainer>
      <CustomPagination
        count={data?.reviewInfos?.totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </Container>
  );
}

export default MovieReview;
