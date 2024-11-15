import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; // Swiper 스타일 추가
import styled from "styled-components";

import { Navigation } from "swiper/modules";
import DynamicSVG from "../../components/DynamicSVG/DynamicSVG";
import arrowLeft from "../../assets/svg/arrow-left.svg";
import arrowRight from "../../assets/svg/arrow-right.svg";
import theme from "../../styles/theme";
const IMG_GALLERY_BASE_URL = "https://image.tmdb.org/t/p/w780"; // 이미지 베이스 URL

const phots = [
  {
    imageUrl:
      "https://thumb.mt.co.kr/06/2024/10/2024103011107259806_1.jpg/dims/optimize/",
  },
  ...Array(10).fill({
    imageUrl:
      "https://thumb.mt.co.kr/06/2024/10/2024103011107259806_1.jpg/dims/optimize/",
  }),
];

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1320px; /* 원하는 너비 제한 설정 */
  margin: 0 auto;
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
  ${({ $isEnd }) => $isEnd && `opacity: 0`}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: calc(100%);
`;

const PhotoCard = styled.div`
  width: 431px;
  height: 287px;
  border-radius: 16px;
  background-image: url(${(props) => props.$photourl});
  background-size: cover;
  background-position: center;
`;

function PhotoList({ photos }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div>
      <SliderContainer>
        <Slide>
          <Swiper
            spaceBetween={16}
            speed={1500}
            lazy="true"
            // slidesPerView={3}
            slidesPerView={"3"}
            slidesPerGroup={3}
            allowTouchMove={false}
            navigation={{
              nextEl: `.swiper-button-next`,
              prevEl: `.swiper-button-prev`,
            }}
            modules={[Navigation]}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
          >
            {photos.map((photoURL, index) => (
              <SwiperSlide key={index} style={{ width: "300px" }}>
                <PhotoCard
                  $photourl={IMG_GALLERY_BASE_URL + `${photoURL.galleryPath}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Slide>
        <ButtonWrapper>
          <PrevButton className="swiper-button-prev" $isBeginning={isBeginning}>
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl={arrowLeft}
            />
          </PrevButton>

          <NextButton className="swiper-button-next" $isEnd={isEnd}>
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl={arrowRight}
            />
          </NextButton>
        </ButtonWrapper>
      </SliderContainer>
    </div>
  );
}
export default PhotoList;
