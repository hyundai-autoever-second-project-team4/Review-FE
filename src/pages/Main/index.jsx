import React, { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import styled from "styled-components";
import MovieSlider from "./template/MovieSlider";
import MovieAwards from "./template/MovieAwards";
import HotComment from "./template/HotComment";
import FaceMovieList from "./template/FaceMovieList";
import { useMainPageApi } from "../../hooks/useMainPageAPI.jsx";
import Loading from "./template/Loading.jsx";
import theme from "../../styles/theme.js";

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
  const { user } = useUserStore((state) => state);
  const [faceList, setFaceList] = useState([]);
  const {
    userRecommendMovies,
    topRatedMovies,
    topReviewedMovies,
    hotReview,
    thearupHonorMovies,
    loading,
    error,
  } = useMainPageApi(user);
  console.log(topReviewedMovies, thearupHonorMovies);
  useEffect(() => {
    const arr = [];
    if (user.id !== null)
      userRecommendMovies &&
        arr.push({ type: "추천 영화", ...userRecommendMovies[0] });
    topRatedMovies &&
      arr.push({ type: "별점 높은 영화", ...topRatedMovies[0] });
    topReviewedMovies &&
      arr.push({ type: "리뷰 많은 영화", ...topReviewedMovies[0] });
    thearupHonorMovies &&
      arr.push({ type: "명예의 전당", ...thearupHonorMovies[0] });
    setFaceList(arr);
  }, [
    userRecommendMovies,
    topRatedMovies,
    topReviewedMovies,
    thearupHonorMovies,
  ]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <Container>
        <FaceMovieList movieData={faceList} />
        {user?.id !== null && (
          <MovieSlider
            title={
              <div>
                <p style={{ color: theme.colors.primary, display: "inline" }}>
                  {`${user.name}`}
                </p>{" "}
                님을 위한 추천 영화
              </div>
            }
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
