import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "@mui/material/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BottomMargin,
  CardWrapper,
  Container,
  EveryContainer,
  Title,
  TitleWrap,
} from "./MovieListStyle";
import axios from "axios";
import { smoothScrollTo } from "../../utils/smoothScrollTop.js";
import MovieCardSkeleton from "../../components/MovieCard/MovieCardSkeleton.jsx";
import CustomPagination from "../../components/CustomPagination/CustomPagination.jsx";
import MetaTag from "../../MetaTag/MetaTag.jsx";

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
  const queryClient = useQueryClient();
  const urlType = type === "nowPlaying" ? "now_playing" : "popular"; // URL 타입 결정

  // React Query로 데이터 fetching
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", urlType, pagination],
    queryFn: () => fetchMovies({ urlType, pagination }),
    keepPreviousData: true, // 페이지네이션 시 이전 데이터 유지
    gcTime: 60000, // 너무 긴 시간은 브라우저에 부담이 될 것이라고 판단하여 짧게 설정
  });

  // urlType이 변경될 때 pagination 초기화
  useEffect(() => {
    setPagination(1);
  }, [urlType]);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["movies", urlType, pagination + 1],
      queryFn: () => fetchMovies({ urlType, pagination: pagination + 1 }),
    });
  }, [pagination]);

  const handlePageChange = (event, value) => {
    setPagination(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  if (isError) {
    return <div>Error: 데이터를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <EveryContainer>
      <MetaTag
        title={type === "nowPlaying" ? "현재상영작" : "인기영화"}
        description={type + " 목록 페이지"}
        imgsrc={"https://theaterup.site/ThearUpImg.png"}
        url={
          type === "nowPlaying"
            ? `https://theaterup.site/movieList/${type}`
            : `https://theaterup.site/movieList/${type}`
        }
        original={true}
      />
      <TitleWrap>
        <Title>{type === "nowPlaying" ? "현재상영작" : "인기영화"}</Title>
      </TitleWrap>
      <Container>
        {!isLoading
          ? data?.results.map((movie) => (
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
            ))
          : Array.from({ length: 20 }).map((_, index) => (
              <CardWrapper key={index}>
                <MovieCardSkeleton />
              </CardWrapper>
            ))}
      </Container>
      <CustomPagination
        count={data ? (type === "nowPlaying" ? 50 : 100) : 0} // 총 페이지 수
        page={pagination} // 현재 페이지
        onChange={handlePageChange} // 페이지 변경 핸들러
      />
      <BottomMargin />
    </EveryContainer>
  );
}

export default MovieList;
