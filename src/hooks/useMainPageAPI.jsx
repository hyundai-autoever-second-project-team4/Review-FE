import { useQuery } from "@tanstack/react-query";
import {
  getHotReview,
  getThearupHonorMovies,
  getTopRatedMovies,
  getTopReviewedMovies,
  getUserRecommendMovies,
} from "../api/api";

export function useMainPageApi(user) {
  const {
    data: userRecommendMovies,
    isLoading: recommendLoading,
    isError: recommendError,
  } = useQuery({
    queryKey: ["userRecommendMovies"],
    queryFn: getUserRecommendMovies,
    staleTime: 0, // 1분
    select: (data) => data.data.movies,
    enabled: user?.id !== null,
  });

  const {
    data: topRatedMovies,
    isLoading: topRatedMoviesLoading,
    isError: topRatedMoviesError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
    staleTime: 0, // 1분
    select: (data) => data.data.movies,
  });

  const {
    data: topReviewedMovies,
    isLoading: topReviewedMoviesLoading,
    isError: topReviewedMoviesError,
  } = useQuery({
    queryKey: ["topReviewedMovies"],
    queryFn: getTopReviewedMovies,
    staleTime: 0, // 1분
    select: (data) => data.data.movies,
  });

  const {
    data: hotReview,
    isLoading: hotReviewLoading,
    isError: hotReviewError,
  } = useQuery({
    queryKey: ["hotReview"],
    queryFn: getHotReview,
    staleTime: 0, // 1분
    select: (data) => data.data.reviewInfos,
  });

  const {
    data: thearupHonorMovies,
    isLoading: thearupHonorMoviesLoading,
    isError: thearupHonorMoviesError,
  } = useQuery({
    queryKey: ["thearupHonorMovies"],
    queryFn: getThearupHonorMovies,
    staleTime: 0, // 1분
    select: (data) => data.data.movies,
  });

  return {
    userRecommendMovies: userRecommendMovies,
    topRatedMovies: topRatedMovies,
    topReviewedMovies: topReviewedMovies,
    hotReview: hotReview,
    thearupHonorMovies: thearupHonorMovies,
    loading:
      recommendLoading ||
      topRatedMoviesLoading ||
      topReviewedMoviesLoading ||
      hotReviewLoading ||
      thearupHonorMoviesLoading,
    error:
      recommendError ||
      topRatedMoviesError ||
      topReviewedMoviesError ||
      hotReviewError ||
      thearupHonorMoviesError,
  };
}
