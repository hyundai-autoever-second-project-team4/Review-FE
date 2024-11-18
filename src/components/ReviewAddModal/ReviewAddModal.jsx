import React, { useEffect, useState } from "react";
import CustomModal from "./../CustomModal/CustomModal";
import StarRating from "./../StarRating/StarRating";
import {
  BottomContainer,
  CheckBoxContainer,
  CheckBoxWrap,
  InputContainer,
  MaxTextInfo,
  ReviewInput,
  SpoilerCheckBox,
  SpoilerContainer,
  SpoilerText,
  StarContainer,
  StyledCheckBox,
  StyledLine,
  StyledSpoilerCheckBox,
  SubmitBtn,
  TagCheckBox,
  TagText,
} from "./ReviewAddModalStyle";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import Swal from "sweetalert2";

const tagList = [
  { id: 1, tagName: "👨‍👩‍👧‍👦 가족과 함께" },
  { id: 2, tagName: "❤️ 연인과 함께" },
  { id: 3, tagName: "👬 친구와 함께" },
  { id: 4, tagName: "👻 무서워요" },
  { id: 5, tagName: "🤣 코믹해요" },
  { id: 6, tagName: "😭 눈물나요ㅠ" },
  { id: 7, tagName: "😴 킬링 타임용" },
  { id: 8, tagName: "🍿 극장에서 보세요" },
  { id: 9, tagName: "🏠 집에서 보기 좋은" },
  { id: 10, tagName: "🦹‍♂️ 슈퍼 블록버스터" },
  { id: 11, tagName: "🎶 음악이 좋은" },
  { id: 12, tagName: "🎨 예술적인" },
];

function ReviewAddModal({ modalClose, movieTitle, refetch }) {
  const { movieId } = useParams();
  const [rate, setRate] = useState(5);
  const [isSpoiler, setIsSpoiler] = useState(false); // 스포일러 체크 상태 관리
  const [content, setContent] = useState("");
  const [islargeScreen, setIslargeScreen] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIslargeScreen(window.innerWidth > 854);
      setIsMobileScreen(window.innerWidth < 538);
    };

    // 초기 화면 크기 체크
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [checkedTags, setCheckedTags] = useState(
    new Array(tagList.length).fill(false)
  );
  const [placeholder, setPlaceholder] = useState(
    "이 작품에 대한 리뷰를 자유롭게 적어주세요."
  ); // placeholder 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewData = {
        movieId: parseInt(movieId),
        starRate: rate,
        content: content,
        spoiler: isSpoiler,
        tagIds: getSelectedTagIds(), // 선택된 태그 ID 배열 추가
      };

      const response = await axiosInstance.post("/review", reviewData);

      if (response.status === 200 || response.status === 201) {
        // 성공적으로 제출됨
        modalClose(); // 모달 닫기
        Swal.fire({
          text: `"${movieTitle}" 에 대한 리뷰 작성이 완료되었습니다!\n\n리뷰 작성으로 👍띠어력 10점👍을 드렸으며,\n\n리뷰 수정은 불가하고 삭제 시 10점 감소합니다.`,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then(() => {
          refetch();
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
      // 에러 처리 - 사용자에게 에러 메시지 표시 등
    }
  };

  const handleSpoilerChange = () => {
    setIsSpoiler((prev) => !prev); // 스포일러 체크 상태 토글
  };

  const handleTagChange = (index) => {
    const newCheckedTags = [...checkedTags];
    const isChecked = newCheckedTags[index];

    // 체크된 개수 계산
    const checkedCount = newCheckedTags.filter(Boolean).length;

    if (isChecked) {
      // 체크 해제
      newCheckedTags[index] = false;
    } else {
      // 체크하려는 경우, 이미 3개가 체크되어 있으면 체크하지 않음
      if (checkedCount < 3) {
        newCheckedTags[index] = true;
      }
    }

    setCheckedTags(newCheckedTags);
  };

  // 선택된 태그 ID들을 배열로 반환하는 함수
  const getSelectedTagIds = () => {
    return checkedTags
      .map((checked, index) => (checked ? tagList[index].id : null))
      .filter((id) => id !== null);
  };

  const handleFocus = () => {
    setPlaceholder(""); // 포커스 시 placeholder 비우기
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setPlaceholder("이 작품에 대한 리뷰를 자유롭게 적어주세요."); // 포커스 해제 시 입력이 없으면 placeholder 복원
    }
  };

  return (
    <CustomModal
      modal={true}
      title={
        isMobileScreen ? (
          <span>
            {movieTitle}
            <br />
            리뷰 남기기
          </span>
        ) : (
          `"${movieTitle}" 리뷰 남기기`
        )
      }
      large={islargeScreen}
      modalClose={modalClose}
    >
      <form onSubmit={handleSubmit}>
        <StarContainer>
          <StarRating readOnly={false} rate={rate} setRating={setRate} />
        </StarContainer>
        <InputContainer>
          <ReviewInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder} // placeholder 상태 사용
            onFocus={handleFocus} // 포커스 이벤트 핸들러
            onBlur={handleBlur} // 블러 이벤트 핸들러
          />
        </InputContainer>
        <StyledLine />
        <MaxTextInfo>태그는 최대 3개까지 선택 가능합니다</MaxTextInfo>
        <CheckBoxContainer>
          {tagList.map((tag, index) => (
            <CheckBoxWrap
              key={index}
              $large={islargeScreen}
              $Mobile={isMobileScreen}
            >
              <TagText $large={islargeScreen}>{tag.tagName}</TagText>
              <TagCheckBox
                type="checkbox"
                name={`tag-${index}`}
                value={tag}
                id={`tag-${index}`}
                checked={checkedTags[index]}
                onChange={() => handleTagChange(index)}
                disabled={
                  checkedTags.filter(Boolean).length >= 3 && !checkedTags[index]
                } // 3개 이상 체크된 경우 비활성화
              />
              <StyledCheckBox
                htmlFor={`tag-${index}`}
                style={{
                  cursor:
                    checkedTags.filter(Boolean).length >= 3 &&
                    !checkedTags[index]
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    checkedTags.filter(Boolean).length >= 3 &&
                    !checkedTags[index]
                      ? 0.2
                      : 1,
                }}
              />
            </CheckBoxWrap>
          ))}
        </CheckBoxContainer>
        <BottomContainer>
          <SpoilerContainer>
            <SpoilerText>스포일러 포함</SpoilerText>
            <SpoilerCheckBox
              type="checkbox"
              id="spoiler-checkbox" // 고유한 ID 설정
              checked={isSpoiler} // 체크 상태 연결
              onChange={handleSpoilerChange} // 상태 변경 핸들러 연결
            />
            <StyledSpoilerCheckBox htmlFor="spoiler-checkbox" />
          </SpoilerContainer>
          <SubmitBtn>작성</SubmitBtn>
        </BottomContainer>
      </form>
    </CustomModal>
  );
}

export default ReviewAddModal;
