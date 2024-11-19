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

        const mainQueryKey = querykeyType[0]; // queryKey의 첫 번째 요소를 사용하여 판단
        const field = actionType === "up" ? "ThearUpCount" : "ThearDownCount";
        const flagField = actionType === "up" ? "isThearUp" : "isThearDown";

        if (mainQueryKey === "reviewDetail") {
          const reviewInfo = old.data.reviewInfo;
          let updateReviewInfo = { ...reviewInfo };

          updateReviewInfo = {
            ...updateReviewInfo,
            [field]: !updateReviewInfo[flagField]
              ? updateReviewInfo[field] + 1
              : updateReviewInfo[field] - 1,
            [flagField]: !updateReviewInfo[flagField],
          };

          return {
            ...old,
            data: {
              ...old.data,
              reviewInfo: updateReviewInfo,
            },
          };
        }

        let reviewInfos;
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
    onError: (err, context) => {
      queryClient.setQueryData(querykeyType, context.previousData);
      console.log(err);
    },
    onSettled: () => {
      const mainQueryKey = querykeyType[0];
      if (mainQueryKey !== "movieDetail")
        // 일단 바로 갱신 막기
        queryClient.invalidateQueries({ queryKey: querykeyType });
    },
  });
};
