import React, { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.jsx";
import styled from "styled-components";
import MovieSlider from "./template/MovieSlider";
import movieData from "../../utils/data.js";
import MovieAwards from "./template/MovieAwards";
import dummyReviews from "../../utils/dummyReview.js";
import HotComment from "./template/HotComment";
import FaceMovieList from "./template/FaceMovieList";
import { setCookies } from "../../api/cookie.js";

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
  const { data, isLoading, refetch } = useGetUserInfo();

  useEffect(() => {
    setCookies(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi7Jik7KCV7ZmYIiwic29jaWFsIjoia2FrYW8iLCJlbWFpbCI6IndqZGdoa3MwMzE2QG5hdmVyLmNvbSIsInByb2ZpbGVJbWFnZSI6Imh0dHA6Ly9pbWcxLmtha2FvY2RuLm5ldC90aHVtYi9SNjQweDY0MC5xNzAvP2ZuYW1lPWh0dHA6Ly90MS5rYWthb2Nkbi5uZXQvYWNjb3VudF9pbWFnZXMvZGVmYXVsdF9wcm9maWxlLmpwZWciLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzMxNDc0NTQzLCJleHAiOjE3MzE0NzgxNDN9.5GyVN3RXfQiUcryzX7I6mTEW2jt_YMhLOP5HjEuL3XU",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzE0NzQ1NDMsImV4cCI6MTczMjA3OTM0MywiZW1haWwiOiJ3amRnaGtzMDMxNkBuYXZlci5jb20ifQ.wzsRVHHHNUCah-fNTNjatSltAMKYeauXO4yL661JrSQ",
      60
    );
  }, []);
  return (
    <>
      <Container>
        <FaceMovieList movieData={movieData} />
        {user.userId !== null && (
          <MovieSlider
            title={`"${user.name}" 님의 위한 추천 영화`}
            movieData={movieData}
            cnt={1}
          />
        )}
        <MovieSlider
          title={"이번주 별점 높은 영화"}
          movieData={movieData}
          cnt={2}
        />
        <MovieSlider
          title={"이번주 리뷰 많이 달린 영화"}
          movieData={movieData}
          cnt={3}
        />
        <HotComment reviewData={dummyReviews} />
      </Container>
      <MovieAwards movieData={movieData} />
    </>
  );
}

export default Main;
