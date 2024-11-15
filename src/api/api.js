import { axiosInstance } from "./axiosInstance";

// 유저 정보
export const getUserInfo = async () => {
  return await axiosInstance.get("/member");
};

export const getUserMyPage = async () => {
  return await axiosInstance.get("/member/mypage");
};

// UP & DOWN
export const postThearUp = async (id) => {
  return await axiosInstance.post(`/thearup/${id}`);
};

export const postThearDown = async (id) => {
  return await axiosInstance.post(`/theardown/${id}`);
};

// Main
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

//랭킹 페이지 함수
export const getRankingData = async (endpoint, page) => {
  return await axiosInstance.get(`/ranking/${endpoint}`, {
    params: { page: page - 1 }, // page를 쿼리 파라미터로 추가
  });
};
