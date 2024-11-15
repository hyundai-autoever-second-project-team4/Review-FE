import { useQuery } from "@tanstack/react-query";
import { getRankingData } from "../api/api";

export const useGetRanking = (tab, page) => {
  const queryKey = ["ranking", getEndpoint(tab), page];
  const queryFn = async () => {
    const response = await getRankingData(getEndpoint(tab), page);
    return response.data.memberRankings;
  };

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey,
    queryFn,
    keepPreviousData: true,
  });

  return { isLoading, isError, data, error, isSuccess, refetch };
};

export const getEndpoint = (tabIndex) => {
  switch (tabIndex) {
    case 0:
      return "total-score";
    case 1:
      return "review-count";
    case 2:
      return "up-count";
    case 3:
      return "comment-count";
    default:
      return "total-score";
  }
};
