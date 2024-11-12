import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";

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
  height: calc(100% * 1.5);
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

function MainMovieCard({
  title,
  poster,
  year,
  country,
  genre,
  index,
  onClick,
}) {
  return (
    <>
      <Container onClick={onClick}>
        <Number>{index + 1}</Number>
        <Poster src={poster} />
        <Info>
          <Title>{title}</Title>
          <Data>
            {year} • {country}
          </Data>
          {/* {genre && genre.length > 0 && <Genre>{genre.join(" / ")}</Genre>} */}
        </Info>
      </Container>
    </>
  );
}

export default MainMovieCard;
