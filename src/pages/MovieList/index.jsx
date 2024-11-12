import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from '@mui/material/Pagination';
import styled from "styled-components";
import theme from "../../styles/theme";
import { useParams } from "react-router-dom";



const Title = styled.div`
display: flex;
font-size:28px;
font-weight: ${theme.fontWeight.bold};
color: ${theme.colors.black};
`;

const TitleWrap = styled.div`
  display: flex;
  width: 1320px;
  justify-items: flex-start;
  align-items: flex-start;
  margin: 32px 0 16px 0;
  @media (max-width: 1320px) {
    width: 90%;
  }
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1320px;
  margin: 20px 0 0 0;
  gap: 16px 16px;

  @media (max-width: 1320px) {
    width: 90%;
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
    img: "https://i.namu.wiki/i/AzwNiCjLoso4kGNVLOaOXMAomI2hn_44R4NiDfCb1y2fy-z_GvZy_hnvWhh-bxQnGgXcXlhWIpufoZA6wfDz9g.webp",
    title: "인시디어스:빨간문",
    year: 2024,
    country: "미국",
    genre: ["공포", "호러"],
  },

  ...Array(9).fill({
    img: "https://i.namu.wiki/i/AzwNiCjLoso4kGNVLOaOXMAomI2hn_44R4NiDfCb1y2fy-z_GvZy_hnvWhh-bxQnGgXcXlhWIpufoZA6wfDz9g.webp",
    title: "인시디어스:빨간문",
    year: 2024,
    country: "미국",
    genre: ["공포", "호러"],
  }),
];
function MovieList() {
  const {type} = useParams();
  console.log(type)
  
  
  return (
    <>
      <TitleWrap>
        <Title>{type==='nowPlaying'? '현재상영작' : '인기영화'}</Title>
      </TitleWrap>
      <Container>

        {movieData.map((movie, index) => (
          <CardWrapper key={index}>
            <MovieCard
              title={movie.title}
              poster={movie.img}
              year={movie.year}
              country={movie.country}
              genre={movie.genre}
            />
          </CardWrapper>
        ))}
      </Container>
      
      
      <Pagination count={10}  sx={{ ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#F2B705",  
            },}} 
      />
      
    </>
  );
}

export default MovieList;
