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

function ReviewDetailModalHeader({
  tierImg,
  profileImg,
  nickname,
  starRate,
  badgeImg,
  reviewDate,
  handleProfileClick,
  large,
  badgeModalMobile,
}) {
  // 문자열 분리
  const dateTimeParts = reviewDate.split("T");
  const dateParts = dateTimeParts[0].split("-");
  const timeParts = dateTimeParts[1].split(":");

  // 연도, 월, 일, 시, 분, 초 추출
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const hours = timeParts[0];
  const minutes = timeParts[1];
  const seconds = parseInt(timeParts[2]);

  // 원하는 형식으로 문자열 생성
  const formattedDate = large
    ? `리뷰일 : ${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`
    : `${year}.${month}.${day} ${hours}:${minutes}`;

  return (
    <>
      <Container>
        <div
          style={{
            cursor: "pointer",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={handleProfileClick}
        >
          <TierImg src={tierImg} />
          <ProfileImgContainer>
            <ProfileImg src={profileImg} />
            <BadgeImg src={badgeImg} />
          </ProfileImgContainer>
          <Name $badgeModalMobile={badgeModalMobile}>{nickname}</Name>
        </div>
        {!badgeModalMobile && (
          <DateText $large={large}>{formattedDate}</DateText>
        )}
        <StarRate>
          <img src={StarIcon} width={16} height={16} />
          <p>{starRate}</p>
        </StarRate>
      </Container>
      {badgeModalMobile && (
        <DateText $large={large} style={{ margin: "8px 0 4px" }}>
          {formattedDate}
        </DateText>
      )}
    </>
  );
}

export default ReviewDetailModalHeader;
