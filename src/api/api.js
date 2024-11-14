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

export const getUserRecommendMovies = async () => {
  return await axiosInstance.get("/movie/recommend");
};

export const getTopRatedMovies = async () => {
  return await axiosInstance.get("/movie/top-rated/weekly");
};

export const getTopReviewedMovies = async () => {
  return await axiosInstance.get("/movie/honor-board");
};

export const getHotReview = async () => {
  return await axiosInstance.get("/review/hot");
};

export const getThearupHonorMovies = async () => {
  return await axiosInstance.get("/movie/most-reviewed/weekly");
};
