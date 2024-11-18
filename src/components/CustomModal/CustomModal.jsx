import React from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import theme from "../../styles/theme";
import DynamicSVG from "../DynamicSVG/DynamicSVG";
import CloseIcon from "../../assets/svg/close-circle.svg";

const Container = styled.div`
  width: ${({ $large }) => ($large ? `800px` : `95%`)};
  min-width: ${({ $large }) => ($large ? `800px` : `95%`)};
  position: relative;
`;

const TitleArea = styled.div`
  height: ${({ $titleHeight }) => ($titleHeight ? `${$titleHeight}` : `100px`)};
  width: ${({ $large }) => ($large ? `800px` : `95%`)};
  min-width: ${({ $large }) => ($large ? `800px` : `95%`)};
  padding: ${({ $large }) => ($large ? `0 40px` : `10px`)};
  position: fixed;
  border-bottom: 1px solid ${theme.colors.gray2};

  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeight.bold};
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ $reviewModal }) =>
    $reviewModal ? `${theme.colors.review}` : "#fff"};
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
  z-index: 9999;
`;

const ContentArea = styled.div`
  margin-top: ${({ $titleHeight }) => ($titleHeight ? `48px` : `98px`)};
  max-height: 500px;
  min-height: 100px;
  padding: 20px 36px 0 36px;
  overflow-y: auto;
  background-color: ${({ $reviewModal }) =>
    $reviewModal ? `${theme.colors.review}` : "#fff"};

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(221, 221, 235, 0.8);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
    margin: 5px 0;
  }
`;

const BottomArea = styled.div`
  border-radius: 0 0 ${theme.borderRadius.md} ${theme.borderRadius.md};
  height: 20px;
  background-color: ${({ $reviewModal }) =>
    $reviewModal ? `${theme.colors.review}` : "#fff"};
`;

const CloseButton = styled.div`
  position: absolute;
  right: ${({ $large }) => ($large ? `36px` : `10px`)};
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

function CustomModal({
  modal,
  modalClose,
  large,
  title,
  children,
  reviewModal,
  titleHeight,
}) {
  return (
    <Modal
      open={modal}
      onClose={modalClose}
      sx={{
        fontFamily: "Noto Sans KR",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        border: "none",
        backgroundColor: "none",
        width: large ? "800" : "400",
        "& > *": {
          borderRadius: "1px",
          outline: "none",
        },
      }}
    >
      <Container $large={large}>
        <TitleArea
          $large={large}
          $reviewModal={reviewModal}
          $titleHeight={titleHeight}
        >
          <div>{title}</div>
          <CloseButton onClick={modalClose}>
            <DynamicSVG color={theme.colors.black} svgUrl={CloseIcon} />
            {/* <img src="../../assets/svg/close-circle.svg" /> */}
          </CloseButton>
        </TitleArea>
        <ContentArea $titleHeight={titleHeight} $reviewModal={reviewModal}>
          {children}
        </ContentArea>
        <BottomArea $reviewModal={reviewModal} />
      </Container>
    </Modal>
  );
}

export default CustomModal;
