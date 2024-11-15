import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThearUp, postThearDown } from "../api/api";

export const useThearMutation = (reviewId, querykeyType, actionType) => {
  const queryClient = useQueryClient();
  const mutationFn =
    actionType === "up"
      ? () => postThearUp(reviewId)
      : () => postThearDown(reviewId);

  return useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries([querykeyType]);
      const previousData = queryClient.getQueryData([querykeyType]);

      queryClient.setQueryData([querykeyType], (old) => {
        if (!old) return;

        let reviewInfos;
        if (querykeyType === "hotReview") reviewInfos = old.data.reviewInfos;
        else if (
          querykeyType === "userDetail" ||
          querykeyType === "movieDetail"
        )
          reviewInfos = old.data.reviewInfoList.reviewInfos;

        const index = reviewInfos.findIndex(
          (review) => review.reviewId === reviewId
        );

        if (index === -1) return old;

        const updatedReviewInfos = [...reviewInfos];
        const field = actionType === "up" ? "ThearUpCount" : "ThearDownCount";
        const flagField = actionType === "up" ? "isThearUp" : "isThearDown";

        updatedReviewInfos[index] = {
          ...updatedReviewInfos[index],
          [field]: !updatedReviewInfos[index][flagField]
            ? updatedReviewInfos[index][field] + 1
            : updatedReviewInfos[index][field] - 1,
          [flagField]: !updatedReviewInfos[index][flagField],
        };

        return {
          ...old,
          data: {
            ...old.data,
            ...(querykeyType === "hotReview"
              ? { reviewInfos: updatedReviewInfos }
              : {
                  reviewInfoList: {
                    reviewInfos: updatedReviewInfos,
                  },
                }),
          },
        };
      });

      return { previousData };
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData([querykeyType], context.previousData);
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [querykeyType] });
    },
  });
};
