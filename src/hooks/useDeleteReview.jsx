import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../api/api";

export const useDeleteReview = (reviewId, queryKeyType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      console.log(queryKeyType);
      queryClient.invalidateQueries(queryKeyType);
    },
    onError: (error) => {
      console.error("에러: ", error);
    },
  });
};
