import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

export const BackImg = styled.div`
  width: 98.9vw;
  height: 550px;
  overflow: hidden;

  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-position: center; /* 이미지를 중앙에 위치 */
  background-size: cover; /* 이미지를 전체에 꽉 채움 */
  background-repeat: no-repeat;

  background-position: 50%;
`;

export const Content = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
`;

export const MovieWrap = styled.div`
  display: flex;
  margin-top: 20px;
  width: 1320px;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 960px) {
    flex-direction: column; /* 작은 화면에서 수직 배열 */
    justify-content: flex-start; /// center냐 뭐냐 뭐가 맞냐
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
  //justify-content: space-between;
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 600px;
  position: relative;
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
  color: ${theme.colors.black};
  font-weight: bold;
  gap: 8px;
`;

export const SubText = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.black};
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
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 16px;
`;

export const Tag = styled.span`
  background-color: #f3f3f3;
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
  color: ${theme.colors.black};
  strong {
    font-size: ${theme.fontSizes.h3};
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

export const ChartSection = styled.div`
  //width: 100%;
  display: flex;
  height: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 560px;

  /* margin-top: 10px; */
  border-radius: 10px;
  @media (max-width: 960px) {
    width: 100%; /* 작은 화면에서 전체 너비 사용 */
  }
`;

export const ProfileCont = styled.div`
  display: flex;
  /* align-self: flex-start; */
  justify-content: space-between;
  flex-direction: column;
  height: 300px;
  margin-top: 20px;
  margin-bottom: 24px;
`;
export const ProfileWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  overflow-y: auto;
  /* width: 1320px; */

  width: 100%;
  max-width: 1320px;
  flex-wrap: wrap; /* 줄어들면 아래로 배치 */

  @media (max-width: 960px) {
    gap: 16px; /* 작은 화면에서 간격 추가 */
    justify-content: center; /* 가운데 정렬 */
  }
`;
export const Profile = styled.div`
  display: flex;
  width: 240px;
  margin-right: 16px;
  position: relative;
  margin-bottom: 10px;

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
  height: 108px;
  margin-right: 16px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #d3d3d3; /* 회색 배경 */
  display: block; /* 이미지가 없을 때 배경이 보이도록 설정 */
`;

export const Role = styled.div`
  font-weight: 500;
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
  /* align-self: flex-start; */
  /* justify-content: space-between; */
  flex-direction: column;
  margin-bottom: 24px;
  /* height: 160px; */
`;

export const ReviewTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ReviewWrap = styled.div`
  display: flex;
  width: 1320px;
  justify-content: space-between;
  overflow-x: auto;
  gap: 16px;
  flex-wrap: wrap; /* 화면이 줄어들면 아래로 배치 */

  @media (max-width: 960px) {
    gap: 16px; /* 작은 화면에서 간격 추가 */
    justify-content: center; /* 가운데 정렬 */
  }
`;

export const GalleryCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 16px;
  margin-top: 20px;
  width: 1320px;
  justify-content: space-between;
`;

export const CardWrapper = styled.div`
  flex-basis: calc((100% - 64px) / 5); /* 기본 너비 설정 */
`;
