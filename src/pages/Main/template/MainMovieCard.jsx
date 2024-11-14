import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1.5;
  border-radius: ${theme.borderRadius.md};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 4px;
`;
const Title = styled.p`
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.black};
  margin: 4px 0;
`;
const Data = styled.p`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  margin: 4px 0;
`;
// const Genre = styled.p`
//   font-size: ${theme.fontSizes.sub2};
//   font-weight: ${theme.fontWeight.regular};
//   color: ${theme.colors.gray3};
//   margin: 4px 0;
// `;

const Number = styled.div`
  width: 30px;
  height: 38px;
  font-size: 20px;

  @media (max-width: 960px) {
    width: 25px;
    height: 32px;
    font-size: 16px;
  }

  @media (max-width: 640px) {
    width: 22px;
    height: 28px;
    font-size: 14px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${theme.borderRadius.sm};
  top: 10px;
  left: 10px;
`;

const DB_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"; // 이미지 베이스 URL

function MainMovieCard({ movieId, title, poster, year, country, index }) {
  const navigate = useNavigate();

  const formattedYear = year ? year.substring(0, 4) : "";

  const handleOnClick = () => {
    navigate(`/movieDetail/${movieId}`);
  };

  return (
    <>
      <Container onClick={handleOnClick}>
        <Number>{index + 1}</Number>
        <Poster src={`https://image.tmdb.org/t/p/w500${poster}`} />
        <Info>
          <Title>{title}</Title>
          <Data>
            {formattedYear} • {country}
          </Data>
        </Info>
      </Container>
    </>
  );
}

export default MainMovieCard;
