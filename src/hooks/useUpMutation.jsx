import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThearUp } from "../api/api";

export const useUpMutation = (reviewId, querykeyType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postThearUp(reviewId),
    onMutate: async () => {
      // 요청 보내는도중 새로운 요청이 들어왔을 때 기존 요청 취소
      await queryClient.cancelQueries([querykeyType]);

      // 요청 실패시 이전 데이터값을 적용해야 하므로 이전 값 가져오기
      const previousLiked = queryClient.getQueryData([querykeyType]);
      if (querykeyType === "hotReview") {
        queryClient.setQueryData([querykeyType], (old) => {
          const index = old.data.reviewInfos.findIndex(
            (review) => review.reviewId === reviewId
          );
          if (!old) return;

          const updatedReviewInfos = [...old.data.reviewInfos];

          updatedReviewInfos[index] = {
            ...updatedReviewInfos[index],
            ThearUpCount: !updatedReviewInfos[index].isThearUp
              ? updatedReviewInfos[index].ThearUpCount + 1
              : updatedReviewInfos[index].ThearUpCount - 1,
            isThearUp: !updatedReviewInfos[index].isThearUp,
          };

          return {
            ...old,
            data: {
              ...old.data,
              reviewInfos: updatedReviewInfos,
            },
          };
        });
        return { previousLiked };
      }
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData([querykeyType], context.previousLiked);

      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [querykeyType] });
    },
  });
};
