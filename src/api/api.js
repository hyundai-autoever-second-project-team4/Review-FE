import { axiosInstance } from "./axiosInstance";

export const getUserInfo = async () => {
  return await axiosInstance.get("/member");
};

export const postThearUp = async (id) => {
  return await axiosInstance.post(`/thearup/${id}`);
};

export const postThearDown = async (id) => {
  return await axiosInstance.post(`/theardown/${id}`);
};
