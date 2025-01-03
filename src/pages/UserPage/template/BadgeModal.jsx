import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal/CustomModal";
import theme from "../../../styles/theme";
import styled from "styled-components";
import { badges } from "../../../utils/badges";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BadgeWrapper = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  border-radius: ${theme.borderRadius.md};
  padding: 0 16px;
  border: 1px solid ${theme.colors.gray2};
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const BadgeName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const BadgeCondition = styled.div`
  font-size: 14px;
  margin-top: 6px;
`;

const BadgeImg = styled.img`
  width: 56px;
  height: 56px;
`;

const Count = styled.div`
  height: 48px;
  padding: ${({ $badgeModalMobile }) =>
    $badgeModalMobile ? `0 4px` : `0 16px`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.sub1};
  font-weight: ${theme.fontWeight.bold};
  border-radius: 24px;
  background-color: #f5f5f5;
  white-space: nowrap;
`;

function BadgeModal({ modal, modalClose, badgeCnt }) {
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
  return (
    <CustomModal
      title="뱃지 획득 조건"
      modal={modal}
      modalClose={modalClose}
      large={islargeScreen}
      badgeModalMobile={isMobileScreen}
    >
      <Container>
        {Object.entries(badges)?.map(([key, { name, condition }], index) => {
          return (
            <BadgeWrapper key={key}>
              <Left>
                <BadgeImg src={`/badgeImages/${key}.svg`} alt="" />
                <div>
                  <BadgeName>{name}</BadgeName>
                  <BadgeCondition>{condition}</BadgeCondition>
                </div>
              </Left>
              <Count $badgeModalMobile={isMobileScreen}>
                {badgeCnt[index].counts}명
              </Count>
            </BadgeWrapper>
          );
        })}
      </Container>
    </CustomModal>
  );
}

export default BadgeModal;
