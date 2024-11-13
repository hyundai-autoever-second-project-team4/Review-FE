import React from "react";
import {
  BadgeImg,
  Container,
  DateText,
  Name,
  ProfileImg,
  ProfileImgContainer,
  StarRate,
  TierImg,
} from "./ReviewDetailModalHeaderStyle";
import StarIcon from "../../assets/svg/star.svg";

function ReviewDetailModalHeader({ tierImg, profileImg, nickname, starRate }) {
  return (
    <Container>
      <TierImg src={tierImg} />
      <ProfileImgContainer>
        <ProfileImg src={profileImg} />
        <BadgeImg src={tierImg} />
      </ProfileImgContainer>
      <Name>{nickname}</Name>
      <DateText>리뷰일 : 2024년 11월 8일 23:12:15</DateText>
      <StarRate>
        <img src={StarIcon} width={16} height={16} />
        <p>{starRate}</p>
      </StarRate>
    </Container>
  );
}

export default ReviewDetailModalHeader;
