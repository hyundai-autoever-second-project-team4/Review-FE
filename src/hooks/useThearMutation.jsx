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
      await queryClient.cancelQueries(querykeyType);
      const previousData = queryClient.getQueryData(querykeyType);

      queryClient.setQueryData(querykeyType, (old) => {
        if (!old) return;

        let reviewInfos;
        const mainQueryKey = querykeyType[0]; // queryKey의 첫 번째 요소를 사용하여 판단

        if (mainQueryKey === "hotReview") {
          reviewInfos = old.data.reviewInfos;
        } else if (
          mainQueryKey === "userDetail" ||
          mainQueryKey === "movieDetail"
        ) {
          reviewInfos = old.data.reviewInfoList.reviewInfos;
        } else if (
          mainQueryKey === "reviews" ||
          mainQueryKey === "userReviews"
        ) {
          reviewInfos = old.data.reviewInfos.content;
        }

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
            ...(mainQueryKey === "hotReview"
              ? { reviewInfos: updatedReviewInfos }
              : mainQueryKey === "reviews" || mainQueryKey === "userReviews"
              ? { reviewInfos: { content: updatedReviewInfos } }
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
      queryClient.setQueryData(querykeyType, context.previousData);
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: querykeyType });
    },
  });
};
