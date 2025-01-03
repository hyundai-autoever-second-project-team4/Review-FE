import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: ${({ width }) => width};
  /* min-width: 180px; */
  background-color: ${theme.colors.review};
  border-radius: ${theme.borderRadius.md};
  /* height: ${({ $hasMovieName, $isMine }) =>
    $hasMovieName ? ($isMine ? "175px;" : "190px") : "160px;"}; */
  padding: 12px 20px;
`;

export const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px;
  /* height: 22px; */
  border-bottom: 1px solid ${theme.colors.gray2};
  width: 100%;
`;
export const MovieNameArea = styled.div`
  /* height: 30px; */
  cursor: pointer;
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${theme.colors.gray2};
  width: 100%;
  padding: 4px 0px;

  border-radius: 4px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieTitle = styled.p``;

export const ContentArea = styled.div`
  padding: 9px 0;
  border-bottom: 1px solid ${theme.colors.gray2};
  height: 92px;
  width: 100%;

  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  line-height: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $isBlur }) =>
    $isBlur
      ? `filter: blur(4px);   -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none`
      : `cursor: pointer;`}
  border-radius: 4px;
  display: "relative";
  transition: 0.2s;

  &:hover {
    ${({ $isBlur }) =>
      !$isBlur &&
      `background-color: rgba(0, 0, 0, 0.2);
    &::after {
      content: "자세히 보기";
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      align-items: center;
      justify-content: center;
      color: #fff;
    }`}
  }
`;

export const BottomArea = styled.div`
  border-top: 1px solid ${theme.colors.gray2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;

  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: calc(100% - 49px);
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ProfileImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${theme.colors.gray2};
`;

export const ProfileName = styled.p`
  width: calc(100% - 46px);
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StarRate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  background-color: #fff;
  padding: 0 6px;
  height: 18px;
  border-radius: ${theme.borderRadius.sm};

  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.bold};
`;

export const ThumbWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.bold};
  transition: 0.2s;
  position: relative;
`;

export const BlurArea = styled.div`
  width: 100%;
  position: absolute;
  top: 32px;
  display: flex;
  justify-content: center;
`;
