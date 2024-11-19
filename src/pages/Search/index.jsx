import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton, Tab, Tabs } from "@mui/material";
import { BottomMargin } from "../MovieList/MovieListStyle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSearchTitle, getSearchGenre } from "../../api/api";
import { CircularProgress } from "@mui/material";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { smoothScrollTo } from "../../utils/smoothScrollTop";
import MetaTag from "../../MetaTag/MetaTag";

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

  const queryClient = useQueryClient(); //다음 페이지 prefetch
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

  //탭에 따라서 다음 페이지를 미리 prefetch
  useEffect(() => {
    const nextPage = page + 1;

    if (tab === 0) {
      queryClient.prefetchQuery({
        queryKey: ["searchTitle", nextPage, query],
        queryFn: () =>
          getSearchTitle({
            title: query,
            page: nextPage - 1,
          }),
      });
    } else if (tab === 1) {
      queryClient.prefetchQuery({
        queryKey: ["searchGenre", nextPage, query],
        queryFn: () =>
          getSearchGenre({
            genre: query,
            page: nextPage - 1,
          }),
      });
    }
  }, [queryClient, tab, page, query]);

  useEffect(() => {
    setQuery(searchKeyword || "");
    setTab(0);
  }, [searchKeyword]);

  useEffect(() => {
    setPage(1); // 첫 번째 페이지로 초기화
  }, [tab, query]);

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  const handleTabClick = (event, newValue) => {
    setTab(newValue); // newValue를 사용하여 탭 인덱스를 업데이트
    setPage(1);
  };

  if (Titleloading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              ".MuiCircularProgress-circle": { color: theme.colors.primary },
              color: "#f2b705",
            }}
          />
        </div>
      </>
    );
  }

  if (Genreloading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              ".MuiCircularProgress-circle": { color: theme.colors.primary },
              color: "#f2b705",
            }}
          />
        </div>
      </>
    );
  }

  if (titleError) {
    return <p>error</p>;
  }
  // console.log(titleData);
  // console.log(genreData);
  return (
    <>
      <MetaTag
        title={searchKeyword + " 검색"}
        description={searchKeyword + " 검색 페이지"}
        imgsrc={"https://theaterup.site/ThearUpImg.png"}
        url={`https://theaterup.site/search/${searchKeyword}`}
        original={true}
      />
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
      <CustomPagination
        page={page}
        count={
          tab === 0 ? titleData?.data?.totalPages : genreData?.data?.totalPages
        }
        onChange={handlePageChange}
      />
      <BottomMargin />
    </>
  );
}

export default Search;
