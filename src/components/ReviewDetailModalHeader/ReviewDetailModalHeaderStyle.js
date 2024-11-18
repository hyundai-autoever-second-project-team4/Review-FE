import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  height: 30px;
`;

export const TierImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const ProfileImgContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const BadgeImg = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  bottom: -2px;
  right: -4px;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: ${theme.fontWeight.regular};
  margin-right: 20px;
`;

export const DateText = styled.div`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  margin-right: ${(props) => (props.$large ? "40px" : "4px")};
`;

export const StarRate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  background-color: ${theme.colors.review};
  padding: 6px 8px;
  /* height: 24px; */
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.bold};
`;
