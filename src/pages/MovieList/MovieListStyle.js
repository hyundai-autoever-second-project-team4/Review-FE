import styled from "styled-components";
import theme from "../../styles/theme";

export const EveryContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.black};
`;

export const TitleWrap = styled.div`
  display: flex;
  width: 1320px;
  justify-items: flex-start;
  align-items: flex-start;
  margin: 32px 0 16px 0;
  @media (max-width: 1320px) {
    width: 90%;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1320px;
  margin: 20px 0 0 0;
  gap: 16px 16px;
  margin-bottom: 40px;
  @media (max-width: 1320px) {
    width: 90%;
  }
`;

export const CardWrapper = styled.div`
  flex-basis: calc((100% - 32px) / 3); /* 기본 너비 설정 */

  /* 작은 화면일 때 카드 크기 변경 */
  @media (max-width: 960px) {
    flex-basis: calc((100% - 16px) / 2); /* 화면 너비가 768px 이하일 때 2열 */
  }

  @media (max-width: 640px) {
    flex-basis: 100%; /* 화면 너비가 480px 이하일 때 1열 */
  }
`;

export const BottomMargin = styled.div`
  height: 40px;
`;
