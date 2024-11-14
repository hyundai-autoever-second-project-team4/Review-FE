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
    userRecommendMovies: userRecommendMoviesQuery.data.movies,
    topRatedMovies: topRatedMoviesQuery.data.movies,
    topReviewedMovies: topReviewedMoviesQuery.data.movies,
    hotReview: hotReviewQuery.data.movies,
    thearupHonorMovies: thearupHonorMoviesQuery.data.movies,
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
