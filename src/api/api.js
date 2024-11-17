import { axiosInstance } from "./axiosInstance";

// 유저 정보
export const getUserInfo = async () => {
  return await axiosInstance.get("/member");
};

export const getUserMyPage = async () => {
  return await axiosInstance.get("/member/mypage");
};

export const getOtherUserPage = async (memberId) => {
  return await axiosInstance.get(`/member/${memberId}/mypage`);
};

export const getUserReview = async (memberId, type, page) => {
  return await axiosInstance.get(`/member/${memberId}/reviews`, {
    params: { type, page },
  });
};

export const editUserInfo = async (data) => {
  return await axiosInstance.put(`/member/update`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getBadgeCnt = async () => {
  return await axiosInstance.get("/badges");
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

// 영화 상세 정보
export const getMovieDetail = async (movieId) => {
  return await axiosInstance.get(`/movie/${movieId}`);
};

export const getMovieReviewList = async (movieId, type, page) => {
  return await axiosInstance.get(
    `/movie/${movieId}/reviews?type=${type}&page=${page - 1}`
  );
};

//검색페이지
export const getSearchTitle = async (data) => {
  return await axiosInstance.get(`/search/movie`, { params: data });
};

export const getSearchGenre = async (data) => {
  return await axiosInstance.get(`/search/genre`, { params: data });
};

export const getReviewDetail = async (reviewId) => {
  return await axiosInstance.get(`/review/${reviewId}`);
};

export const getCommentList = async (reviewId, page) => {
  return await axiosInstance.get(`/${reviewId}/comments?page=${page - 1}`);
};

// 리뷰

export const deleteReview = async (reviewId) => {
  return await axiosInstance.delete(`/review/${reviewId}`);
};
