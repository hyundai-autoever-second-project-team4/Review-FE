import { useQuery } from "@tanstack/react-query";
import {
  fetchHotReview,
  fetchThearupHonorMovies,
  fetchTopRatedMovies,
  fetchTopReviewedMovies,
  fetchUserRecommendMovies,
} from "../api/api";

export function useMainPageApi() {
  const userRecommendMoviesQuery = useQuery({
    queryKey: ["userRecommendMovies"],
    queryFn: fetchUserRecommendMovies,
    staleTime: 10000, // 10초
  });

  const topRatedMoviesQuery = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovies,
    staleTime: 10000, // 10초
  });

  const topReviewedMoviesQuery = useQuery({
    queryKey: ["topReviewedMovies"],
    queryFn: fetchTopReviewedMovies,
    staleTime: 10000, // 10초
  });

  const hotReviewQuery = useQuery({
    queryKey: ["hotReview"],
    queryFn: fetchHotReview,
    staleTime: 10000, // 10초
  });

  const thearupHonorMoviesQuery = useQuery({
    queryKey: ["thearupHonorMovies"],
    queryFn: fetchThearupHonorMovies,
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
