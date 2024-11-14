import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThearUp } from "../api/api";

export const useUpMutation = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postThearUp(reviewId),
    onMutate: async () => {},
  });
};
