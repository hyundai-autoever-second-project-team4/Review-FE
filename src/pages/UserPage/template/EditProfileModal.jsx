import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../components/CustomModal/CustomModal";
import styled from "styled-components";
import theme from "../../../styles/theme";
import editSvg from "../../../assets/svg/edit-2.svg";
import edit2Svg from "../../../assets/svg/edit.svg";
import userEditSvg from "../../../assets/svg/user-edit.svg";
import DynamicSVG from "../../../components/DynamicSVG/DynamicSVG";
import Button from "../../../components/Button/Button";
import primarySvg from "../../../assets/svg/primary.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
`;

const ImgShadow = styled.div`
  width: 160px;
  position: absolute;
  top: 0;
  left: 0;
  height: 160px;
  border-radius: 50%;
  transition: 0.3s;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ProfileName = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 24px;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 32px;
`;

const BadgeContainer = styled.div`
  width: 90%;
  font-size: 20px;
  font-weight: 600;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 241, 255, 0.8);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
    margin: 0px 0;
  }
`;

const BadgeWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const StyledP = styled.p`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledInput = styled.input`
  outline: none;
  padding: 4px 8px;
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.sm};
`;

const Primary = styled(DynamicSVG)`
  position: absolute;
  top: -15px;
  right: -15px;
`;

function EditProfileModal({ modal, modalClose, user, handleProfileEdit }) {
  const [profileImage, setProfileImage] = useState(user?.memberProfileImg);
  const [profileName, setProfileName] = useState(user?.memberName);
  const [mode, setMode] = useState("normal");
  const [primaryId, setPrimaryId] = useState(
    user?.memberBadgeList?.primaryBadgeId
  );
  const fileInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // 선택한 이미지를 미리보기로 표시
    }
  };

  const handleImgShadowClick = () => {
    fileInputRef.current.click(); // ImgShadow 클릭 시 파일 선택 창 열기
  };

  const handleModeChange = () => {
    setMode((p) => (p === "normal" ? "edit" : "normal"));
  };

  const handleNameChange = (event) => {
    setProfileName(event.target.value);
  };

  const handleSetting = () => {
    const file = fileInputRef.current.files[0];
    const data = new FormData();
    data.append("memberName", profileName);
    if (file) data.append("memberProfileImg", file || null);

    data.append("primaryBadgeId", primaryId);

    handleProfileEdit(data);
  };

  return (
    <CustomModal title="프로필 편집" modal={modal} modalClose={modalClose}>
      <Container>
        <div style={{ position: "relative" }}>
          <ProfileImg src={profileImage} alt="Profile" />
          <ImgShadow onClick={handleImgShadowClick}>
            <DynamicSVG svgUrl={editSvg} width={32} height={32} color="white" />
          </ImgShadow>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <ProfileName>
          {mode === "normal" ? (
            <StyledP>{profileName}</StyledP>
          ) : (
            <StyledInput
              value={profileName}
              onChange={handleNameChange}
              onKeyDown={(e) => {
                if (e.code === "Enter") handleModeChange();
              }}
              autoFocus
            />
          )}
          <DynamicSVG
            svgUrl={mode !== "normal" ? userEditSvg : edit2Svg}
            width={28}
            height={28}
            color={theme.colors.primary}
            style={{ cursor: "pointer" }}
            onClick={handleModeChange}
          />
        </ProfileName>
        <BadgeContainer>
          <p>대표 뱃지 설정하기</p>
          <BadgeWrapper>
            {user?.memberBadgeList?.badges?.map((badge) => (
              <div
                key={badge.id}
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => setPrimaryId(badge.id)}
              >
                <img alt="" src={badge.image} width={56} height={56} />
                {badge.id === primaryId && (
                  <Primary
                    svgUrl={primarySvg}
                    width={36}
                    height={36}
                    color={theme.colors.primary}
                  />
                )}
              </div>
            ))}
          </BadgeWrapper>
        </BadgeContainer>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button onClick={handleSetting} color="primary">
            설정하기
          </Button>
        </div>
      </Container>
    </CustomModal>
  );
}

export default EditProfileModal;
