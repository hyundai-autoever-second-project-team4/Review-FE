import { useQuery } from "@tanstack/react-query";
import { getReviewDetail } from "../api/api";

export const useGetReviewDetail = (reviewId) => {
  const queryKey = ["reviewDetail", reviewId];
  const queryFn = () => getReviewDetail(reviewId);

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
    select: (data) => data.data,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
