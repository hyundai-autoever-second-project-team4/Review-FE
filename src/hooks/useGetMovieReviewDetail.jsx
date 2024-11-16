import { useQuery } from "@tanstack/react-query";
import { getMovieReviewDetail } from "../api/api";

export const useGetMovieReviewDetail = (reviewId) => {
  const queryKey = ["movieReviewList", reviewId];
  const queryFn = async () => {
    const response = await getMovieReviewDetail(reviewId);
    return response.data;
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
