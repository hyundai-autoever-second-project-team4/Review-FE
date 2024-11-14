import { axiosInstance } from "./axiosInstance";

export const getUserInfo = async () => {
  return await axiosInstance.get("/member");
};

export const getUserRecommendMovies = async () => {
  const response = await axiosInstance.get("/movie/recommend");
  return response.data.movies;
};

export const getTopRatedMovies = async () => {
  const response = await axiosInstance.get("/movie/top-rated/weekly");
  return response.data.movies;
};

export const getTopReviewedMovies = async () => {
  const response = await axiosInstance.get("/movie/honor-board");
  return response.data.movies;
};

export const getHotReview = async () => {
  const response = await axiosInstance.get("/review/hot");
  return response.data.reviewInfos;
};

export const getThearupHonorMovies = async () => {
  const response = await axiosInstance.get("/movie/most-reviewed/weekly");
  return response.data.movies;
};
