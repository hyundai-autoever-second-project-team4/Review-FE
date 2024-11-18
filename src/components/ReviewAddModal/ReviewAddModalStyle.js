import styled from "styled-components";
import theme from "../../styles/theme";

export const StarContainer = styled.div`
  padding: 0 8px 10px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${theme.colors.gray2};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ReviewInput = styled.textarea`
  border-style: none;
  width: 100%;
  height: 200px;
  margin: 12px;
  padding: 8px;
  resize: none;
`;

export const StyledLine = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.gray2};
  margin-bottom: 12px;
`;

export const MaxTextInfo = styled.div`
  font-family: "Noto Sans KR";
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeight.regular};
  margin: 8px 0 8px;
`;

export const CheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const CheckBoxWrap = styled.div`
  width: ${({ $large, $Mobile }) =>
    $large
      ? `25%`
      : $Mobile
      ? `50%`
      : `33%`}; /* 4,3개가 들어갈 수 있도록 너비 설정 (여백 고려) */
  margin-bottom: 8px; /* 아래쪽 여백 추가 */
  display: flex;
  align-items: center;
  gap: ${({ $large }) => ($large ? `8px` : `2px`)};
`;

export const TagText = styled.div`
  width: 122px;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-weight: ${theme.fontWeight.regular};
  margin-right: ${({ $large }) => ($large ? `8px` : `0px`)};
`;

export const TagCheckBox = styled.input`
  display: none; /* 기본 체크박스 숨기기 */
`;

export const StyledCheckBox = styled.label`
  background-color: white;
  width: 22px;
  height: 22px;
  border: 3px solid ${theme.colors.primary};
  border-radius: 5px;
  display: inline-block;
  position: relative;
  cursor: pointer;

  /* 체크박스가 체크되었을 때의 스타일 */
  ${TagCheckBox}:checked + & {
    background-color: ${theme.colors.primary}; /* 체크된 상태의 배경색 */
  }

  /* 체크 표시 추가 */
  ${TagCheckBox}:checked + &::after {
    content: "✔"; /* 체크 표시 문자 */
    position: absolute;
    top: 0; /* 위쪽 중앙 */
    left: 0; /* 왼쪽 중앙 */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px; /* 체크 표시 크기 조정 */
    color: white; /* 체크 표시 색상 */
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SpoilerContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SpoilerText = styled.div`
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-weight: ${theme.fontWeight.bold};
  margin: 0 12px;
`;

export const SpoilerCheckBox = styled.input`
  display: none; /* 기본 체크박스 숨기기 */
`;

export const StyledSpoilerCheckBox = styled.label`
  background-color: white;
  width: 22px;
  height: 22px;
  border: 3px solid ${theme.colors.black};
  border-radius: 5px;
  display: inline-block;
  position: relative;
  cursor: pointer;

  /* 체크박스가 체크되었을 때의 스타일 */
  input[type="checkbox"]:checked + & {
    background-color: ${theme.colors.black}; /* 체크된 상태의 배경색 */
  }

  /* 체크 표시 추가 */
  input[type="checkbox"]:checked + &::after {
    content: "✔"; /* 체크 표시 문자 */
    position: absolute;
    top: 0; /* 위쪽 중앙 */
    left: 0; /* 왼쪽 중앙 */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px; /* 체크 표시 크기 조정 */
    color: white; /* 체크 표시 색상 */
  }
`;

export const SubmitBtn = styled.button`
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR";
  width: 54px;
  height: 36px;
  color: white;
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.regular};
  text-align: center;
  border-radius: 8px;
  background-color: ${theme.colors.primary};
  &:hover {
    background-color: ${theme.colors.primaryColor4};
  }
`;
