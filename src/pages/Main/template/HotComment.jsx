import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Review from "../../../components/Review/Review";
import theme from "../../../styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import DynamicSVG from "../../../components/DynamicSVG/DynamicSVG";
import arrowLeft from "../../../assets/svg/arrow-left.svg";
import arrowRight from "../../../assets/svg/arrow-right.svg";
import { matchToTier } from "../../../utils/matchToTier";

const Container = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.p`
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 16px;

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
  height: 100%;
`;

function HotComment({ reviewData }) {
  const [groupSize, setGroupSize] = useState(5);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // 화면 크기에 따라 groupSize를 설정하는 함수
    const updateGroupSize = () => {
      if (window.innerWidth <= 640) {
        setGroupSize(2);
      } else if (window.innerWidth <= 960) {
        setGroupSize(3);
      } else if (window.innerWidth <= 1320) {
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
    <Container>
      <Title>오늘 HOT한 리뷰</Title>
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
              nextEl: `.swiper-button-next-comment`,
              prevEl: `.swiper-button-prev-comment`,
            }}
            modules={[Navigation]}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
          >
            {reviewData.map((review) => (
              <SwiperSlide key={review.reviewId}>
                <Review
                  reviewId={review.reviewId}
                  level={review.memberTierImg}
                  starRate={review.starRate}
                  profileName={review.memberName}
                  profileImg={review.memberProfileImg}
                  content={review.content}
                  isBlur={review.spoiler}
                  theUpCnt={review.ThearUpCount}
                  theDownCnt={review.ThearDownCount}
                  theIsUp={review.isThearUp}
                  theIsDown={review.isThearDown}
                  commentCnt={review.commentCount}
                  upClick={() => console.log(review.reviewId)}
                  downClick={() => console.log(review.reviewId)}
                  movieName={review.movieTitle}
                  queryKeyType={"hotReview"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Slide>
        <ButtonWrapper>
          <PrevButton
            className={`swiper-button-prev-comment`}
            $isBeginning={isBeginning}
          >
            <DynamicSVG
              width={18}
              color={theme.colors.black}
              svgUrl={arrowLeft}
            />
          </PrevButton>

          <NextButton className={`swiper-button-next-comment`} $isEnd={isEnd}>
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

export default HotComment;
