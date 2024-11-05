import React from "react";
import styled from "styled-components";
import theme from "../../../styles/theme.js";

const StyledPosting = styled.div`
  width: ${({ width }) => `${width}`};
  height: ${({ $ismine }) => ($ismine ? `360px` : `390px`)};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 180px;
  position: relative;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius.md};
  object-fit: cover;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: ${({ $ismine }) =>
    $ismine ? `calc(100% - 180px)` : `calc(100% - 220px)`};
  padding: ${({ $ismine }) =>
    $ismine ? `10px 20px 20px 20px` : `10px 20px 4px 20px`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ $ismine }) =>
    !$ismine
      ? `
    border-bottom: 1px solid ${theme.colors.neutral200};
  `
      : ""};
`;

const Title = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.neutral700};
  padding: 0 0 10px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
`;

const Desciption = styled.p`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral700};
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const PostingInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentsCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSizes.sm};
`;

const PostingDate = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.neutral400};
`;

const ProfileContainer = styled.div`
  padding: 8px 20px 20px 20px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${theme.fontSizes.sm};
`;

function PostingCard({
  onClick,
  width,
  title,
  mainImg,
  content,
  commentsCount,
  createAt,
  isMine,
  nickname,
  profileImg,
  ...props
}) {
  return (
    <StyledPosting width={width} $ismine={isMine} onClick={onClick} {...props}>
      <ImageContainer>
        <StyledImg
          src={mainImg}
          alt="main image"
          loading="lazy"
          decoding="async"
          onLoad={(e) => {}}
        />
      </ImageContainer>
      <ContentContainer $ismine={isMine}>
        <div>
          <Title>{title}</Title>
          <Desciption>{content}</Desciption>
        </div>
        <PostingInfo>
          <CommentsCount>
            <img
              src="/message-text.svg"
              width="20px"
              height="20px"
              alt="댓글"
            />
            <div>{commentsCount}</div>
          </CommentsCount>
          <PostingDate>{createAt}</PostingDate>
        </PostingInfo>
      </ContentContainer>
      {!isMine && (
        <ProfileContainer>
          <Profile>
            <img
              src={profileImg}
              alt=""
              height="20px"
              width="20px"
              loading="lazy"
              decoding="async"
              onLoad={(e) => {}}
              style={{ borderRadius: "50%" }}
            />
            <p>{nickname}</p>
          </Profile>
        </ProfileContainer>
      )}
    </StyledPosting>
  );
}

export default PostingCard;
