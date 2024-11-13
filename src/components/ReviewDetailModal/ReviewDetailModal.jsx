import React, { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import ReviewDetailModalHeader from "../ReviewDetailModalHeader/ReviewDetailModalHeader";
import {
  BadgeImg,
  CommentBox,
  CommentContainer,
  CommentText,
  CommentUploadContainer,
  CommetUploadBox,
  ContentContainer,
  DateText,
  MyBadgeImg,
  MyContainer,
  MyName,
  MyProfileImg,
  MyProfileImgContainer,
  MyTierImg,
  Name,
  PaginationContainer,
  ProfileImg,
  ProfileImgContainer,
  ReviewInput,
  StyledLine,
  SubmitBtn,
  TierImg,
  UpDownContainer,
  UpDownText,
  UserBox,
} from "./ReviewDetailModalStyle";
import * as S from "../Review/ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import { Pagination } from "@mui/material";

function ReviewDetailModal({ modalOpen, modalClose, id }) {
  if (!modalOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "영화 리뷰에 대한 자신의 생각을 입력 해보세요."
  ); // placeholder 상태 추가

  const toggleUpVote = () => {
    setIsUp((prev) => !prev);
    setUpCnt((prev) => (isUp ? prev - 1 : prev + 1));
    upClick();
  };

  const toggleDownVote = () => {
    setIsDown((prev) => !prev);
    setDownCnt((prev) => (isDown ? prev - 1 : prev + 1));
    downClick();
  };

  const handleFocus = () => {
    setPlaceholder(""); // 포커스 시 placeholder 비우기
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setPlaceholder("영화 리뷰에 대한 자신의 생각을 입력 해보세요."); // 포커스 해제 시 입력이 없으면 placeholder 복원
    }
  };

  const reviewData = data[id];

  // 더미 댓글 데이터 생성
  const comments = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    profileImg: "/src/assets/svg/levels/movieGod.svg",
    profileName: `사용자 ${index + 1}`,
    content:
      "저는 생각이 다릅니다. 집 실내씬만 유달리 그런 풍을 만들고 나머지는 완전 지상파 밝은 조명 수사물 톤이라 완전 언벨런스...",
    date: "2024년 11월 08일 23:12:15",
  }));

  return (
    <CustomModal
      modal={modalOpen}
      modalClose={modalClose}
      title={
        <ReviewDetailModalHeader
          tierImg={`/src/assets/svg/levels/${reviewData.level}.svg`}
          profileImg={reviewData.profileImg}
          nickname={reviewData.profileName}
          starRate={reviewData.starRate}
        />
      }
      large
      titleHeight={"50px"}
    >
      <ContentContainer> {reviewData.content}</ContentContainer>
      <UpDownContainer>
        <S.ThumbWrapper>
          <DynamicSVG
            svgUrl="/src/assets/svg/up.svg"
            color={isUp ? theme.colors.red : theme.colors.gray3}
            width={29}
            height={28}
            style={{ cursor: "pointer" }}
            onClick={toggleUpVote}
          />
          <UpDownText>{reviewData.theUpCnt}</UpDownText>
        </S.ThumbWrapper>
        <S.ThumbWrapper>
          <DynamicSVG
            svgUrl="/src/assets/svg/down.svg"
            color={isDown ? theme.colors.blue : theme.colors.gray3}
            width={29}
            height={28}
            style={{ cursor: "pointer" }}
            onClick={toggleDownVote}
          />
          <UpDownText>{reviewData.theDownCnt}</UpDownText>
        </S.ThumbWrapper>
      </UpDownContainer>
      <StyledLine />
      <S.ThumbWrapper>
        <DynamicSVG
          svgUrl={ChatLogo}
          color={theme.colors.gray3}
          width={29}
          height={28}
        />
        <UpDownText>댓글 {reviewData.commentCnt}</UpDownText>
      </S.ThumbWrapper>
      <CommentContainer>
        {comments.map((comment) => (
          <CommentBox key={comment.id}>
            <UserBox>
              <TierImg src="/src/assets/svg/levels/movieGod.svg" />
              <ProfileImgContainer>
                <ProfileImg src={comment.profileImg} />
                <BadgeImg src={comment.profileImg} />
              </ProfileImgContainer>
              <Name>{comment.profileName}</Name>
            </UserBox>
            <CommentText>{comment.content}</CommentText>
            <DateText>{comment.date}</DateText>
          </CommentBox>
        ))}
      </CommentContainer>
      <PaginationContainer>
        <Pagination
          count={10}
          sx={{
            ".MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#F2B705",
            },
          }}
        />
      </PaginationContainer>
      <CommentUploadContainer>
        <CommetUploadBox>
          <MyContainer>
            <MyTierImg src={`/src/assets/svg/levels/${reviewData.level}.svg`} />
            <MyProfileImgContainer>
              <MyProfileImg src={reviewData.profileImg} />
              <MyBadgeImg
                src={`/src/assets/svg/levels/${reviewData.level}.svg`}
              />
            </MyProfileImgContainer>
            <MyName>{reviewData.profileName}</MyName>
          </MyContainer>
          <ReviewInput
            placeholder={placeholder} // placeholder 상태 사용
            onFocus={handleFocus} // 포커스 이벤트 핸들러
            onBlur={handleBlur} // 블러 이벤트 핸들러
          />
          <SubmitBtn>등록</SubmitBtn>
        </CommetUploadBox>
      </CommentUploadContainer>
    </CustomModal>
  );
}

export default ReviewDetailModal;

const data = [
  {
    id: 0,
    level: "movieGod",
    profileImg: "/src/assets/svg/levels/movieGod.svg",
    profileName: "림동연",
    starRate: "5.0",
    content:
      "1화, 최근 한국 드라마 중 이런 수준의 촬영이 있었나? 화면의 때깔과 밀도 자체에서 다른 차원을 보여준다. 2화, 압도적이 아니라 짓눌린다. 기술적인 완성도를 정서적으로 전달하는게 탁월. 3화, 변곡점 사건이 확장 타키와 미츠하가 서로의 이름을 잊은 장면이 다소 우스꽝스럽게 표현되었지만 대지진에 희생된 사람들도, 그 배에 타고 있던 학생들도 언젠가는 그렇게 잊혀질 것이다. 너의 '이름'은 그들과 우리를 이어주는 매듭 역할을 하며, 그들을 잊지 않길 바라는 소망을 나타낸다. 이 드라마는 정말 기대 이상이었어요! 캐릭터들이 매력적이고 스토리가 흥미진진합니다. 특히 2화의 반전은 정말 놀라웠어요. 특히 2화의 반전은 정말 놀라웠어요.",
    isBlur: false,
    theUpCnt: 100,
    theDownCnt: 3,
    commentCnt: 10,
  },
  {
    id: 1,
    level: "movieBuff",
    profileImg: "/src/assets/svg/levels/movieMaster.svg",
    profileName: "김하늘",
    starRate: "4.0",
    content:
      "이 드라마는 정말 기대 이상이었어요! 캐릭터들이 매력적이고 스토리가 흥미진진합니다. 특히 2화의 반전은 정말 놀라웠어요.",
    isBlur: false,
    theUpCnt: 50,
    theDownCnt: 1,
    commentCnt: 5,
  },
  {
    id: 2,
    level: "newbie",
    profileImg: "/src/assets/svg/levels/movieBuff.svg",
    profileName: "이수민",
    starRate: "3.5",
    content:
      "전반적으로 괜찮은 드라마지만, 몇몇 부분은 아쉬웠습니다. 특히 전개가 다소 느리게 느껴졌어요.",
    isBlur: false,
    theUpCnt: 20,
    theDownCnt: 2,
    commentCnt: 3,
  },
];
