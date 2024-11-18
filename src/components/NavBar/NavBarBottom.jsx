import React, { useState } from "react";
import styled from "styled-components";
import ranking from "../../assets/svg/ranking.svg";
import rankingD from "../../assets/svg/rankingD.svg";
import star2 from "../../assets/svg/star2.svg";
import starD from "../../assets/svg/starD.svg";
import video from "../../assets/svg/video-square.svg";
import videoD from "../../assets/svg/video-squareD.svg";
import theme from "../../styles/theme";

const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 60px;
  background-color: #fff;
  position: fixed;
  z-index: 1000;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonWrap = styled.div`
  width: 56px;
  height: 56px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 11px;
  gap: 4px;
  color: ${theme.colors.gray3};

  cursor: pointer;

  p {
    font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
    color: ${({ $isSelected }) => $isSelected && `${theme.colors.black}`};
  }
`;

function NavBarBottom({ moveToPlaying, moveToPopular, moveToRanking }) {
  const [selected, setSelected] = useState(0);

  const handleButtonClick = (index, callback) => {
    setSelected(index);
    callback();
  };

  return (
    <Container>
      <ButtonWrap
        onClick={() => handleButtonClick(1, moveToPlaying)}
        $isSelected={selected === 1}
      >
        <img
          src={selected === 1 ? video : videoD}
          width={32}
          height={32}
          alt=""
        />
        <p>현재 상영중</p>
      </ButtonWrap>
      <ButtonWrap
        onClick={() => handleButtonClick(2, moveToPopular)}
        $isSelected={selected === 2}
      >
        <img
          src={selected === 2 ? star2 : starD}
          width={32}
          height={32}
          alt=""
        />
        <p>인기 영화</p>
      </ButtonWrap>
      <ButtonWrap
        onClick={() => handleButtonClick(3, moveToRanking)}
        $isSelected={selected === 3}
      >
        <img
          src={selected === 3 ? ranking : rankingD}
          width={32}
          height={32}
          alt=""
        />
        <p>랭킹</p>
      </ButtonWrap>
    </Container>
  );
}

export default NavBarBottom;
