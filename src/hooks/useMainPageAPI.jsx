import { useQuery } from "@tanstack/react-query";
import {
  getHotReview,
  getThearupHonorMovies,
  getTopRatedMovies,
  getTopReviewedMovies,
  getUserRecommendMovies,
} from "../api/api";

export function useMainPageApi() {
  const userRecommendMoviesQuery = useQuery({
    queryKey: ["userRecommendMovies"],
    queryFn: getUserRecommendMovies,
    staleTime: 10000, // 10초
  });

  const topRatedMoviesQuery = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
    staleTime: 10000, // 10초
  });

  const topReviewedMoviesQuery = useQuery({
    queryKey: ["topReviewedMovies"],
    queryFn: getTopReviewedMovies,
    staleTime: 10000, // 10초
  });

  const hotReviewQuery = useQuery({
    queryKey: ["hotReview"],
    queryFn: getHotReview,
    staleTime: 10000, // 10초
  });

  const thearupHonorMoviesQuery = useQuery({
    queryKey: ["thearupHonorMovies"],
    queryFn: getThearupHonorMovies,
    staleTime: 10000, // 10초
  });

  return {
    userRecommendMovies: userRecommendMoviesQuery.data,
    topRatedMovies: topRatedMoviesQuery.data,
    topReviewedMovies: topReviewedMoviesQuery.data,
    hotReview: hotReviewQuery.data,
    thearupHonorMovies: thearupHonorMoviesQuery.data,
    loading:
      userRecommendMoviesQuery.isLoading ||
      topRatedMoviesQuery.isLoading ||
      topReviewedMoviesQuery.isLoading ||
      hotReviewQuery.isLoading ||
      thearupHonorMoviesQuery.isLoading,
    error:
      userRecommendMoviesQuery.error ||
      topRatedMoviesQuery.error ||
      topReviewedMoviesQuery.error ||
      hotReviewQuery.error ||
      thearupHonorMoviesQuery.error,
  };
}
