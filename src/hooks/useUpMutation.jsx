import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThearUp } from "../api/api";

export const useUpMutation = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postThearUp(reviewId),
    onMutate: async () => {
      // 요청 보내는도중 새로운 요청이 들어왔을 때 기존 요청 취소
      await queryClient.cancelQueries(["hotReview"]);

      // 요청 실패시 이전 데이터값을 적용해야 하므로 이전 값 가져오기
      const previousLiked = queryClient.getQueryData(["hotReview"]);

      queryClient.setQueryData(["hotReview"], (old) => {
        console.log(old);
        if (!old) return;
        return {
          ...old,
          data: {
            ...old.data,
            totalLikeHeart: old.data.totalLikeHeart
              ? old.data.totalLikeHeart - 1
              : old.datatotalLikeHeart + 1,
            myLikeHeart: !old.data.myLikeHeart,
          },
        };
      });
      return { previousLiked };
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData(["hotReview"], context.previousLiked);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["hotReview"] });
    },
  });
};
