import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

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

function MovieCard({ title, poster, year, country, genre }) {
  return (
    <>
      <Container>
        <Poster src={poster} />
        <Info>
          <Title>{title}</Title>
          <Data>
            {year} • {country}
          </Data>
          {genre && genre.length > 0 && <Genre>{genre.join(" / ")}</Genre>}
        </Info>
      </Container>
    </>
  );
}

export default MovieCard;
