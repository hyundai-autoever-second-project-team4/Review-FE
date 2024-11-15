import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThearDown } from "../api/api";

export const useDownMutation = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postThearDown(reviewId),
    onMutate: async () => {
      // 요청 보내는도중 새로운 요청이 들어왔을 때 기존 요청 취소
      await queryClient.cancelQueries(["hotReview"]);

      // 요청 실패시 이전 데이터값을 적용해야 하므로 이전 값 가져오기
      const previousHate = queryClient.getQueryData(["hotReview"]);

      queryClient.setQueryData(["hotReview"], (old) => {
        const index = old.data.reviewInfos.findIndex(
          (review) => review.reviewId === reviewId
        );
        if (!old) return;

        const updatedReviewInfos = [...old.data.reviewInfos];

        updatedReviewInfos[index] = {
          ...updatedReviewInfos[index],
          ThearDownCount: !updatedReviewInfos[index].isThearDown
            ? updatedReviewInfos[index].ThearDownCount + 1
            : updatedReviewInfos[index].ThearDownCount - 1,
          isThearDown: !updatedReviewInfos[index].isThearDown,
        };

        return {
          ...old,
          data: {
            ...old.data,
            reviewInfos: updatedReviewInfos,
          },
        };
      });
      return { previousHate };
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData(["hotReview"], context.previousHate);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["hotReview"] });
    },
  });
};
