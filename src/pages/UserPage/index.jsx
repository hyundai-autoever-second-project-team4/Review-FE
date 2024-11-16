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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserMyPage,
  editUserInfo,
  getOtherUserPage,
  getBadgeCnt,
} from "../../api/api.js";
import { matchToTier } from "../../utils/matchToTier.js";
import { useLocation, useParams } from "react-router-dom";

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
  background-color: ${theme.colors.gray2};
  position: relative;
  top: -40px;
  object-fit: cover;
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

function UserPage() {
  const [percent, setPercent] = useState(0);
  const [badgeModal, setBadgeModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const queryClient = useQueryClient();
  const path = useParams();
  const { user } = useUserStore();

  const { mutate: editUserProfile } = useMutation({
    mutationFn: (data) => editUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["userDetail"]);
      alert("수정되었습니다.");
      setEditProfileModal(false);
    },
  });

  const {
    data: userDetail,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDetail", path.userId],
    queryFn: () => getOtherUserPage(path.userId),
    staleTime: 0,
    select: (data) => data.data,
  });

  const { data: badgeCnt } = useQuery({
    queryKey: ["badgeCnt"],
    queryFn: () => getBadgeCnt(),
    staleTime: 600000, // 10분
    gcTime: 600000,
    select: (data) => data.data.badgeCounts,
  });

  useEffect(() => {
    setPercent(
      (userDetail?.memberTier?.tierCurrentPoints /
        userDetail?.memberTier?.tierRequiredPoints) *
        100
    );
  }, [userDetail]);

  useEffect(() => {
    refetch();
  }, [path.id]);

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

  const handleProfileEdit = (data) => {
    editUserProfile(data);
  };

  if (isLoading) return "Loading...";

  return (
    <>
      <BadgeImage
        src={userDetail?.memberBadgeList?.primaryBadgeBackgroundImg}
        alt=""
      />
      <Container>
        <ProfileImg
          src={userDetail?.memberProfileImg}
          level={matchToTier[userDetail?.memberTier?.tierId]}
          // crossOrigin="anonymous"
        />
        {user.id == path.userId && (
          <ButtonWrapper>
            <Button color="primary" size="large" onClick={badgeModalOpen}>
              뱃지 조건
            </Button>
            <Button size="large" onClick={editProfileModalOpen}>
              프로필 편집
            </Button>
          </ButtonWrapper>
        )}
        <InfoWrapper>
          <p>{userDetail?.memberName}</p>
          {userDetail?.memberBadgeList?.badges.map((badge) => {
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color:
                theme.colors.super[matchToTier[userDetail?.memberTier?.tierId]],
              fontWeight: theme.fontWeight.bold,
            }}
          >
            {userDetail?.memberTier?.tierName}
          </p>
          <p>
            {`승급 까지 -${
              userDetail?.memberTier?.tierRequiredPoints -
              userDetail?.memberTier?.tierCurrentPoints
            }`}
          </p>
        </div>
        <XpBar>
          <Now
            width={percent}
            super={
              theme.colors.super[matchToTier[userDetail?.memberTier?.tierId]]
            }
            sub={theme.colors.sub[matchToTier[userDetail?.memberTier?.tierId]]}
          />
        </XpBar>
        <CenterContainer>
          <WordCloud
            genre={userDetail?.genreList?.genreCounts}
            level={matchToTier[userDetail?.memberTier?.tierId]}
          />
          <MyRating
            starRateList={userDetail?.starRateList}
            level={matchToTier[userDetail?.memberTier?.tierId]}
          />
        </CenterContainer>
        <BottomArea>
          <MyReviewsList
            queryKeyType={["userDetail", path.userId]}
            reviews={userDetail?.reviewInfoList?.reviewInfos}
          />
        </BottomArea>
        {badgeModal && (
          <BadgeModal
            badgeCnt={badgeCnt}
            modal={badgeModal}
            modalClose={badgeModalClose}
          />
        )}
        {editProfileModal && (
          <EditProfileModal
            modal={editProfileModal}
            modalClose={editProfileModalClose}
            user={userDetail}
            handleProfileEdit={handleProfileEdit}
          />
        )}
      </Container>
    </>
  );
}

export default UserPage;
