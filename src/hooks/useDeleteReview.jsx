import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../api/api";
import Swal from "sweetalert2";

export const useDeleteReview = (reviewId, queryKeyType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyType);
      Swal.fire({
        text: "삭제되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    },
    onError: (error) => {
      Swal.fire({
        text: `삭제에 실패했습니다: ${error}`,
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};
