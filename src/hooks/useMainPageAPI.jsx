import { useQuery } from "@tanstack/react-query";
import {
  getHotReview,
  getThearupHonorMovies,
  getTopRatedMovies,
  getTopReviewedMovies,
  getUserRecommendMovies,
} from "../api/api";

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

// export function useMainPageApi() {
//   const topRatedMoviesQuery = useQuery({
//     queryKey: ["topRatedMovies"],
//     queryFn: fetchTopRatedMovies,
//     staleTime: 10000, // 10초
//   });

//   const topReviewedMoviesQuery = useQuery({
//     queryKey: ["topReviewedMovies"],
//     queryFn: fetchTopReviewedMovies,
//     staleTime: 10000, // 10초
//   });

//   const hotReviewQuery = useQuery({
//     queryKey: ["hotReview"],
//     queryFn: fetchHotReview,
//     staleTime: 10000, // 10초
//   });

//   const thearupHonorMoviesQuery = useQuery({
//     queryKey: ["thearupHonorMovies"],
//     queryFn: fetchThearupHonorMovies,
//     staleTime: 10000, // 10초
//   });

//   return {
//     userRecommendMovies: userRecommendMoviesQuery,
//     topRatedMovies: topRatedMoviesQuery,
//     topReviewedMovies: topReviewedMoviesQuery,
//     hotReview: hotReviewQuery,
//     thearupHonorMovies: thearupHonorMoviesQuery,
//     loading:
//       userRecommendMoviesQuery.isLoading ||
//       topRatedMoviesQuery.isLoading ||
//       topReviewedMoviesQuery.isLoading ||
//       hotReviewQuery.isLoading ||
//       thearupHonorMoviesQuery.isLoading,
//     error:
//       userRecommendMoviesQuery.error ||
//       topRatedMoviesQuery.error ||
//       topReviewedMoviesQuery.error ||
//       hotReviewQuery.error ||
//       thearupHonorMoviesQuery.error,
//   };
// }
