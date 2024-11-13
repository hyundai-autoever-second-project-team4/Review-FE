import React, { useState } from "react";
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

const tagList = [
  "👨‍👩‍👧‍👦 가족과 함께",
  "❤️ 연인과 함께",
  "👬 친구와 함께",
  "👻 무서워요",
  "🤣 코믹해요",
  "😭 눈물나요ㅠ",
  "😴 킬링 타임용",
  "🍿 극장에서 보세요",
  "🏠 집에서 보기 좋은",
  "🦹‍♂️ 슈퍼 블록버스터",
  "🎶음악이 좋은",
  "🎨예술적인",
];

function ReviewAddModal() {
  const [rate, setRate] = useState(5);
  const [isSpoiler, setIsSpoiler] = useState(false); // 스포일러 체크 상태 관리
  const [checkedTags, setCheckedTags] = useState(
    new Array(tagList.length).fill(false)
  );
  const [placeholder, setPlaceholder] = useState(
    "이 작품에 대한 리뷰를 자유롭게 적어주세요."
  ); // placeholder 상태 추가

  const handleSpoilerChange = () => {
    setIsSpoiler(!isSpoiler); // 스포일러 체크 상태 토글
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

  const handleFocus = () => {
    setPlaceholder(""); // 포커스 시 placeholder 비우기
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setPlaceholder("이 작품에 대한 리뷰를 자유롭게 적어주세요."); // 포커스 해제 시 입력이 없으면 placeholder 복원
    }
  };

  return (
    <CustomModal modal={true} title={"너의 이름은"} large>
      <StarContainer>
        <StarRating readOnly={false} rate={rate} setRating={setRate} />
      </StarContainer>
      <InputContainer>
        <ReviewInput
          placeholder={placeholder} // placeholder 상태 사용
          onFocus={handleFocus} // 포커스 이벤트 핸들러
          onBlur={handleBlur} // 블러 이벤트 핸들러
        />
      </InputContainer>
      <StyledLine />
      <MaxTextInfo>태그는 최대 3개까지 선택 가능합니다</MaxTextInfo>
      <CheckBoxContainer>
        {tagList.map((tag, index) => (
          <CheckBoxWrap key={index}>
            <TagText>{tag}</TagText>
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
                  checkedTags.filter(Boolean).length >= 3 && !checkedTags[index]
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  checkedTags.filter(Boolean).length >= 3 && !checkedTags[index]
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
    </CustomModal>
  );
}

export default ReviewAddModal;
