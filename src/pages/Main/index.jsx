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
  const [userRecommendMovies, setUserRecommendMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topReviewedMovies, setTopReviewedMovies] = useState([]);
  const [hotReview, setHotReview] = useState([]);
  const [thearupHonorMovies, setThearupHonorMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRecommendMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/recommend");
        setUserRecommendMovies(response.data.movies); // API 응답 데이터
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecommendMovies();
  }, []);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/top-rated/weekly");
        setTopRatedMovies(response.data.movies); // API 응답 데이터
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    const fetchTopReviewedMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/honor-board");
        setTopReviewedMovies(response.data.movies); // API 응답 데이터
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopReviewedMovies();
  }, []);

  useEffect(() => {
    const fetchHotReview = async () => {
      try {
        const response = await axiosInstance.get("/review/hot");
        setHotReview(response.data.reviewInfos); // API 응답 데이터
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotReview();
  }, []);

  useEffect(() => {
    const fetchThearupHonorMovies = async () => {
      try {
        const response = await axiosInstance.get("/movie/most-reviewed/weekly");
        setThearupHonorMovies(response.data.movies); // API 응답 데이터
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThearupHonorMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
