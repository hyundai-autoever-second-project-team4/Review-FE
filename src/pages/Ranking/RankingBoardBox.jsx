import React, { useEffect, useState } from "react";
import {
  RankingBox,
  RankingContainer,
  RankingContentBox,
  RankingHeaderCommentText,
  RankingHeaderNicknameText,
  RankingHeaderRankText,
  RankingHeaderReviewText,
  RankingHeaderScoreText,
  RankingHeaderUPText,
  RankingMemberCommentText,
  RankingMemberNicknameText,
  RankingMemberProfileImg,
  RankingMemberRankText,
  RankingMemberReviewText,
  RankingMemberScoreText,
  RankingMemberTierImg,
  RankingMemberUPText,
} from "./RankingPageStyle";
import { Pagination, Skeleton } from "@mui/material";
import { getEndpoint, useGetRanking } from "../../hooks/useGetRanking";
import { useQueryClient } from "@tanstack/react-query";
import { getRankingData } from "../../api/api";

function RankingBoardBox({ tab }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetRanking(tab, page);

  // urlType이 변경될 때 pagination 초기화
  useEffect(() => {
    setPage(1);
  }, [tab]);

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  const smoothScrollTo = (targetY, duration) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // 0에서 1까지의 비율

      // easeInOutQuad easing function
      const easing = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      window.scrollTo(0, startY + distance * easing(progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll); // 애니메이션 계속 진행
      }
    };

    requestAnimationFrame(animateScroll); // 애니메이션 시작
  };

  const queryClient = useQueryClient();

  // 모든 탭의 데이터를 미리 로드
  useEffect(() => {
    // 현재 탭을 제외한 모든 탭에 대해 prefetch
    for (let i = 0; i < 4; i++) {
      if (i !== tab) {
        // 현재 탭이 아닐 경우에만
        queryClient.prefetchQuery({
          queryKey: ["ranking", getEndpoint(i), 1], // 페이지는 1로 설정
          queryFn: async () => {
            const response = await getRankingData(getEndpoint(i), 1);
            return response.data.memberRankings; // 데이터 구조를 맞춤
          },
        });
      }
    }
  }, []);

  if (isLoading)
    return (
      <div style={{ marginTop: "20px" }}>
        <Skeleton variant="rounded" width={1224} height={600} />
      </div>
    );
  if (isError)
    return <div style={{ marginTop: "40px" }}>error: {error.message}</div>;

  return (
    <>
      <RankingBox>
        <RankingContainer>
          <RankingContentBox>
            <RankingHeaderRankText>순위</RankingHeaderRankText>
            <RankingHeaderNicknameText>닉네임</RankingHeaderNicknameText>
            <RankingHeaderReviewText>총 리뷰 수</RankingHeaderReviewText>
            <RankingHeaderUPText>총 UP 수</RankingHeaderUPText>
            <RankingHeaderCommentText>
              총 작성한 댓글 수
            </RankingHeaderCommentText>
            <RankingHeaderScoreText>띠어력 점수</RankingHeaderScoreText>
          </RankingContentBox>
          {data.content.map((member) => (
            <RankingContentBox key={member.memberId}>
              <RankingMemberRankText>{member.rank}</RankingMemberRankText>
              <RankingMemberNicknameText>
                <RankingMemberTierImg src={`${member.tierImage}`} />
                <RankingMemberProfileImg src={`${member.profileImage}`} />
                {member.memberName}
              </RankingMemberNicknameText>
              <RankingMemberReviewText>
                {member.totalReviewCount.toLocaleString()}
              </RankingMemberReviewText>
              <RankingMemberUPText>
                {member.totalThearUpCount.toLocaleString()}
              </RankingMemberUPText>
              <RankingMemberCommentText>
                {member.totalCommentCount.toLocaleString()}
              </RankingMemberCommentText>
              <RankingMemberScoreText>
                {member.memberTotalScore.toLocaleString()}
              </RankingMemberScoreText>
            </RankingContentBox>
          ))}
        </RankingContainer>
      </RankingBox>
      <Pagination
        count={data.totalPages}
        page={page} // 현재 페이지
        siblingCount={3}
        onChange={handlePageChange} // 페이지 변경 핸들러
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#F2B705",
          },
        }}
      />
    </>
  );
}

export default RankingBoardBox;
