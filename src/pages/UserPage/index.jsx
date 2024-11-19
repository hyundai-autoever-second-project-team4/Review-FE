import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import useUserStore from "../../store/userStore.js";
import theme from "../../styles/theme.js";
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
import { useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { badgeNames } from "../../utils/badges.js";
import UserPageLoading from "./template/UserPageLoading.jsx";
import Swal from "sweetalert2";
import MetaTag from "../../MetaTag/MetaTag.jsx";

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
  transition: 0.5s;

  &:hover {
    box-shadow: ${({ level }) =>
      level && `0px 8px 20px ${theme.colors.super[level]}`};
  }
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

const Tier = styled.img`
  position: absolute;
  top: 40px;
  left: 34px;
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
      Swal.fire({
        text: "변경되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        setEditProfileModal(false);
      });
      setEditProfileModal(false);
    },
    onError: (error) => {
      Swal.fire({
        text: `변경 실패: ${error}`,
        icon: "error",
        confirmButtonText: "확인",
      });
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

  const memoizedGenre = useMemo(() => {
    if (!userDetail?.genreList?.genreCounts) {
      return [];
    }
    return userDetail.genreList.genreCounts;
  }, [userDetail?.genreList?.genreCounts]);

  const memoizedTier = useMemo(() => {
    if (!userDetail?.memberTier?.tierId) return "";
    return matchToTier[userDetail?.memberTier?.tierId];
  }, [userDetail?.memberTier?.tierId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const calculatedPercent =
        (userDetail.memberTier.tierCurrentPoints /
          userDetail.memberTier.tierRequiredPoints) *
        100;

      if (percent !== calculatedPercent) {
        setPercent(calculatedPercent);
      }
    }, 300);
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

  if (isLoading) return <UserPageLoading />;

  return (
    <>
      <MetaTag
        title={userDetail?.memberName + "님의 페이지"}
        description={userDetail?.memberName + "님의 페이지"}
        imgsrc={"https://theaterup.site/ThearUpImg.png"}
        url={`https://theaterup.site/userPage/${path.userId}`}
        original={true}
      />
      <BadgeImage
        src={userDetail?.memberBadgeList?.primaryBadgeBackgroundImg}
        alt=""
      />
      <Container>
        <div style={{ position: "relative" }}>
          <ProfileImg
            src={userDetail?.memberProfileImg}
            level={matchToTier[userDetail?.memberTier?.tierId]}
            // crossOrigin="anonymous"
          />
          <Tier
            src={userDetail.memberTier.tierImage}
            alt=""
            width={32}
            height={32}
          />
        </div>
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
              <Tooltip
                key={badge.id}
                title={badgeNames[badge.id - 1]}
                placement="top-start"
              >
                <img
                  src={badge.image}
                  alt=""
                  width={56}
                  height={56}
                  // style={{ cursor: "pointer" }}
                />
              </Tooltip>
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
            {"  "}
            {userDetail?.memberTier?.tierTotalPoints}
          </p>
          {userDetail?.memberTier?.tierName !== "영화의 신" && (
            <p style={{ fontSize: "12px" }}>
              {`${userDetail?.memberTier?.nextTierName} 승급 까지 -${
                userDetail?.memberTier?.tierRequiredPoints -
                userDetail?.memberTier?.tierCurrentPoints
              }`}
            </p>
          )}
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
          <WordCloud genre={memoizedGenre} level={memoizedTier} />
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
