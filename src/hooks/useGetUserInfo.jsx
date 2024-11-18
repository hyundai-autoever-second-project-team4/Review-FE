import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/api";
import { getCookie, getRefresh } from "../api/cookie";

export const useGetUserInfo = () => {
  const queryKey = ["userInfo"];

  const queryFn = async () => {
    if (getCookie() !== null && getRefresh() !== null) {
      const response = await getUserInfo();
      return response.data;
    }
    throw new Error("Missing parameters");
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: getCookie() !== null && getRefresh() !== null,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};
