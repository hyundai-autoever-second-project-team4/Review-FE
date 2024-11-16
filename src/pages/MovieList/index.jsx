import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  BottomMargin,
  CardWrapper,
  Container,
  EveryContainer,
  Title,
  TitleWrap,
} from "./MovieListStyle";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Vite 환경 변수에서 API 키를 가져옴
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"; // 이미지 베이스 URL

const fetchMovies = async ({ urlType, pagination }) => {
  const apiUrl = `https://api.themoviedb.org/3/movie/${urlType}?api_key=${apiKey}&language=ko-KR&page=${pagination}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

function MovieList() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1); // 페이지 상태 추가

  const urlType = type === "nowPlaying" ? "now_playing" : "popular"; // URL 타입 결정

  // React Query로 데이터 fetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", urlType, pagination],
    queryFn: () => fetchMovies({ urlType, pagination }),
    keepPreviousData: true, // 페이지네이션 시 이전 데이터 유지
  });

  // urlType이 변경될 때 pagination 초기화
  useEffect(() => {
    setPagination(1);
  }, [urlType]);

  const movies = data?.results || [];
  const totalPages = data ? (type === "nowPlaying" ? 50 : 100) : 0; // data가 없으면 0, 있으면 type에 따라 50 또는 100

  const handlePageChange = (event, value) => {
    setPagination(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  const smoothScrollTo = (targetY, duration) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // 0에서 1까지의 비율

      // easeInOutQuad easing function
      const easing = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      window.scrollTo(0, startY + distance * easing(progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll); // 애니메이션 계속 진행
      }
    };

    requestAnimationFrame(animateScroll); // 애니메이션 시작
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <EveryContainer>
      <TitleWrap>
        <Title>{type === "nowPlaying" ? "현재상영작" : "인기영화"}</Title>
      </TitleWrap>
      <Container>
        {movies.map((movie) => (
          <CardWrapper key={movie.id}>
            <MovieCard
              onClick={() => navigate(`/movieDetail/${movie.id}`)}
              title={movie.title}
              poster={
                movie.poster_path
                  ? IMG_BASE_URL + movie.poster_path
                  : "/images/no_img.png"
              }
              year={movie.release_date}
              country={movie.original_language}
              genre={movie.genre_ids}
            />
          </CardWrapper>
        ))}
      </Container>
      <Pagination
        count={totalPages} // 총 페이지 수
        page={pagination} // 현재 페이지
        onChange={handlePageChange} // 페이지 변경 핸들러
        siblingCount={5} // 현재 페이지 양쪽에 보여줄 버튼 수
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#F2B705",
          },
        }}
      />
      <BottomMargin />
    </EveryContainer>
  );
}

export default MovieList;
