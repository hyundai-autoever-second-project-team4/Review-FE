import React from "react";
import { Skeleton } from "@mui/material";
import styled from "styled-components";
import theme from "../../../styles/theme.js";

const Container = styled.div`
  width: 1320px;
  position: relative;
  @media (max-width: 1320px) {
    width: 100%;
    padding: 0 20px;
  }
  margin-bottom: 60px;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

function UserPageLoading() {
  return (
    <>
      <Skeleton
        variant="outline"
        width={"100%"}
        height={250}
        sx={{ marginTop: "60px" }}
      />
      <Container>
        <FlexBox style={{ marginTop: "20px", alignItems: "center" }}>
          <Skeleton
            variant="outline"
            width={100}
            height={100}
            sx={{ borderRadius: "50%" }}
          />
          <FlexBox
            style={{ gap: "16px", height: "55px", alignItems: "flex-end" }}
          >
            <Skeleton
              variant="outline"
              width={100}
              height={40}
              sx={{ borderRadius: theme.borderRadius.sm }}
            />
            <Skeleton
              variant="outline"
              width={100}
              height={40}
              sx={{ borderRadius: theme.borderRadius.sm }}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox style={{ marginTop: "30px" }}>
          <Skeleton
            variant="outline"
            width={160}
            height={40}
            sx={{ borderRadius: theme.borderRadius.sm }}
          />
        </FlexBox>
        <FlexBox style={{ marginTop: "30px" }}>
          <Skeleton
            variant="outline"
            width={"100%"}
            height={30}
            sx={{ borderRadius: theme.borderRadius.sm }}
          />
        </FlexBox>
        <FlexBox style={{ marginTop: "50px", gap: "16px" }}>
          <div style={{ width: "50%" }}>
            <Skeleton
              variant="outline"
              width={160}
              height={40}
              sx={{ borderRadius: theme.borderRadius.sm }}
            />

            <Skeleton
              variant="outline"
              width={"100%"}
              height={300}
              sx={{ borderRadius: theme.borderRadius.md, marginTop: "20px" }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Skeleton
              variant="outline"
              width={160}
              height={40}
              sx={{ borderRadius: theme.borderRadius.sm }}
            />
            <Skeleton
              variant="outline"
              width={"100%"}
              height={300}
              sx={{ borderRadius: theme.borderRadius.md, marginTop: "20px" }}
            />
          </div>
        </FlexBox>
        {/* <FlexBox style={{ marginTop: "50px" }}>
          <Skeleton
            variant="outline"
            width={160}
            height={40}
            sx={{ borderRadius: theme.borderRadius.sm }}
          />
        </FlexBox> */}
      </Container>
    </>
  );
}

export default UserPageLoading;
