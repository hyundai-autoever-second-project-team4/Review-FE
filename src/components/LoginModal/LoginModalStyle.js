import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

export const KakaoBtn = styled.button`
  background-color: #fee500; /* 카카오 브랜드 색상 */
  color: #3c1e1e; /* 텍스트 색상 */
  border: none;
  border-radius: 6px;
  padding: 10px 60px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fdd835; /* 호버 시 색상 변화 */
  }

  &:active {
    background-color: #fbc02d; /* 클릭 시 색상 변화 */
  }

  img {
    margin-right: 8px; /* 아이콘과 텍스트 간격 */
  }
`;
