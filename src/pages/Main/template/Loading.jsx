import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";

const Container = styled.div`
  margin-top: 72px;
  padding: 20px 0;
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
    padding: 20px;
  }
`;

const MainLoad = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  margin-bottom: 80px;
`;

const Wrapper = styled.div`
  flex-basis: calc((100% - 32px) / 3); /* 기본 너비 설정 */
`;

const Wrapper2 = styled.div`
  flex-basis: calc((100% - 64px) / 5);

  @media (max-width: 960px) {
    flex-basis: calc((100% - 48px) / 4);
  }
  @media (max-width: 640px) {
    flex-basis: calc((100% - 32px) / 3);
  }
`;

function Loading() {
  const [groupSize, setGroupSize] = useState(5);

  useEffect(() => {
    // 화면 크기에 따라 groupSize를 설정하는 함수
    const updateGroupSize = () => {
      if (window.innerWidth <= 640) {
        setGroupSize(3);
      } else if (window.innerWidth <= 960) {
        setGroupSize(4);
      } else {
        setGroupSize(5);
      }
    };

    // 초기 groupSize 설정
    updateGroupSize();

    // 윈도우 크기 변화 감지
    window.addEventListener("resize", updateGroupSize);
    // 정리 작업
    return () => window.removeEventListener("resize", updateGroupSize);
  }, []);

  return (
    <Container>
      <MainLoad>
        {[...Array(3)].map((_, index) => (
          <Wrapper key={index}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1",
                borderRadius: "16px",
              }}
            />
          </Wrapper>
        ))}
      </MainLoad>
      <MainLoad>
        {[...Array(groupSize)].map((_, index) => (
          <Wrapper2 key={index}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1.5",
                borderRadius: "16px",
              }}
            />
          </Wrapper2>
        ))}
      </MainLoad>
      <MainLoad>
        {[...Array(groupSize)].map((_, index) => (
          <Wrapper2 key={index}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "100%",
                aspectRatio: "1/1.5",
                borderRadius: "16px",
              }}
            />
          </Wrapper2>
        ))}
      </MainLoad>
    </Container>
  );
}

export default Loading;
