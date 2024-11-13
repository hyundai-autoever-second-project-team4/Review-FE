import React, { useEffect, useState } from "react";
import {
  Container,
  DropDownContainer,
  HeaderBackground,
  HeaderText,
  HeaderTextContainer,
  ReviewContainer,
} from "./MovieReviewStyle";
import Review from "../../components/Review/Review";
import { Pagination } from "@mui/material";
import ReviewDetailModal from "../../components/ReviewDetailModal/ReviewDetailModal";

const sortOptions = [
  { value: "up", label: "UP 순" },
  { value: "latest", label: "최신 순" },
  { value: "highRating", label: "별점 높은 순" },
  { value: "lowRating", label: "별점 낮은 순" },
];

function MovieReview() {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewId, setReviewId] = useState(null);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    // 여기에 정렬 로직을 추가할 수 있습니다.
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 680);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModalOpen = (data) => {
    setReviewId(data);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <HeaderTextContainer>
        <HeaderText>"청설" 리뷰 목록</HeaderText>
      </HeaderTextContainer>
      <HeaderBackground>
        <DropDownContainer>
          <select value={selectedSort} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </DropDownContainer>
      </HeaderBackground>
      <ReviewContainer>
        {data.map((review, index) => (
          <Review
            key={index}
            width={isMobile ? "80%" : "640px"} // 화면 크기에 따라 width 설정
            id={review.id}
            level={review.level}
            starRate={review.starRate}
            profileImg={review.profileImg}
            profileName={review.profileName}
            content={review.content}
            isBlur={review.isBlur}
            theUpCnt={review.theUpCnt}
            theDownCnt={review.theDownCnt}
            commentCnt={review.commentCnt}
            contentClick={handleModalOpen}
          />
        ))}
      </ReviewContainer>
      <Pagination
        count={10}
        sx={{
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#F2B705",
          },
        }}
      />
      <ReviewDetailModal
        modalOpen={isModalOpen}
        modalClose={handleModalClose}
        id={reviewId}
      />
    </Container>
  );
}

export default MovieReview;

const data = [
  {
    id: 0,
    level: "movieGod",
    profileImg: "/src/assets/svg/levels/movieGod.svg",
    profileName: "림동연",
    starRate: "5.0",
    content:
      "1화, 최근 한국 드라마 중 이런 수준의 촬영이 있었나? 화면의 때깔과 밀도 자체에서 다른 차원을 보여준다. 2화, 압도적이 아니라 짓눌린다. 기술적인 완성도를 정서적으로 전달하는게 탁월. 3화, 변곡점 사건이 확장 타키와 미츠하가 서로의 이름을 잊은 장면이 다소 우스꽝스럽게 표현되었지만 대지진에 희생된 사람들도, 그 배에 타고 있던 학생들도 언젠가는 그렇게 잊혀질 것이다. 너의 '이름'은 그들과 우리를 이어주는 매듭 역할을 하며, 그들을 잊지 않길 바라는 소망을 나타낸다. 이 드라마는 정말 기대 이상이었어요! 캐릭터들이 매력적이고 스토리가 흥미진진합니다. 특히 2화의 반전은 정말 놀라웠어요. 특히 2화의 반전은 정말 놀라웠어요.",
    isBlur: false,
    theUpCnt: 100,
    theDownCnt: 3,
    commentCnt: 10,
  },
  {
    id: 1,
    level: "movieBuff",
    profileImg: "/src/assets/svg/levels/movieMaster.svg",
    profileName: "김하늘",
    starRate: "4.0",
    content:
      "이 드라마는 정말 기대 이상이었어요! 캐릭터들이 매력적이고 스토리가 흥미진진합니다. 특히 2화의 반전은 정말 놀라웠어요.",
    isBlur: false,
    theUpCnt: 50,
    theDownCnt: 1,
    commentCnt: 5,
  },
  {
    id: 2,
    level: "newbie",
    profileImg: "/src/assets/svg/levels/movieBuff.svg",
    profileName: "이수민",
    starRate: "3.5",
    content:
      "전반적으로 괜찮은 드라마지만, 몇몇 부분은 아쉬웠습니다. 특히 전개가 다소 느리게 느껴졌어요.",
    isBlur: false,
    theUpCnt: 20,
    theDownCnt: 2,
    commentCnt: 3,
  },
];
