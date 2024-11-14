import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  height: 120px;
  width: 427px;
  display: flex;
  gap: 3px;
  align-items: flex-end;
`;

export const Bar = styled.div`
  width: 40px;
  height: ${({ height }) => (height ? `${height + 1}px` : "1px")};
  background-color: ${({ $isMax, level }) =>
    $isMax ? `${theme.colors.super[level]}` : `${theme.colors.sub[level]}`};
  transition: height 1s;
  border-radius: 4px 4px 0 0;

  &:hover {
    opacity: 0.7;
  }
`;

export const styledP = styled.p`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: #f5f5f5;
`;

export const ToolTipWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
