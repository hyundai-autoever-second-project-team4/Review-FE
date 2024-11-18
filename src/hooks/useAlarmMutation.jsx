import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAlram } from "../api/api";

export const useAlarmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alarmId) => readAlram(alarmId),
    onSuccess: () => {
      queryClient.invalidateQueries([userInfo]);
    },
  });
};
