import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeComment } from "../api/api";
import Swal from "sweetalert2";

export const usePutComment = (commentId, content, reviewId, page) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, content }) => ChangeComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(["commentList", reviewId, page]);
      Swal.fire({
        text: "댓글이 수정 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    },
    onError: (error) => {
      Swal.fire({
        text: `수정에 실패했습니다: ${error}`,
        icon: "error",
        confirmButtonText: "확인",
      });
    },
  });
};
