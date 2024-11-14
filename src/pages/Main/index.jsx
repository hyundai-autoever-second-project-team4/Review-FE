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
import { fetchUserRecommendMovies } from "../../api/api.js";
import { useQuery } from "@tanstack/react-query";

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
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRecommendMovies"],
    queryFn: fetchUserRecommendMovies,
    staleTime: 10000, // 10초
    select: (data) => data.data.movies,
  });

  console.log(movies);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <>
      <Container>
        <FaceMovieList movieData={movieData} />
        {user?.id !== null && (
          <MovieSlider
            title={`"${user?.name}" 님의 위한 추천 영화`}
            movieData={movies}
            cnt={1}
          />
        )}
        <MovieSlider
          title={"이번주 별점 높은 영화"}
          movieData={movies}
          cnt={2}
        />
        <MovieSlider
          title={"이번주 리뷰 많이 달린 영화"}
          movieData={movies}
          cnt={3}
        />
        {/* <HotComment reviewData={hotReview} /> */}
      </Container>
      <MovieAwards movieData={movies} />
    </>
  );
}

export default Main;
