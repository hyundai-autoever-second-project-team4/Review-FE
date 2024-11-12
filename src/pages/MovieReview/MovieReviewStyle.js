import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

export const HeaderTextContainer = styled.div`
  padding: 12px 0;
  width: 1320px;
  display: flex;
  @media (max-width: 1320px) {
    padding: 12px 20px;
    width: 100%; /* 화면이 1320px 이하일 때 너비를 100%로 설정 */
    max-width: 1320px; /* 최대 너비를 1320px로 제한 */
  }
`;

export const HeaderText = styled.div`
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
`;

export const HeaderBackground = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    to right,
    ${theme.colors.primaryColor3},
    ${theme.colors.primary}
  );
`;

export const DropDownContainer = styled.div`
  padding: 12px 0;
  width: 1320px;
  display: flex;
  font-weight: ${theme.fontWeight.bold};
  @media (max-width: 1320px) {
    padding: 12px 20px;
    width: 100%; /* 화면이 1320px 이하일 때 너비를 100%로 설정 */
    max-width: 1320px; /* 최대 너비를 1320px로 제한 */
  }
`;

export const ReviewContainer = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;
