import React from "react";
import theme from "../../styles/theme";
import { Skeleton } from "@mui/material";

function ReviewSkeleton({ width }) {
  const parentWidth = width || "100%"; // 부모 요소의 너비를 설정

  return (
    <div style={{ width: parentWidth }}>
      {/* 부모 요소의 너비 설정 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2px",
          marginBottom: "8px",
        }}
      >
        <Skeleton
          variant="outline"
          width={`calc(${"100%"} * 0.25)`} // 부모 너비의 25%
          height={"30px"}
          sx={{ borderRadius: theme.borderRadius.sm, minWidth: "125px" }}
        />
        <Skeleton
          variant="outline"
          width={`calc(${"100%"} * 0.10)`} // 부모 너비의 10%
          height={"30px"}
          sx={{ borderRadius: theme.borderRadius.sm, minWidth: "50px" }}
        />
      </div>
      <Skeleton
        variant="outline"
        width={`calc(${"100%"} * 1)`} // 부모 요소의 너비와 동일
        height={"90px"}
        sx={{ borderRadius: theme.borderRadius.sm, minWidth: "300px" }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 12px",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Skeleton
            variant="outline"
            width={`30px`} // 부모 너비의 15%
            height={"30px"}
            sx={{ borderRadius: "50%" }}
          />

          <Skeleton
            variant="outline"
            width={`30px`} // 부모 너비의 15%
            height={"30px"}
            sx={{ borderRadius: "50%" }}
          />
        </div>

        <Skeleton
          variant="outline"
          width={`30px`} // 부모 너비의 15%
          height={"30px"}
          sx={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}

export default ReviewSkeleton;
