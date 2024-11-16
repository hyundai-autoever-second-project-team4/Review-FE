import { useQuery } from "@tanstack/react-query";
import { getCommentList } from "../api/api";

export const useGetCommentList = (reviewId, page) => {
  const queryKey = ["commentList", reviewId, page];

  const queryFn = async () => {
    const response = await getCommentList(reviewId, page);
    return response.data;
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
