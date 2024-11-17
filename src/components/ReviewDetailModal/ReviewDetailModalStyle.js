import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button/Button";

export const ContentContainer = styled.div`
  font-size: ${theme.fontSizes.sub1};
  color: ${theme.colors.gray3};
  font-weight: ${theme.fontWeight.regular};
  line-height: 30px;
  margin-bottom: 18px;
`;

export const UpDownContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

export const UpDownText = styled.div`
  font-size: ${theme.fontSizes.sub1};
  color: ${theme.colors.gray3};
  font-weight: ${theme.fontWeight.regular};
  margin-right: 4px;
`;

export const StyledLine = styled.div`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.gray2};
  margin-bottom: 10px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin-top: 8px;
`;

export const NoCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0px;
`;

export const CommentBox = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${theme.colors.gray2};
  display: flex;
  flex-direction: column;
  margin-bottom: 2px;
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const TierImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export const ProfileImgContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
`;

export const BadgeImg = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  bottom: -2px;
  right: -4px;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: ${theme.fontWeight.regular};
  margin-right: 20px;
`;

export const CommentText = styled.div`
  font-size: 14px;
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  line-height: 24px;
  padding: 0 10px;
`;

export const DateText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: ${theme.fontSizes.sub2};
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  padding-right: 10px;
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentUploadContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

export const CommetUploadBox = styled.div`
  width: 90%;
  border-radius: 10px;
  background-color: ${theme.colors.gray2};
  padding: 10px;
  position: relative;
`;

export const MyContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const MyTierImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const MyProfileImgContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  position: relative;
`;

export const MyProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
`;

export const MyBadgeImg = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  bottom: -2px;
  right: -4px;
`;

export const MyName = styled.div`
  font-size: 18px;
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.black};
  margin-right: 20px;
`;

export const ReviewInput = styled.textarea`
  border-style: none;
  width: 100%;
  height: 71px;
  padding: 8px;
  resize: none;
  font-size: 14px;
  font-weight: ${theme.fontWeight.regular};
  color: ${theme.colors.gray3};
  border-radius: 10px;
`;

export const SubmitBtn = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 18px;
`;

export const DeleteButton = styled(Button)`
  background-color: ${theme.colors.gray2};
  color: white;

  &:hover {
    background-color: ${theme.colors.red};
  }
`;
