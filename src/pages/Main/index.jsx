import React, { useState } from "react";
import useUserStore from "../../store/userStore";
import { getPostingList, login } from "../../api/api";
import styled from "styled-components";
import PostingCard from "./template/PostingCard";
import { convertToKoreanFormat } from "../../utils/time";
import { useQuery } from "@tanstack/react-query";
import CustomLoading from "./template/CustomLoading";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/CustomModal/CustomModal";
import RatingChart from "../../components/RatingChart/RatingChart";
import StarRating from "../../components/StarRating/StarRating";
import Review from "../../components/Review/Review";

const Container = styled.div`
  padding: 20px;
  width: 1320px;
  @media (max-width: 1320px) {
    width: 90%;
  }
`;

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
  const [rating, setRating] = useState(0);
  const [upCnt, setUpCnt] = useState(15);
  const [isUp, setIsUp] = useState(true);
  const [downCnt, setDownCnt] = useState(6);
  const [isDown, setIsDown] = useState(false);
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
      <Review
        level="couchCritic"
        width="560px"
        proflieImg="./src/assets/images/default-image.png"
        profileName="사용자1asdadsadds"
        upCnt={upCnt}
        downCnt={downCnt}
        isUp={isUp}
        isDown={isDown}
        setUpCnt={setUpCnt}
        setDownCnt={setDownCnt}
        setIsUp={setIsUp}
        setIsDown={setIsDown}
        content={
          <div>
            병들어버린 마블이 자기비하적 반성과 함께 스스로에게 매콤한 불주사를
            한 방! 역대 마블 시리즈 중 가장 폭력적이고 잔인한 영화가 탄생했다.
            데드풀이 실사화 되는 순간부터 팬들이 기대했던 데드풀과 울버린의
            만남도 성사되었다. 하지만 이번 시리즈를 온전히 즐기려면 마블의 열혈
            팬이어야 한다는 진입장벽이 존재한다. 어벤져스,엑스맨, 판타스틱4,
            블레이드, 로키 시리즈와 더불어 디즈니와 20세기폭스의 관계, MCU의
            현재상황 등을 빠삭하게 알고 있어야 즐길 수 있는 웃음과 감동이 넘치기
            때문에 라이트 마블 팬에겐 그냥 산만하고 정신없는 영화로 느껴질 수
            있다. #엑스맨..그리고 MCU에 끼지 못한 잊혀진 과거 마블 캐릭터들에
            대한 헌정영화. #스파이더맨: 어크로스 더 유니버스의 멀티버스와 더
            수어사이드 스쿼드(2021)의 잔인함이 떠오르는.. #숀 레비 감독이 이렇게
            미친ㄴ이였나? ㅋ #엔딩 크레딧 이후 쿠키영상은 1개! 영화가 끝난
            후에도 귀에 맴도는 엔싱크의 "Bye Bye Bye" 오프닝과 미친듯이 웃긴
            쿠키 영상이 이 영화의 가장 인상적인 장면이기 때문에 꼭 봐야 한다!
          </div>
        }
        isBlur
      />
      <StarRating rate={rating} setRating={setRating} />
      <StarRating rate={3.3} readOnly />
      <RatingChart
        level="master"
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
