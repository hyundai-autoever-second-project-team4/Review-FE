import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from '@mui/material/Pagination';
import styled from "styled-components";
import theme from "../../styles/theme";
import { useLocation } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* align-items: center; */
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
  }
`;

const Title = styled.div`
  display: flex;
  font-size:20px;
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
`
//탭
const TabContainer = styled.div`
  width: 1224px;
  margin: 0 40px 0 40px;
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

function Search() {
  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("query");

  const [tab, setTab] = useState(1);
  const handleTabClick = (tabIndex) => {
    setTab(tabIndex);
  };

  return (
    <>
      <KeywordBar><Title>"{searchKeyword}"의 검색결과</Title></KeywordBar>
      <Container>
      <TabContainer>
          <TabTextWrap>
            <TabText onClick={() => handleTabClick(1)} $isClicked={tab == 1}>
              제목
            </TabText>
            <TabText onClick={() => handleTabClick(2)} $isClicked={tab == 2}>
              장르
            </TabText>
          </TabTextWrap>
      </TabContainer>  

      <MovieContainer>
        {movieData.map((movie, index) => (
          <CardWrapper key={index}>
            <MovieCard
              title={movie.title}
              poster={movie.img}
              year={movie.year}
              country={movie.country}
              // genre={movie.genre}
            />
          </CardWrapper>
        ))}
      </MovieContainer>

      </Container>
      <Pagination count={10}  sx={{ ".MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#F2B705",  
      },}} 
      />
      
  

    
    </>
  );
}

export default Search;
