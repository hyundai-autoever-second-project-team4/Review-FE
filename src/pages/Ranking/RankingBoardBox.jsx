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
  Ha,
} from "./RankingPageStyle";
import { Pagination, Skeleton } from "@mui/material";
import { getEndpoint, useGetRanking } from "../../hooks/useGetRanking";
import { useQueryClient } from "@tanstack/react-query";
import { getRankingData } from "../../api/api";
import { smoothScrollTo } from "../../utils/smoothScrollTop.js";
import CustomPagination from "../../components/CustomPagination/CustomPagination.jsx";
import { useNavigate } from "react-router-dom";

function RankingBoardBox({ tab }) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetRanking(tab, page);
  const queryClient = useQueryClient();
  // urlType이 변경될 때 pagination 초기화
  useEffect(() => {
    setPage(1);
  }, [tab]);

  const handlePageChange = (event, value) => {
    setPage(value); // 페이지 변경
    smoothScrollTo(0, 500); // 500ms 동안 부드럽게 스크롤
  };

  const handleUserClick = (id) => {
    navigate(`/userPage/${id}`);
  };

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
      <div style={{ marginTop: "10px" }}>
        <Skeleton variant="rounded" width={1224} height={36} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            marginTop: "16px",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "56px",
                width: "100%",
                padding: "0 64px",
              }}
            >
              <Skeleton
                variant="rounded"
                width={34}
                height={34}
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={160}
                  height={34}
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <Skeleton
                variant="rounded"
                width={34}
                height={34}
                style={{ borderRadius: "50%" }}
              />
              <Skeleton
                variant="rounded"
                width={34}
                height={34}
                style={{ borderRadius: "50%" }}
              />
              <Skeleton
                variant="rounded"
                width={34}
                height={34}
                style={{ borderRadius: "50%" }}
              />
              <Skeleton
                variant="rounded"
                width={34}
                height={34}
                style={{ borderRadius: "50%" }}
              />
            </div>
          ))}
        </div>
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
                <Ha
                  onClick={() => handleUserClick(member.memberId)}
                  style={{
                    display: "flex",
                    gap: "4px",
                    cursor: "pointer",
                    alignItems: "center",
                    padding: "8px 8px",
                  }}
                >
                  <RankingMemberTierImg src={`${member.tierImage}`} />
                  <RankingMemberProfileImg src={`${member.profileImage}`} />
                  {member.memberName}
                </Ha>
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
      <CustomPagination
        count={data.totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </>
  );
}

export default RankingBoardBox;
