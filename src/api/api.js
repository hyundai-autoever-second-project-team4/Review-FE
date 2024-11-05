import { axiosInstance } from "./axiosInstance";

export const login = async (data) => {
  return await axiosInstance.post("/api/user/login", data);
};

export const getPostingList = async (data) => {
  return await axiosInstance.get(
    `api/posting/search?nationCode=${
      data.nationCode === undefined ? null : data.nationCode
    }&cityCode=${
      data.cityCode === undefined ? null : data.cityCode
    }&writerNickname=${
      data.writerNickname === undefined ? null : data.writerNickname
    }&title=${data.title === undefined ? null : data.title}&page=${
      data.page === undefined ? 1 : data.page
    }`
  );
};
