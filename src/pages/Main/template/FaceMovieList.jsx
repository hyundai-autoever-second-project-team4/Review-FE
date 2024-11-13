import React, { useState } from "react";
import styled from "styled-components";
import FaceMovieCard from "./FaceMovieCard";
import theme from "../../../styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import DynamicSVG from "../../../components/DynamicSVG/DynamicSVG";
import arrowLeft from "../../../assets/svg/arrow-left.svg";
import arrowRight from "../../../assets/svg/arrow-right.svg";

const Container = styled.div`
  width: 100%;
  margin-bottom: 40px;
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
  height: calc(100%);
`;

function FaceMovieList({ movieData }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <Container>
      <SliderContainer>
        <Slide>
          <Swiper
            spaceBetween={16}
            speed={1500}
            lazy="true"
            slidesPerView={3}
            slidesPerGroup={3}
            allowTouchMove={false}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            navigation={{
              nextEl: `.swiper-button-next-face`,
              prevEl: `.swiper-button-prev-face`,
            }}
            modules={[Navigation, Autoplay]}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
          >
            {movieData.map((movie, index) => (
              <SwiperSlide key={index}>
                <FaceMovieCard
                  key={index}
                  index={index}
                  title={movie.title}
                  poster={movie.img}
                  year={movie.year}
                  country={movie.country}
                  genre={movie.genre}
                  type={"별점 높은 영화"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Slide>
        <ButtonWrapper>
          <PrevButton
            className={`swiper-button-prev-face`}
            $isBeginning={isBeginning}
          >
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl={arrowLeft}
            />
          </PrevButton>

          <NextButton className={`swiper-button-next-face`} $isEnd={isEnd}>
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl={arrowRight}
            />
          </NextButton>
        </ButtonWrapper>
      </SliderContainer>
    </Container>
  );
}

export default FaceMovieList;
