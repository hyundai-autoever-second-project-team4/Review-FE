import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button/Button";
import DynamicSVG from "../DynamicSVG/DynamicSVG";

import pnglogo from "../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 60px;
  background-color: ${({ variant }) =>
    variant === "dark" ? `${theme.colors.black}1C` : "#ffffff"};
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
  color: ${({ variant }) =>
    variant === "dark" ? "#ffffff" : theme.colors.gray3};
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;

  &:hover {
    /* text-shadow: 1px 1px 3px rgba(188, 183, 183, 0.1); */
    transform: scale(1.05);
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
  padding: 8px 16px 8px 32px;
  margin-right: 16px;
  border-radius: ${theme.borderRadius.sm};
  border: none;
  background-color: ${theme.colors.review};

  &:focus {
    outline: none;
    border: none;
  }
`;
const StyledDynamicSvg = styled(DynamicSVG)`
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 640px) {
    display: none;
  }
`;

function NavBar({ variant }) {
  const navigate = useNavigate();
  return (
    <Container variant={variant}>
      <InerContainer>
        <LeftWrap>
          <img src={pnglogo} />
          {/* <DynamicSVG svgUrl={svglogo} color={theme.colors.primary} /> */}
          <NavItem onClick={() => navigate("/")} variant={variant}>
            현재상영작
          </NavItem>
          <NavItem variant={variant}>인기영화</NavItem>
          <NavItem onClick={() => navigate("/ranking")} variant={variant}>
            랭킹
          </NavItem>
        </LeftWrap>
        <div>
          <div style={{ position: "relative", width: "100%" }}>
            <StyledDynamicSvg
              svgUrl="/src/assets/svg/search.svg"
              color={theme.colors.primary}
            />
            <SearchInput />
            <Button>로그인</Button>
          </div>
        </div>
      </InerContainer>
    </Container>
  );
}

export default NavBar;
