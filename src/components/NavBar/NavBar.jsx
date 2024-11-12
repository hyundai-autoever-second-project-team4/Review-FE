import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import svgLogo from "/src/assets/svg/svgLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 60px;
  background-color: ${({ $variant }) =>
    $variant ? `${theme.colors.black}1C` : "#ffffff"};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;
const InerContainer = styled.div`
  display: flex;
  width: 1320px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1320px) {
    padding: 0 8px;
  }
`;
const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const NavItem = styled.a`
  font-size: 16px;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $variant }) => ($variant ? "#ffffff" : theme.colors.gray3)};
  text-shadow: ${({ $variant }) =>
    $variant && `0px 0px 4px rgba(0, 0, 0, 0.25);`};
  /* transition: color 0.3s ease; */

  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  @media (max-width: 960px) {
    width: 200px;
  }

  @media (max-width: 640px) {
    display: none;
  }
  transition: 0.3s;
  width: 500px;
  padding: 8px 16px 8px 36px;
  margin-right: 16px;
  border-radius: ${theme.borderRadius.sm};
  border: none;
  background-color: ${theme.colors.review};
  font-size: ${theme.fontSizes.sub1};
  opacity: ${({ $variant }) => $variant && `0.8`};

  &:focus {
    outline: none;
    border: none;
  }
`;
const StyledDynamicSvg = styled(DynamicSVG)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 640px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  opacity: ${({ $variant }) => $variant && `0.6`};
`;

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVariant, setIsVariant] = useState(false);

  useEffect(() => {
    setIsVariant(location.pathname.split("/")[1] === "movieDetail");
  }, [location]);

  const moveToMain = () => {
    navigate("/");
  };

  const moveToPlaying = () => {
    navigate("/movieList/nowPlaying");
  };

  const moveToPopular = () => {
    navigate("/movieList/popular");
  };

  const moveToRanking = () => {
    navigate("/ranking");
  };

  return (
    <Container $variant={isVariant}>
      <InerContainer>
        <LeftWrap>
          <img
            src={svgLogo}
            alt=""
            onClick={moveToMain}
            style={{ cursor: "pointer" }}
          />
          {/* <DynamicSVG svgUrl={svglogo} color={theme.colors.primary} /> */}
          <NavItem onClick={moveToPlaying} $variant={isVariant}>
            현재상영작
          </NavItem>
          <NavItem onClick={moveToPopular} $variant={isVariant}>
            인기영화
          </NavItem>
          <NavItem onClick={moveToRanking} $variant={isVariant}>
            랭킹
          </NavItem>
        </LeftWrap>
        <div>
          <div style={{ position: "relative", width: "100%" }}>
            <StyledDynamicSvg
              svgUrl="/src/assets/svg/search.svg"
              color={theme.colors.gray3}
            />
            <SearchInput $variant={isVariant} />
            <StyledButton $variant={isVariant}>로그인</StyledButton>
          </div>
        </div>
      </InerContainer>
    </Container>
  );
}

export default NavBar;
