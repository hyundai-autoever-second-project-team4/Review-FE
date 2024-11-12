import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainMovieCard from "./MainMovieCard";
import theme from "../../../styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import DynamicSVG from "../../../components/DynamicSVG/DynamicSVG";

const Container = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 12px;

  @media (max-width: 960px) {
    font-size: 24px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Slide = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 16px;
`;

const PrevButton = styled.div`
  position: absolute;
  width: 34px;
  height: 34px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: -17px;
  transform: translateY(-50%);
  z-index: 10;
  box-shadow: 0 0 4px #0003;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${({ $isBeginning }) => $isBeginning && `opacity: 0`}
`;

const NextButton = styled.div`
  position: absolute;
  width: 34px;
  height: 34px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  right: -17px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 0 4px #0003;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${({ $isEnd }) => $isEnd && `opacity: 0`}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: calc(100% - 42px);
`;

function MovieSlider({ title, movieData, cnt }) {
  const [groupSize, setGroupSize] = useState(5);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    <Container cnt={cnt}>
      {cnt !== 4 && <Title>{title}</Title>}
      <SliderContainer>
        <Slide>
          <Swiper
            spaceBetween={16}
            speed={1500}
            lazy="true"
            slidesPerView={groupSize}
            slidesPerGroup={groupSize}
            allowTouchMove={false}
            navigation={{
              nextEl: `.swiper-button-next${cnt}`,
              prevEl: `.swiper-button-prev${cnt}`,
            }}
            modules={[Navigation]}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
          >
            {movieData.map((movie, index) => (
              <SwiperSlide key={index}>
                <MainMovieCard
                  key={index}
                  index={index}
                  title={movie.title}
                  poster={movie.img}
                  year={movie.year}
                  country={movie.country}
                  genre={movie.genre}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Slide>
        <ButtonWrapper>
          <PrevButton
            className={`swiper-button-prev${cnt}`}
            $isBeginning={isBeginning}
          >
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl="/src/assets/svg/arrow-left.svg"
            />
          </PrevButton>

          <NextButton className={`swiper-button-next${cnt}`} $isEnd={isEnd}>
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl="/src/assets/svg/arrow-right.svg"
            />
          </NextButton>
        </ButtonWrapper>
      </SliderContainer>
    </Container>
  );
}

export default MovieSlider;
