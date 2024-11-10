import React, { useState } from "react";
import useUserStore from "../../store/userStore";
import { getPostingList, login } from "../../api/api";
import styled from "styled-components";
import PostingCard from "./template/PostingCard";
import { convertToKoreanFormat } from "../../utils/time";
import { useQuery } from "@tanstack/react-query";
import CustomLoading from "./template/CustomLoading";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import CustomModal from "../../components/CustomModal/CustomModal";
import RatingChart from "../../components/RatingChart/RatingChart";
import StarRating from "../../components/StarRating/StarRating";

const Container = styled.div``;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const NickName = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

function Main() {
  const { user, setUser, logOut } = useUserStore((state) => state);
  const { data, isLoading } = useQuery({
    queryKey: ["postingList"],
    queryFn: () =>
      getPostingList({
        nationCode: "",
        cityCode: "",
        writerNickname: "",
        title: "",
        page: 0,
      }),
    staleTime: 5000, // 1분 // 데이터가 신선함을 유지하는 시간. 유지되는 기간동안 다시 마운트 될 때, 데이터를 재요청하지 않음. 해당 시간이 지나게 되면 stale 상태가 됨.
    enabled: user.userId !== null, // 해당 조건일 경우에만 실행되도록
  });
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };

  const handleLogin = async () => {
    const response = await login({
      email: name,
      password: pw,
    });

    const token = response.headers.authorization;
    const data = response.data;

    setUser(data);
    if (token) {
      localStorage.setItem("token", token.slice(7));
    } else {
      console.error("Token is undefined.");
    }
  };

  return (
    <Container>
      <StarRating />
      <RatingChart
        level="movieGod"
        ratingArray={[5, 7, 0, 3, 8, 7, 16, 24, 15, 18]}
      />
      <br></br>
      <button onClick={() => setModal(true)}>모달 열기</button>
      <CustomModal
        modal={modal}
        modalClose={handleClose}
        title="뱃지 획득 조건"
        reviewModal
        large
      ></CustomModal>
      <button onClick={() => navigate("/detail")}>디테일 페이지로</button>
      {user.userId === null ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </div>
      ) : (
        <>
          <div>
            <ProfileImg alt="/Default Profile.png" src={user.profile} />
            <NickName>{user.nickName}</NickName>
            <button onClick={() => logOut()}>로그아웃</button>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? (
              <CustomLoading />
            ) : (
              data?.data?.content?.map((item) => (
                <PostingCard
                  key={item.postingId}
                  title={item.title}
                  mainImg={item.mainImgUrl}
                  content={item.content}
                  commentsCount={item.commentCnt}
                  createAt={convertToKoreanFormat(item.createdAt)}
                  isMine={false}
                  nickname={item.writerNickname}
                  profileImg={item.profile}
                  width="250px"
                />
              ))
            )}
          </div>
        </>
      )}
    </Container>
  );
}

export default Main;
