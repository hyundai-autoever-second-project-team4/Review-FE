import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
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

function MovieList() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(1); // 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태 추가

  const urlType = type === "nowPlaying" ? "now_playing" : "popular"; // URL 타입 결정

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://api.themoviedb.org/3/movie/${urlType}?api_key=${apiKey}&language=ko-KR&page=${pagination}`;
        const response = await axios.get(apiUrl);
        setMovies(response.data.results); // 영화 데이터 설정
        setTotalPages(response.data.total_pages); // 총 페이지 수 설정
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [urlType, pagination]); // urlType과 pagination이 변경될 때마다 호출

  useEffect(() => {
    setPagination(1); // urlType이 변경될 때 pagination을 1로 설정
  }, [urlType]);

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
              poster={IMG_BASE_URL + movie.poster_path}
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
