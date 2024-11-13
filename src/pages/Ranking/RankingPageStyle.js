import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

export const HeaderBackground = styled.div`
  width: 100%;
  height: 128px;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    to right,
    ${theme.colors.primaryColor3},
    ${theme.colors.primary}
  );
`;

export const HeaderTextBox = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 40px 0 40px;
`;

export const HeaderTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 6px;
`;

export const HeaderSubText = styled.div`
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
`;

export const TabBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TabContainer = styled.div`
  width: 1224px;
  margin: 0 40px 0 40px;
`;

export const TabTextWrap = styled.div`
  width: 454px;
  display: flex;
  justify-content: space-between;
`;

export const TabText = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 56px;
  font-size: ${theme.fontSizes.md};
  font-weight: ${(props) =>
    props.$isClicked ? theme.fontWeight.bold : theme.fontWeight.regular};
  border-bottom: ${(props) =>
    props.$isClicked
      ? "2px solid" + theme.colors.black
      : "2px solid transparent"};
  &:hover {
    font-weight: ${theme.fontWeight.bold};
    border-bottom: 2px solid ${theme.colors.black};
  }
`;

export const RankingBox = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
`;

export const RankingContainer = styled.div`
  width: 1224px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RankingContentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 56px;
  border-bottom: 1px solid ${theme.colors.gray2};
`;

export const RankingHeaderRankText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 6.53%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;

export const RankingHeaderNicknameText = styled.div`
  display: flex;
  justify-content: center;
  width: 42.5%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;

export const RankingHeaderReviewText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 6.51%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;

export const RankingHeaderUPText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 12%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;

export const RankingHeaderCommentText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 14%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;

export const RankingHeaderScoreText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 13%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.regular};
`;

export const RankingMemberRankText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 6.53%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const RankingMemberNicknameText = styled.div`
  display: flex;
  justify-content: center;
  width: 42.5%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const RankingMemberTierImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

export const RankingMemberProfileImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

export const RankingMemberReviewText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 6.51%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const RankingMemberUPText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 12%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const RankingMemberCommentText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 14%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const RankingMemberScoreText = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 13%;
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.bold};
`;
