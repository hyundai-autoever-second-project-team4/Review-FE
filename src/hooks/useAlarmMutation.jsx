import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAlram } from "../api/api";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAlarmMutation = () => {
  const { refetch } = useGetUserInfo();
  const queryClient = useQueryClient();
  const queryKey = ["userInfo"];

  return useMutation({
    mutationFn: (alarmId) => readAlram(alarmId),
    onMutate: async (alarmId) => {
      await queryClient.cancelQueries(queryKey);
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return;

        const filteredAlarms = old.alarms.filter(
          (alarm) => alarm.id !== alarmId
        );

        return {
          ...old,
          alarms: filteredAlarms,
        };
      });
      return { previousData };
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error, alarmId, context) => {
      queryClient.setQueryData(queryKey, context.previousData);
    },
  });
};
