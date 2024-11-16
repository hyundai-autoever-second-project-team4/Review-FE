import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { BottomMargin } from "../MovieList/MovieListStyle";
import { useQuery } from "@tanstack/react-query";
import { getSearchTitle, getSearchGenre } from "../../api/api";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"; // 이미지 베이스 URL

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* align-items: center; */
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
  }
  margin-bottom: 40px;
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  width: 1320px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.black};
  @media (max-width: 1320px) {
    width: 90%;
  }
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1320px;
  margin: 20px 0 0 0;
  gap: 16px 16px;
  padding-left: 16px;
  padding-right: 16px;

  @media (max-width: 1320px) {
    width: 90%;
  }
`;

const KeywordBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: linear-gradient(
    to right,
    ${theme.colors.primaryColor3},
    ${theme.colors.primary}
  );

  @media (max-width: 1320px) {
    width: 100%;
  }
`;
//탭
const TabContainer = styled.div`
  width: 1320px;
  margin: 0 40px 0 40px;
  @media (max-width: 1320px) {
    width: 100%;
    margin: 0;
  }
`;

const TabTextWrap = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
`;

const TabText = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 56px;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${(props) =>
    props.$isClicked ? theme.fontWeight.bold : theme.fontWeight.regular};
  border-bottom: ${(props) =>
    props.$isClicked
      ? "2px solid" + theme.colors.black
      : "2px solid transparent"};
  &:hover {
    font-weight: ${theme.fontWeight.bold};
    border-bottom: 2px solid ${theme.colors.black};
  }
`;

const CardWrapper = styled.div`
  flex-basis: calc((100% - 32px) / 3); /* 기본 너비 설정 */
  /* 작은 화면일 때 카드 크기 변경 */
  @media (max-width: 960px) {
    flex-basis: calc((100% - 16px) / 2); /* 화면 너비가 768px 이하일 때 2열 */
  }
  @media (max-width: 640px) {
    flex-basis: 100%; /* 화면 너비가 480px 이하일 때 1열 */
  }
`;

const movieData = [
  {
    adult: false,
    backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    genre_ids: [878, 28, 12],
    id: 912649,
    original_language: "en",
    original_title: "Venom: The Last Dance",
    overview:
      "환상의 케미스트리의 에디 브록과 그의 심비오트 베놈은 그들을 노리는 정체불명 존재의 추격을 피해 같이 도망을 다니게 된다. 한편 베놈의 창조자 널은 고향 행성에서부터 그들을 찾아내기 위해 지구를 침략하고 에디와 베놈은 그동안 겪어보지 못한 최악의 위기를 맞이하게 되는데…",
    popularity: 3930.216,
    posterPath: "/3flIDcZF3tnR7m5OU2h7lLPQwmr.jpg",
    releaseDate: "2024-10-22",
    title: "베놈: 라스트 댄스",
    video: false,
    vote_average: 6.395,
    vote_count: 663,
  },
  {
    adult: false,
    backdrop_path: "/18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg",
    genre_ids: [27, 53, 9648],
    id: 1034541,
    original_language: "en",
    original_title: "Terrifier 3",
    overview:
      '"아트 더 클라운"이 크리스마스 이브에 평화롭게 잠든 "마일스 카운티"의 주민들을 향해 혼돈을 일으키려 한다',
    popularity: 3304.003,
    posterPath: "/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg",
    releaseDate: "2024-10-09",
    title: "테리파이어 3",
    video: false,
    vote_average: 6.9,
    vote_count: 898,
  },
  {
    adult: false,
    backdrop_path: "/v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg",
    genre_ids: [16, 878, 10751],
    id: 1184918,
    original_language: "en",
    original_title: "The Wild Robot",
    overview:
      "우연한 사고로 거대한 야생에 불시착한 로봇 로즈는 주변 동물들의 행동을 배우며 낯선 환경 속에 적응해 가던 중, 사고로 세상에 홀로 남겨진 아기 기러기 브라이트빌의 보호자가 된다. 로즈는 입력되어 있지 않은 새로운 역할과 관계에 낯선 감정을 마주하고 겨울이 오기 전에 남쪽으로 떠나야 하는 브라이트빌을 위해 동물들의 도움을 받아 이주를 위한 생존 기술을 가르쳐준다. 그러나 선천적으로 몸집이 작은 브라이트빌은 짧은 비행도 힘겨워 하는데...",
    popularity: 2214.674,
    posterPath: "/8dkuf9IuVh0VZjDTk7kAY67lU0U.jpg",
    releaseDate: "2024-09-12",
    title: "와일드 로봇",
    video: false,
    vote_average: 8.5,
    vote_count: 2735,
  },
];

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("query");
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchKeyword || "");
  const [page, setPage] = useState(1);
  const [titleSearchData, setTitleSearchData] = useState(null);
  const [genreSearchData, setGenreSearchData] = useState(null);
  const [tab, setTab] = useState(0);

  const {
    data: titleData,
    isLoading: Titleloading,
    refetch: refetchTitle,
    error: titleError,
  } = useQuery({
    queryKey: ["searchTitle", page, query],
    queryFn: () =>
      getSearchTitle({
        title: query,
        page: page - 1,
      }),
    enabled: tab === 0 || page === 1,
  });

  const {
    data: genreData,
    isLoading: Genreloading,
    refetch: refetchGenre,
    error: genreError,
  } = useQuery({
    queryKey: ["searchGenre", page, query],
    queryFn: () =>
      getSearchGenre({
        genre: query,
        page: page - 1,
      }),
    enabled: tab === 1 || page === 1,
  });

  useEffect(() => {
    setQuery(searchKeyword || "");
  }, [searchKeyword]);

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  const handleTabClick = (event, newValue) => {
    setTab(newValue); // newValue를 사용하여 탭 인덱스를 업데이트
    setPage(1);
  };

  if (Titleloading) {
    return <p>Loading...</p>;
  }

  if (titleError) {
    return <p>error</p>;
  }
  console.log(titleData);
  console.log(genreData);
  return (
    <>
      <KeywordBar>
        <Title>"{searchKeyword}"의 검색결과</Title>
      </KeywordBar>
      <Container>
        <TabContainer>
          <Tabs
            value={tab}
            onChange={handleTabClick}
            textColor="inherit"
            sx={{
              "& .MuiTab-root": { color: "#1E293B" }, // Set default color for tabs
              "& .Mui-selected": { color: "#1E293B" },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1E293B", // indicator 색상 설정
              },
              fontFamily: "Noto Sans KR",
            }}
          >
            <Tab
              value={0}
              label="제목"
              sx={{
                fontWeight: tab === 0 ? "bold" : "normal",
                fontFamily: "Noto Sans KR",
                fontSize: "20px",
              }}
            />
            <Tab
              value={1}
              label="장르"
              sx={{
                fontWeight: tab === 1 ? "bold" : "normal",
                fontFamily: "Noto Sans KR",
                fontSize: "20px",
              }}
            />
          </Tabs>
        </TabContainer>

        <MovieContainer>
          {tab === 0 &&
            (titleData?.data?.content?.length > 0 ? (
              titleData.data.content.map((movie, index) => (
                <CardWrapper key={index}>
                  <MovieCard
                    onClick={() => navigate(`/movieDetail/${movie.movieId}`)}
                    title={movie.title}
                    poster={IMG_BASE_URL + movie.posterPath}
                    year={movie.releaseDate}
                    country={movie.originCountry}
                    genre={movie.genre_ids}
                    isSearch
                  />
                </CardWrapper>
              ))
            ) : (
              <div>검색 결과가 없습니다.</div>
            ))}

          {tab === 1 &&
            (genreData?.data?.content?.length > 0 ? (
              genreData.data.content.map((movie, index) => (
                <CardWrapper key={index}>
                  <MovieCard
                    onClick={() => navigate(`/movieDetail/${movie.movieId}`)}
                    title={movie.title}
                    poster={IMG_BASE_URL + movie.posterPath}
                    year={movie.releaseDate}
                    country={movie.originCountry}
                    genre={movie.genre_ids}
                    isSearch
                  />
                </CardWrapper>
              ))
            ) : (
              <p>해당 장르는 존재하지 않습니다.</p>
            ))}
        </MovieContainer>
      </Container>
      <Pagination
        page={page}
        count={
          tab === 0 ? titleData?.data?.totalPages : genreData?.data?.totalPages
        }
        onChange={handlePageChange}
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#F2B705",
          },
        }}
      />
      <BottomMargin />
    </>
  );
}

export default Search;
