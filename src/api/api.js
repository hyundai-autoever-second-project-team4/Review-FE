import { axiosInstance } from "./axiosInstance";

export const getUserInfo = async () => {
  return await axiosInstance.get("/member");
};
