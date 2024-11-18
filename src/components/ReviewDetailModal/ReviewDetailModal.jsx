import React, { useEffect, useRef, useState } from "react";
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
  NoCommentContainer,
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
  DeleteButton,
} from "./ReviewDetailModalStyle";
import * as S from "../Review/ReviewStyle";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import theme from "../../styles/theme";
import ChatLogo from "/src/assets/svg/ChatBubble.svg";
import { useGetReviewDetail } from "../../hooks/useGetReviewDetail";
import CommentList from "./CommentList";
import upLogo from "/src/assets/svg/up.svg";
import downLogo from "/src/assets/svg/down.svg";
import redUp from "/src/assets/svg/redUp.svg";
import blueDown from "/src/assets/svg/blueDown.svg";
import { useThearMutation } from "../../hooks/useThearMutation";
import { useNavigate } from "react-router-dom";
import { useDeleteReview } from "../../hooks/useDeleteReview";
import { axiosInstance } from "../../api/axiosInstance";
import useUserStore from "../../store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

function ReviewDetailModal({ modalOpen, modalClose, id, queryKeyType }) {
  const queryClient = useQueryClient(); // queryClient 가져오기
  const [placeholder, setPlaceholder] = useState(
    "영화 리뷰에 대한 자신의 생각을 입력 해보세요."
  ); // placeholder 상태 추가
  const [islargeScreen, setIslargeScreen] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [commentContent, setCommentContent] = useState(""); // 댓글 내용 상태 추가
  const inputRef = useRef(null); // 입력 필드에 대한 ref 생성
  const { data, isLoading, isError, error, refetch } = useGetReviewDetail(id);
  const { user } = useUserStore();
  const { mutate: thearUp } = useThearMutation(id, ["reviewDetail", id], "up");
  const navigate = useNavigate();
  const { mutate: thearDown } = useThearMutation(
    id,
    ["reviewDetail", id],
    "down"
  );
  const { mutate: deleteReview } = useDeleteReview(id, queryKeyType);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const reviewData = data?.reviewInfo;

  const toggleUpVote = () => {
    thearUp();
  };

  const toggleDownVote = () => {
    thearDown();
  };

  const handleFocus = () => {
    setPlaceholder(""); // 포커스 시 placeholder 비우기
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setPlaceholder("영화 리뷰에 대한 자신의 생각을 입력 해보세요."); // 포커스 해제 시 입력이 없으면 placeholder 복원
    }
  };

  const handleProfileClick = () => {
    navigate(`/userPage/${reviewData?.memberId}`);
  };

  const handleDeleteButtonClick = () => {
    Swal.fire({
      text: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReview();
      }
    });
  };

  const handleCommentSubmit = async (content) => {
    if (commentContent == "") {
      alert("댓글 내용을 입력해주세요!");
    } else {
      try {
        const response = await axiosInstance.post("/comment", {
          reviewId: id,
          content: content,
        });
        // 댓글 등록 후 쿼리 무효화
        queryClient.invalidateQueries(queryKeyType);
        alert("댓글이 등록되었습니다.");
        inputRef.current.blur(); // 입력 필드의 포커스를 해제
        setPlaceholder("영화 리뷰에 대한 자신의 생각을 입력 해보세요.");
        setCommentContent("");
        refetch();
      } catch (error) {
        console.error("댓글 등록 오류:", error);
        alert("댓글 등록에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIslargeScreen(window.innerWidth > 854);
      setIsMobileScreen(window.innerWidth < 538);
    };

    // 초기 화면 크기 체크
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CustomModal
      modal={modalOpen}
      modalClose={modalClose}
      title={
        !isLoading && (
          <ReviewDetailModalHeader
            tierImg={reviewData?.memberTierImg}
            profileImg={reviewData?.memberProfileImg}
            nickname={reviewData?.memberName}
            starRate={reviewData?.starRate}
            reviewDate={reviewData?.createdAt}
            badgeImg={reviewData?.memberBadgeImg}
            handleProfileClick={handleProfileClick}
            large={islargeScreen}
            badgeModalMobile={isMobileScreen}
          />
        )
      }
      large={islargeScreen}
      titleHeight={isMobileScreen ? "60px" : "50px"}
      badgeModalMobile={isMobileScreen}
    >
      {!isLoading && (
        <>
          <ContentContainer>{reviewData.content}</ContentContainer>
          <UpDownContainer>
            <S.ThumbWrapper>
              <S.ThumbWrapper>
                <img
                  src={reviewData.isThearUp ? redUp : upLogo}
                  width={24}
                  height={24}
                  style={{ cursor: "pointer" }}
                  onClick={toggleUpVote}
                />
                <UpDownText>{reviewData.ThearUpCount}</UpDownText>
              </S.ThumbWrapper>
              <S.ThumbWrapper>
                <img
                  src={reviewData.isThearDown ? blueDown : downLogo}
                  width={24}
                  height={24}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    top: "6px",
                  }}
                  onClick={toggleDownVote}
                />
                <UpDownText>{reviewData.ThearDownCount}</UpDownText>
              </S.ThumbWrapper>
            </S.ThumbWrapper>
            {reviewData.isWriter && (
              <DeleteButton onClick={handleDeleteButtonClick}>
                리뷰 삭제
              </DeleteButton>
            )}
          </UpDownContainer>
          <StyledLine />
          <S.ThumbWrapper>
            <DynamicSVG
              svgUrl={ChatLogo}
              color={theme.colors.gray3}
              width={24}
              height={24}
            />
            <UpDownText>댓글 {reviewData.commentCount}</UpDownText>
          </S.ThumbWrapper>
          <CommentList reviewId={id} />
          <CommentUploadContainer>
            <CommetUploadBox>
              {user?.id === null ? (
                <MyContainer>
                  <MyName style={{ margin: "39px" }}>
                    댓글을 작성하려면 로그인이 필요합니다.
                  </MyName>
                </MyContainer>
              ) : (
                <>
                  <MyContainer>
                    <MyTierImg src={user?.tier?.image} />
                    <MyProfileImgContainer>
                      <MyProfileImg src={user?.profileImage} />
                      <MyBadgeImg src={user?.badge?.image} />
                    </MyProfileImgContainer>
                    <MyName>{user?.name}</MyName>
                  </MyContainer>
                  <ReviewInput
                    type="text"
                    value={commentContent} // 상태와 연결
                    placeholder={placeholder} // placeholder 상태 사용
                    onFocus={handleFocus} // 포커스 이벤트 핸들러
                    onBlur={handleBlur} // 블러 이벤트 핸들러
                    onChange={(e) => setCommentContent(e.target.value)} // 댓글 내용 상태 업데이트
                    ref={inputRef} // ref를 입력 필드에 연결
                    disabled={user?.id === null}
                  />
                  <SubmitBtn
                    color="primary"
                    onClick={() => handleCommentSubmit(commentContent)} // 댓글 등록 함수 호출
                  >
                    등록
                  </SubmitBtn>
                </>
              )}
            </CommetUploadBox>
          </CommentUploadContainer>
        </>
      )}
    </CustomModal>
  );
}

export default ReviewDetailModal;
