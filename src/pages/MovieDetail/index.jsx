import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./MovieDetailStyle";
import Button from "../../components/Button/Button";
import StarRating from "../../components/StarRating/StarRating";
import RatingChart from "../../components/RatingChart/RatingChart";
import Review from "../../components/Review/Review";
import MovieSlider from "../Main/template/MovieSlider";
import PhotoList from "./PhotoList";
import { axiosInstance } from "../../api/axiosInstance";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"; // 이미지 베이스 URL
const IMG_BACK_BASE_URL = "https://image.tmdb.org/t/p/w1280"; // 이미지 베이스 URL

const reviewData = [
  {
    width: "100%",
    level: "newbie",
    proflieImg: "https://via.placeholder.com/50",
    profileName: "User1",
    content: "Great movie with unexpected twists!",
    isBlur: true,
    theUpCnt: 23,
    theDownCnt: 3,
    theIsUp: false,
    theIsDown: false,
    commentCnt: 5,
    starRate: 3.5,
    upClick: () => console.log("Upvote clicked for User1"),
    downClick: () => console.log("Downvote clicked for User1"),
  },
  ...Array(4).fill({
    width: "100%",
    level: "newbie",
    proflieImg: "https://via.placeholder.com/50",
    profileName: "User1",
    content: "Great movie with unexpected twists!",
    isBlur: false,
    theUpCnt: 23,
    theDownCnt: 3,
    theIsUp: true,
    theIsDown: false,
    commentCnt: 5,
    starRate: 3.5,
    upClick: () => console.log("Upvote clicked for User1"),
    downClick: () => console.log("Downvote clicked for User1"),
  }),
];

function MovieDetail() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetailData = async () => {
      try {
        const response = await axiosInstance.get(`/movie/${movieId}`);
        setMovieData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailData();
  }, [movieId]); // movieId가 변경될 때마다 데이터 가져오기

  const movieTitle = "베놈 : 더 라스트 댄스";
  const handleMoreClick = () => {
    navigate(`/movieReview/${movieId}`, {
      state: { movieTitle: movieData.movieInfo.title },
    });
  };
  console.log(movieData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie data: {error.message}</div>;
  }
  //releaseDate의 포멧 바꾸기
  const releaseDate = new Date(movieData.movieInfo.releaseDate);
  const formattedDate = `${releaseDate.getFullYear()}.${String(
    releaseDate.getMonth() + 1
  ).padStart(2, "0")}.${String(releaseDate.getDate()).padStart(2, "0")}`;

  // 감독과 출연진 정보를 통합하는 함수
  const combinedProfiles = [
    ...movieData.directorInfoList.directors.map((director) => ({
      id: director.directorId,
      name: director.name,
      imageUrl: director.profilePath,
      role: "감독", // 역할을 '감독'으로 설정
    })),
    ...movieData.actorInfoList.actors.map((actor) => ({
      id: actor.actorId,
      name: actor.name,
      imageUrl: actor.profilePath,
      role: actor.characterName, // 역할을 캐릭터 이름으로 설정
    })),
  ];

  return (
    <div>
      <S.Container>
        <S.BackImg
          backgroundImage={
            IMG_BACK_BASE_URL + `${movieData.movieInfo.backdropPath}`
          }
        />
        <S.Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#f8f8f8",
              width: "100vw",
              marginBottom: "40px",
            }}
          >
            <S.MovieWrap>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <S.PosterSection>
                  <S.Poster
                    src={IMG_BASE_URL + `${movieData.movieInfo.posterPath}`}
                    alt="Poster"
                  />
                </S.PosterSection>
                <S.MovieInfo>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      gap: "16px",

                      flexDirection: "column",
                    }}
                  >
                    <S.MainInfo>
                      <S.Title>{movieData.movieInfo.title}</S.Title>
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "center",
                          height: "36px",
                        }}
                      >
                        <Button style={{ height: "36px" }} color={"primary"}>
                          리뷰작성
                        </Button>
                        <StarRating readOnly rate={3.5}></StarRating>
                      </div>
                    </S.MainInfo>
                    <S.StarInfo>
                      <S.SubInfo>
                        <S.SubText>{formattedDate}</S.SubText>
                        <S.SubText>
                          {movieData.genreInfoList.genres.map(
                            (genre, index) => (
                              <span key={genre.genreId}>
                                {genre.name}
                                {index <
                                  movieData.genreInfoList.genres.length - 1 &&
                                  " / "}
                              </span>
                            )
                          )}
                        </S.SubText>
                        <S.SubText>
                          {movieData.movieInfo.originCountry}
                        </S.SubText>
                      </S.SubInfo>
                      <S.Tags>
                        <S.Tag>🏠 집에서 보기 좋은</S.Tag>
                        <S.Tag>💥 슈퍼 블록버스터</S.Tag>
                        <S.Tag>🎶 음악이 좋은</S.Tag>
                      </S.Tags>
                    </S.StarInfo>
                  </div>
                  <S.Description>{movieData.movieInfo.overview}</S.Description>
                </S.MovieInfo>
              </div>
              <S.ChartSection>
                <S.AvgRating>
                  <div>
                    평균별점<strong>3.3</strong>(1369명)
                  </div>
                </S.AvgRating>

                <RatingChart
                  ratingArray={[1, 2, 3, 3, 3, 0, 5, 5, 0, 5]}
                  level={"movieGod"}
                ></RatingChart>
              </S.ChartSection>
            </S.MovieWrap>
          </div>

          <S.ProfileCont>
            <S.Title>출연/제작</S.Title>

            <S.ProfileWrap>
              {combinedProfiles.map((profile, index) => (
                <S.Profile key={index}>
                  {profile.imageUrl ? (
                    <S.ProfileImg
                      src={IMG_BASE_URL + `${profile.imageUrl}`}
                      alt={profile.name}
                    />
                  ) : (
                    <S.ProfileImg src="/images/no_img.png" alt={profile.name} />
                  )}
                  <S.ProfileInfo>
                    <S.SubTextMargin>{profile.name}</S.SubTextMargin>
                    <S.Role>{profile.role}</S.Role>
                  </S.ProfileInfo>
                </S.Profile>
              ))}
            </S.ProfileWrap>
          </S.ProfileCont>

          <S.ReviewCont>
            <S.ReviewTitleWrap>
              <S.Title>리뷰</S.Title>
              <Button color={"primary"} onClick={handleMoreClick}>
                더보기
              </Button>
            </S.ReviewTitleWrap>
            <S.ReviewWrap>
              {reviewData.map((review, index) => (
                <Review
                  key={index}
                  level={review.level}
                  starRate={review.starRate}
                  profileName={review.profileName}
                  profileImg={review.profileImg}
                  content={review.content}
                  isBlur={review.isBlur}
                  theUpCnt={review.theUpCnt}
                  theDownCnt={review.theDownCnt}
                  theIsUp={review.theIsUp}
                  theIsDown={review.theIsDown}
                  commentCnt={review.commentCnt}
                  upClick={review.upClick}
                  downClick={review.downClick}
                />
              ))}
            </S.ReviewWrap>
          </S.ReviewCont>

          <S.GalleryCont>
            <S.Title>갤러리</S.Title>
            <PhotoList photos={movieData.galleryInfoList.galleries}></PhotoList>
          </S.GalleryCont>
        </S.Content>
      </S.Container>
    </div>
  );
}

export default MovieDetail;
