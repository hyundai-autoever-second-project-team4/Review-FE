import { axiosInstance } from "./axiosInstance";

export const getUserInfo = async () => {
  return await axiosInstance.get("/member");
};

export const fetchUserRecommendMovies = async () => {
  const response = await axiosInstance.get("/movie/recommend");
  return response.data.movies;
};

export const fetchTopRatedMovies = async () => {
  const response = await axiosInstance.get("/movie/top-rated/weekly");
  return response.data.movies;
};

export const fetchTopReviewedMovies = async () => {
  const response = await axiosInstance.get("/movie/honor-board");
  return response.data.movies;
};

export const fetchHotReview = async () => {
  const response = await axiosInstance.get("/review/hot");
  return response.data.reviewInfos;
};

export const fetchThearupHonorMovies = async () => {
  const response = await axiosInstance.get("/movie/most-reviewed/weekly");
  return response.data.movies;
};
