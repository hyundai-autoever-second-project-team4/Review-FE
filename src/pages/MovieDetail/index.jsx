import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MovieDetailStyle";
import Button from "../../components/Button/Button";
import StarRating from "../../components/StarRating/StarRating";
import RatingChart from "../../components/RatingChart/RatingChart";

const profileData = [
  {
    name: "노윤서",
    role: "출연",
    imageUrl: "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202207%2F20220719140508638.jpg"
  },
  ...Array(4).fill({
    name: "노윤서",
    role: "출연",
    imageUrl: "https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202207%2F20220719140508638.jpg"
   
  }),
];

function MovieDetail() {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(-1);
  };
  return (
    <div>
      
      <S.Container>
        <S.BackImg>
        <img src="https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F10%2F29%2F6955135%2Fhigh.jpg&w=1920&q=75"/>
          
        </S.BackImg>
        <S.Content>
        <S.MovieWrap>


        <S.PosterSection>
          <S.Poster src="https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F11%2F7%2F6971176%2Fhigh.jpg&w=1920&q=75" alt="Poster" />
        </S.PosterSection>
          <S.MovieInfo>
            <div style={{width:"100%",display:"flex", height:"160px", justifyContent:"space-between"}}>
              <S.MainInfo>
                <S.Title>청설</S.Title>
                <S.SubInfo>
                  <S.SubText>{"2024.11.06"}</S.SubText>
                  <S.SubText>{"로맨스"}</S.SubText>
                  <S.SubText>{"한국"}</S.SubText> 
                </S.SubInfo>
              </S.MainInfo>
              <S.StarInfo>
                <div style={{display:"flex", gap:"16px"}}>
                <Button color={"primary"} >리뷰작성</Button>
                <StarRating readOnly rate={3.5}></StarRating>
                </div>
                <S.Tags>
                  <S.Tag>🏠 집에서 보기 좋은</S.Tag>
                  <S.Tag>💥 슈퍼 블록버스터</S.Tag>
                  <S.Tag>🎶 음악이 좋은</S.Tag>
                </S.Tags>
              </S.StarInfo>
            </div>
            <S.Description>
              대학생활을 끝냈지만 하고 싶은 것도, 되고 싶은 것도 없어 고민하던 용준. 엄마의 등쌀에 떠밀려 억지로 도시락 배달 알바를 한 장으로 완벽한 이상형 여름을 마주친다...
            </S.Description>
          </S.MovieInfo>
        
          
          <S.ChartSection>
            <S.AvgRating>
              <div>평균별점<strong>3.3</strong>(1369명)</div>
            </S.AvgRating>
            {/* <div>평균별점 3.3 (1369)</div> */}
          <RatingChart ratingArray={[1,2,3,3,3,5,5,5,5,5]} level={"movieGod"}></RatingChart>
          </S.ChartSection>
        
        </S.MovieWrap>


        <S.ProfileCont>
          <S.Title>출연/제작</S.Title>
          
          <S.ProfileWrap>
            {profileData.map((profile, index) => (
              <S.Profile key={index}>
                <S.ProfileImg src={profile.imageUrl} alt={profile.name} />
                <S.ProfileInfo>
                  <S.SubText>{profile.name}</S.SubText>
                  <S.Role>{profile.role}</S.Role>
                </S.ProfileInfo>
              </S.Profile>
            ))}
          </S.ProfileWrap>
          
        </S.ProfileCont>
      </S.Content>
      </S.Container>  
      
    </div>
  );
}

export default MovieDetail;
