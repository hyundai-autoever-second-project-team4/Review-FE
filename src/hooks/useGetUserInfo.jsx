import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/api";

export const useGetUserInfo = () => {
  const queryKey = ["userInfo"];

  const queryFn = async () => {
    if (getUserInfo("accessToken")) {
      const response = await getUserInfo();
      return response.data;
    }
    throw new Error("Missing parameters");
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!getUserInfo("accessToken"),
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
