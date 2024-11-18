import React from "react";
import { Skeleton } from "@mui/material";
import * as S from "./MovieDetailStyle";

const SkeletonMovieDetail = () => {
  return (
    <>
      {/* <Skeleton variant="rectangular" width={210} height={118} />
      <div>sdfsdfksjfksjfksldfjslkf</div> */}

      <S.Container>
        <Skeleton variant="rectangular" width="100%" height={550}></Skeleton>
        <S.Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              //backgroundColor: "#f8f8f8",
              width: "98.9vw",
              marginBottom: "40px",
            }}
          >
            <S.MovieWrap>
              <S.MovieInfoCont>
                <S.PosterSection>
                  {/* 포스터이미지 */}
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={300}
                    sx={{ borderRadius: "10px" }}
                  ></Skeleton>
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
                      {/* <S.Title>{movieData.movieInfo.title}</S.Title> */}
                      <S.Title>
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "28px", height: "2.5rem" }}
                        />
                      </S.Title>
                      {/* <S.StarWrap>
                        {!movieData.isReviewed && (
                          <Button
                            onClick={handleWriteModalOpen}
                            style={{ height: "36px" }}
                            color={"primary"}
                          >
                            리뷰작성
                          </Button>
                        )}
                        <StarRating
                          readOnly
                          rate={movieData.reviewCountInfo.averageStarRate}
                        ></StarRating>
                      </S.StarWrap> */}
                    </S.MainInfo>
                    <S.StarInfo>
                      <S.SubInfo>
                        {/* <S.SubText>
                          <Skeleton
                            variant="text"
                            sx={{ width: "150px", height: "1.5rem" }}
                          />
                        </S.SubText>
                        <S.SubText>
                          <Skeleton
                            variant="text"
                            sx={{ width: "150px", height: "1.5rem" }}
                          />
                        </S.SubText>
                        <S.SubText>
                          <Skeleton
                            variant="text"
                            sx={{ width: "150px", height: "1.5rem" }}
                          />
                        </S.SubText> */}
                        <S.SubText>
                          <Skeleton
                            variant="text"
                            sx={{ width: "150px", height: "1.5rem" }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ width: "150px", height: "1.5rem" }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ width: "150px", height: "1.5rem" }}
                          />
                        </S.SubText>
                      </S.SubInfo>
                      {/* <S.Tags>
                        {movieData.tagInfoList.tags.map((tag, index) => (
                          <S.Tag key={index}>{tag.content}</S.Tag>
                        ))}
                      </S.Tags> */}
                    </S.StarInfo>
                  </div>

                  <S.Description>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "100%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "100%" }}
                    />
                  </S.Description>
                </S.MovieInfo>
              </S.MovieInfoCont>

              <S.SkeletonChartSection>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="300px"
                  sx={{
                    borderRadius: "10px",

                    "MuiSkeleton-root MuiSkeleton-rectangular MuiSkeleton-pulse css-xak1th-MuiSkeleton-root":
                      { height: "300px" },
                  }}
                ></Skeleton>
              </S.SkeletonChartSection>
            </S.MovieWrap>
          </div>
          <S.ProfileCont>
            <div style={{ width: "90vw" }}>
              <S.Title>
                <div style={{ display: "flex", alignSelf: "flex-start" }}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "180px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </S.Title>
              <S.ProfileWrap>
                {[...Array(5)].map((_, index) => (
                  <S.Profile key={index}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "88px",
                        height: "114px",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                    <S.ProfileInfo>
                      <S.SubTextMargin>
                        <Skeleton
                          variant="text"
                          sx={{ width: "88px", height: "1.5rem" }}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ width: "75px", height: "1.5rem" }}
                        />
                      </S.SubTextMargin>
                    </S.ProfileInfo>
                  </S.Profile>
                ))}
                {}
              </S.ProfileWrap>
            </div>
          </S.ProfileCont>

          {/* <S.ReviewCont>
            <S.ReviewTitleWrap>
              <S.Title>리뷰</S.Title>
              {movieData.reviewCountInfo.totalReviewCount > 5 && (
                <Button color={"primary"} onClick={handleMoreClick}>
                  더보기
                </Button>
              )}
            </S.ReviewTitleWrap>
            <S.ReviewWrap $isMobile={isMobile}>
              {movieData.reviewCountInfo.totalReviewCount > 0 ? (
                movieData.reviewInfoList.reviewInfos.map((review) => (
                  <S.CardWrapper key={review.reviewId}>
                    <Review
                      id={review.reviewId}
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
                      reviewId={review.reviewId}
                      memberId={review.memberId}
                      queryKeyType={["movieDetail", movieId]}
                      isWriter={review.isWriter}
                    />
                  </S.CardWrapper>
                ))
              ) : (
                <div>
                  아직 작성된 리뷰가 없습니다. 첫번째 리뷰를 달아주세요~^^
                </div>
              )}
            </S.ReviewWrap>
          </S.ReviewCont>

          <S.GalleryCont>
            <S.Title>갤러리</S.Title>
            <PhotoList photos={movieData.galleryInfoList.galleries}></PhotoList>
          </S.GalleryCont> */}
        </S.Content>
      </S.Container>
    </>
  );
};

export default SkeletonMovieDetail;
