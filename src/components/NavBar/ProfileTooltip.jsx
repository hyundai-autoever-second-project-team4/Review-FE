import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import logoutSvg from "../../assets/svg/logout.svg";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* padding: 8px 12px; */
  height: 150px;
  width: 150px;
  border-radius: ${theme.borderRadius.sm};
  position: relative;
`;

const BadgeImg = styled.img`
  width: 100%;
  height: 40px;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

const ProfileWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: calc(50% - 62px);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  border-radius: ${theme.borderRadius.md};
  padding: 8px 28px;
  transition: 0.5s;

  &:hover {
    background-color: ${theme.colors.gray2}6C;
    cursor: pointer;
  }
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  gap: 4px;
  align-items: flex-start;
`;

const LogoutWrapper = styled.div`
  padding: 14px 16px;
  width: 124px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 59px;
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.regular};
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.gray2}6C;
  }
`;
function ProfileTooltip({
  primaryBadge,
  level,
  name,
  img,
  moveToMyPage,
  handleLogOut,
}) {
  return (
    <Container>
      <BadgeImg src={`/badgeBackgrounds/${primaryBadge}.png`} alt="" />
      <ProfileWrapper onClick={moveToMyPage}>
        <ProfileImg src={img} />
        <ProfileName>
          <DynamicSVG width={16} height={16} svgUrl={`/levels/${level}.svg`} />
          <p>{name}</p>
        </ProfileName>
      </ProfileWrapper>
      <LogoutWrapper onClick={handleLogOut}>
        <DynamicSVG
          svgUrl={logoutSvg}
          width={16}
          height={16}
          color={theme.colors.gray3}
        />
        <p style={{ color: theme.colors.gray3 }}>로그 아웃</p>
      </LogoutWrapper>
    </Container>
  );
}

export default ProfileTooltip;
