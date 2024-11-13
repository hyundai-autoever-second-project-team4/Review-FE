import React from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import Button from "../components/Button/Button";
import ReviewAddModal from "../components/ReviewAddModal/ReviewAddModal";

function Test() {
  const img =
    "https://i.namu.wiki/i/AzwNiCjLoso4kGNVLOaOXMAomI2hn_44R4NiDfCb1y2fy-z_GvZy_hnvWhh-bxQnGgXcXlhWIpufoZA6wfDz9g.webp";
  const title = "인시디어스:빨간문";
  const year = 2024;
  const country = "미국";
  const genre = ["공포", "호러"];

  return (
    <>
      <ReviewAddModal />
    </>
  );
}

export default Test;
