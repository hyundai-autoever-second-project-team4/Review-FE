import React, { useState } from "react";
import useUserStore from "../../store/userStore";
import { getPostingList, login } from "../../api/api";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import MovieSlider from "./template/MovieSlider";
import movieData from "../../utils/data";
import MovieAwards from "./template/MovieAwards";
import dummyReviews from "../../utils/DummyReview";
import HotComment from "./template/HotComment";
import FaceMovieList from "./template/FaceMovieList";

const Container = styled.div`
  margin-top: 72px;
  padding: 20px 0;
  width: 1320px;
  @media (max-width: 1320px) {
    width: 100%;
    padding: 20px;
  }
`;

function Main() {
  const { user, setUser, logOut } = useUserStore((state) => state);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["postingList"],
  //   queryFn: () =>
  //     getPostingList({
  //       nationCode: "",
  //       cityCode: "",
  //       writerNickname: "",
  //       title: "",
  //       page: 0,
  //     }),
  //   staleTime: 5000, // 1분 // 데이터가 신선함을 유지하는 시간. 유지되는 기간동안 다시 마운트 될 때, 데이터를 재요청하지 않음. 해당 시간이 지나게 되면 stale 상태가 됨.
  //   enabled: user.userId !== null, // 해당 조건일 경우에만 실행되도록
  // });

  return (
    <>
      <Container>
        <FaceMovieList movieData={movieData} />
        {user.userId !== null && (
          <MovieSlider
            title={`"${user.name}" 님의 위한 추천 영화`}
            movieData={movieData}
            cnt={1}
          />
        )}
        <MovieSlider
          title={"이번주 별점 높은 영화"}
          movieData={movieData}
          cnt={2}
        />
        <MovieSlider
          title={"이번주 리뷰 많이 달린 영화"}
          movieData={movieData}
          cnt={3}
        />
        <HotComment reviewData={dummyReviews} />
      </Container>
      <MovieAwards movieData={movieData} />
    </>
  );
}

export default Main;
