import React, { useEffect, useState } from "react";
import { TabBox, TabContainer } from "./RankingPageStyle";
import { Tab, Tabs } from "@mui/material";
import RankingBoardBox from "./RankingBoardBox";

function RankingBoard() {
  const [tab, setTab] = useState(0);

  const handleTabClick = (event, newValue) => {
    setTab(newValue); // newValue를 사용하여 탭 인덱스를 업데이트
  };

  return (
    <>
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
      <RankingBoardBox tab={tab} />
    </>
  );
}

export default RankingBoard;
