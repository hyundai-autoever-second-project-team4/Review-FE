import React, { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import styled from "styled-components";
import MovieSlider from "./template/MovieSlider";
import movieData from "../../utils/data.js";
import MovieAwards from "./template/MovieAwards";
import dummyReviews from "../../utils/dummyReview.js";
import HotComment from "./template/HotComment";
import FaceMovieList from "./template/FaceMovieList";
import { axiosInstance } from "../../api/axiosInstance.js";
import { useMainPageApi } from "../../hooks/useMainPageAPI.jsx";

const Container = styled.div`
  margin-top: 72px;
  padding: 20px 0;
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
    padding: 20px;
  }
`;

function Main() {
  const { user, setUser, logOut } = useUserStore((state) => state);
  const {
    userRecommendMovies,
    topRatedMovies,
    topReviewedMovies,
    hotReview,
    thearupHonorMovies,
    loading,
    error,
  } = useMainPageApi();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(
    userRecommendMovies,
    topRatedMovies,
    topReviewedMovies,
    hotReview,
    thearupHonorMovies
  );

  return (
    <>
      <Container>
        <FaceMovieList movieData={movieData} />
        {user?.id !== null && (
          <MovieSlider
            title={`"${user?.name}" 님의 위한 추천 영화`}
            movieData={userRecommendMovies}
            cnt={1}
          />
        )}
        <MovieSlider
          title={"이번주 별점 높은 영화"}
          movieData={topRatedMovies}
          cnt={2}
        />
        <MovieSlider
          title={"이번주 리뷰 많이 달린 영화"}
          movieData={topReviewedMovies}
          cnt={3}
        />
        <HotComment reviewData={hotReview} />
      </Container>
      <MovieAwards movieData={thearupHonorMovies} />
    </>
  );
}

export default Main;
