import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;
export const MovieInfoCont = styled.div`
  width: 100%;
  /* max-width: 800px; */
  display: flex;
  gap: 16px;
  padding-right: 16px;

  @media (max-width: 1320px) {
    padding-left: 8px;
    padding-right: 8px;
    /* max-width: 800px; */
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: 100%; /* 가로로 공간 채우기 */
  }
`;
export const BackImg = styled.div`
  width: 98.9vw;
  height: 550px;
  overflow: hidden;

  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-position: center; /* 이미지를 중앙에 위치 */
  background-size: cover; /* 이미지를 전체에 꽉 채움 */
  background-repeat: no-repeat;

  background-position: 50%;
`;

export const MobileBackImg = styled.div`
  width: 100vw;
  height: 300px;
  overflow: hidden;

  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-position: center; /* 이미지를 중앙에 위치 */
  background-size: cover; /* 이미지를 전체에 꽉 채움 */
  background-repeat: no-repeat;

  background-position: 50%;
`;

export const MobileInfoHeader = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

export const MobilePoster = styled.img`
  width: 140px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

export const MobileTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const MobileStarSubText = styled.strong`
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
`;

export const MobileTitle = styled.div`
  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 10px;
`;

export const MobileSubText = styled.div`
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.gray3};
`;

export const MobileRatingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MobileOverviewText = styled.div`
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  padding: 16px;
  line-height: 24px;
`;

export const MobileTagWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Content = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  @media (max-width: 1320px) {
    width: 100%;
    padding: 0 16px;
  }
`;

export const MovieWrap = styled.div`
  display: flex;
  margin-top: 20px;
  width: 1320px;
  justify-content: space-between;
  /* gap: 16px; */
  margin-left: 16px;

  @media (max-width: 1200px) {
    flex-direction: column; /* 작은 화면에서 수직 배열 */
    justify-content: flex-start; /// center냐 뭐냐 뭐가 맞냐
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const PosterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Poster = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  /* background-color: yellow; */
  /* margin-right: 16px; */
  //justify-content: space-between;
`;

export const StarWrap = styled.div`
  display: flex;
  gap: 16px;

  flex-direction: column;
`;

export const MainInfo = styled.div`
  width: 100%;
  display: flex;
  /* height: 1px; */
  justify-content: space-between;

  flex-direction: row;
`;
export const StarInfo = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: space-between;
  /* min-width: 600px; */
  width: 100%;
  /* max-width: 600px; */
  position: relative;

  /* opacity: 0.7; */
`;

export const Title = styled.h1`
  font-size: ${theme.fontSizes.h2};
  line-height: 32px;
  font-weight: bold;
  width: 60%;
  margin-bottom: 16px;
`;

export const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.gray1};
  font-weight: bold;
  gap: 8px;

  /* opacity: 0.8; */
`;

export const SubText = styled.div`
  font-size: ${theme.fontSizes.sub1};
  color: ${theme.colors.gray3};
  font-weight: bold;
`;

export const SubTextMargin = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.black};
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: ${theme.fontSizes.sub1};
  color: ${theme.colors.gray3};
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const Tags = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;

  flex-direction: column; // 태그 세로배치
`;

export const Tag = styled.span`
  background-color: ${theme.colors.gray2};

  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9em;
  color: #666;
`;

export const ReviewSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid #ddd;
`;

export const ReviewButton = styled.button`
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
`;

export const AvgRating = styled.div`
  font-size: 20px;
  margin-top: 16px;
  font-weight: 500;
  color: ${theme.colors.black};
  strong {
    font-size: ${theme.fontSizes.h2};
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

export const ChartSection = styled.div`
  //width: 100%;
  display: flex;
  height: 300px;
  border: 1px solid #bdbdbd;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  //width: 500px;
  padding: 0 16px;
  border-radius: 10px;

  @media (max-width: 1200px) {
    width: 100%; /* 작은 화면에서 전체 너비 사용 */
  }
`;

export const SkeletonChartSection = styled.div`
  display: flex;
  height: 300px;
  flex-direction: column;

  //width: 400px;
  padding: 0 16px;
  border-radius: 10px;
  width: 45vw;

  @media (max-width: 1200px) {
    width: 100%; /* 작은 화면에서 전체 너비 사용 */
  }
`;
export const ProfileCont = styled.div`
  width: 100%;
  display: flex;
  /* align-self: flex-start; */
  /* justify-content: space-between; */
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 24px;

  @media (max-width: 1320px) {
    /* padding: 0 16px; */
  }
`;
export const ProfileWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  width: 100%;
  flex-wrap: wrap; /* 줄어들면 아래로 배치 */
  gap: 16px;
  margin: 0 auto;
`;
export const Profile = styled.div`
  display: flex;
  /* width: 240px; */

  position: relative;

  flex-basis: calc((100% - 64px) / 5);

  @media (max-width: 1320px) {
    flex-basis: calc((100% - 48px) / 4);
  }
  @media (max-width: 960px) {
    flex-basis: calc((100% - 32px) / 3);
  }
  @media (max-width: 640px) {
    flex-basis: calc((100% - 16px) / 2);
  }
  @media (max-width: 480px) {
    flex-basis: calc(100%);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray2}; /* 원하는 색상으로 설정 */
  }
`;
export const ProfileImg = styled.img`
  width: 88px;
  /* height: 108px; */
  aspect-ratio: 1/ 1.3;
  margin-right: 16px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #d3d3d3; /* 회색 배경 */
  display: block; /* 이미지가 없을 때 배경이 보이도록 설정 */
`;

export const Role = styled.div`
  font-weight: 500;
  font-size: ${theme.fontSizes.sub2};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

// 리뷰 영역

export const ReviewCont = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  margin-bottom: 24px;
  ////

  width: 100%;
  /* max-width: 1320px; */

  @media (max-width: 1320px) {
    /* padding: 0 16px; */
  }
`;

export const ReviewTitleWrap = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin-bottom: 16px;
  justify-content: space-between;
  width: 100%;
`;

export const ReviewWrap = styled.div`
  display: flex;
  max-width: 1320px;
  width: 100%;

  overflow-x: auto;
  /* padding: 0 16px; */
  overflow-y: hidden; ///
  gap: 16px;
  flex-wrap: ${({ $isMobile }) =>
    $isMobile ? `nowrap` : `wrap`}; /* 화면이 줄어들면 아래로 배치 */
  //////////
`;

export const GalleryCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 16px;
  margin-top: 20px;
  //width: 1320px;
  justify-content: space-between;

  //////
  width: 100%;
  max-width: 1320px;

  margin: 0 auto;
`;

export const CardWrapper = styled.div`
  flex-basis: calc((100% - 64px) / 5); /* 기본 너비 설정 */

  /* min-width: 250px; 카드의 고정 너비 */

  /////////////
  @media (max-width: 1320px) {
    flex-basis: calc((100% - 48px) / 4);
  }
  @media (max-width: 960px) {
    flex-basis: calc((100% - 32px) / 3);
  }

  @media (max-width: 640px) {
    flex-basis: calc((100% - 16px) / 2);
  }
`;
