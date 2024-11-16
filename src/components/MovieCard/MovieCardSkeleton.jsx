import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Skeleton } from "@mui/material";

const Container = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const Poster = styled.img`
  width: 120px;
  height: 180px;
  border-radius: ${theme.borderRadius.md};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 180px;
  border-bottom: 1px solid ${theme.colors.gray2};
  width: 100%;
  gap: 4px 0;
`;

const Title = styled.h4`
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.black};
`;
const Data = styled.p`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
`;
const Genre = styled.p`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
`;

function MovieCardSkeleton({}) {
  return (
    <>
      <Container>
        <Skeleton
          variant="outline"
          sx={{ borderRadius: theme.borderRadius.md }}
        >
          <Poster />
        </Skeleton>
        <Info>
          <Skeleton variant="outline" sx={{ borderRadius: "4px" }}>
            <Title>asdadsadsad</Title>
          </Skeleton>
          <Skeleton variant="outline" sx={{ borderRadius: "4px" }}>
            <Data>asdadsadsad</Data>
          </Skeleton>
          <Skeleton variant="outline" sx={{ borderRadius: "4px" }}>
            <Genre>asdadsadsad</Genre>
          </Skeleton>
        </Info>
      </Container>
    </>
  );
}

export default MovieCardSkeleton;
