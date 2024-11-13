import React from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../../styles/theme";
import MovieSlider from "./MovieSlider";

const wingFlapRight = keyframes`
  0% {
    transform: translateY(0) rotate(5deg);
  }
  50% {
    transform: translateY(-15px) rotate(-7deg);
  }

  100% {
    transform: translateY(0) rotate(5deg);
  }`;

const wingFlapLeft = keyframes`
0% {
  transform: translateY(0) rotate(-5deg);
}
50% {
  transform: translateY(-15px) rotate(7deg);
}

100% {
  transform: translateY(0) rotate(-5deg);
}`;

const upDown = keyframes`
  0% {
    transform: translateY(0) ;
  }
  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }`;

const Container = styled.div`
  margin-top: 60px;
  padding: 20px;
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
  }
`;

const MovieAwardsContainer = styled.div`
  height: 700px;

  @media (max-width: 960px) {
    height: 600px;
  }

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f2e205, ${theme.colors.primary});
`;

const WingWrapper = styled.div`
  position: relative;
  /* margin-bottom: 20px; */
`;

const MovieAwardsText = styled.p`
  font-size: 48px;
  font-weight: ${theme.fontWeight.header};
  width: 100%;
  text-align: center;

  margin-bottom: 40px;
`;

const LeftWing = styled.img`
  position: absolute;
  top: -70px;
  width: 73px;
  height: 145px;
  left: -78px;
  animation: ${wingFlapLeft} 2s ease-in-out infinite;
`;

const RightWing = styled.img`
  position: absolute;
  top: -70px;
  width: 73px;
  height: 145px;
  right: -78px;
  animation: ${wingFlapRight} 2s ease-in-out infinite;
`;

const LogoImg = styled.img`
  animation: ${upDown} 4s ease-in-out infinite;
`;

function MovieAwards({ movieData }) {
  return (
    <MovieAwardsContainer>
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LogoImg src="/src/assets/svg/svgLogo.svg" alt="" width={240} />
        <WingWrapper>
          <LeftWing src="/src/assets/images/왼.png" />
          <RightWing src="/src/assets/images/오.png" />
          <MovieAwardsText>명예의 전당</MovieAwardsText>
        </WingWrapper>
        <Container style={{ marginTop: "0px" }}>
          <MovieSlider movieData={movieData} cnt={4} />
        </Container>
      </div>
    </MovieAwardsContainer>
  );
}

export default MovieAwards;
