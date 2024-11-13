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

const BackPoster = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
  filter: blur(2px);
`;

const Poster = styled.img`
  width: 40%;
  aspect-ratio: 1 / 1.5;
`;

const Blur = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  border-radius: ${theme.borderRadius.md};
  opacity: 0.5;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: ${theme.fontWeight.bold};
  color: #fff;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -20%;

  @media (max-width: 960px) {
    font-size: 18px;
    padding-top: 6px;
    bottom: -22%;
  }

  @media (max-width: 640px) {
    font-size: 14px;
    padding-top: 4px;
    bottom: -24%;
  }
`;
const Tag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 16px;
  font-weight: ${theme.fontWeight.bold};
  color: white;
  background-color: black;
  padding: 8px 12px;
  border-radius: 4px;

  @media (max-width: 960px) {
    font-size: 14px;
    padding: 6px 9px;
    top: 10px;
    left: 10px;
  }

  @media (max-width: 640px) {
    font-size: 12px;
    padding: 4px 6px;
    top: 6px;
    left: 6px;
  }
`;
function FaceMovieCard({ title, poster, onClick, type }) {
  return (
    <>
      <Container onClick={onClick}>
        <BackPoster src={poster} alt="" />
        <Blur />
        <InnerContainer>
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Poster src={poster} alt="" />
            <Title>{title}</Title>
          </div>
          <Tag>{type}</Tag>
        </InnerContainer>
      </Container>
    </>
  );
}

export default FaceMovieCard;
