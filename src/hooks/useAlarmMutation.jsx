import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAlram } from "../api/api";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAlarmMutation = () => {
  const { refetch } = useGetUserInfo();

  return useMutation({
    mutationFn: (alarmId) => readAlram(alarmId),
    onSuccess: () => {
      refetch();
    },
  });
};
