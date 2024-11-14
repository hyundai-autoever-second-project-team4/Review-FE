import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import countryMapping from "./CountryMapping";

const Container = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const Poster = styled.img`
  width: 120px;
  height: 180px;
  border-radius: ${theme.borderRadius.md};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 180px;
  border-bottom: 1px solid ${theme.colors.gray2};
  width: 100%;
`;

const Title = styled.h4`
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
const Genre = styled.p`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  margin: 4px 0;
`;

const genreMapping = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "공포",
  10402: "음악",
  9648: "미스터리",
  10749: "로맨스",
  878: "SF",
  10770: "TV 영화",
  53: "스릴러",
  10752: "전쟁",
  37: "서부",
};

function MovieCard({ title, poster, year, country, genre, onClick }) {
  const genreNames = genre
    ? genre.map((id) => genreMapping[id]).filter((name) => name)
    : [];

  const countryName = country ? countryMapping[country] : null;

  const formattedYear = year ? year.substring(0, 4) + "년" : "";

  return (
    <>
      <Container onClick={onClick}>
        <Poster src={poster} />
        <Info>
          <Title>{title}</Title>
          <Data>
            {formattedYear} • {countryName}
          </Data>
          {genreNames.length > 0 && <Genre>{genreNames.join(" / ")}</Genre>}
        </Info>
      </Container>
    </>
  );
}

export default MovieCard;
