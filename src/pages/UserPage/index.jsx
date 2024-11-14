import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/userStore.js";
import theme from "../../styles/theme.js";
import { levelName } from "../../utils/level.js";
import Button from "../../components/Button/Button.jsx";
import MyRating from "./template/MyRating.jsx";
import WordCloud from "./template/WordCloud.jsx";
import MyReviewsList from "./template/MyReviewsList.jsx";
import BadgeModal from "./template/BadgeModal.jsx";
import EditProfileModal from "./template/EditProfileModal.jsx";

const Container = styled.div`
  width: 1320px;
  position: relative;
  @media (max-width: 1320px) {
    width: 100%;
    padding: 0 20px;
  }
  margin-bottom: 60px;
`;

const BadgeImage = styled.img`
  margin-top: 60px;
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  top: -40px;

  box-shadow: ${({ level }) =>
    level && `0px 4px 10px ${theme.colors.super[level]}`};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 16px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -24px;
  margin-bottom: 24px;
  gap: 16px;
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
`;

const XpBar = styled.div`
  height: 24px;
  width: 100%;
  margin-top: 8px;
  background-color: ${theme.colors.gray2};
  border-radius: 4px;
  margin-bottom: 60px;
`;

const Now = styled.div`
  height: 24px;
  width: ${({ width }) => `${width}%`};
  border-radius: 4px;
  transition: 1.5s;
  background: linear-gradient(
    to right,
    ${(props) => props.sub},
    ${(props) => props.super}
  );
`;
const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 60px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const BottomArea = styled.div`
  width: 100%;
`;

const initState = {
  badgeImage: "/badgeBackgrounds/commentTrooper.png",
  level: "newbie",
  xp: 160,
  allXp: 300,
  badges: [
    {
      id: 1,
      name: "회원 가입을 축하해요🎉",
      image: "/badgeImages/welcomeNewbie.svg",
    },
    {
      id: 12,
      name: "영화로만 배운 로맨티스트🤍",
      image: "/badgeImages/proMovieAnalyst.svg",
    },
    {
      id: 13,
      name: "영화로만 배운 로맨티스트🤍",
      image: "/badgeImages/theaterUpFanatic.svg",
    },
    {
      id: 11,
      name: "영화로만 배운 로맨티스트🤍",
      image: "/badgeImages/unbreakable.svg",
    },
    {
      id: 17,
      name: "영화로만 배운 로맨티스트🤍",
      image: "/badgeImages/fanFavoriteReviewer.svg",
    },
  ],
  rating: [0, 12, 3, 24, 64, 86, 81, 45, 56, 44],
  rateInfo: { average: 3.7, cnt: 470, best: 4 },
  genre: [
    { text: "로맨스", value: 60 },
    { text: "액션", value: 50 },
    { text: "애니메이션", value: 50 },
    { text: "모험", value: 40 },
    { text: "코미디", value: 30 },
    { text: "드라마", value: 20 },
    { text: "다큐멘터리", value: 20 },
    { text: "가족", value: 15 },
    { text: "범죄", value: 15 },
    { text: "역사", value: 10 },
    { text: "공포", value: 10 },
    { text: "음악", value: 8 },
    { text: "판타지", value: 5 },
  ],
  reviews: [
    {
      level: "newbie",
      proflieImg: "https://via.placeholder.com/50",
      profileName: "User1",
      movieName: "Inception",
      content:
        "정말 놀라운 영화였어요! 스토리가 예상치 못하게 전개되어 마지막까지 긴장을 늦출 수 없었습니다. 연기력도 훌륭했고, 특히 후반부의 반전은 정말 인상 깊었어요. 추천합니다!",
      isBlur: false,
      theUpCnt: 23,
      theDownCnt: 3,
      theIsUp: false,
      theIsDown: false,
      commentCnt: 5,
      starRate: 4.5,
      upClick: () => console.log("Upvote clicked for User1"),
      downClick: () => console.log("Downvote clicked for User1"),
    },
    {
      level: "beginner",
      proflieImg: "https://via.placeholder.com/50",
      profileName: "User2",
      movieName: "Interstellar",
      content:
        "개인적으로는 다소 지루하게 느껴졌습니다. 특히 초반부의 전개가 너무 느려서 집중하기 어려웠어요. 그래도 시각적인 효과와 연출은 정말 멋졌습니다. 스토리보다는 비주얼을 중시하는 분들께 추천드려요.",
      isBlur: true,
      theUpCnt: 10,
      theDownCnt: 8,
      theIsUp: true,
      theIsDown: false,
      commentCnt: 2,
      starRate: 4.0,
      upClick: () => console.log("Upvote clicked for User2"),
      downClick: () => console.log("Downvote clicked for User2"),
    },
    {
      level: "intermediate",
      proflieImg: "https://via.placeholder.com/50",
      profileName: "User3",
      movieName: "The Matrix",
      content:
        "이 영화는 정말 강력 추천합니다! 특히 SF 장르를 좋아하시는 분들이라면 꼭 보셔야 할 작품이에요. 미래적인 설정과 철학적인 주제의식이 잘 어우러져 깊은 인상을 남깁니다.",
      isBlur: false,
      theUpCnt: 50,
      theDownCnt: 2,
      theIsUp: false,
      theIsDown: true,
      commentCnt: 10,
      starRate: 4.5,
      upClick: () => console.log("Upvote clicked for User3"),
      downClick: () => console.log("Downvote clicked for User3"),
    },
    {
      level: "expert",
      proflieImg: "https://via.placeholder.com/50",
      profileName: "User4",
      movieName: "The Godfather",
      content:
        "생각했던 것과는 조금 달랐지만, 그래도 재미있게 봤습니다. 중간중간 예측할 수 없는 사건들이 등장해서 흥미로웠고, 배우들의 연기도 일품이었습니다. 다음 편이 나온다면 꼭 보고 싶어요.",
      isBlur: false,
      theUpCnt: 12,
      theDownCnt: 15,
      theIsUp: false,
      theIsDown: false,
      commentCnt: 1,
      starRate: 4.7,
      upClick: () => console.log("Upvote clicked for User4"),
      downClick: () => console.log("Downvote clicked for User4"),
    },
    {
      level: "master",
      proflieImg: "https://via.placeholder.com/50",
      profileName: "User5",
      movieName: "Parasite",
      content:
        "완전히 걸작입니다! 이런 영화를 다시 볼 수 있을까 싶을 정도로 감동적이었어요. 연출, 음악, 스토리 모두 완벽했고, 눈을 뗄 수 없게 만드는 장면들이 많았습니다. 강력 추천!",
      isBlur: true,
      theUpCnt: 80,
      theDownCnt: 0,
      theIsUp: true,
      theIsDown: false,
      commentCnt: 25,
      starRate: 5.0,
      upClick: () => console.log("Upvote clicked for User5"),
      downClick: () => console.log("Downvote clicked for User5"),
    },
  ],
};

function UserPage() {
  const [percent, setPercent] = useState(0);
  const [badgeModal, setBadgeModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const { user } = useUserStore();
  const [userDetail, setUserDetail] = useState(initState);

  useEffect(() => {
    setPercent((userDetail?.xp / userDetail?.allXp) * 100);
  }, [userDetail]);

  const badgeModalOpen = () => {
    setBadgeModal(true);
  };

  const editProfileModalOpen = () => {
    setEditProfileModal(true);
  };

  const badgeModalClose = () => {
    setBadgeModal(false);
  };

  const editProfileModalClose = () => {
    setEditProfileModal(false);
  };

  return (
    <>
      <BadgeImage src={userDetail.badgeImage} alt="" />
      <Container>
        <ProfileImg src={user?.profileImage} level={userDetail?.level} />
        <ButtonWrapper>
          <Button color="primary" size="large" onClick={badgeModalOpen}>
            뱃지 조건
          </Button>
          <Button size="large" onClick={editProfileModalOpen}>
            프로필 편집
          </Button>
        </ButtonWrapper>
        <InfoWrapper>
          <p>{user?.name}</p>
          {userDetail.badges.map((badge) => {
            return (
              <img
                src={badge.image}
                key={badge.id}
                alt=""
                width={56}
                height={56}
              />
            );
          })}
        </InfoWrapper>
        <p
          style={{
            color: theme.colors.super[userDetail?.level],
            fontWeight: theme.fontWeight.bold,
          }}
        >
          {levelName[userDetail?.level]}
        </p>
        <XpBar>
          <Now
            width={percent}
            super={theme.colors.super[userDetail?.level]}
            sub={theme.colors.sub[userDetail?.level]}
          />
        </XpBar>
        <CenterContainer>
          <WordCloud genre={userDetail?.genre} level={userDetail?.level} />
          <MyRating
            rateInfo={userDetail.rateInfo}
            ratingArray={userDetail.rating}
            level={userDetail.level}
          />
        </CenterContainer>
        <BottomArea>
          <MyReviewsList reviews={userDetail.reviews} />
        </BottomArea>
        {badgeModal && (
          <BadgeModal modal={badgeModal} modalClose={badgeModalClose} />
        )}
        {editProfileModal && (
          <EditProfileModal
            modal={editProfileModal}
            modalClose={editProfileModalClose}
          />
        )}
      </Container>
    </>
  );
}

export default UserPage;
