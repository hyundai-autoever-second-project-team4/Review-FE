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
  width: 1536px;
  height: 422px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
  
`;

export const MovieWrap = styled.div`
    display: flex;
    width: 1320px;
    justify-content: space-between;
    gap:16px;

`
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
  justify-content: center;
  //justify-content: space-between;
`;

export const MainInfo = styled.div`
    display: flex;
    /* height: 1px; */
    justify-content: space-between;
    flex-direction: column;

`
export const StarInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    
`


export const Title = styled.h1`
  font-size: ${theme.fontSizes.h2};
  font-weight: bold;
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
`

export const Description = styled.p`
  font-size: ${theme.fontSizes.sub1};
  color: ${theme.colors.gray3};
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const Tags = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
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
  font-size:20px;
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
`;

export const ProfileCont = styled.div`
 display: flex; 
 /* align-self: flex-start; */
 justify-content: space-between;
 flex-direction: column;
 height: 160px;
 `;
export const ProfileWrap = styled.div`
 display: flex;
 width: 1320px;
 justify-content: space-between;
 overflow-x: auto;
`
export const Profile = styled.div`
   display: flex;
   width: 240px;
   margin-right: 16px;
   position: relative; 
  
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
`;

export const Role=styled.div`
  font-weight: 500;
`;

export const ProfileInfo=styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

