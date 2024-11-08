import React from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../../styles/theme";

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
  }
  40% { 
    transform: translateY(-20px);
  }
`;

const fadeInOut = keyframes`
  0% { 
    opacity: 0.3;
  }
  50% { 
    opacity: 1;
  }
  100% { 
    opacity: 0.3;
  }
`;

const SearchLoadingContainer = styled.div`
  height: ${({ isFullScreen }) => (isFullScreen ? "100vh" : "100px")};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: ${(props) => (props.$isFullScreen ? "0" : "20px")};
  color: ${theme.colors.neutral400};
`;

const LoadingText = styled.div`
  font-size: ${theme.fontSizes.h3};
  font-weight: ${theme.fontWeight.header};
  animation: ${fadeInOut} 2s infinite ease-in-out;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${theme.colors.neutral400};
  border-radius: 50%;
  animation: ${bounce} 1s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay}s;
`;

const CustomLoading = ({ isFullScreen = false, ...props }) => {
  return (
    <SearchLoadingContainer $isFullScreen={isFullScreen}>
      <DotsContainer>
        <Dot $delay={0} />
        <Dot $delay={0.2} />
        <Dot $delay={0.4} />
      </DotsContainer>
      <LoadingText>로딩 중</LoadingText>
    </SearchLoadingContainer>
  );
};

export default CustomLoading;
