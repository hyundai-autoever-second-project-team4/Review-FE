import React, { useState } from "react";
import {
  Container,
  HeaderBackground,
  HeaderSubText,
  HeaderText,
  HeaderTextBox,
  HeaderTextWrap,
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
  TabBox,
  TabContainer,
  TabText,
  TabTextWrap,
} from "./RankingPageStyle";
import { Box, Pagination, Tab, Tabs } from "@mui/material";

function Ranking() {
  const [tab, setTab] = useState(0);

  const handleTabClick = (event, newValue) => {
    setTab(newValue); // newValue를 사용하여 탭 인덱스를 업데이트
  };

  return (
    <Container>
      <HeaderBackground>
        <HeaderTextBox>
          <HeaderTextWrap>
            <HeaderText>실시간 ThearUp 랭킹</HeaderText>
            <HeaderSubText>
              본 영화를 리뷰하고 랭킹에 도전 해보세요!
            </HeaderSubText>
          </HeaderTextWrap>
        </HeaderTextBox>
      </HeaderBackground>
      <TabBox>
        <TabContainer>
          <Tabs
            value={tab}
            onChange={handleTabClick}
            textColor="inherit"
            sx={{
              "& .MuiTab-root": { color: "#1E293B" }, // Set default color for tabs
              "& .Mui-selected": { color: "#1E293B" },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1E293B", // indicator 색상 설정
              },
              fontFamily: "Noto Sans KR",
            }}
          >
            <Tab
              value={0}
              label="띠어력 랭킹"
              sx={{
                fontWeight: tab === 0 ? "bold" : "normal",
                fontFamily: "Noto Sans KR",
                fontSize: "16px",
              }}
            />
            <Tab
              value={1}
              label="리뷰수 랭킹"
              sx={{
                fontWeight: tab === 1 ? "bold" : "normal",
                fontFamily: "Noto Sans KR",
                fontSize: "16px",
              }}
            />
            <Tab
              value={2}
              label="리뷰 UP 랭킹"
              sx={{
                fontWeight: tab === 2 ? "bold" : "normal",
                fontFamily: "Noto Sans KR",
                fontSize: "16px",
              }}
            />
            <Tab
              value={3}
              label="달린 댓글 수 랭킹"
              sx={{
                fontWeight: tab === 3 ? "bold" : "normal",
                fontFamily: "Noto Sans KR",
                fontSize: "16px",
              }}
            />
          </Tabs>
        </TabContainer>
      </TabBox>
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
          {data.map((member) => (
            <RankingContentBox key={member.rank}>
              <RankingMemberRankText>{member.rank}</RankingMemberRankText>
              <RankingMemberNicknameText>
                <RankingMemberTierImg src="/src/assets/svg/levels/movieGod.svg" />
                <RankingMemberProfileImg src="/src/assets/svg/levels/movieGod.svg" />
                {member.nickname}
              </RankingMemberNicknameText>
              <RankingMemberReviewText>
                {member.reviewCount.toLocaleString()}
              </RankingMemberReviewText>
              <RankingMemberUPText>
                {member.upCount.toLocaleString()}
              </RankingMemberUPText>
              <RankingMemberCommentText>
                {member.commentCount.toLocaleString()}
              </RankingMemberCommentText>
              <RankingMemberScoreText>
                {member.score.toLocaleString()}
              </RankingMemberScoreText>
            </RankingContentBox>
          ))}
        </RankingContainer>
      </RankingBox>
      <Pagination
        count={10}
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#F2B705",
          },
        }}
      />
    </Container>
  );
}

export default Ranking;

const data = [
  {
    rank: 1,
    nickname: "림동연",
    reviewCount: 10000,
    upCount: 10000,
    commentCount: 10000,
    score: 10000,
  },
  {
    rank: 2,
    nickname: "김하늘",
    reviewCount: 9500,
    upCount: 9500,
    commentCount: 9500,
    score: 9500,
  },
  {
    rank: 3,
    nickname: "이준호",
    reviewCount: 9000,
    upCount: 9000,
    commentCount: 9000,
    score: 9000,
  },
  {
    rank: 4,
    nickname: "박지민",
    reviewCount: 8500,
    upCount: 8500,
    commentCount: 8500,
    score: 8500,
  },
  {
    rank: 5,
    nickname: "최민수",
    reviewCount: 8000,
    upCount: 8000,
    commentCount: 8000,
    score: 8000,
  },
  {
    rank: 6,
    nickname: "정수빈",
    reviewCount: 7500,
    upCount: 7500,
    commentCount: 7500,
    score: 7500,
  },
  {
    rank: 7,
    nickname: "이서준",
    reviewCount: 7000,
    upCount: 7000,
    commentCount: 7000,
    score: 7000,
  },
  {
    rank: 8,
    nickname: "한지민",
    reviewCount: 6500,
    upCount: 6500,
    commentCount: 6500,
    score: 6500,
  },
  {
    rank: 9,
    nickname: "오민호",
    reviewCount: 6000,
    upCount: 6000,
    commentCount: 6000,
    score: 6000,
  },
  {
    rank: 10,
    nickname: "김유진",
    reviewCount: 5500,
    upCount: 5500,
    commentCount: 5500,
    score: 5500,
  },
  {
    rank: 11,
    nickname: "이상우",
    reviewCount: 5000,
    upCount: 5000,
    commentCount: 5000,
    score: 5000,
  },
  {
    rank: 12,
    nickname: "정하늘",
    reviewCount: 4500,
    upCount: 4500,
    commentCount: 4500,
    score: 4500,
  },
  {
    rank: 13,
    nickname: "박서준",
    reviewCount: 4000,
    upCount: 4000,
    commentCount: 4000,
    score: 4000,
  },
  {
    rank: 14,
    nickname: "최지우",
    reviewCount: 3500,
    upCount: 3500,
    commentCount: 3500,
    score: 3500,
  },
  {
    rank: 15,
    nickname: "이민호",
    reviewCount: 3000,
    upCount: 3000,
    commentCount: 3000,
    score: 3000,
  },
  {
    rank: 16,
    nickname: "김소연",
    reviewCount: 2500,
    upCount: 2500,
    commentCount: 2500,
    score: 2500,
  },
  {
    rank: 17,
    nickname: "정우성",
    reviewCount: 2000,
    upCount: 2000,
    commentCount: 2000,
    score: 2000,
  },
  {
    rank: 18,
    nickname: "한지혜",
    reviewCount: 1500,
    upCount: 1500,
    commentCount: 1500,
    score: 1500,
  },
  {
    rank: 19,
    nickname: "오세훈",
    reviewCount: 1000,
    upCount: 1000,
    commentCount: 1000,
    score: 1000,
  },
  {
    rank: 20,
    nickname: "김태희",
    reviewCount: 500,
    upCount: 500,
    commentCount: 500,
    score: 500,
  },
];
