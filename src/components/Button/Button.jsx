import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const StyledButton = styled.button`
  background: ${(props) =>
    props.color === "primary" ? theme.colors.primary : "#f5f5f5"};
  color: ${(props) =>
    props.color === "primary" ? "#ffffff" : theme.colors.black};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${(props) =>
    props.size === "large" ? theme.fontWeight.bold : theme.fontWeight.regular};
  padding: ${(props) => (props.size === "large" ? "8px 16px" : "4px 12px")};
  border: ${(props) =>
    props.color === "primary" ? "none" : "1px solid #d9d9d9"};
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background: ${(props) =>
      props.color === "primary"
        ? theme.colors.primaryColor2
        : theme.colors.gray2};
  }

  @media (max-width: 480px) {
    font-size: ${theme.fontSizes.sub2};
  }
`;

function Button({ children, color, size, ...props }) {
  return (
    <>
      <StyledButton color={color} size={size} {...props}>
        {children}
      </StyledButton>
    </>
  );
}

export default Button;
